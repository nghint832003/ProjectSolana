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

Route::get('tests/{testId}/questions', [TestController::class, 'showQuestions'])->name('tests.show_questions');


Route::get('/questions/create',[QuestionController::class, 'create'])->name('questions.create');
Route::post('/questions', [QuestionController::class, 'store'])->name('questions.store');


Route::post('/submit-answer', [TestController::class, 'submitAnswer'])->name('submitAnswer');

Route::get('tests/{testId}/score', [TestController::class, 'showScore'])->name('tests.score');

Route::get('tests/{testId}/answers', [TestController::class, 'showDetailedAnswers'])->name('tests.answers');





