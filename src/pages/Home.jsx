import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function Home() {
    const [writtenDates, setWrittenDates] = useState([]); // ["2025-06-01", ...]
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    useEffect(() => {
        // TODO: 백엔드에서 글 쓴 날짜 불러오기
        setWrittenDates(["2025-06-01", "2025-06-03"]);
    }, []);

    const handlePrevMonth = () => {
        setCurrentMonth(currentMonth.subtract(1, "month"));
    };

    const handleNextMonth = () => {
        setCurrentMonth(currentMonth.add(1, "month"));
    };

    const renderCalendar = () => {
        const startOfMonth = currentMonth.startOf("month");
        // const endOfMonth = currentMonth.endOf("month");
        const startDay = startOfMonth.day(); // 요일 (0~6)
        const daysInMonth = currentMonth.daysInMonth();
        const today = dayjs().format("YYYY-MM-DD");

        const calendar = [];

        for (let i = 0; i < startDay; i++) {
            calendar.push(<div key={`empty-${i}`} className="calendar-cell" />);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = currentMonth.format("YYYY-MM") + `-${String(d).padStart(2, "0")}`;
            const hasPost = writtenDates.includes(dateStr);
            const isToday = dateStr === today;

            calendar.push(
                <div
                    key={d}
                    className="calendar-cell"
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        textAlign: "center",
                        backgroundColor: isToday ? "#ffeeba" : undefined,
                    }}
                >
                    {hasPost ? (
                        <Link to={`/post/${dateStr}`} style={{ color: "blue", fontWeight: "bold" }}>{d}</Link>
                    ) : (
                        <span>{d}</span>
                    )}
                </div>
            );
        }

        return calendar;
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>📅 세 단어 글쓰기 달력</h1>
            <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                <button onClick={handlePrevMonth}>&lt; 이전달</button>
                <span style={{ margin: "0 20px", fontWeight: "bold" }}>{currentMonth.format("YYYY년 MM월")}</span>
                <button onClick={handleNextMonth}>다음달 &gt;</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                {renderCalendar()}
            </div>
            <Link to="/write" style={{ marginTop: "20px", display: "inline-block", background: "green", color: "white", padding: "10px 20px", borderRadius: "5px" }}>
                ✍️ 오늘 글쓰기
            </Link>
        </div>
    );
}