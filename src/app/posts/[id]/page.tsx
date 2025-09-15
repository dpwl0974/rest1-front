"use client";

import { fetchApi } from "@/lib/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostCommentDto, PostDto } from "@/type/post";
import Link from "next/link";


export default function Home() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<PostDto | null>(null);
  const [postComments, setPostComments] = useState<PostCommentDto[] | null>(null); // 로딩 중을 나타내기 위해 null로 초기값

  useEffect(() => {
    fetchApi(`/api/v1/posts/${id}`).then(setPost);
    fetchApi(`/api/v1/posts/${id}/comments`).then(setPostComments);
  }, []);

  const deletePost = (id: number) => {
    fetchApi(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);
      router.replace("/posts"); // 삭제 시 목록으로 & 뒤로 가기 시 목록으로
    });
  };

  // null 이면 끊기고 아니면 return 
  if (post == null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>글 상세 보기</h1>

      <div>
        <div>번호 : {post.id}</div>  {/* null이 아닐때만 수행하므로 ? 없어도 됨 */}
        <div>제목 : {post.title}</div>
        <div>내용 : {post.content}</div>
      </div>

      <div className="flex gap-4"> {/* 위에서 null 처리 한 후 null 아닐때만 수행되도록 하여 ? 없앰 */}
        <Link className="border-2 p-2 rounded" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
        <button
          className="border-2 p-2 rounded"
          onClick={() => {
            deletePost(post.id);
          }}
        >
          삭제
        </button>
      </div>

      <h2 className="p-2">댓글 목록</h2>
      {postComments === null && <div>Loading...</div>}
      {postComments !== null && postComments.length === 0 && (
        <div>댓글이 없습니다.</div>
      )}
      {postComments !== null && postComments.length > 0 && (
        <ul>
          {postComments.map((postComment) => (
            <li key={postComment.id}>
              {postComment.id} : {postComment.content}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}