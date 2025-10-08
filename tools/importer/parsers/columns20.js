/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns20)'];

  // Find the two main column containers (direct descendants of the inner wrapper)
  const innerWrapper = element.querySelector(':scope > .sc-cCsOjp');
  if (!innerWrapper) return;
  const columns = Array.from(innerWrapper.querySelectorAll(':scope > .sc-gXmSlM'));
  if (columns.length < 2) return;

  // For each column, extract the card/tile section and clone its content to preserve all text
  const cells = columns.map(col => {
    const tileSection = col.querySelector('.sc-ciZhAO > section');
    if (!tileSection) return '';
    // Clone the section and return its children as an array to preserve all text and images
    const clone = tileSection.cloneNode(true);
    // Remove all tabindex attributes (optional, for cleanliness)
    clone.querySelectorAll('[tabindex]').forEach(el => el.removeAttribute('tabindex'));
    // Return all children (to preserve structure and all text)
    return Array.from(clone.childNodes);
  });

  // Build the table: header row, then one row with two columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells
  ], document);

  element.replaceWith(table);
}
