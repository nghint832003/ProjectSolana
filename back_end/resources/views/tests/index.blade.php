@extends('master')

@section('title', 'List of Tests')

@section('content')
    <h1>List of Tests</h1>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
            </tr>
        </thead>
        <tbody>
            @foreach($tests as $test)
                <tr>
                    <th scope="row">{{ $test->id }}</th>
                    <td>{{ $test->TestName }}</td>
                    <td>
                        <a href="{{ route('tests.show', $test) }}" class="btn btn-primary">
                            Show
                        </a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <a href="{{ route('questions.create') }}" class="btn btn-primary">Create Question</a>
@endsection
