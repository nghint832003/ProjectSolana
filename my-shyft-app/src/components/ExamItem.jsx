//components/ExamItem.jsx
import Button from "@mui/material/Button";

export default function ExamItem({ data }) {
    return (
        <div className="rounded-[12px] border border-1 border-black-800 bg-[#efefef] p-[16px]">
            <h3 className="text-[16px] font-bold">{data.title}</h3>
            <div className="info-exam flex items-center gap-x-4 mt-2 text-gray-600 font-medium">
                <div className="pr-3" style={{ borderRight: '1px solid gray' }}> <i class="fa-solid fa-clock"></i> 40 phút</div>
                <div className="pr-3" style={{ borderRight: '1px solid gray' }}><i class="fa-solid fa-pen-to-square"></i> 1234</div>
                <div><i class="fa-solid fa-comment"></i> 1234</div>
            </div>
            <div className="structure flex items-center gap-x-4 my-2 text-gray-600 font-medium">
                <div className="pr-3" style={{ borderRight: '1px solid gray' }}>4 phần thi</div>
                <div>40 câu hỏi</div>
            </div>
            <div className="tag flex items-center">
                <span className="rounded-[6px] py-1 px-2 bg-blue-100 text-blue-900 font-medium text-[13px]">#IELTS academic</span>
            </div>
            <Button variant="outlined" className="w-[100%] !mt-[24px]">Thoát</Button>

        </div>
    );
}
