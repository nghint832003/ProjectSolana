<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Tạo dữ liệu cho bảng users
        for ($i = 0; $i < 10; $i++) {
            DB::table('users')->insert([
                'Username' => fake()->name(),
                'Email' => fake()->email(),
                'Password' => fake()->password(),
            ]);
        }
        for ($i = 0; $i < 5; $i++) {
            DB::table('tests')->insert([
                'TestName' => fake()->sentence(2),
            ]);
        }

      // Seed questions table
      for ($i = 0; $i < 10; $i++) {
        DB::table('questions')->insert([
            'test_id'=>rand(1,5),
            'QuestionText' => fake()->sentence,
            'OptionA' => fake()->word,
            'OptionB' => fake()->word,
            'OptionC' => fake()->word,
            'OptionD' => fake()->word,
           'CorrectOption' => fake()->randomElement(['A', 'B', 'C', 'D']), 
            'QuestionType' => fake()->randomElement(['vocabulary', 'grammar']),
    
        ]);
    }

    // Seed test_questions table
    for ($i = 1; $i <= 5; $i++) { 
        for ($j = 1; $j <= 5; $j++) { 
            DB::table('test_questions')->insert([
                'TestID' => rand(1,5),
                'QuestionID' => rand(1,5),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    // Seed user_tests table
    for ($i = 1; $i <= 10; $i++) { 
        for ($j = 1; $j <= 5; $j++) { 
            DB::table('user_tests')->insert([
                'UserID' => rand(1,5),
                'TestID' => rand(1,5),
                'StartTime' => now(),
                'EndTime' => now(),
            ]);
        }
    }

    // Seed user_answers table
    for ($i = 1; $i <= 50; $i++) { 
        DB::table('user_answers')->insert([
            'UserTestID' => rand(1,5),
            'QuestionID'=>rand(1,5),
            'SelectedOption' => fake()->randomElement(['A', 'B', 'C', 'D']),
            'TextAnswer'=>fake()->text(20),

        ]);
        
    }

    // Seed results table
    for ($i = 1; $i <= 50; $i++) { 
        $score = rand(0, 100); 
        DB::table('results')->insert([
            'UserTestID' => rand(1,5),
            'TotalQuestions'=>fake()->numberBetween(1,20),
            'CorrectAnswers'=>fake()->numberBetween(1,20),
            'Score' => $score,
        ]);
    }
}
}
