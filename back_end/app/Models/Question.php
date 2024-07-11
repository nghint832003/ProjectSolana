<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable=[
        'test_id',
          'QuestionText',
          'OptionA',
          'OptionB',
          'OptionC',
          'OptionD',
          'CorrectOption',
          'QuestionType',
    ];
    
    public function tests()
    {
        return $this->belongsToMany(Test::class, 'test_questions', 'QuestionID', 'TestID');
    }
}
