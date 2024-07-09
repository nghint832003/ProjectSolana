import { Link } from 'react-router-dom';
import ExamItem from '../components/ExamItem'
// Đây là giao diện bên trong màn, cần tạo component layout để cho nội dung vào trong
export default function Exams() {
    const exams = [
        {
            title: "IELTS Simulation Listening test 1",
            timeMinute: "40",
            commentsQuantity: 435126,
            partsQuantity: 4,
            questionsQuantity: 40,
            NumberTurnDone: 1234,
            hashtag: ['#IELTS Academic', 'Listening']
        },
        {
            title: "IELTS Simulation Listening test 1",
            timeMinute: "40",
            commentsQuantity: 435126,
            partsQuantity: 4,
            questionsQuantity: 40,
            NumberTurnDone: 1234,
            hashtag: ['#IELTS Academic', 'Listening']
        },
        {
            title: "IELTS Simulation Listening test 1",
            timeMinute: "40",
            commentsQuantity: 435126,
            partsQuantity: 4,
            questionsQuantity: 40,
            NumberTurnDone: 1234,
            hashtag: ['#IELTS Academic', 'Listening']
        },
        {
            title: "IELTS Simulation Listening test 1",
            timeMinute: "40",
            commentsQuantity: 435126,
            partsQuantity: 4,
            questionsQuantity: 40,
            NumberTurnDone: 1234,
            hashtag: ['#IELTS Academic', 'Listening']
        },

        {
            title: "IELTS Simulation Listening test 1",
            timeMinute: "40",
            commentsQuantity: 435126,
            partsQuantity: 4,
            questionsQuantity: 40,
            NumberTurnDone: 1234,
            hashtag: ['#IELTS Academic', 'Listening']
        },
        {
            title: "IELTS Simulation Listening test 1",
            timeMinute: "40",
            commentsQuantity: 435126,
            partsQuantity: 4,
            questionsQuantity: 40,
            NumberTurnDone: 1234,
            hashtag: ['#IELTS Academic', 'Listening']
        },
        {
            title: "IELTS Simulation Listening test 1",
            timeMinute: "40",
            commentsQuantity: 435126,
            partsQuantity: 4,
            questionsQuantity: 40,
            NumberTurnDone: 1234,
            hashtag: ['#IELTS Academic', 'Listening']
        },

        {
            title: "IELTS Simulation Listening test 1",
            timeMinute: "40",
            commentsQuantity: 435126,
            partsQuantity: 4,
            questionsQuantity: 40,
            NumberTurnDone: 1234,
            hashtag: ['#IELTS Academic', 'Listening']
        },
        {
            title: "IELTS Simulation Listening test 1",
            timeMinute: "40",
            commentsQuantity: 435126,
            partsQuantity: 4,
            questionsQuantity: 40,
            NumberTurnDone: 1234,
            hashtag: ['#IELTS Academic', 'Listening']
        },
    ]
    return (
        <div className='px-[360px] '>
            <h1 className='text-center text-[30px] uppercase mt-[24px] '>Danh sách đề thi</h1>
            <div id="exams-grid" className='grid grid-cols-4 gap-4 mt-[24px]'>
                {
                    exams.map(exam => {
                        return (
                            <Link to={'/exam/detail'}>
                                <ExamItem data={exam} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}
