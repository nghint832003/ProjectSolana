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

    public function showQuestions($id){
        $testQuestions = Question::where('test_id',$id)->get();

        return response()->json(['testQuestions' => $testQuestions]);
    }

    public function show($testId)
    {
        $test = Test::with('questions')->findOrFail($testId);

        return response()->json(['test' => $test]);
    }

    public function showGrammarQuestions($testId)
    {
        $questions = Question::where('test_id', $testId)
                             ->where('QuestionType', 'grammar')
                             ->get();

        return response()->json(['questions' => $questions]);
    }

    public function showVocabularyQuestions($testId)
    {
        $questions = Question::where('test_id', $testId)
                             ->where('QuestionType', 'vocabulary')
                             ->get();

        return response()->json(['questions' => $questions]);
    }

    public function submitAnswer(Request $request)
    {
        $testId = $request->input('testId');
        $answers = $request->input('answers');

        // Kiểm tra dữ liệu answers
        if (!is_array($answers)) {
            return response()->json(['error' => 'Answers data is invalid.'], 400);
        }

        // Duyệt qua từng câu trả lời
        foreach ($answers as $questionId => $selectedOption) {
            // Kiểm tra và lưu câu trả lời
            if (empty($selectedOption)) {
                return response()->json(['error' => 'Please answer all questions.'], 400);
            }

            // Lấy thông tin câu hỏi từ QuestionID
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
        }


        return response()->json(['message' => 'Answers submitted successfully.'], 200);
    }
}
