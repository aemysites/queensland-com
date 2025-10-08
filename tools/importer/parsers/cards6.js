/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards6) block parsing
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  // Find the parent container holding all card items
  const cardList = element.querySelector('[id^="category-image-button-list"]');
  if (!cardList) return;

  // Each card is a child: div.sc-gXmSlM
  const cardItems = cardList.querySelectorAll('.sc-gXmSlM');

  cardItems.forEach(card => {
    // Find the anchor for the card
    const link = card.querySelector('a');
    if (!link) return;

    // --- Image/Icon cell ---
    // There are two images per card: main image and icon image
    const figures = link.querySelectorAll('figure.sc-kgUAyh');
    let mainImg = null, iconImg = null;
    if (figures[0]) {
      mainImg = figures[0].querySelector('img');
    }
    if (figures[1]) {
      iconImg = figures[1].querySelector('img');
    }
    // Compose image cell
    const imageCell = [];
    if (mainImg) imageCell.push(mainImg);
    if (iconImg) imageCell.push(iconImg);

    // --- Text cell ---
    // Title: h3 inside link
    const title = link.querySelector('h3');
    // Compose text cell
    // Wrap title in anchor to preserve link
    let textCell;
    if (title) {
      const a = document.createElement('a');
      a.href = link.href;
      a.appendChild(title.cloneNode(true));
      textCell = a;
    } else {
      textCell = '';
    }

    rows.push([
      imageCell.length === 1 ? imageCell[0] : imageCell,
      textCell
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
