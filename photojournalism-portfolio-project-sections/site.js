/* One-page photography portfolio. Edit content.js to change photographs and links. */
const d = window.PORTFOLIO;
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const page = document.body.dataset.page;
const email = /^\S+@\S+\.\S+$/.test(d.email) ? d.email : '';
const emailLink = email ? `<a href="mailto:${esc(email)}">Email ↗</a>` : '';
const instagramLink = d.instagram && d.instagram !== 'https://instagram.com/' ? `<a href="${esc(d.instagram)}" target="_blank" rel="noopener noreferrer">Instagram ↗</a>` : '';
const nav = `<a href="index.html#work">Photos</a><a href="writing.html" ${page === 'writing' ? 'aria-current="page"' : ''}>Writing</a><a href="index.html#about">About</a>${emailLink}${instagramLink}`;
document.getElementById('header').innerHTML = `<header class="site-header"><div class="container header-inner"><a class="brand" href="index.html" aria-label="Home">${esc(d.shortName)} <span>/ PHOTOGRAPHY</span></a><nav class="nav" aria-label="Main navigation">${nav}</nav><button type="button" class="menu-toggle" aria-controls="mobile-nav" aria-expanded="false">MENU ☰</button></div><nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">${nav}</nav></header>`;
document.getElementById('footer').innerHTML = `<footer class="footer"><div class="container footer-inner"><div><a class="brand" href="index.html">${esc(d.shortName)} <span>/ PHOTOGRAPHY</span></a><div class="footer-note">© ${new Date().getFullYear()} ${esc(d.name)} · Photography & reporting</div></div><div class="footer-links">${emailLink}${instagramLink}<a href="index.html#top">Back to top ↑</a></div></div></footer>`;
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
toggle.addEventListener('click', () => { const open = mobileNav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? 'CLOSE ×' : 'MENU ☰'; });
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobileNav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'MENU ☰'; }));
if (page === 'index') {
  document.title = `${d.name} — Photography`;
  document.getElementById('hero-title').textContent = d.name === 'YOUR NAME' ? 'Portfolio' : d.name + '. Portfolio';
  document.getElementById('hero-description').textContent = d.introduction;
  document.getElementById('hero-location').textContent = d.location;
  const total = d.stories.reduce((sum, story) => sum + story.photos.length, 0);
  document.getElementById('photo-count').textContent = `${d.stories.length} projects · ${total} photographs`;
  document.getElementById('portfolio-projects').innerHTML = d.stories.map((story, projectIndex) => {
    const photoCount = story.photos.length;

    const images = story.photos.map((photo, photoIndex) => `
  <div class="project-photo-column">

    <figure class="project-photo">
      <img
        src="${esc(photo.src)}"
        alt="${esc(photo.alt || story.title)}"
        loading="${projectIndex === 0 && photoIndex < 2 ? 'eager' : 'lazy'}"
      >

      <figcaption>
        <span>${String(photoIndex + 1).padStart(2, '0')} / ${String(photoCount).padStart(2, '0')}</span>
        <span>${esc(photo.caption)}</span>
      </figcaption>
    </figure>

    
${photoIndex === 0 && story.slug === 'a-sailing-soul' ? `
  <div class="project-writeup">
    ${story.intro
          .trim()
          .split(/\n\s*\n/)
          .map(paragraph => `<p>${esc(paragraph)}</p>`)
          .join('')}
  </div>
` : ''}

  </div>
`).join('');
    return `<section class="portfolio-project" id="${esc(story.slug)}" aria-labelledby="project-heading-${projectIndex}">
      <div class="project-heading">
        <div class="project-number">PROJECT ${String(projectIndex + 1).padStart(2, '0')}</div>
        <div class="project-copy">
          <p class="eyebrow">${esc(story.category)}${story.year ? ' · ' + esc(story.year) : ''}</p>
          <h3 id="project-heading-${projectIndex}">${esc(story.title)}</h3>
          <p class="project-dek">${esc(story.dek)}</p>
        </div>
        <span class="project-photo-count">${photoCount} photographs</span>
      </div>
      <div class="project-gallery">${images}</div>
    </section>`;
  }).join('');
}
if (page === 'writing') {
  document.getElementById('article-list').innerHTML = d.writing.map(a => `<article class="article-row"><div class="article-date">${esc(a.date)}</div><div><p class="eyebrow">${esc(a.type)}</p><h2>${a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${esc(a.title)}</a>` : esc(a.title)}</h2><p>${esc(a.summary)}</p>${a.url ? '' : '<p class="sample-writing">Sample entry — no publication link yet</p>'}</div><span class="article-arrow" aria-hidden="true">${a.url ? '↗' : '—'}</span></article>`).join('');
}
