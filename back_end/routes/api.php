<?php
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\QuestionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tests', TestController::class);

// Route cho Grammar
Route::get('tests/{testId}/{questionType}/grammar', [TestController::class, 'showGrammarQuestions'])->name('tests.show_grammar');

// Lấy tất cả question của bài test
Route::get('testQuestion/{id}',[TestController::class, 'showQuestions'])->name('test.show_questions');
// Route cho Vocabulary)
Route::get('tests/{testId}/{questionType}/vocabulary', [TestController::class, 'showVocabularyQuestions'])->name('tests.show_vocabulary');

// Route cho Questions
Route::get('questions/create', [QuestionController::class, 'create'])->name('questions.create');
Route::post('questions', [QuestionController::class, 'store'])->name('questions.store');

// Route cho Submit Answer
Route::post('submit-answer', [TestController::class, 'submitAnswer'])->name('submitAnswer');
