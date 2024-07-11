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
        Schema::create('user_answers', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('UserTestID')->constrained('user_tests'); // Khóa ngoại tham chiếu đến bảng `user_tests`.
            $table->foreignId('QuestionID')->constrained('questions'); // Khóa ngoại tham chiếu đến bảng `questions`.
            $table->char('SelectedOption', 1)->nullable(); // Lựa chọn của người dùng (A, B, C, D)
            $table->text('TextAnswer')->nullable(); // Câu trả lời dạng văn bản
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_answers');
    }
};
