/* ============================================================================
   CG Dirt Work and More — Cookie consent banner
   ----------------------------------------------------------------------------
   Self-contained, no dependencies, no server/database. The visitor's choice is
   stored in their browser (localStorage). Google Analytics and the Meta Pixel
   are ONLY loaded after the visitor opts in.

   >>> TO TURN ON TRACKING LATER: fill in the two IDs below. Until they are set,
       nothing loads even if the visitor accepts (banner still works). <<<
   ========================================================================== */
(function () {
  'use strict';

  var CONFIG = {
    gaId: '',        // e.g. 'G-XXXXXXXXXX'  (Google Analytics 4 Measurement ID)
    pixelId: '',     // e.g. '1234567890'    (Meta / Facebook Pixel ID)
    storageKey: 'cg_cookie_consent',
    version: 1
  };

  // Resolve the Cookie Policy link from this script's own URL (robust whether
  // the site is served at a domain root or under a subpath like GitHub Pages).
  var selfScript = document.currentScript || document.querySelector('script[src$="cookie-consent.js"]');
  var baseDir = selfScript ? selfScript.src.replace(/[^\/]*$/, '') : '';
  var COOKIE_POLICY_URL = baseDir + 'cookie-policy/';

  /* ---- stored consent ---------------------------------------------------- */
  function readConsent() {
    try {
      var raw = localStorage.getItem(CONFIG.storageKey);
      if (!raw) return null;
      var c = JSON.parse(raw);
      return (c && c.v === CONFIG.version) ? c : null;
    } catch (e) { return null; }
  }
  function saveConsent(analytics, advertising) {
    var c = { v: CONFIG.version, analytics: !!analytics, advertising: !!advertising, ts: new Date().toISOString() };
    try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(c)); } catch (e) {}
    applyConsent(c);
    return c;
  }

  /* ---- load trackers per consent (only if IDs are configured) ------------ */
  var loaded = { ga: false, pixel: false };
  function applyConsent(c) {
    if (c.analytics && CONFIG.gaId && !loaded.ga) loadGA();
    if (c.advertising && CONFIG.pixelId && !loaded.pixel) loadPixel();
  }
  function loadGA() {
    loaded.ga = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.gaId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', CONFIG.gaId);
  }
  function loadPixel() {
    loaded.pixel = true;
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CONFIG.pixelId);
    window.fbq('track', 'PageView');
    /* eslint-enable */
  }

  /* ---- styles (inlined so it is one file; uses site theme variables) ----- */
  var css = '' +
    '.cc-banner,.cc-modal{font-family:inherit;box-sizing:border-box}' +
    '.cc-banner{position:fixed;right:1rem;bottom:1rem;z-index:9999;width:min(400px,calc(100% - 2rem));' +
      'background:#fff;color:var(--text,#1a2233);border:1px solid var(--border,#e4e8f0);border-radius:16px;' +
      'box-shadow:0 16px 48px rgba(15,31,65,.22);padding:1.25rem 1.35rem}' +
    '.cc-banner p{margin:0 0 1rem;font-size:.95rem;line-height:1.55}' +
    '.cc-banner a,.cc-modal a{color:var(--primary,#c1440e);text-decoration:underline}' +
    '.cc-actions{display:flex;flex-wrap:wrap;gap:.6rem}' +
    '.cc-btn{cursor:pointer;border-radius:var(--radius-btn,8px);border:1px solid var(--primary,#c1440e);' +
      'padding:.6rem 1.1rem;font-size:.9rem;font-weight:600;line-height:1;transition:opacity .15s ease}' +
    '.cc-btn:hover{opacity:.88}' +
    '.cc-btn--solid{background:var(--primary,#c1440e);color:#fff}' +
    '.cc-btn--ghost{background:transparent;color:var(--primary,#c1440e)}' +
    '.cc-btn--link{background:transparent;border-color:transparent;color:var(--text,#1a2233);text-decoration:underline;padding:.6rem .5rem}' +
    '.cc-overlay{position:fixed;inset:0;z-index:10000;background:rgba(15,31,65,.5);display:flex;align-items:center;justify-content:center;padding:1rem}' +
    '.cc-modal{background:#fff;color:var(--text,#1a2233);border-radius:16px;max-width:560px;width:100%;max-height:90vh;overflow:auto;padding:1.75rem}' +
    '.cc-modal h2{margin:0 0 .5rem;font-size:1.3rem}' +
    '.cc-modal p{font-size:.9rem;line-height:1.55}' +
    '.cc-cat{border:1px solid var(--border,#e4e8f0);border-radius:12px;padding:1rem;margin:.85rem 0}' +
    '.cc-cat-head{display:flex;justify-content:space-between;align-items:center;gap:1rem}' +
    '.cc-cat-head h3{margin:0;font-size:1rem}' +
    '.cc-cat p{margin:.5rem 0 0;opacity:.85}' +
    '.cc-modal-actions{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1.25rem}' +
    '.cc-switch{position:relative;width:44px;height:24px;flex:0 0 44px}' +
    '.cc-switch input{opacity:0;width:0;height:0}' +
    '.cc-slider{position:absolute;inset:0;background:#c7ccd8;border-radius:999px;transition:.2s;cursor:pointer}' +
    '.cc-slider:before{content:"";position:absolute;height:18px;width:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.2s}' +
    '.cc-switch input:checked + .cc-slider{background:var(--primary,#c1440e)}' +
    '.cc-switch input:checked + .cc-slider:before{transform:translateX(20px)}' +
    '.cc-switch input:disabled + .cc-slider{background:var(--primary,#c1440e);opacity:.55;cursor:not-allowed}' +
    '.cc-settings-link{cursor:pointer}' +
    '@media(max-width:560px){.cc-actions{flex-direction:column}.cc-btn{width:100%;text-align:center}}';

  function injectStyles() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
  }

  /* ---- banner ------------------------------------------------------------ */
  var bannerEl = null;
  function showBanner() {
    if (bannerEl) { bannerEl.style.display = 'block'; return; }
    bannerEl = document.createElement('div');
    bannerEl.className = 'cc-banner';
    bannerEl.setAttribute('role', 'dialog');
    bannerEl.setAttribute('aria-label', 'Cookie notice');
    bannerEl.innerHTML =
      '<p>We use cookies to keep this site running, see how it gets used, and measure our Facebook activity. ' +
      'You can accept all cookies or stick to just the ones the site needs to work. See our ' +
      '<a href="' + COOKIE_POLICY_URL + '">Cookie Policy</a> for the details.</p>' +
      '<div class="cc-actions">' +
        '<button type="button" class="cc-btn cc-btn--solid" data-cc="accept">Accept All</button>' +
        '<button type="button" class="cc-btn cc-btn--ghost" data-cc="decline">Decline Non-Essential</button>' +
        '<button type="button" class="cc-btn cc-btn--link" data-cc="settings">Cookie Settings</button>' +
      '</div>';
    document.body.appendChild(bannerEl);
    bannerEl.querySelector('[data-cc="accept"]').addEventListener('click', function () { saveConsent(true, true); hideBanner(); });
    bannerEl.querySelector('[data-cc="decline"]').addEventListener('click', function () { saveConsent(false, false); hideBanner(); });
    bannerEl.querySelector('[data-cc="settings"]').addEventListener('click', openSettings);
  }
  function hideBanner() { if (bannerEl) bannerEl.style.display = 'none'; }

  /* ---- settings panel ---------------------------------------------------- */
  function openSettings() {
    var current = readConsent() || { analytics: false, advertising: false };
    var overlay = document.createElement('div');
    overlay.className = 'cc-overlay';
    overlay.innerHTML =
      '<div class="cc-modal" role="dialog" aria-modal="true" aria-label="Cookie settings">' +
        '<h2>Cookie Settings</h2>' +
        '<p>Choose which cookies you are okay with. Essential cookies stay on because the site needs them to work. The rest are up to you.</p>' +
        '<div class="cc-cat"><div class="cc-cat-head"><h3>Essential Cookies</h3>' +
          '<label class="cc-switch"><input type="checkbox" checked disabled><span class="cc-slider"></span></label></div>' +
          '<p>Always on. These keep the site working and secure. They cannot be turned off.</p></div>' +
        '<div class="cc-cat"><div class="cc-cat-head"><h3>Analytics Cookies</h3>' +
          '<label class="cc-switch"><input type="checkbox" data-cat="analytics"' + (current.analytics ? ' checked' : '') + '><span class="cc-slider"></span></label></div>' +
          '<p>Help us see how visitors use the site so we can make it better. Powered by Google Analytics.</p></div>' +
        '<div class="cc-cat"><div class="cc-cat-head"><h3>Advertising Cookies</h3>' +
          '<label class="cc-switch"><input type="checkbox" data-cat="advertising"' + (current.advertising ? ' checked' : '') + '><span class="cc-slider"></span></label></div>' +
          '<p>Let us measure our Facebook activity and show relevant content to people who have visited the site. Powered by the Meta Pixel.</p></div>' +
        '<div class="cc-modal-actions">' +
          '<button type="button" class="cc-btn cc-btn--solid" data-cc="save">Save Preferences</button>' +
          '<button type="button" class="cc-btn cc-btn--ghost" data-cc="accept-all">Accept All</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    function close() { overlay.remove(); }
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('[data-cc="save"]').addEventListener('click', function () {
      var a = overlay.querySelector('[data-cat="analytics"]').checked;
      var ad = overlay.querySelector('[data-cat="advertising"]').checked;
      saveConsent(a, ad); hideBanner(); close();
    });
    overlay.querySelector('[data-cc="accept-all"]').addEventListener('click', function () {
      saveConsent(true, true); hideBanner(); close();
    });
  }
  window.cgCookieSettings = openSettings; // used by the footer "Cookie Settings" link

  /* ---- footer "Cookie Settings" link ------------------------------------- */
  function addFooterLink() {
    var legal = document.querySelector('.footer-legal');
    if (!legal || legal.querySelector('.cc-settings-link')) return;
    var a = document.createElement('a');
    a.href = '#';
    a.className = 'cc-settings-link';
    a.textContent = 'Cookie Settings';
    a.addEventListener('click', function (e) { e.preventDefault(); openSettings(); });
    legal.appendChild(a);
  }

  /* ---- init -------------------------------------------------------------- */
  function init() {
    injectStyles();
    addFooterLink();
    var consent = readConsent();
    if (consent) { applyConsent(consent); } else { showBanner(); }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
