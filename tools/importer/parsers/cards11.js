/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards11) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Find the parent container for all cards (swiper-wrapper)
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  // Each card is a .swiper-slide
  const cardEls = swiperWrapper.querySelectorAll('.swiper-slide');

  cardEls.forEach(cardEl => {
    // Find the anchor (card link)
    const anchor = cardEl.querySelector('a[type="poster"]');
    if (!anchor) return;

    // Find the image (inside .sc-oclUV)
    const imgEl = anchor.querySelector('img');

    // Find the text overlay: category (p) and title (h5)
    const textContainer = anchor.querySelector('.sc-hLaujc');
    let textContent = [];

    if (textContainer) {
      // Category label (p)
      const category = textContainer.querySelector('p');
      if (category) {
        textContent.push(category.cloneNode(true));
      }
      // Title (h5)
      const title = textContainer.querySelector('h5');
      if (title) {
        textContent.push(title.cloneNode(true));
      }
    }

    // Optionally, wrap text content in a div for layout consistency
    let textCell;
    if (textContent.length) {
      textCell = document.createElement('div');
      textContent.forEach(el => textCell.appendChild(el));
    } else {
      textCell = document.createElement('div');
    }

    // Wrap image and text in a link if href exists
    let imageCell = imgEl;
    if (anchor.href) {
      const link = document.createElement('a');
      link.href = anchor.href;
      if (imgEl) link.appendChild(imgEl.cloneNode(true));
      imageCell = link;
    }

    // Add the card row: [image/link, text content]
    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
