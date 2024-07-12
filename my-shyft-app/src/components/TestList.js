// src/components/TestList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const TestList = () => {
    const [tests, setTests] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTestName, setSelectedTestName] = useState('');
    const [editQuestion, setEditQuestion] = useState(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tests') // Thay thế 'YOUR_API_ENDPOINT' bằng URL API thực tế của bạn
            .then(response => {
                console.log(response.data); // Kiểm tra dữ liệu trả về từ API
                if (response.data && Array.isArray(response.data.tests)) {
                    setTests(response.data.tests);
                } else {
                    setTests([]);
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const fetchQuestions = (testId, testName) => {
        setLoading(true);
        axios.get(`http://127.0.0.1:8000/api/testQuestion/${testId}`) // Thay thế 'YOUR_QUESTION_API_ENDPOINT' bằng URL API thực tế để lấy câu hỏi theo test_id
            .then(response => {
                console.log(response.data); // Kiểm tra dữ liệu trả về từ API
                if (response.data && Array.isArray(response.data.testQuestions)) {
                    setQuestions(response.data.testQuestions);
                } else {
                    setQuestions([]);
                }
                setSelectedTestName(testName);
                setModalIsOpen(true);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setQuestions([]);
    };

    const openEditModal = (question) => {
        setEditQuestion(question);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
        setEditQuestion(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditQuestion({ ...editQuestion, [name]: value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // Call API to update the question
        axios.put(`http://127.0.0.1:8000/api/testQuestion/${editQuestion.id}`, editQuestion)
            .then(response => {
                setQuestions(questions.map(q => (q.id === editQuestion.id ? editQuestion : q)));
                closeEditModal();
            })
            .catch(error => {
                setError(error);
                closeEditModal();
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Danh sách bài kiểm tra</h1>
            <ul>
                {tests.map(test => (
                    <li key={test.id}>
                        <button onClick={() => fetchQuestions(test.id, test.TestName)}>{test.TestName}</button>
                    </li>
                ))}
            </ul>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Danh sách câu hỏi"
            >
                <h2>Các câu hỏi cho bài kiểm tra {selectedTestName}</h2>
                <button onClick={closeModal}>Đóng</button>
                <table>
                    <thead>
                        <tr>
                            <th>Question ID</th>
                            <th>Test ID</th>
                            <th>Question Text</th>
                            <th>Option A</th>
                            <th>Option B</th>
                            <th>Option C</th>
                            <th>Option D</th>
                            <th>Correct Option</th>
                            <th>Question Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(questions) && questions.map(question => (
                            <tr key={question.id}>
                                <td>{question.id}</td>
                                <td>{question.test_id}</td>
                                <td>{question.QuestionText}</td>
                                <td>{question.OptionA}</td>
                                <td>{question.OptionB}</td>
                                <td>{question.OptionC}</td>
                                <td>{question.OptionD}</td>
                                <td>{question.CorrectOption}</td>
                                <td>{question.QuestionType}</td>
                                <td><button onClick={() => openEditModal(question)}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>

            {editQuestion && (
                <Modal
                    isOpen={editModalIsOpen}
                    onRequestClose={closeEditModal}
                    contentLabel="Chỉnh sửa câu hỏi"
                >
                    <h2>Chỉnh sửa câu hỏi</h2>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>Question Text:</label>
                            <input type="text" name="QuestionText" value={editQuestion.QuestionText} onChange={handleEditChange} />
                        </div>
                        <div>
                            <label>Option A:</label>
                            <input type="text" name="OptionA" value={editQuestion.OptionA} onChange={handleEditChange} />
                        </div>
                        <div>
                            <label>Option B:</label>
                            <input type="text" name="OptionB" value={editQuestion.OptionB} onChange={handleEditChange} />
                        </div>
                        <div>
                            <label>Option C:</label>
                            <input type="text" name="OptionC" value={editQuestion.OptionC} onChange={handleEditChange} />
                        </div>
                        <div>
                            <label>Option D:</label>
                            <input type="text" name="OptionD" value={editQuestion.OptionD} onChange={handleEditChange} />
                        </div>
                        <div>
                            <label>Correct Option:</label>
                            <input type="text" name="CorrectOption" value={editQuestion.CorrectOption} onChange={handleEditChange} />
                        </div>
                        <div>
                            <label>Question Type:</label>
                            <input type="text" name="QuestionType" value={editQuestion.QuestionType} onChange={handleEditChange} />
                        </div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={closeEditModal}>Cancel</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default TestList;