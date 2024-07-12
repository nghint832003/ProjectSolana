@extends('master')

@section('title', 'Test Result')

@section('content')
<div class="container">
    <h1>Test Result</h1>
    <h2>Test ID: {{ $test->id }}</h2>
    <h3>Your Count: {{ $count }} / {{ $total }}</h3>
    <h3>Your Score :{{$score}}</h3>


    <a href="{{ route('tests.answers', ['testId' => $test->id]) }}" class="btn btn-info">View Detailed Answers</a>
    <a href="{{ route('tests.index') }}" class="btn btn-primary">Back to Home</a>
</div>
@endsection
