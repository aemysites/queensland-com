/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by class
  function getDirectChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // 1. Find the three main columns in the footer structure
  // The structure is: ... > ... > ... > ... > ... > [COLUMN1, COLUMN2, COLUMN3]
  // We'll look for the three direct children of the deepest .sc-gXmSlM
  let columnsContainer = element.querySelector('.sc-gXmSlM');
  if (!columnsContainer) return;

  // Find the three column wrappers (should be .sc-ciZhAO or .sc-ciZhAO, .sc-ciZhAO, .sc-ciZhAO)
  // But there may be a .sc-ciZhAO (icons), a .sc-ciZhAO (acknowledgement), a .sc-ciZhAO (logos)
  const columnEls = Array.from(columnsContainer.children).filter(
    (child) => child.classList.contains('sc-ciZhAO')
  );
  if (columnEls.length < 3) return;

  // 2. Social icons column (first column)
  // This contains a <ul> of <li><a><img></a></li>
  const socialCol = columnEls[0];
  let socialList = socialCol.querySelector('ul');
  // Defensive: if not found, just use the whole column
  const socialContent = socialList ? socialList : socialCol;

  // 3. Acknowledgement text column (second column)
  // This contains a div with class .sc-csvytd or similar, with <p> children (may be empty)
  const ackCol = columnEls[1];
  let ackText = ackCol.querySelector('[data-rte-editelement]');
  // Defensive: if not found, use the whole column
  const ackContent = ackText ? ackText : ackCol;

  // 4. Logos and copyright column (third column)
  // This contains two <figure> (logos) and a copyright div
  const logosCol = columnEls[2];
  // We'll use the entire column as a single cell (preserves structure and is robust)
  const logosContent = logosCol;

  // 5. Build the table
  const headerRow = ['Columns block (columns16)'];
  const contentRow = [socialContent, ackContent, logosContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
