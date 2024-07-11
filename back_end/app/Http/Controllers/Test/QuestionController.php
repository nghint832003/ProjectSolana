<?php
namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Test;

class QuestionController extends Controller
{
    public function create()
    {
        $tests = Test::all();
        return view('questions.create', compact('tests'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'test_id' => 'required|exists:tests,id',
            'QuestionText' => 'required|string',
            'OptionA' => 'nullable|string|max:255',
            'OptionB' => 'nullable|string|max:255',
            'OptionC' => 'nullable|string|max:255',
            'OptionD' => 'nullable|string|max:255',
            'CorrectOption' => 'nullable|string|in:A,B,C,D',
            'QuestionType' => 'required|string|max:50'
        ]);

        Question::create($validatedData);

        return redirect()->route('tests.index')->with('success', 'Question created successfully.');
    }
}
