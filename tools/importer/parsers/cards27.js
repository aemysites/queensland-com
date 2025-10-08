/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards27) block: extract multiple cards, each with image and text
  // Header row
  const headerRow = ['Cards (cards27)'];

  // Find all card instances
  const cardArticles = element.querySelectorAll('article.sc-fDXmWF');

  const rows = [];

  cardArticles.forEach((article) => {
    // --- IMAGE CELL ---
    let imageEl = null;
    const figure = article.querySelector('figure');
    if (figure) {
      imageEl = figure.querySelector('img');
    }

    // --- TEXT CELL ---
    // Compose a fragment with category label (top left), heart icon (top right), and title (heading, linked)
    const frag = document.createElement('div');
    frag.style.display = 'flex';
    frag.style.flexDirection = 'column';
    frag.style.position = 'relative';

    // Top row: label left, heart right
    const topRow = document.createElement('div');
    topRow.style.display = 'flex';
    topRow.style.justifyContent = 'space-between';
    topRow.style.alignItems = 'center';

    // Category label (e.g., LIST, NEWS, ITINERARY)
    const categorySpan = article.querySelector('.sc-hlnMnd p');
    if (categorySpan) {
      const cat = document.createElement('strong');
      cat.textContent = categorySpan.textContent.trim();
      topRow.appendChild(cat);
    }

    // Heart icon (bookmark/favorite)
    const heartIcon = article.querySelector('.heart-icon-unchecked img');
    if (heartIcon) {
      topRow.appendChild(heartIcon.cloneNode(true));
    }

    frag.appendChild(topRow);

    // Title (styled as heading, wrapped in link)
    const titleBox = article.querySelector('.sc-bsVkav p');
    const link = article.querySelector('a[href]');
    if (titleBox && link) {
      const heading = document.createElement('h3');
      heading.textContent = titleBox.textContent;
      const linkEl = document.createElement('a');
      linkEl.href = link.href;
      linkEl.appendChild(heading);
      frag.appendChild(linkEl);
    } else if (titleBox) {
      const heading = document.createElement('h3');
      heading.textContent = titleBox.textContent;
      frag.appendChild(heading);
    }

    // Compose the row: [image, text fragment]
    const row = [imageEl ? imageEl : '', frag];
    rows.push(row);
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
