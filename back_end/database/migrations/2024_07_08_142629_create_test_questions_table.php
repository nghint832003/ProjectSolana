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
        Schema::create('test_questions', function (Blueprint $table) {
            $table->foreignId('TestID')->constrained('tests'); // Khóa ngoại tham chiếu đến bảng `tests`.
            $table->foreignId('QuestionID')->constrained('questions'); // Khóa ngoại tham chiếu đến bảng `questions`.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_questions');
    }
};
