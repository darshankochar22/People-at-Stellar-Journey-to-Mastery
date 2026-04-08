async function loadBlogs() {
    const container = document.getElementById("blog-list");
    if (!container) return;

    const iconX = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.585-6.64 7.585H.47l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.292 19.49h2.04L6.486 3.24H4.298l13.31 17.404Z"/></svg>`;
    const iconGitHub = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.82 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.59-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.47-2.37 1.24-3.2-.13-.3-.54-1.52.12-3.18 0 0 1.02-.33 3.34 1.22a11.6 11.6 0 0 1 6.08 0c2.32-1.55 3.34-1.22 3.34-1.22.66 1.66.25 2.88.12 3.18.77.83 1.24 1.9 1.24 3.2 0 4.58-2.8 5.6-5.48 5.9.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z"/></svg>`;
    const iconLinkedIn = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.56V9H3.56v11.45Z"/></svg>`;

    function socialIconLink(href, label, svg) {
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${svg}</a>`;
    }

    function renderSocials(socials) {
        if (!socials) return "";
        const links = [];
        if (socials.twitter) links.push(socialIconLink(socials.twitter, "X profile", iconX));
        if (socials.linkedin) links.push(socialIconLink(socials.linkedin, "LinkedIn profile", iconLinkedIn));
        if (socials.github) links.push(socialIconLink(socials.github, "GitHub profile", iconGitHub));
        if (!links.length) return "";
        return `<div class="blog-socials">${links.join("")}</div>`;
    }

    try {
        const response = await fetch("vlogs/index.json");
        const data = await response.json();
        const posts = data.posts || [];

        container.innerHTML = posts.map((post) => `
            <article class="blog-entry">
                <div class="blog-entry-head">
                    <h2 class="blog-entry-title">
                        <a class="blog-link-title" href="blog.html?id=${encodeURIComponent(post.id)}">${post.title}</a>
                    </h2>
                    <span class="blog-entry-meta">${post.meta}</span>
                </div>
                <div class="blog-grid">
                    <img class="blog-photo" src="${post.photo}" alt="${post.candidate} profile photo">
                    <div class="blog-sections">
                        <p class="blog-intro">${post.intro}</p>
                        <div class="blog-points">
                            <p class="blog-line"><strong>Why:</strong> ${post.why}</p>
                            <p class="blog-line"><strong>Building:</strong> ${post.how}</p>
                            <p class="blog-line"><strong>Life:</strong> ${post.life}</p>
                        </div>
                        ${renderSocials(post.socials)}
                        <p class="blog-read-more">
                            <a href="blog.html?id=${encodeURIComponent(post.id)}">Read Full Story</a>
                        </p>
                    </div>
                </div>
            </article>
        `).join("");
    } catch (error) {
        container.innerHTML = "<p>Unable to load blogs right now.</p>";
    }
}

loadBlogs();
