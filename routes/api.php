<?php
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\QuestionController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::apiResource('tests', TestController::class);

    
    Route::get('tests/{testId}/questions', [TestController::class, 'showQuestions'])->name('tests.show_questions');

    // Route cho tạo câu hỏi mới
    Route::post('questions', [QuestionController::class, 'store'])->name('questions.store');
    
    // Route cho hiển thị form tạo câu hỏi (nếu cần)
    Route::get('questions/create', [QuestionController::class, 'create'])->name('questions.create');

    // Route cho nộp đáp án
    Route::post('submit-answer', [TestController::class, 'submitAnswer'])->name('submitAnswer');

    // Route cho hiển thị điểm số của bài test
    Route::get('tests/{testId}/score', [TestController::class, 'showScore'])->name('tests.score');

    // Route cho hiển thị chi tiết các câu trả lời của người dùng
    Route::get('tests/{testId}/answers', [TestController::class, 'showDetailedAnswers'])->name('tests.answers');
});
