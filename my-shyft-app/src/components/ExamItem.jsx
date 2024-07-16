// components/ExamItem.jsx
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";

export default function ExamItem({ data }) {
    const navigate = useNavigate();

    const handleStartExam = () => {
        navigate(`/exam/detail/${data.id}`);
    };

    return (
        <div className="rounded-[12px] border border-1 border-black-800 bg-[#efefef] p-[16px]">
            <h3 className="text-[16px] font-bold">{data.TestName}</h3>
            <div className="info-exam flex items-center gap-x-4 mt-2 text-gray-600 font-medium">
                <div className="pr-3" style={{ borderRight: '1px solid gray' }}>
                    <i className="fa-solid fa-clock"></i> 20 phút
                </div>
                <div>40 câu hỏi</div>
            </div>
            <div className="tag flex items-center">
                <span className="rounded-[6px] py-1 px-2 bg-blue-100 text-blue-900 font-medium text-[13px]">#TOEIC Test</span>
            </div>
            <Button variant="outlined" className="w-[100%] !mt-[24px]" onClick={handleStartExam}>Làm bài</Button>
        </div>
    );
}
