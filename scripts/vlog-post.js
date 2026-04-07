function getBlogId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

async function loadBlogPost() {
    const container = document.getElementById("blog-post");
    const id = getBlogId();

    if (!container) return;
    if (!id) {
        container.innerHTML = "<h1>Blog not found</h1><p>No blog id was provided.</p>";
        return;
    }

    try {
        const response = await fetch(`vlogs/${encodeURIComponent(id)}.json`);
        if (!response.ok) throw new Error("Not found");
        const post = await response.json();

        document.title = `${post.title} | Stellar Journey Blog`;

        const paragraphs = (post.paragraphs || [])
            .map((p) => `<p>${escapeHtml(p)}</p>`)
            .join("");

        container.innerHTML = `
            <h1>${escapeHtml(post.title)}</h1>
            <p class="blog-post-meta">${escapeHtml(post.meta)}</p>
            <img class="blog-post-image" src="${escapeHtml(post.photo)}" alt="${escapeHtml(post.candidate)} profile">
            ${paragraphs}
            <div class="blog-socials">
                <a href="${escapeHtml(post.socials.twitter)}" target="_blank" rel="noopener noreferrer">X / Twitter</a>
                <a href="${escapeHtml(post.socials.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="${escapeHtml(post.socials.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <p class="blog-read-more"><a href="vlogs.html">Back to blogs</a></p>
        `;
    } catch (error) {
        container.innerHTML = "<h1>Blog not found</h1><p>This post is unavailable.</p>";
    }
}

loadBlogPost();
