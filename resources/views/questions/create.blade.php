@extends('master')

@section('title', 'Create Question')

@section('content')
<div class="container">
    <h1>Create Question</h1>
    <form action="{{ route('questions.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="test_id">Test</label>
            <select name="test_id" id="test_id" class="form-control" required>
                @foreach($tests as $test)
                    <option value="{{ $test->id }}">{{ $test->TestName }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="QuestionText">Question Text</label>
            <textarea name="QuestionText" id="QuestionText" class="form-control" required></textarea>
        </div>
        <div class="form-group">
            <label for="OptionA">Option A</label>
            <input type="text" name="OptionA" id="OptionA" class="form-control">
        </div>
        <div class="form-group">
            <label for="OptionB">Option B</label>
            <input type="text" name="OptionB" id="OptionB" class="form-control">
        </div>
        <div class="form-group">
            <label for="OptionC">Option C</label>
            <input type="text" name="OptionC" id="OptionC" class="form-control">
        </div>
        <div class="form-group">
            <label for="OptionD">Option D</label>
            <input type="text" name="OptionD" id="OptionD" class="form-control">
        </div>
        <div class="form-group">
            <label for="CorrectOption">Correct Option</label>
            <select name="CorrectOption" id="CorrectOption" class="form-control">
                <option value="">--Select Correct Option--</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        </div>
        <div class="form-group">
            <label for="QuestionType">Question Type</label>
            <select name="QuestionType" id="QuestionType" class="form-control" required>
                <option value="vocabulary">Vocabulary</option>
                <option value="grammar">Grammar</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Create Question</button>
    </form>
    <a href="{{route('tests.index')}}">back to index</a>
</div>
@endsection
