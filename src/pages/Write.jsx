import { useEffect, useState } from 'react';
import client from '../api/client';

export default function Write() {
    const [dailyWords, setDailyWords] = useState([]);
    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // 오늘의 단어 불러오기
    useEffect(() => {
        client.get('words/today').json().then((res) => {
            setDailyWords(res);
        });
    }, []);

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h1>✍️ 오늘의 글쓰기</h1>

            <h3 style={{ marginTop: "20px" }}>오늘의 단어:</h3>
            <ul style={{ display: "flex", gap: "10px", listStyle: "none", padding: 0 }}>
                {dailyWords.map((word, idx) => (
                    <li
                        key={idx}
                        style={{
                            background: "#eee",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontWeight: "bold",
                        }}
                    >
                        {word}
                    </li>
                ))}
            </ul>

            <textarea
                placeholder="세 단어를 포함한 글을 작성해주세요."
                rows="10"
                style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "10px",
                    fontSize: "16px",
                    lineHeight: "1.5",
                }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <button
                onClick={() => {
                    client.post("validate", {
                        json: {
                            content: content,
                            date: new Date().toISOString().slice(0, 10),
                        },
                    }).json().then(res => {
                        if (res.valid) {
                            // 글 저장
                            client.post("posts", {
                                json: {
                                    content: content,
                                    date: new Date().toISOString().slice(0, 10),
                                },
                            }).json().then(() => {
                                setSubmitted(true);
                                setContent("");
                                alert("글이 저장되었습니다!");
                            });
                        } else {
                            alert("❌ 세 단어가 모두 포함되어야 합니다.");
                        }
                    });
                }}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                제출하기
            </button>

            {submitted && (
                <p style={{ color: "green", marginTop: "10px" }}>✅ 저장 완료!</p>
            )}
        </div>
    );
}