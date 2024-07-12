<?php
namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Test; 
use App\Models\UserAnswer;
use App\Models\Question;
use App\Models\Result;
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
   

    public function showQuestions($testId)
{
    $test = Test::findOrFail($testId);
    $grammarQuestions = Question::where('test_id', $testId)->where('QuestionType', 'grammar')->get();
    $vocabularyQuestions = Question::where('test_id', $testId)->where('QuestionType', 'vocabulary')->get();

    return view('tests.show-question', compact('test', 'grammarQuestions', 'vocabularyQuestions'));
}


    public function submitAnswer(Request $request)
{
    $testId = $request->input('testId');
    $answers = $request->input('answers');
    $count = 0;
    $totalQuestions = Question::where('test_id', $testId)->count();
   
    if (!is_array($answers)) {
        return redirect()->back()->with('error', 'Answers data is invalid.');
    }

 
    foreach ($answers as $questionId => $selectedOption) {
        if (empty($selectedOption)) {
            return redirect()->back()->with('error', 'Please answer all questions.');
        }

     
        $question = Question::find($questionId);

        if (!$question) {
            return redirect()->back()->with('error', 'Question not found.');
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
            $count++;
        }
    }


   
    return redirect()->route('tests.score', ['testId' => $testId, 'count' => $count,'total' => $totalQuestions])->with('success', 'Answers submitted successfully.');

}

public function showScore(Request $request, $testId)
{
    $test = Test::findOrFail($testId);
    $count = $request->input('count');
    $total = $request->input('total');
    $score=$total/100*$count;



    return view('tests.score', compact('test', 'score','total','count'));
}
public function showDetailedAnswers($testId)
{
    $test = Test::findOrFail($testId);
    $questions = Question::where('test_id', $testId)->get();

   
    $userAnswers = UserAnswer::where('UserTestID', 1)
                             ->whereIn('QuestionID', $questions->pluck('id')->toArray())
                             ->get()
                             ->keyBy('QuestionID');
    
      

    return view('tests.detail_answer', compact('test', 'questions','userAnswers'));
}

}


   

