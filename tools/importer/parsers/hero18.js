/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero18) block: 1 column, 3 rows
  // Row 1: Block name
  const headerRow = ['Hero (hero18)'];

  // Row 2: Background image (none in this HTML)
  const imageRow = [''];

  // Row 3: Content (should contain all text from original HTML)
  // The original HTML is an empty div, so there is no text to extract.
  // Per requirements, do not fabricate content. Row should be empty.
  const contentRow = [''];

  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
