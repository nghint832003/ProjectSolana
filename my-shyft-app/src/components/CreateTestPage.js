import React, { useState } from 'react';
import axios from 'axios';

const CreateTestPage = () => {
    const [testName, setTestName] = useState('');
    const [questions, setQuestions] = useState([{
        QuestionText: '',
        OptionA: '',
        OptionB: '',
        OptionC: '',
        OptionD: '',
        CorrectOption: '',
        QuestionType: ''
    }]);
    const [tests, setTests] = useState([]);
    const [errors, setErrors] = useState({});

    const validateTestName = (name) => {
        const errors = {};
        if (!name) {
            errors.TestName = 'Tên bài kiểm tra là bắt buộc';
        } else if (name.length > 255) {
            errors.TestName = 'Tên bài kiểm tra không được dài quá 255 ký tự';
        }
        return errors;
    };

    const validateQuestion = (question) => {
        const errors = {};
        if (!question.QuestionText) {
            errors.QuestionText = 'Câu hỏi là bắt buộc';
        }
        if (question.OptionA && question.OptionA.length > 255) {
            errors.OptionA = 'Lựa chọn A không được dài quá 255 ký tự';
        }
        if (question.OptionB && question.OptionB.length > 255) {
            errors.OptionB = 'Lựa chọn B không được dài quá 255 ký tự';
        }
        if (question.OptionC && question.OptionC.length > 255) {
            errors.OptionC = 'Lựa chọn C không được dài quá 255 ký tự';
        }
        if (question.OptionD && question.OptionD.length > 255) {
            errors.OptionD = 'Lựa chọn D không được dài quá 255 ký tự';
        }
        if (question.CorrectOption && !['A', 'B', 'C', 'D'].includes(question.CorrectOption)) {
            errors.CorrectOption = 'Lựa chọn đúng phải là một trong các giá trị A, B, C, D';
        }
        if (!question.QuestionType) {
            errors.QuestionType = 'Loại câu hỏi là bắt buộc';
        } else if (question.QuestionType.length > 50) {
            errors.QuestionType = 'Loại câu hỏi không được dài quá 50 ký tự';
        }
        return errors;
    };

    const validateForm = () => {
        const testNameErrors = validateTestName(testName);
        const questionErrors = questions.map((question, index) => validateQuestion(question));

        setErrors({
            testName: testNameErrors,
            questions: questionErrors
        });

        return Object.keys(testNameErrors).length === 0 && questionErrors.every(qErrors => Object.keys(qErrors).length === 0);
    };

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
            QuestionText: '',
            OptionA: '',
            OptionB: '',
            OptionC: '',
            OptionD: '',
            CorrectOption: '',
            QuestionType: ''
        }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addTest(testName, questions);
            setTestName('');
            setQuestions([{
                QuestionText: '',
                OptionA: '',
                OptionB: '',
                OptionC: '',
                OptionD: '',
                CorrectOption: '',
                QuestionType: ''
            }]);
        }
    };

    const addTest = (testName, questions) => {
        axios.post('http://127.0.0.1:8000/api/createTest', { TestName: testName })
            .then(response => {
                const testId = response.data.id;
                const questionPromises = questions.map(question => 
                    axios.post('http://127.0.0.1:8000/api/createQuestions', { 
                        QuestionText: question.QuestionText, 
                        OptionA: question.OptionA,
                        OptionB: question.OptionB,
                        OptionC: question.OptionC,
                        OptionD: question.OptionD,
                        CorrectOption: question.CorrectOption,
                        QuestionType: question.QuestionType,
                        test_id: testId 
                    })
                );
                Promise.all(questionPromises)
                    .then(() => {
                        setTests([...tests, { id: testId, TestName: testName, questions }]);
                    })
                    .catch(error => {
                        if (error.response) {
                            console.error('Response data:', error.response.data);
                            console.error('Response status:', error.response.status);
                            console.error('Response headers:', error.response.headers);
                        } else if (error.request) {
                            console.error('Request data:', error.request);
                        } else {
                            console.error('Error', error.message);
                        }
                        console.error('Config:', error.config);
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
                    {errors.testName && <span className="error">{errors.testName.TestName}</span>}
                </label>
                <div>
                    <h3>Câu hỏi:</h3>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="QuestionText"
                                placeholder="Câu hỏi"
                                value={question.QuestionText}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            {errors.questions && errors.questions[index] && <span className="error">{errors.questions[index].QuestionText}</span>}
                            <input
                                type="text"
                                name="OptionA"
                                placeholder="Lựa chọn A"
                                value={question.OptionA}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            {errors.questions && errors.questions[index] && <span className="error">{errors.questions[index].OptionA}</span>}
                            <input
                                type="text"
                                name="OptionB"
                                placeholder="Lựa chọn B"
                                value={question.OptionB}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            {errors.questions && errors.questions[index] && <span className="error">{errors.questions[index].OptionB}</span>}
                            <input
                                type="text"
                                name="OptionC"
                                placeholder="Lựa chọn C"
                                value={question.OptionC}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            {errors.questions && errors.questions[index] && <span className="error">{errors.questions[index].OptionC}</span>}
                            <input
                                type="text"
                                name="OptionD"
                                placeholder="Lựa chọn D"
                                value={question.OptionD}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            {errors.questions && errors.questions[index] && <span className="error">{errors.questions[index].OptionD}</span>}
                            <input
                                type="text"
                                name="CorrectOption"
                                placeholder="Lựa chọn đúng"
                                value={question.CorrectOption}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            {errors.questions && errors.questions[index] && <span className="error">{errors.questions[index].CorrectOption}</span>}
                            <input
                                type="text"
                                name="QuestionType"
                                placeholder="Loại câu hỏi"
                                value={question.QuestionType}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                            {errors.questions && errors.questions[index] && <span className="error">{errors.questions[index].QuestionType}</span>}
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
                        {test.TestName}
                        <ul>
                            {test.questions.map((question, index) => (
                                <li key={index}>{question.QuestionText}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateTestPage;
