/* global WebImporter */
export default function parse(element, { document }) {
  // Find all <article> elements representing cards
  const cardArticles = element.querySelectorAll('article');

  // Header row must match block name
  const headerRow = ['Cards (cards5)'];
  const rows = [headerRow];

  cardArticles.forEach((article) => {
    // --- IMAGE CELL ---
    // Find the main visible image inside the figure
    let imageEl = null;
    const figure = article.querySelector('figure');
    if (figure) {
      // Prefer <img> with a visible src, not hidden, fallback to any <img>
      imageEl = figure.querySelector('img[src]:not([hidden])') || figure.querySelector('img[src]') || figure.querySelector('img');
      // If the image is hidden but has data-src, create a new <img> with the data-src as src
      if (imageEl && imageEl.hasAttribute('hidden') && imageEl.getAttribute('data-src')) {
        const img = document.createElement('img');
        img.src = imageEl.getAttribute('data-src');
        if (imageEl.alt) img.alt = imageEl.alt;
        if (imageEl.title) img.title = imageEl.title;
        imageEl = img;
      }
    }

    // --- TEXT CELL ---
    const textCellContent = [];

    // Badge/label (HOW TO, GUIDE, LIST)
    const badgeP = article.querySelector('span[class*="sc-hlnMnd"] p');
    if (badgeP && badgeP.textContent.trim()) {
      const badge = document.createElement('span');
      badge.textContent = badgeP.textContent.trim();
      badge.style.display = 'inline-block';
      badge.style.background = '#1a4aff';
      badge.style.color = '#fff';
      badge.style.fontWeight = 'bold';
      badge.style.fontSize = '0.8em';
      badge.style.padding = '2px 8px';
      badge.style.borderRadius = '3px';
      badge.style.marginRight = '8px';
      badge.style.marginBottom = '4px';
      textCellContent.push(badge);
    }

    // Heart icon (bookmark/favorite button)
    const heartBtn = article.querySelector('button.heart-icon-unchecked');
    if (heartBtn) {
      // Clone the button to preserve the icon and aria-label
      textCellContent.push(heartBtn.cloneNode(true));
    }

    // Title (Japanese text)
    const titleP = article.querySelector('a > div:last-child p');
    if (titleP && titleP.textContent.trim()) {
      // Use a heading for the title
      const heading = document.createElement('h3');
      heading.textContent = titleP.textContent.trim();
      textCellContent.push(document.createElement('br'));
      textCellContent.push(heading);
    }

    // CTA: Use the link if present
    const link = article.querySelector('a');
    if (link && link.href) {
      textCellContent.push(document.createElement('br'));
      const cta = document.createElement('a');
      cta.href = link.href;
      cta.textContent = link.getAttribute('aria-label') || link.textContent.trim();
      textCellContent.push(cta);
    }

    // Compose the row: [image, text content]
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
