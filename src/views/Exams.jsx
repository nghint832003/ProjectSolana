// views/Exams.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ExamItem from '../components/ExamItem';


// Đây là giao diện bên trong màn, cần tạo component layout để cho nội dung vào trong
export default function Exams() {
const [exams, setExams] = useState([]);
useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tests')
        .then(response => {
            setExams(response.data.tests || []);
        })
        .catch(error => {
            console.error('There was an error fetching the exams!', error);
        });
}, []);
return (
    <div className='px-[360px]'>
            <h1 className='text-center text-[30px] uppercase mt-[24px]'>Danh sách đề thi</h1>
            <div id="exams-grid" className='grid grid-cols-4 gap-4 mt-[24px]'>
                {
                    exams.map(exam => (
                        <ExamItem key={exam.id} data={exam} />
                    ))
                }
            </div>
        </div>
        );
    }