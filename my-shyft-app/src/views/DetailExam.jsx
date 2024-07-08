import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// Đây là giao diện bên trong màn, cần tạo component layout để cho nội dung vào trong
export default function DetailExam() {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            questionTitle: "Question 1",
            options: ["Option A", "Option B", "Option C"],
            answer: 2,
            isChooseAnswer: false,
        },
        {
            id: 2,
            questionTitle: "Question 1",
            options: ["Option A", "Option B", "Option C"],
            answer: 2,
            isChooseAnswer: false,
        },
        {
            id: 3,
            questionTitle: "Question 1",
            options: ["Option A", "Option B", "Option C"],
            answer: 2,
            isChooseAnswer: false,
        },
        {
            id: 4,
            questionTitle: "Question 1",
            options: ["Option A", "Option B", "Option C"],
            answer: 2,
            isChooseAnswer: false,
        },
        {
            id: 5,
            questionTitle: "Question 1",
            options: ["Option A", "Option B", "Option C"],
            answer: 2,
            isChooseAnswer: false,
        },
        {
            id: 6,
            questionTitle: "Question 1",
            options: ["Option A", "Option B", "Option C"],
            answer: 2,
            isChooseAnswer: false,
        },
    ]);
    const timeRemainSecond = 30 * 60;
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
                        Choose the correct letter A, B or C
                    </p>
                    <div className="questions">
                        {questions.map((question, index) => {
                            return (
                                <div
                                    key={question.id}
                                    className="relative py-2"
                                >
                                    <div className="absolute t-0 l-0 question-index p-4 rounded-[50%] bg-blue-100 w-[36px] h-[36px] flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    <div className="question-info ml-[46px] mb-1">
                                        <FormLabel
                                            id="demo-radio-buttons-group-label"
                                            className="!text-black"
                                        >
                                            {question.questionTitle}
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            onChange={() => {
                                                question.isChooseAnswer = true;
                                                console.log(questions);
                                            }}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                className="!p-0"
                                                control={<Radio />}
                                                label={`A. ${question.options[0]}`}
                                            />
                                            <FormControlLabel
                                                value={2}
                                                control={<Radio />}
                                                label={`B. ${question.options[1]}`}
                                            />
                                            <FormControlLabel
                                                value={3}
                                                control={<Radio />}
                                                label={`C. ${question.options[2]}`}
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Time & Overview */}
                <div className="exam-overview bg-white w-[20%] rounded p-[16px]">
                    {/* TIME */}
                    <p>Thời gian còn lại:</p>
                    <h3 className="text-red-500 text-[24px] font-bold">
                        {/* {timeRemainSecond} */} 30:00
                    </h3>
                    <Button variant="contained" className="w-[100%] !my-3">
                        NỘP BÀI
                    </Button>

                    {/* OVERVIEW */}
                    <p className="text-[14px] text-red-700">
                        Khôi phục/Lưu bài làm
                    </p>
                    <p className="text-orange-500 italic font-bold font-[12px] mt-1">
                        Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài
                        để đánh dấu review
                    </p>
                    <div className="status-questions flex items-center gap-1 flex-wrap">
                        {questions.map((ques, index) => {
                            return (
                                <div
                                    key={ques.id}
                                    className="!w-[36px] !h-[36px] border border-1 border-gray rounded-[12px] flex items-center justify-center"
                                >
                                    {index + 1}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
