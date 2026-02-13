function getPostFileFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");

  if (!file) return null;
  if (!/^[-a-zA-Z0-9_./]+\.md$/.test(file)) return null;
  if (file.includes("..")) return null;

  return file;
}

async function renderPost() {
  const root = document.getElementById("post-content");
  const file = getPostFileFromQuery();

  if (!file) {
    root.textContent = "잘못된 글 경로입니다.";
    return;
  }

  try {
    const response = await fetch(`./${file}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`마크다운 파일을 불러올 수 없습니다: ${response.status}`);
    }

    const markdown = await response.text();
    const html = marked.parse(markdown, {
      mangle: false,
      headerIds: false,
    });

    root.innerHTML = DOMPurify.sanitize(html);
  } catch (error) {
    root.textContent = `글을 렌더링하지 못했습니다. ${error.message}`;
  }
}

renderPost();
