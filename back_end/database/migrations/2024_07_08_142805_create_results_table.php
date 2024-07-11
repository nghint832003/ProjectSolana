<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('UserTestID')->constrained('user_tests'); 
            $table->integer('TotalQuestions'); // Tổng số câu hỏi trong bài kiểm tra.
            $table->integer('CorrectAnswers'); // Số câu trả lời đúng.
            $table->decimal('Score', 5, 2); // Điểm số của người dùng, với 2 chữ số thập phân.
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
