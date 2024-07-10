<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $table = 'user_answers'; 
    public $timestamps = true;

    protected $fillable=[
    'UserTestID',
    'TotalQuestions',
    'CorrectAnswers',
    'Score',
    'created_at',
    'updated_at	',
    ];
}
