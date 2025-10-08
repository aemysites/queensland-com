/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Cards block
  const headerRow = ['Cards (cards19)'];

  // Find all card containers
  const cardContainers = element.querySelectorAll('.sc-jdAMXn.sYmGv .sc-cCsOjp.ccUUUC > .sc-gXmSlM.gRMUEd');

  const rows = [];

  cardContainers.forEach((card) => {
    // Find the anchor that wraps the card
    const anchor = card.querySelector('a.sc-cOFTSb');
    if (!anchor) return;

    // --- IMAGE + ICON OVERLAY ---
    // Main card image (large background image)
    let mainImg = null;
    const imgCandidates = anchor.querySelectorAll('figure img');
    for (const img of imgCandidates) {
      if (
        img.getAttribute('height') !== '52' &&
        !img.hasAttribute('hidden') &&
        img.offsetParent !== null
      ) {
        mainImg = img;
        break;
      }
    }
    if (!mainImg && imgCandidates.length > 0) {
      mainImg = imgCandidates[0];
    }
    // Icon (small image, always height="52")
    const iconImg = anchor.querySelector('figure img[height="52"]');

    // Compose image cell: wrap mainImg and iconImg in a link
    const imageCell = document.createElement('a');
    imageCell.href = anchor.href;
    if (mainImg) imageCell.appendChild(mainImg.cloneNode(true));
    if (iconImg) imageCell.appendChild(iconImg.cloneNode(true));

    // --- TEXT CELL ---
    const label = anchor.querySelector('h3');
    const textCell = document.createElement('div');
    if (label) textCell.appendChild(label.cloneNode(true));
    // Make the text cell clickable as well
    const textLink = document.createElement('a');
    textLink.href = anchor.href;
    if (label) textLink.appendChild(label.cloneNode(true));
    // Use only the clickable label as cell content
    rows.push([
      imageCell,
      textLink
    ]);
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
