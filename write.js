const titleInput = document.getElementById("title");
const markdownInput = document.getElementById("markdown");
const previewNode = document.getElementById("preview");
const downloadBtn = document.getElementById("download");

function renderPreview() {
  const markdown = markdownInput.value || "";
  const html = marked.parse(markdown, {
    mangle: false,
    headerIds: false,
  });

  previewNode.innerHTML = DOMPurify.sanitize(html) || "<p>(미리보기가 여기에 표시됩니다)</p>";
}

function downloadMarkdown() {
  const rawName = titleInput.value.trim();
  const safeName = rawName.endsWith(".md") ? rawName : `${rawName || "new-post"}.md`;
  const blob = new Blob([markdownInput.value], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = safeName.replace(/[^-a-zA-Z0-9_.]/g, "-");
  link.click();

  URL.revokeObjectURL(url);
}

markdownInput.addEventListener("input", renderPreview);
downloadBtn.addEventListener("click", downloadMarkdown);

renderPreview();
