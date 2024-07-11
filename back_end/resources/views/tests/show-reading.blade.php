@extends('master')

@section('title', 'reading Questions')

@section('content')
    <h1>Grammar Questions</h1>
    @if (  $currentQuestion && !is_null($currentQuestion->QuestionText))
    <h2>{{  $currentQuestion->QuestionText }}</h2>
@else
    <p>Không có câu hỏi nào được tìm thấy.</p>
@endif

@if ($currentQuestion)
<p><strong>Question Text:</strong> {{ $currentQuestion->QuestionText }}</p>
<label><input type="radio" name="answer" value="A"> {{ $currentQuestion->OptionA }}</label><br>
<label><input type="radio" name="answer" value="B"> {{ $currentQuestion->OptionB }}</label><br>
<label><input type="radio" name="answer" value="C"> {{ $currentQuestion->OptionC }}</label><br>
<label><input type="radio" name="answer" value="D"> {{ $currentQuestion->OptionD }}</label><br>
@endif
       
        <button type="submit" class="btn btn-primary">Submit Answer</button>
    
        
        <a href="{{ route('tests.show', ['test' => $test->id ])  }}" class="btn btn-secondary mt-3">Return to Show Page</a>

   
@endsection

