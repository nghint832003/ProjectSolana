<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;


    protected $fillable = [
        'TestName',
    
    ];

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'test_questions', 'TestID', 'QuestionID');
    }
    
}
