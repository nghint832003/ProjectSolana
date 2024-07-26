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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('test_id')->constrained();
            $table->text('QuestionText'); // Nội dung câu hỏi.
            $table->string('OptionA', 255)->nullable(); // Tùy chọn A, tối đa 255 ký tự, có thể để trống.
            $table->string('OptionB', 255)->nullable(); // Tùy chọn B, tối đa 255 ký tự, có thể để trống.
            $table->string('OptionC', 255)->nullable(); // Tùy chọn C, tối đa 255 ký tự, có thể để trống.
            $table->string('OptionD', 255)->nullable(); // Tùy chọn D, tối đa 255 ký tự, có thể để trống.
            $table->string('CorrectOption', 1)->nullable(); // Đáp án đúng (A, B, C, D)
            $table->string('QuestionType', 50); // Loại câu hỏi (Listening, Speaking, Reading, Writing)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
