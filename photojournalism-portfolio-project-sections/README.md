# One-page photography portfolio

This is the simplified version: all portfolio photographs are on `index.html`. The top navigation contains Photos, Writing, About, Email and Instagram. Writing is the only optional separate page. No build step, backend, npm or React required.

## Preview
Open this folder in VS Code, right-click `index.html` > Open with Live Server. Save changes with Ctrl+S to refresh the page.

## Replace sample content before publishing
- In `content.js`, edit `name`, `shortName`, `email`, `instagram`, `location`, `introduction` and `about`.
- All homepage photographs are taken from each `photos` array in `stories` in `content.js`. Each photo needs `src`, `caption` and (recommended) a descriptive `alt` field if you customize `site.js` to use it. To add a photo, copy an existing `{src:'...',caption:'...'}` entry into a story's `photos` array; to remove one, delete its entry. You may rename the sample story titles, or put every photo into just one story.
- Save original photographs in `assets/images/` and point each `src` to the new JPG or WebP path. Illustrative SVGs are placeholders, not real photojournalism. Replace all example reporting/captions and sample writing links before sharing professionally.
- `editorial-theme.css` controls the muted accent color. `one-page.css` controls the homepage gallery layout. On screens narrower than 700px the gallery uses one column.
- To remove the optional Writing page and link, remove `<a href="writing.html"...>` from the `nav` string in `site.js` and delete `writing.html` if you wish.

## Publish
Commit and push this folder to GitHub, then connect it to Cloudflare Pages. Choose no framework, `main` branch, `exit 0` build command (or blank if supported), and `.` build output directory. `index.html` must be at the repository root.


## Project sections on the homepage

The homepage now shows each entry in `stories` as its own section, with the project title, description, and only that project's photographs underneath. Edit `content.js` to rename, reorder, add or remove projects. Each project's `photos` array controls the images in its section; three or four photos per project work well. The page automatically updates each project's photo count. Contact/social links remain in the top navigation.
