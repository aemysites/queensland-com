/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main section containing the hero content
  const section = element.querySelector('section[aria-label="Banner"]');
  if (!section) return;

  // --- Row 1: Block name ---
  const headerRow = ['Hero (hero9)'];

  // --- Row 2: Background image ---
  let bgImg = null;
  // Find the figure containing the background image
  const figure = section.querySelector('figure');
  if (figure) {
    // Try to find the main img inside the figure
    const img = figure.querySelector('img');
    if (img) bgImg = img;
  }
  const row2 = [bgImg ? bgImg : ''];

  // --- Row 3: Text, CTA ---
  // The content is centered in .sc-jESRZN.gMEjY
  const contentDiv = section.querySelector('.sc-jESRZN');
  let row3Content = [];
  if (contentDiv) {
    // Heading (h3)
    const heading = contentDiv.querySelector('h3');
    if (heading) row3Content.push(heading);
    // CTA (button link)
    const cta = contentDiv.querySelector('a');
    if (cta) row3Content.push(cta);
    // If there are other visible text nodes (sometimes not in tags), include them
    // For flexibility, also include any direct text nodes in contentDiv
    Array.from(contentDiv.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        row3Content.push(document.createTextNode(node.textContent.trim()));
      }
    });
  }
  const row3 = [row3Content.length ? row3Content : ''];

  // Compose table
  const cells = [headerRow, row2, row3];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
