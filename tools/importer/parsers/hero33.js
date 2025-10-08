/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero33) block: 1 col, 3 rows: [header, image, content]
  // Only include a non-empty string if there is meaningful text content

  const headerRow = ['Hero (hero33)'];
  const imageRow = [''];

  // Extract the <h2> element's text content, but only if it contains non-whitespace
  const h2 = element.querySelector('h2');
  let contentCell = '';
  if (h2 && h2.textContent && h2.textContent.replace(/\s/g, '').length > 0) {
    contentCell = h2.textContent.trim();
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    [contentCell],
  ], document);

  element.replaceWith(table);
}
