<?php
namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Test; 
use App\Models\UserAnswer;
use App\Models\Question;
use App\Models\UserTest; ;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function index()
    {
        $tests = Test::with('questions')->get();

        return view('tests.index', compact('tests'));
    }

    public function show($testId)
    {
        $test = Test::findOrFail($testId);

        return view('tests.show', compact('test'));
    }
   
    public function showGrammarQuestions($testId)
    {
        $test = Test::findOrFail($testId);
        $questions = Question::where('test_id', $testId)
                             ->where('QuestionType', 'grammar')
                             ->get();
    
        return view('tests.show-grammar', compact('questions', 'test'));


       
    }
    
    public function showVocabularyQuestions($testId)
    {
        $test = Test::findOrFail($testId);
        $questions = Question::where('test_id', $testId)
                             ->where('QuestionType', 'vocabulary')
                             ->get();
    
        return view('tests.show-vocabulary', compact('questions', 'test'));
    }

    public function submitAnswer(Request $request)
{
    $testId = $request->input('testId');
    $answers = $request->input('answers');

    // Kiểm tra dữ liệu answers
    if (!is_array($answers)) {
        return redirect()->back()->with('error', 'Answers data is invalid.');
    }

    // Duyệt qua từng câu trả lời
    foreach ($answers as $questionId => $selectedOption) {
        // Kiểm tra và lưu câu trả lời
        if (empty($selectedOption)) {
            return redirect()->back()->with('error', 'Please answer all questions.');
        }

        // Lấy thông tin câu hỏi từ QuestionID
        $question = Question::find($questionId);

        if (!$question) {
            return redirect()->back()->with('error', 'Question not found.');
        }

        // Lưu câu trả lời vào CSDL
        $userAnswer = new UserAnswer();
        $userAnswer->UserTestID = 1; // Thay thế bằng logic lấy ID người dùng thực tế
        $userAnswer->QuestionID = $questionId;
        $userAnswer->SelectedOption = $selectedOption;

        // Gán TextAnswer dựa trên lựa chọn của người dùng
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

    // Redirect về trang hiển thị câu hỏi hoặc trang khác tùy ý
    return redirect()->route('tests.show', ['test' => $testId])->with('success', 'Answers submitted successfully.');
}


}


   

