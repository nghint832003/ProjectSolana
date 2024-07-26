@extends('master')

@section('title', 'Test Details')

@section('content')
<h2>Test: {{ $test->id }}</h2>

<div>
    <a href="{{ route('tests.show_questions', ['testId' => $test->id]) }}" class="btn btn-primary">View Questions</a>
    <a href="{{ route('tests.index') }}" class="btn btn-primary">Back to Home</a>
</div>
@endsection

