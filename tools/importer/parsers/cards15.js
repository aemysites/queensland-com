/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards15) block: 2 columns, multiple rows
  // Header row
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  // Find the parent container for all cards
  // The repeating card structure is: div.sc-gXmSlM.gRMUEd
  const cardContainers = element.querySelectorAll('.sc-gXmSlM.gRMUEd');

  cardContainers.forEach(card => {
    // Each card contains an anchor (the clickable card)
    const cardLink = card.querySelector('a.sc-cOFTSb');
    let imageEl = null;
    let iconEl = null;
    let titleEl = null;
    // Find the main image (background image)
    // The image is inside: figure.sc-kgUAyh img.sc-jgbSNz
    const figureImgs = card.querySelectorAll('figure.sc-kgUAyh img');
    // The first image is the main card image, the second is the icon
    if (figureImgs.length > 0) {
      imageEl = figureImgs[0];
      // Defensive: If there are two images, second is icon
      if (figureImgs.length > 1) {
        iconEl = figureImgs[1];
      }
    }
    // Defensive fallback: sometimes icon is in a separate figure
    if (!iconEl) {
      // Try to find an icon img with height="52"
      iconEl = card.querySelector('img[height="52"]');
    }
    // Find the card title (h3)
    titleEl = card.querySelector('h3');

    // Compose first cell: image + icon
    // Compose a div to hold both image and icon, visually stacked
    const cardVisual = document.createElement('div');
    if (imageEl) cardVisual.appendChild(imageEl.cloneNode(true));
    if (iconEl) cardVisual.appendChild(iconEl.cloneNode(true));

    // Compose second cell: title (as heading, preserve original case)
    const cardText = document.createElement('div');
    if (titleEl) {
      const heading = document.createElement('h3');
      heading.textContent = titleEl.textContent.trim(); // preserve original case
      cardText.appendChild(heading);
    }
    // Wrap the cardText and cardVisual in a link if cardLink exists
    if (cardLink && cardLink.href) {
      const link = document.createElement('a');
      link.href = cardLink.href;
      link.appendChild(cardVisual);
      rows.push([
        link,
        cardText
      ]);
    } else {
      rows.push([
        cardVisual,
        cardText
      ]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
