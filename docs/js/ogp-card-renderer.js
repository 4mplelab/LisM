function buildCardNode(url, data) {
  // This helper is in the main library
  const getOgpValue = OgpCardGenerator.helpers.getOgpValue;

  var img = data.ogp ? getOgpValue(data.ogp['og:image']) : null;
  var title = (data.ogp ? getOgpValue(data.ogp['og:title']) : null) || (data.html ? data.html.title : null) || url;
  var desc = (data.ogp ? getOgpValue(data.ogp['og:description']) : null) || (data.html ? data.html.description : null) || '';

  var a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.className = 'ogp-card';

  if (img) {
    var imageEl = document.createElement('img');
    imageEl.src = img;
    imageEl.alt = '';
    imageEl.className = 'ogp-card__image';
    a.appendChild(imageEl);
  }

  var right = document.createElement('div');
  right.className = 'ogp-card__content';

  var titleEl = document.createElement('div');
  titleEl.textContent = title;
  titleEl.className = 'ogp-card__title';
  right.appendChild(titleEl);

  if (desc && desc.trim().length > 0) {
    var descEl = document.createElement('div');
    descEl.textContent = desc;
    descEl.className = 'ogp-card__description';
    right.appendChild(descEl);
  }

  var urlEl = document.createElement('div');
  urlEl.textContent = url;
  urlEl.className = 'ogp-card__url';
  right.appendChild(urlEl);

  a.appendChild(right);
  return a;
}

// Initialize the generator with our custom renderer
OgpCardGenerator.init({
  onSuccess: function(element, data, url) {
    const cardNode = buildCardNode(url, data);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    element.appendChild(cardNode);
  }
});