# bskoon.github.io

마크다운 기반 GitHub Pages 블로그입니다.

## 구조

- `index.html`: 소개 + 로그 목록 페이지
- `post.html`: 마크다운 글 1개를 HTML 페이지로 렌더링
- `write.html`: 로컬 마크다운 작성 + 다운로드
- `posts/posts.json`: 홈에서 사용하는 글 메타데이터 목록
- `posts/*.md`: 실제 블로그 글 파일

## 새 글 추가 방법

1. `posts/`에 마크다운 파일 추가 (예: `posts/my-second-log.md`)
2. `posts/posts.json`에 항목 추가:

```json
{
  "title": "두 번째 로그",
  "date": "2026-02-14",
  "summary": "오늘 배운 내용 정리",
  "file": "posts/my-second-log.md"
}
```

3. `main` 브랜치에 푸시하면 GitHub Pages에 반영됩니다.

## 참고

- 글 페이지는 브라우저에서 `marked` + `DOMPurify`로 렌더링됩니다.
- 홈 목록은 `date` 기준 최신순으로 정렬됩니다.
