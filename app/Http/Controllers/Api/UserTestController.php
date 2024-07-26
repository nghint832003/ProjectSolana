<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserTest;
use App\Models\Result;
use App\Models\Test; // Model cho bảng tests
use Illuminate\Http\Request;

class UserTestController extends Controller
{
    // Phương thức để lấy lịch sử người dùng
    public function getUserHistory($public_key)
    {
        // Lấy tất cả UserTestID từ bảng results dựa trên public_key
        $userTestIds = Result::where('public_key', $public_key)
                             ->pluck('UserTestID')
                             ->unique();

        // Lấy tất cả các test_id từ bảng user_tests dựa trên UserTestID
        $testIds = UserTest::whereIn('id', $userTestIds)
                           ->pluck('test_id')
                           ->unique();

        // Lấy thông tin các bài test từ bảng tests dựa trên test_id
        $tests = Test::whereIn('id', $testIds)->get();

        // Lấy các kết quả của bài test từ bảng results
        $results = Result::where('public_key', $public_key)->get();

        // Kết hợp thông tin bài test và kết quả
        $history = $tests->map(function ($test) use ($results, $userTestIds) {
            $test->results = $results->where('UserTestID', $userTestIds->firstWhere('test_id', $test->id));
            return $test;
        });

        return response()->json($history);
    }
}
