"use client";

import { fetchApi } from "@/lib/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostDto } from "@/type/post";

export default function Home() {
  const { id } = useParams();
  const [post, setPost] = useState<PostDto | null>(null);

  useEffect(() => {
    fetchApi(`/api/v1/posts/${id}`).then(setPost);
  }, []);

  return (
    <>
      <h1>글 상세 보기</h1>

      {post === null && <div>Loading...</div>}

      {post !== null && (
        <div>
          <div>번호 : {post.id}</div>
          <div>제목 : {post.title}</div>
          <div>내용 : {post.content}</div>
        </div>
      )}
    </>
  );
}