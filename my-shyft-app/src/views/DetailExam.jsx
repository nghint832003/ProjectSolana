// views/Detail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function DetailExam() {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState({});
    const [correctCount, setCorrectCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3 * 60); // 3 minutes in seconds

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/testQuestion/2')
            .then(response => {
                setQuestions(response.data.testQuestions || []);
            })
            .catch(error => {
                console.error("There was an error fetching the questions!", error);
            });
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers({ ...userAnswers, [questionId]: answer });
    };

    const handleSubmit = () => {
        const newResults = {};
        let count = 0;
        questions.forEach(question => {
            const isCorrect = userAnswers[question.id] === question.CorrectOption;
            newResults[question.id] = isCorrect;
            if (isCorrect) {
                count++;
            }
        });
        setResults(newResults);
        setCorrectCount(count);
        setSubmitted(true);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="bg-[#efefef] p-[24px]">
            {/* TITLE */}
            <div className="title flex justify-center items-center gap-x-5">
                <h2>IELTS Simulation Listening test 6</h2>
                <Button variant="outlined">Thoát</Button>
            </div>
            {/* EXAM */}
            <div className="exam-container flex items-start gap-x-[24px] mt-[24px]">
                {/* Content */}
                <div className="exam-content bg-white w-[80%] rounded-[8px] p-[16px]">
                    <p className="note italic">
                        Choose the correct letter A, B, C, or D
                    </p>
                    <div className="questions">
                        {questions.length > 0 ? (
                            questions.map((question, index) => (
                                <div key={question.id} className="relative py-2">
                                    <div className="absolute t-0 l-0 question-index p-4 rounded-[50%] bg-blue-100 w-[36px] h-[36px] flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    <div className="question-info ml-[46px] mb-1">
                                        <FormLabel
                                            id="demo-radio-buttons-group-label"
                                            className="!text-black"
                                        >
                                            {question.QuestionText}
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name={`radio-buttons-group-${question.id}`}
                                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        >
                                            <FormControlLabel
                                                value="A"
                                                className="!p-0"
                                                control={<Radio />}
                                                label={`A. ${question.OptionA}`}
                                                disabled={submitted}
                                            />
                                            <FormControlLabel
                                                value="B"
                                                control={<Radio />}
                                                label={`B. ${question.OptionB}`}
                                                disabled={submitted}
                                            />
                                            <FormControlLabel
                                                value="C"
                                                control={<Radio />}
                                                label={`C. ${question.OptionC}`}
                                                disabled={submitted}
                                            />
                                            <FormControlLabel
                                                value="D"
                                                control={<Radio />}
                                                label={`D. ${question.OptionD}`}
                                                disabled={submitted}
                                            />
                                        </RadioGroup>
                                        {submitted && (
                                            <div className="mt-2">
                                                {results[question.id] ? (
                                                    <div className="text-green-600 flex items-center">
                                                        <CheckCircleIcon /> Đúng
                                                    </div>
                                                ) : (
                                                    <div className="text-red-600 flex items-center">
                                                        <CancelIcon /> Sai. Đáp án đúng: {question.CorrectOption}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No questions available</div>
                        )}
                    </div>
                </div>
                {/* Time & Overview */}
                <div className="exam-overview bg-white w-[20%] rounded p-[16px]">
                    {/* TIME */}
                    <p>Thời gian còn lại:</p>
                    <h3 className="text-red-500 text-[24px] font-bold">
                        {formatTime(timeLeft)}
                    </h3>
                    {!submitted && (
                        <Button
                            variant="contained"
                            className="w-[100%] !my-3"
                            onClick={handleSubmit}
                        >
                            NỘP BÀI
                        </Button>
                    )}
                    {/* OVERVIEW */}
                    <p className="text-[14px] text-red-700">
                        Khôi phục/Lưu bài làm
                    </p>
                    <p className="text-orange-500 italic font-bold font-[12px] mt-1">
                        Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài
                        để đánh dấu review
                    </p>
                    <div className="status-questions flex items-center gap-1 flex-wrap">
                        {submitted && (
                            <p>{`Đúng: ${correctCount}/${questions.length}`}</p>
                        )}
                        {questions.length > 0 && questions.map((ques, index) => (
                            <div
                                key={ques.id}
                                className="!w-[36px] !h-[36px] border border-1 border-gray rounded-[12px] flex items-center justify-center"
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
