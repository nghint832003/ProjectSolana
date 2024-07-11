import React, { useState } from 'react';
import axios from 'axios';

const CreateTestPage = () => {
    const [testName, setTestName] = useState('');
    const [questions, setQuestions] = useState([{
        text: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctOption: '',
        questionType: ''
    }]);
    const [tests, setTests] = useState([]);
    

    const handleTestNameChange = (e) => {
        setTestName(e.target.value);
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const newQuestions = questions.map((question, i) => {
            if (i === index) {
                return { ...question, [name]: value };
            }
            return question;
        });
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            text: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correctOption: '',
            questionType: ''
        }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTest(testName, questions);
        setTestName('');
        setQuestions([{
            text: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correctOption: '',
            questionType: ''
        }]);
    };

    const addTest = (testName, questions) => {
        axios.post('http://127.0.0.1:8000/api/createTest', { TestName: testName })
            .then(response => {
                const testId = response.data.id;
                const questionPromises = questions.map(question => 
                    axios.post('http://127.0.0.1:8000/api/createQuestions', { 
                        QuestionText: question.text, 
                        OptionA: question.optionA,
                        OptionB: question.optionB,
                        OptionC: question.optionC,
                        OptionD: question.optionD,
                        CorrectOption: question.correctOption,
                        QuestionType: question.questionType,
                        test_id: testId 
                    })
                );
                Promise.all(questionPromises)
                    .then(() => {
                        setTests([...tests, { id: testId, TestName: testName, questions }]);
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra khi thêm câu hỏi!', error);
                    });
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi tạo bài kiểm tra!', error);
            });
    };

    return (
        <div>
            <h1>Tạo Bài Kiểm Tra và Câu Hỏi</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Tên bài kiểm tra:
                    <input 
                        type="text" 
                        value={testName} 
                        onChange={handleTestNameChange} 
                    />
                </label>
                <div>
                    <h3>Câu hỏi:</h3>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="text"
                                placeholder="Câu hỏi"
                                value={question.text}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            <input
                                type="text"
                                name="optionA"
                                placeholder="Lựa chọn A"
                                value={question.optionA}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            <input
                                type="text"
                                name="optionB"
                                placeholder="Lựa chọn B"
                                value={question.optionB}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            <input
                                type="text"
                                name="optionC"
                                placeholder="Lựa chọn C"
                                value={question.optionC}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            <input
                                type="text"
                                name="optionD"
                                placeholder="Lựa chọn D"
                                value={question.optionD}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            <input
                                type="text"
                                name="correctOption"
                                placeholder="Lựa chọn đúng"
                                value={question.correctOption}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            <input
                                type="text"
                                name="questionType"
                                placeholder="Loại câu hỏi"
                                value={question.questionType}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                        </div>
                    ))}
                </div>
                <button type="button" onClick={handleAddQuestion}>Thêm câu hỏi</button>
                <button type="submit">Tạo bài kiểm tra</button>
            </form>
            <h2>Danh sách bài kiểm tra</h2>
            <ul>
                {tests.map(test => (
                    <li key={test.id}>
                        {test.name}
                        <ul>
                            {test.questions.map((question, index) => (
                                <li key={index}>{question.text}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateTestPage;
