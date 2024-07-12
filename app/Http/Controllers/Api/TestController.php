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

    public function show($testId)
    {
        $test = Test::with('questions')->findOrFail($testId);

        return response()->json(['test' => $test]);
    }
   
    public function showQuestions($testId)
    {
        $test = Test::findOrFail($testId);
        $grammarQuestions = Question::where('test_id', $testId)->where('QuestionType', 'grammar')->get();
        $vocabularyQuestions = Question::where('test_id', $testId)->where('QuestionType', 'vocabulary')->get();

        return response()->json([
            'test' => $test,
            'grammarQuestions' => $grammarQuestions,
            'vocabularyQuestions' => $vocabularyQuestions
        ]);
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
