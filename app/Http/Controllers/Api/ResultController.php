<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Result;


class ResultController extends Controller
{
    //
    public function store(Request $request)
    {
        $data = $request->all();

        Result::create($data);

        return response()->json(['message' => 'Result saved successfully'], 201);
    }
}
