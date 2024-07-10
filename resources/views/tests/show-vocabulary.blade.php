@extends('master')

@section('title', 'Vocabulary Questions')

@section('content')
<div class="container">
    <h1>Vocabulary Questions</h1>

    <form method="post" action="{{ route('submitAnswer') }}">
        @csrf
        <input type="hidden" name="testId" value="{{ $test->id }}">
        
        <ul>
            @foreach($questions as $question)
                <li>
                    <p>{{ $question->QuestionText }}</p>
                    <label><input type="radio" name="answers[{{ $question->id }}]" value="A"> {{ $question->OptionA }}</label><br>
                    <label><input type="radio" name="answers[{{ $question->id }}]" value="B"> {{ $question->OptionB }}</label><br>
                    <label><input type="radio" name="answers[{{ $question->id }}]" value="C"> {{ $question->OptionC }}</label><br>
                    <label><input type="radio" name="answers[{{ $question->id }}]" value="D"> {{ $question->OptionD }}</label><br>
                    <hr>
                </li>
            @endforeach
        </ul>
    
        <button type="submit" class="btn btn-primary">Submit Answers</button>
    </form>
    

    <a href="{{ route('tests.show',  ['test' => $test->id])}}" class="btn btn-secondary mt-3">Return to Show Page</a>

</div>
@endsection
