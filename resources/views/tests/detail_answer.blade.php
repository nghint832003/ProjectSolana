@extends('master')

@section('title', 'Detailed Answers')

@section('content')
<div class="container">
    <h1>Ket qua bai test {{ $test->id }}</h1>
   


    @foreach($questions as $question)
        <div class="mb-3">
            <p><strong>Question:</strong> {{ $question->QuestionText }}</p>
            <p>
                @if(isset($userAnswers[$question->id]))
                    @php
                        $selectedOption = $userAnswers[$question->id]->SelectedOption ;
                    @endphp
    
                    @if($selectedOption == 'A')
                        <p><strong>Your Answer: A</strong> {{ $question->OptionA}} </p>

                    @elseif($selectedOption == 'B')
                    <p><strong>Your Answer: B</strong> {{ $question->OptionA}} </p>

                    @elseif($selectedOption == 'C')
                    <p><strong>Your Answer: C</strong> {{ $question->OptionA}} </p>

                    @elseif($selectedOption == 'D')
                    <p><strong>Your Answer: D</strong> {{ $question->OptionA}} </p>
                    @endif
                @else
                    Not answered
                @endif
            </p>
            <p>
                @if($question->CorrectOption == 'A')
                   <p><strong>Correct: A</strong>  {{ $question->OptionA }} </p>

                @elseif($question->CorrectOption == 'B')
                    
                    <p><strong>Correct: B</strong>  {{ $question->OptionB }} </p>
                @elseif($question->CorrectOption == 'C')
                  
                    <p><strong>Correct: C</strong>  {{ $question->OptionC }} </p>
                @elseif($question->CorrectOption == 'D')
                    
                    <p><strong>Correct: D</strong>  {{ $question->OptioD }} </p>
                @endif
            </p>
        </div>
        <hr>
    @endforeach

    <a href="{{ route('tests.index') }}" class="btn btn-primary">Back to Home</a>
</div>
@endsection
