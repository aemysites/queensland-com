/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div > div > div > div'));

  // Defensive: Only proceed if we have at least 3 columns
  if (columns.length < 3) return;

  // --- Column 1: Navigation list (left) ---
  let col1 = null;
  const col1ListWrap = columns[0].querySelector('.sc-ciZhAO');
  if (col1ListWrap) {
    // Use the whole ul if present
    const ul = col1ListWrap.querySelector('ul');
    if (ul) col1 = ul;
    else col1 = col1ListWrap;
  }

  // --- Column 2: Navigation list (middle) ---
  let col2 = null;
  const col2ListWrap = columns[1].querySelector('.sc-ciZhAO');
  if (col2ListWrap) {
    const ul = col2ListWrap.querySelector('ul');
    if (ul) col2 = ul;
    else col2 = col2ListWrap;
  }

  // --- Column 3: Language selector (right) ---
  let col3 = document.createElement('div');
  const col3Inner = columns[2].querySelector('.sc-ciZhAO');
  if (col3Inner) {
    // Spacer
    const spacer = col3Inner.querySelector('.Spacerstyled__Spacer-sc-k446pt-0');
    // Label/select
    const labelWrap = col3Inner.querySelector('label');
    if (labelWrap) col3.appendChild(labelWrap);
    // Icon (dropdown arrow)
    const iconWrap = col3Inner.querySelector('.sc-dXxSUK');
    if (iconWrap) col3.appendChild(iconWrap);
  }

  // --- Compose table ---
  const headerRow = ['Columns (columns3)'];
  const contentRow = [col1, col2, col3];

  // Create table and replace
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(block);
}
