(function(window) {
  'use strict';

  function getOgpValue(value) {
    if (Array.isArray(value)) {
      return value.length > 0 ? value[0] : null;
    }
    return value;
  }

  const DEFAULTS = {
    targetClass: 'ogp-card-target',
    apiEndpoint: 'https://ogp-scanner.kunon.jp/v1/ogp_info',
    onSuccess: (element, data, url) => {
      console.log('Fetched OGP data:', { element, data, url });
    },
    onError: (element, error) => {
      console.error('Error fetching OGP data:', { element, error });
    }
  };

  async function fetchOgp(url, apiEndpoint) {
    const apiUrl = apiEndpoint + '?url=' + encodeURIComponent(url);
    const res = await fetch(apiUrl, { method: 'GET' });
    if (!res.ok) {
      throw new Error('API error: ' + res.status);
    }
    try {
      return await res.json();
    } catch (e) {
      throw new Error('Failed to parse JSON response');
    }
  }

  function hasUsefulData(data) {
    if (!data || typeof data !== 'object') return false;
    var hasTitle = data.html && typeof data.html.title === 'string' && data.html.title.trim().length > 0;
    var hasDesc = data.html && typeof data.html.description === 'string' && data.html.description.trim().length > 0;
    var hasOg = false;
    if (data.ogp && typeof data.ogp === 'object') {
      for (var k in data.ogp) {
        if (!Object.prototype.hasOwnProperty.call(data.ogp, k)) continue;
        var v = getOgpValue(data.ogp[k]);
        if (typeof v === 'string' && v.trim().length > 0) {
          hasOg = true;
          break;
        }
      }
    }
    return hasTitle || hasDesc || hasOg;
  }

  async function run(options) {
    const config = { ...DEFAULTS, ...options };
    const targets = Array.prototype.slice.call(document.getElementsByClassName(config.targetClass));
    if (targets.length === 0) return;

    targets.forEach(async (element) => {
      try {
        const linkEl = element.querySelector('a[href]');
        if (!linkEl) return;
        const url = linkEl.getAttribute('href');
        if (!url) return;

        const data = await fetchOgp(url, config.apiEndpoint);
        if (!hasUsefulData(data)) {
          return;
        }
        config.onSuccess(element, data, url);
      } catch (err) {
        config.onError(element, err);
      }
    });
  }

  const generator = {
    init: function(options) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => run(options));
      } else {
        run(options);
      }
    },
    helpers: {
        getOgpValue: getOgpValue
    }
  };

  window.OgpCardGenerator = generator;

})(window);