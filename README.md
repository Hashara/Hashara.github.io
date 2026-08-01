# hashara.github.io

Personal academic site for Hashara Kumarasinghe — PhD candidate, School of Computing, ANU.

## Structure

    index.html              the entire site (one page, project details in <dialog>)
    assets/css/styles.css   all styling — CSS custom properties, no build step
    assets/js/site.js       ~150 lines, no dependencies
    assets/fonts/           self-hosted latin-subset variable fonts
    assets/cv/              CV PDF
    images/                 WebP images
    *.html (8 stubs)        redirects from the old per-project URLs to #p-* anchors

## Preview locally

    python3 -m http.server 8000     # then open http://localhost:8000
    # or
    npm install && npm start

## Deploying

Pushing to `master` deploys — GitHub Pages serves this repo's root. There is no
build step; edit the HTML and CSS directly.

## Editing notes

- Colours, type scale and spacing live in the `:root` block at the top of
  `styles.css`. Dark mode values are in the `prefers-color-scheme` block below it.
- To add a project: copy an `<li class="project">` in `index.html` and its
  matching `<dialog class="detail">`, keeping the `data-dialog` and `id` in sync.
  The `#p-<name>` hash deep-links to the dialog.
- Images are WebP sized for display. Regenerate with
  `cwebp -q 82 -resize <width> 0 source.png -o images/name.webp`.
