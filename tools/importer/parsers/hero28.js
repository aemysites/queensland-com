/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero28)'];

  // --- Row 2: Background Image (optional) ---
  // Try to find a hero image (usually <img> inside a figure)
  let imageCell = '';
  const figure = element.querySelector('figure');
  if (figure) {
    imageCell = figure;
  }

  // --- Row 3: Text Content ---
  // Extract all visible text content from the HTML, including elements with non-empty textContent
  // Use less specific selectors to ensure all text is captured
  const textCellContent = [];
  Array.from(element.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const txt = node.textContent && node.textContent.trim();
      if (txt) {
        const div = document.createElement('div');
        div.textContent = txt;
        textCellContent.push(div);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const txt = node.textContent && node.textContent.trim();
      if (txt) {
        const div = document.createElement('div');
        div.textContent = txt;
        textCellContent.push(div);
      }
    }
  });

  // If no text found, leave cell blank
  const textCell = textCellContent.length ? textCellContent : '';

  // Build table rows
  const rows = [
    headerRow,
    [imageCell],
    [textCell]
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
