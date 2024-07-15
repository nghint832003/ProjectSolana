import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        axios.get('http://127.0.0.1:8000/api/tests')
            .then(response => {
                console.log(response.data);
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
        axios.get(`http://127.0.0.1:8000/api/testQuestion/${testId}`)
            .then(response => {
                console.log(response.data);
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

    const handleDeleteQuestion = (questionId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này không?')) {
            axios.delete(`http://127.0.0.1:8000/api/deleteQuestion/${questionId}`)
                .then(response => {
                    setQuestions(questions.filter(q => q.id !== questionId));
                })
                .catch(error => {
                    setError(error);
                });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Danh sách bài kiểm tra</h1>
            <ul className="list-group">
                {tests.map(test => (
                    <li key={test.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {test.TestName}
                        <button className="btn btn-primary" onClick={() => fetchQuestions(test.id, test.TestName)}>Xem câu hỏi</button>
                    </li>
                ))}
            </ul>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Danh sách câu hỏi"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Các câu hỏi cho bài kiểm tra {selectedTestName}</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped">
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
                                            <td>
                                                <button className="btn btn-secondary mr-2" onClick={() => openEditModal(question)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                        </div>
                    </div>
                </div>
            </Modal>

            {editQuestion && (
                <Modal
                    isOpen={editModalIsOpen}
                    onRequestClose={closeEditModal}
                    contentLabel="Chỉnh sửa câu hỏi"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chỉnh sửa câu hỏi</h5>
                                <button type="button" className="close" onClick={closeEditModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="form-group">
                                        <label>Question Text:</label>
                                        <input type="text" className="form-control" name="QuestionText" value={editQuestion.QuestionText} onChange={handleEditChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Option A:</label>
                                        <input type="text" className="form-control" name="OptionA" value={editQuestion.OptionA} onChange={handleEditChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Option B:</label>
                                        <input type="text" className="form-control" name="OptionB" value={editQuestion.OptionB} onChange={handleEditChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Option C:</label>
                                        <input type="text" className="form-control" name="OptionC" value={editQuestion.OptionC} onChange={handleEditChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Option D:</label>
                                        <input type="text" className="form-control" name="OptionD" value={editQuestion.OptionD} onChange={handleEditChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Correct Option:</label>
                                        <input type="text" className="form-control" name="CorrectOption" value={editQuestion.CorrectOption} onChange={handleEditChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Question Type:</label>
                                        <input type="text" className="form-control" name="QuestionType" value={editQuestion.QuestionType} onChange={handleEditChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                    <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TestList;
