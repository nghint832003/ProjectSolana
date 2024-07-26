<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Test;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class QuestionController extends Controller
{
    public function create()
    {
        $tests = Test::all();
        return response()->json(['tests' => $tests]);
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

        $question = Question::create($validatedData);

        return response()->json(['message' => 'Question created successfully.', 'question' => $question], 201);
    }

    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();
        return response()->json(['message' => 'Question deleted successfully'], 204);
    }
}
