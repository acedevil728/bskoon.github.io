async function loadPosts() {
  const listNode = document.getElementById("post-list");

  try {
    const response = await fetch("./posts/posts.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Cannot load posts list: ${response.status}`);
    }

    const posts = await response.json();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (!posts.length) {
      listNode.innerHTML = '<article class="card post-item">아직 작성된 로그가 없습니다.</article>';
      return;
    }

    listNode.innerHTML = posts
      .map(
        (post) => `
          <article class="card post-item">
            <a href="./post.html?file=${encodeURIComponent(post.file)}">${post.title}</a>
            <p class="post-meta">${new Date(post.date).toLocaleDateString("ko-KR")} · ${post.summary}</p>
          </article>
        `,
      )
      .join("");
  } catch (error) {
    listNode.innerHTML = `<article class="card post-item">글 목록을 불러오지 못했습니다. ${error.message}</article>`;
  }
}

loadPosts();
