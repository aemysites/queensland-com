/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the card container (swiper-wrapper)
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  // 2. Find all card slides
  const slides = Array.from(swiperWrapper.querySelectorAll('.swiper-slide'));
  if (!slides.length) return;

  // 3. Prepare the table rows
  const rows = [];
  // Header row as required
  rows.push(['Cards (cards8)']);

  // 4. For each card, extract image and text content
  slides.forEach((slide) => {
    // Each slide contains a link <a> that wraps the card
    const link = slide.querySelector('a');
    if (!link) return;

    // Find the image (first <img> inside the card)
    const img = link.querySelector('img');

    // Find the text overlay (contains <p> and <h5>)
    const textContainer = link.querySelector('.sc-hLaujc, .gOzHef');
    let textContent = [];
    if (textContainer) {
      // Clone the text container's children (to avoid moving them in the DOM)
      textContent = Array.from(textContainer.childNodes).map((node) => node.cloneNode(true));
    }

    // Optionally, wrap the text content in a div for structure
    let textDiv = document.createElement('div');
    textContent.forEach((el) => textDiv.appendChild(el));
    // If the whole card is a link, make the title a link as well (if not already)
    const h5 = textDiv.querySelector('h5');
    if (h5 && link.href) {
      const a = document.createElement('a');
      a.href = link.href;
      a.append(...h5.childNodes);
      h5.innerHTML = '';
      h5.appendChild(a);
    }

    // Build the row: [image, text]
    rows.push([
      img ? img : '',
      textDiv
    ]);
  });

  // 5. Check for the chat popup and add its text if present
  const chatPopup = element.querySelector('.sc-kjEcyX.hlMSc.custom-button-next ~ div[aria-live]');
  if (chatPopup && chatPopup.textContent.trim()) {
    rows.push(['', chatPopup.textContent.trim()]);
  }

  // 6. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
