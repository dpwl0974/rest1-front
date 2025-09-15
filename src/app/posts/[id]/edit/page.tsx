"use client";

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const { id } = useParams();
    const router = useRouter();

    const [post, setPost] = useState<PostDto | null>(null);

    useEffect(() => {
        fetchApi(`/api/v1/posts/${id}`).then(setPost);
    }, []);


    const handleSubmit = (e: any) => {
        e.preventDefault();

        const form = e.target;

        const titleInput = form.title;
        const contentText = form.content;

        if (titleInput.value.length === 0) {
            alert("제목을 입력해주세요.");
            titleInput.focus();
        }

        if (contentText.value.length === 0) {
            alert("내용을 입력해주세요.");
            contentText.focus();
        }

        fetchApi(`/api/v1/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: titleInput.value,
                content: contentText.value,
            }),
        }).then((data) => {
            alert(data.msg);
            // push 사용 -> 작업했던 것 히스토리 남김
            // replace 사용 -> 히스토리 안남김 뒤로가기 시 바로 목록으로
            router.replace(`/posts/${id}`);
        });
    };

    return (
        <>
            <h1 className="text-center">글 수정</h1>
            <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
                <input
                    className="border border-gray-300 rounded p-2"
                    type="text"
                    name="title"
                    placeholder="제목"
                />
                <textarea
                    className="border border-gray-300 rounded p-2"
                    name="content"
                    placeholder="내용"
                />
                <button className="bg-blue-500 text-white p-2 rounded" type="submit">
                    저장
                </button>
            </form>
        </>
    );
}