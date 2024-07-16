import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Link, Router, useParams, useNavigate } from "react-router-dom";

// Đây là giao diện bên trong màn, cần tạo component layout để cho nội dung vào trong
export default function DetailExam() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([
        {
            id: 1,
            questionTitle:
                "What part of speech is the word 'quickly' in the sentence 'She runs quickly'?",
            options: ["Noun", "Verb", "Adverb", "Adjective"],
            answer: 3,
            isChooseAnswer: false,
            userOptions: null,
        },
        {
            id: 2,
            questionTitle:
                "Which type of pronoun is used in the sentence 'They went to the park'?",
            options: [
                "Personal pronoun",
                "Demonstrative pronoun",
                "Relative pronoun",
                "Interrogative pronoun",
            ],
            answer: 1,
            isChooseAnswer: false,
            userOptions: null,
        },
        {
            id: 3,
            questionTitle:
                "In the sentence 'The big dog chased the small cat', which words are adjectives?",
            options: ["big, small", "dog, cat", "chased", "The, the"],
            answer: 1,
            isChooseAnswer: false,
            userOptions: null,
        },
        {
            id: 4,
            questionTitle:
                "What is the correct way to form the past tense of the verb 'sing'?",
            options: ["singed", "sang", "sung", "sang"],
            answer: 2,
            isChooseAnswer: false,
            userOptions: null,
        },
        {
            id: 5,
            questionTitle:
                "Which sentence uses the correct subject-verb agreement?",
            options: [
                "The dogs bark loudly.",
                "The dogs barks loudly.",
                "The dog bark loudly.",
                "The dog barks loudly.",
            ],
            answer: 4,
            isChooseAnswer: false,
            userOptions: null,
        },
        {
            id: 6,
            questionTitle:
                "What is the function of the comma in the sentence 'On Saturdays, we go to the beach'?",
            options: [
                "To separate the subject from the verb",
                "To set off a dependent clause",
                "To indicate a pause in the sentence",
                "To separate two independent clauses",
            ],
            answer: 3,
            isChooseAnswer: false,
            userOptions: null,
        },
        {
            id: 7,
            questionTitle: "Which sentence uses the correct capitalization?",
            options: [
                "My friend lives in new york.",
                "My Friend Lives in New York.",
                "My friend Lives in new York.",
                "My friend lives in New York.",
            ],
            answer: 4,
            isChooseAnswer: false,
            userOptions: null,
        },
        {
            id: 8,
            questionTitle:
                "What is the function of the apostrophe in the word 'dog's' in the sentence 'The dog's ball was lost'?",
            options: [
                "To indicate possession",
                "To show a contraction",
                "To form a plural",
                "To indicate an abbreviation",
            ],
            answer: 1,
            isChooseAnswer: false,
            userOptions: null,
        },
        {
            id: 9,
            questionTitle: "Which sentence uses the correct punctuation?",
            options: [
                "I love chocolate ice cream, don't you?",
                "I love chocolate ice cream don't you?",
                "I love chocolate ice cream; don't you?",
                "I love chocolate ice cream? don't you?",
            ],
            answer: 1,
            isChooseAnswer: false,
            userOptions: null,
        },
        {
            id: 10,
            questionTitle:
                "What is the function of the word 'that' in the sentence 'The book that I read was very interesting'?",
            options: [
                "It is a relative pronoun",
                "It is a demonstrative pronoun",
                "It is a conjunction",
                "It is an adjective",
            ],
            answer: 1,
            isChooseAnswer: false,
            userOptions: null,
        },
    ]);
    const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const { id: examID } = useParams();

    const handleSubmitExam = () => {
        // Check answer & calculate score
        const score = questions.reduce((totalScore, question) => {
            if (question.isChooseAnswer) {
                return totalScore + (question.answer === question.userOptions);
            }
            return totalScore;
        }, 0);
        alert("Your score is " + score + " / " + questions.length);
        navigate("/exam");
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
                    <p className="note italic text-left">
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
                                    <div className="question-info ml-[66px] mb-1">
                                        <FormLabel
                                            id="demo-radio-buttons-group-label"
                                            className="!text-black !text-left block"
                                        >
                                            {question.questionTitle}
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            onChange={(event) => {
                                                question.isChooseAnswer = true;
                                                question.userOptions =
                                                    event.target.value;
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
                        {minutes.toString().padStart(2, "0")}:
                        {seconds.toString().padStart(2, "0")}
                    </h3>
                    <Button
                        variant="contained"
                        className="w-[100%] !my-3"
                        onClick={() => handleSubmitExam()}
                    >
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
                                    className={`!w-[36px] !h-[36px] border border-1 border-gray rounded-[12px] flex items-center justify-center ${
                                        ques.isChooseAnswer
                                            ? "bg-black text-white"
                                            : ""
                                    }`}
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
