/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards17) block parser
  // Find the swiper-wrapper which contains all cards
  const wrapper = element.querySelector('.swiper-wrapper');
  if (!wrapper) return;

  // Get all swiper-slide elements (each is a card)
  const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'));
  if (!slides.length) return;

  // Prepare rows: header first
  const rows = [ ['Cards (cards17)'] ];

  slides.forEach((slide) => {
    // Each slide contains an article with an anchor
    const article = slide.querySelector('article');
    if (!article) return;
    const anchor = article.querySelector('a');
    if (!anchor) return;

    // Image extraction (first cell)
    const img = anchor.querySelector('img');
    // Defensive: only add if present
    const imageCell = img ? img : '';

    // Text content extraction (second cell)
    // Title
    const title = anchor.querySelector('.sc-bnouOt');
    // Date
    const date = anchor.querySelector('.sc-iKmDcA');
    // Compose text cell
    const textCell = document.createElement('div');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      textCell.appendChild(h3);
    }
    if (date) {
      const p = document.createElement('p');
      p.textContent = date.textContent;
      textCell.appendChild(p);
    }
    // Optionally, add link wrapping (not shown in screenshot, so skip)

    rows.push([imageCell, textCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
