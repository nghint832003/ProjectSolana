import React, { useState } from 'react';

const SaveTestResults = ({ publicKey }) => {
    const [userTestID, setUserTestID] = useState('');
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const saveResults = async () => {
        try {
            const testData = {
                UserTestID: userTestID,
                TotalQuestions: totalQuestions,
                CorrectAnswers: correctAnswers,
                Score: score,
                feedback: feedback,
                public_key: publicKey
            };

            const resultRequestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testData)
            };

            const resultResponse = await fetch('http://localhost/api/results', resultRequestOptions);
            const resultData = await resultResponse.json();
            console.log('Test result saved:', resultData);

        } catch (error) {
            console.error('Error saving test results: ', error);
        }
    };

    return (
        <div>
            <input type="text" value={userTestID} onChange={(e) => setUserTestID(e.target.value)} placeholder="User Test ID" />
            <input type="number" value={totalQuestions} onChange={(e) => setTotalQuestions(parseInt(e.target.value, 10))} placeholder="Total Questions" />
            <input type="number" value={correctAnswers} onChange={(e) => setCorrectAnswers(parseInt(e.target.value, 10))} placeholder="Correct Answers" />
            <input type="number" value={score} onChange={(e) => setScore(parseInt(e.target.value, 10))} placeholder="Score" />
            <input type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Feedback" />
            <button onClick={saveResults}>Save Results</button>
        </div>
    );
};

export default SaveTestResults;
