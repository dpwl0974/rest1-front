"use client"; // 클라이언트 사이드 렌더링 - 만들 때마다 생성
import { fetchApi } from "@/lib/client";

export default function Home() {
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

        fetchApi(`/api/v1/posts`, {
            method: "POST",
            body: JSON.stringify({
                title: titleInput.value,
                content: contentText.value,
            }),
        }).then((data) => {
            alert(data.msg);
        });
    };

    return (
        <>
            <h1 className="text-center">새 글 작성</h1>
            <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="제목" />
                <textarea name="content" placeholder="내용" />
                <button type="submit">저장</button>
            </form>
        </>
    );
}