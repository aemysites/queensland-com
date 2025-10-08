/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero26)'];

  // 2. Background image row: leave empty, as there is no background image in the provided HTML
  const bgImageRow = [''];

  // 3. Content row: Collect icon, subtitle, title, and (optionally) CTA
  let contentElements = [];
  const heroFlex = element.querySelector('[data-testid="hero-banner-flexbox"]');
  if (heroFlex) {
    // Icon (map)
    const iconFigure = heroFlex.querySelector('figure');
    if (iconFigure) {
      contentElements.push(iconFigure);
    }
    // Subtitle (h1 span)
    const subtitle = heroFlex.querySelector('h1 span');
    if (subtitle) {
      // Use <h2> for subtitle for better heading semantics
      const h2 = document.createElement('h2');
      h2.append(subtitle.cloneNode(true));
      contentElements.push(h2);
    }
    // Title (h2)
    const title = heroFlex.querySelector('h2');
    if (title) {
      contentElements.push(title);
    }
  }
  // Optionally, include the icon buttons row (ul.sc-uyLif)
  const iconButtons = element.querySelector('ul.sc-uyLif');
  if (iconButtons) {
    contentElements.push(iconButtons);
  }

  // Compose table
  const tableRows = [
    headerRow,
    bgImageRow,
    [contentElements]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
