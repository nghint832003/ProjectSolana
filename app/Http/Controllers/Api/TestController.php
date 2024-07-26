<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Test;
use App\Models\UserAnswer;
use App\Models\Question;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function index()
    {
        $tests = Test::with('questions')->get();

        return response()->json(['tests' => $tests]);
    }

    public function createTest(Request $request){
        $request->validate([
            'TestName' => 'required|string|max:255',
        ]);

        $test = Test::create($request->only('TestName'));

        return response()->json($test, 201);
    }

    public function show($testId)
    {
        $test = Test::with('questions')->findOrFail($testId);

        return response()->json(['test' => $test]);
    }

    public function updateQuestion(Request $request, $id)
    {
        // Validate the request
        $validated = $request->validate([
            'QuestionText' => 'required|string|max:255',
            'OptionA' => 'required|string|max:255',
            'OptionB' => 'required|string|max:255',
            'OptionC' => 'required|string|max:255',
            'OptionD' => 'required|string|max:255',
            'CorrectOption' => 'required|string|max:255',
            'QuestionType' => 'required|string|max:255',
        ]);

        // Find the question by ID
        $question = Question::findOrFail($id);

        // Update the question with validated data
        $question->update($validated);

        // Return the updated question
        return response()->json($question);
    }

    public function showQuestions($id)
    {
        $testQuestions = Question::where('test_id',$id)->get();

        return response()->json(['testQuestions' => $testQuestions]);
    }
    public function submitAnswer(Request $request)
    {
        $testId = $request->input('testId');
        $answers = $request->input('answers');
        $score = 0;
        $totalQuestions = Question::where('test_id', $testId)->count();


        if (!is_array($answers)) {
            return response()->json(['error' => 'Answers data is invalid.'], 400);
        }


        foreach ($answers as $questionId => $selectedOption) {
            if (empty($selectedOption)) {
                return response()->json(['error' => 'Please answer all questions.'], 400);
            }


            $question = Question::find($questionId);

            if (!$question) {
                return response()->json(['error' => 'Question not found.'], 404);
            }


            $userAnswer = new UserAnswer();
            $userAnswer->UserTestID = 1;
            $userAnswer->QuestionID = $questionId;
            $userAnswer->SelectedOption = $selectedOption;


            if ($selectedOption == 'A') {
                $userAnswer->TextAnswer = $question->OptionA;
            } elseif ($selectedOption == 'B') {
                $userAnswer->TextAnswer = $question->OptionB;
            } elseif ($selectedOption == 'C') {
                $userAnswer->TextAnswer = $question->OptionC;
            } elseif ($selectedOption == 'D') {
                $userAnswer->TextAnswer = $question->OptionD;
            }

            $userAnswer->save();

            if ($selectedOption == $question->CorrectOption) {
                $score++;
            }
        }


        return response()->json([
            'testId' => $testId,
            'score' => $score,
            'total' => $totalQuestions,
            'message' => 'Answers submitted successfully.'
        ]);
    }
    public function showScore(Request $request, $testId)
    {
        $test = Test::findOrFail($testId);
        $score = $request->input('score');
        $total = $request->input('total');

        return response()->json([
            'test' => $test,
            'score' => $score,
            'total' => $total
        ]);
    }

    public function showDetailedAnswers($testId)
    {
        $test = Test::findOrFail($testId);
        $questions = Question::where('test_id', $testId)->get();

        $userAnswers = UserAnswer::where('UserTestID', 1)
                                 ->whereIn('QuestionID', $questions->pluck('id')->toArray())
                                 ->get()
                                 ->keyBy('QuestionID');

        return response()->json([
            'test' => $test,
            'questions' => $questions,
            'userAnswers' => $userAnswers
        ]);
    }
}
