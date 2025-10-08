/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns wrapper
  const mainColumnsWrapper = element.querySelector('.sc-cCsOjp');
  if (!mainColumnsWrapper) return;
  const columns = mainColumnsWrapper.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Right column: image
  const imageCol = columns[0];
  const imageEl = imageCol.querySelector('img');
  // Only reference the image element, do not clone or create new
  const rightColContent = imageEl ? [imageEl] : [];

  // Left column: heading, paragraph, CTA
  const leftCol = columns[1];
  // Collect all heading elements (in case there are multiple)
  const heading = leftCol.querySelector('h1, h2, h3, h4, h5, h6');
  // Collect all paragraphs (in case there are multiple)
  const paragraphs = Array.from(leftCol.querySelectorAll('p'));
  // Find CTA button (anchor)
  const cta = leftCol.querySelector('a');

  // Compose left column content, preserving order and referencing actual elements
  const leftColContent = [];
  if (heading) leftColContent.push(heading);
  paragraphs.forEach(p => leftColContent.push(p));
  if (cta) leftColContent.push(cta);

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns21)'];
  const contentRow = [leftColContent, rightColContent];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
