import { Link } from 'react-router-dom';
import ExamItem from '../components/ExamItem'
import { useEffect, useState } from 'react';
// Đây là giao diện bên trong màn, cần tạo component layout để cho nội dung vào trong
export default function Exams() {
    const [exams, setExams] = useState([])
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        let response = await fetch('http://blockchain.test/api/api/tests');
        let data = await response.json();
        const examData = data.tests.map(x => {
            return {
                ...x,
                title: x.TestName,
                timeMinute: "40",
                commentsQuantity: 435126,
                partsQuantity: 4,
                questionsQuantity: 40,
                NumberTurnDone: 1234,
                hashtag: ['#IELTS Academic', 'Listening']
            }
        })
        setExams(examData);
    }
    return (
        <div className='px-[150px] '>
            <h1 className='text-center text-[30px] uppercase mt-[24px] '>Danh sách đề thi</h1>
            <div id="exams-grid" className='grid grid-cols-4 gap-4 mt-[24px]'>
                {
                    exams.map((exam, index) => {
                        return (
                            <Link to={`/exam/detail/${exam.id}`} key={index}>
                                <ExamItem data={exam} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}
