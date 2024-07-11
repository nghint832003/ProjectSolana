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
        Schema::create('user_tests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('TestID')->constrained('tests');
            $table->foreignId('UserID')->constrained('users'); 
            $table->timestamp('StartTime')->nullable(); // Thời gian bắt đầu làm bài
            $table->timestamp('EndTime')->nullable(); // Thời gian kết thúc làm bài
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_tests');
    }
};
