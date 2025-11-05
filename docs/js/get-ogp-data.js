const TARGET_CLASS = 'ogp-card-target';
const API_ENDPOINT = 'https://ogp-scanner.kunon.jp/v1/ogp_info';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function fetchOgp(url) {
  const apiUrl = `${API_ENDPOINT}?url=${encodeURIComponent(url)}`;
  const res = await fetch(apiUrl, { method: 'GET' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  // 200でも内容が空の可能性に対応
  let data;
  try {
    data = await res.json();
  } catch {
    // JSONでない/空は何もしない扱い
    return null;
  }
  return data;
}

function hasUsefulData(data) {
  if (!data || typeof data !== 'object') return false;

  // title/description が非空文字列か
  const hasTitle = typeof data.title === 'string' && data.title.trim().length > 0;
  const hasDesc = typeof data.description === 'string' && data.description.trim().length > 0;

  // og がオブジェクトで最低1キーあり、値が非空
  let hasOg = false;
  if (data.og && typeof data.og === 'object') {
    for (const [k, v] of Object.entries(data.og)) {
      if (typeof v === 'string' && v.trim().length > 0) {
        hasOg = true;
        break;
      }
    }
  }

  return hasTitle || hasDesc || hasOg;
}

function buildCardHtml(url, data) {
  const img = data.og?.['og:image'];
  const title = data.og?.['og:title'] || data.title || url;
  const desc = data.og?.['og:description'] || data.description || '';

  const safeUrl = escapeHtml(url);
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(desc);

  return `
    <a href="${safeUrl}" rel="noopener noreferrer" style="text-decoration:none;color:inherit;display:flex;gap:12px;align-items:flex-start;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
      ${img ? `<img src="${escapeHtml(img)}" alt="" style="width:120px;height:120px;object-fit:cover;border-radius:6px;background:#f3f4f6;">` : ''}
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:16px;line-height:1.4;margin-bottom:6px;">${safeTitle}</div>
        ${safeDesc ? `<div style="color:#555;line-height:1.5;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${safeDesc}</div>` : ''}
        <div style="color:#888;font-size:12px;">${safeUrl}</div>
      </div>
    </a>
  `;
}

async function initOgpCards() {
  const targets = Array.from(document.getElementsByClassName(TARGET_CLASS));
  if (targets.length === 0) return;

  await Promise.all(targets.map(async (container) => {
    try {
      const linkEl = container.querySelector('a[href]');
      if (!linkEl) return;

      const url = linkEl.getAttribute('href');
      if (!url) return;

      const data = await fetchOgp(url);

      // 200でも戻り値がない（null/空）場合や、有用なデータがない場合は何もしない
      if (!hasUsefulData(data)) return;

      const cardHtml = buildCardHtml(url, data);
      container.innerHTML = cardHtml;
    } catch (err) {
      // エラー時も何もしない
      return;
    }
  }));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOgpCards);
} else {
  initOgpCards();
}