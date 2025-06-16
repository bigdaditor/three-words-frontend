

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";

export default function Post() {
  const { id } = useParams(); // 날짜 형식: "2025-06-03"
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get(`posts/${id}`).json().then((res) => {
      setPost(res);
      setLoading(false);
    }).catch(() => {
      setPost(null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p style={{ padding: "20px" }}>불러오는 중...</p>;

  if (!post) return <p style={{ padding: "20px" }}>글이 없습니다.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>{id}의 글</h1>
      <div style={{ whiteSpace: "pre-wrap", marginTop: "20px", fontSize: "16px", lineHeight: "1.6" }}>
        {post.content}
      </div>
    </div>
  );
}