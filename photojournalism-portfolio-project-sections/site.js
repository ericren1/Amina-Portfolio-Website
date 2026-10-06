/* One-page photography portfolio. Edit content.js to change photographs and links. */
const d = window.PORTFOLIO;
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const page = document.body.dataset.page;
const email = /^\S+@\S+\.\S+$/.test(d.email) ? d.email : '';
const emailLink = email ? `<a href="mailto:${esc(email)}" aria-label="Email ${esc(email)}">Email</a>` : '';
const instagramLink = d.instagram && d.instagram !== 'https://instagram.com/' ? `<a href="${esc(d.instagram)}" target="_blank" rel="noopener noreferrer">Instagram</a>` : '';
const nav = `<a href="index.html#work"${page === 'index' ? ' aria-current="page"' : ''}>Photos</a><a href="about.html"${page === 'about' ? ' aria-current="page"' : ''}>About</a>${emailLink}${instagramLink}`;
const brand = `<span class="brand-name">${esc(d.shortName)}</span>`;
document.getElementById('header').innerHTML = `<header class="site-header"><div class="container header-inner"><a class="brand" href="index.html" aria-label="Home">${brand}</a><nav class="nav" aria-label="Main navigation">${nav}</nav><button type="button" class="menu-toggle" aria-controls="mobile-nav" aria-expanded="false">MENU ☰</button></div><nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">${nav}</nav></header>`;
document.getElementById('footer').innerHTML = `<footer class="footer"><div class="container footer-inner"><div><a class="brand" href="index.html">${brand}</a><div class="footer-note">© ${new Date().getFullYear()} ${esc(d.name)} · Photography</div></div><div class="footer-links">${emailLink}${instagramLink}<a href="index.html#top">Back to top ↑</a></div></div></footer>`;
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
toggle.addEventListener('click', () => { const open = mobileNav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? 'CLOSE ×' : 'MENU ☰'; });
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobileNav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'MENU ☰'; }));
if (page === 'index') {
  document.title = `${d.name} — Photography`;
  document.getElementById('hero-title').textContent = 'Photography / Graphic Design';
  document.getElementById('hero-location').textContent = d.location;
  const total = d.stories.reduce((sum, story) => sum + story.photos.length, 0);
  document.getElementById('photo-count').textContent = `${d.stories.length} projects · ${total} photographs`;
  document.getElementById('portfolio-projects').innerHTML = d.stories.map((story, projectIndex) => `
    <article class="project-card">
      <a class="project-card-link" href="project.html?project=${encodeURIComponent(story.slug)}" aria-label="View ${esc(story.title)} project">
        <div class="project-card-cover">
          <img src="${esc(story.cover)}" alt="${esc(story.title)}" ${projectIndex === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
        </div>
        <div class="project-card-copy">
          <p class="eyebrow">${esc(story.category)}${story.year ? ' · ' + esc(story.year) : ''}</p>
          <h3>${esc(story.title)}</h3>
        </div>
      </a>
    </article>`).join('');
}

if (page === 'about') {
  document.title = `About — ${d.name}`;
  document.getElementById('about-title').textContent = d.name;
  document.getElementById('about-description').textContent = d.introduction;
}

if (page === 'project') {
  const slug = new URLSearchParams(window.location.search).get('project');
  const story = d.stories.find(item => item.slug === slug);
  const detail = document.getElementById('project-detail');

  if (!story) {
    document.title = `Project not found — ${d.name}`;
    detail.innerHTML = `<section class="project-not-found"><p class="eyebrow">Project unavailable</p><h1>This project could not be found.</h1><a class="text-link" href="index.html#work">Back to all projects <span aria-hidden="true">→</span></a></section>`;
  } else {
    document.title = `${story.title} — ${d.name}`;
    const photoCount = story.photos.length;
    const intro = story.intro ? story.intro.trim().split(/\n\s*\n/).map(paragraph => {
      const text = story.collaborator
        ? paragraph.split(story.collaborator.name).map(esc).join(`<a href="${esc(story.collaborator.url)}" target="_blank" rel="noopener noreferrer">${esc(story.collaborator.name)}</a>`)
        : esc(paragraph);
      return `<p>${text}</p>`;
    }).join('') : '';
    const introTile = `
      <header class="project-mosaic-intro">
        <p class="eyebrow">${esc(story.category)}${story.year ? ' · ' + esc(story.year) : ''}</p>
        <h1>${esc(story.title)}</h1>
        <p class="project-detail-meta">${esc(story.location)} · ${photoCount} ${photoCount === 1 ? 'photograph' : 'photographs'}</p>
        ${intro ? `<div class="project-detail-writeup">${intro}</div>` : ''}
      </header>`;
    const photos = story.photos.map((photo, photoIndex) => `
        <div class="project-photo-column">
          <figure class="project-photo">
            <img src="${esc(photo.src)}" alt="${esc(photo.alt || story.title)}" loading="${photoIndex === 0 ? 'eager' : 'lazy'}">
            <figcaption>
              <span>${String(photoIndex + 1).padStart(2, '0')} / ${String(photoCount).padStart(2, '0')}</span>
              ${photo.caption ? `<span>${esc(photo.caption)}</span>` : ''}
            </figcaption>
          </figure>
        </div>`).join('');

    detail.innerHTML = `
      <div class="container">
        <a class="project-back-link" href="index.html#work">← All projects</a>
        <section class="project-mosaic" aria-label="${esc(story.title)} project">
          ${introTile}
          ${photos}
        </section>
        <a class="project-back-link project-back-link--bottom" href="index.html#work">← Back to all projects</a>
      </div>`;
  }
}
