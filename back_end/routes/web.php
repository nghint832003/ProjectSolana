<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Test\TestController;
use App\Http\Controllers\Test\QuestionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::resource('/tests', TestController::class);


// Route cho Grammar
Route::get('tests/{testId}/{questionType}/grammar', [TestController::class, 'showGrammarQuestions'])->name('tests.show_grammar');

// Route cho Reading

Route::get('tests/{testId}/{questionType}/vocabulary', [TestController::class, 'showVocabularyQuestions'])->name('tests.show_vocabulary');



Route::get('/questions/create',[QuestionController::class, 'create'])->name('questions.create');
Route::post('/questions', [QuestionController::class, 'store'])->name('questions.store');



// web.php
Route::post('/submit-answer', [TestController::class, 'submitAnswer'])->name('submitAnswer');




