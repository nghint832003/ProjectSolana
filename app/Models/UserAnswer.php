<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    protected $fillable = ['id','UserTestID','QuestionID','SelectedOption','TextAnswer'];

    // Quan hệ với bảng questions (mỗi user_answer thuộc về một câu hỏi)
    public function userTest()
{
    return $this->belongsTo(UserTest::class, 'UserTestID');
}

public function question()
{
    return $this->belongsTo(Question::class, 'QuestionID');
}

}
