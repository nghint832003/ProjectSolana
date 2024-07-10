@extends('master')

@section('title', 'Test Details')

@section('content')
<h2>Test: {{ $test->id }}</h2>

<div>
 
    <a href="{{ route('tests.show_grammar',['testId' => $test->id, 'questionType' => 'grammar']) }}" class="btn btn-primary">Grammar</a>

    
    <a href="{{ route('tests.show_vocabulary',['testId' => $test->id, 'questionType' => 'vocabulary']) }}" class="btn btn-primary">Vocabulary</a>
   
    <a href="{{route('tests.index')}}" class="btn btn-primary">back to home</a>
</div>
@endsection
