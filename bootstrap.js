// Auto-generated runtime loader for thin Canvas shell.
(function () {
  var CDN = "https://cdn.jsdelivr.net/gh/mrrian417/UGC@main";

  var _origAdd = document.addEventListener;
  document.addEventListener = function (type, listener, opts) {
    if (type === 'DOMContentLoaded' && document.readyState !== 'loading') {
      Promise.resolve().then(function () { try { listener(); } catch (e) { console.error(e); } });
      return;
    }
    return _origAdd.call(this, type, listener, opts);
  };

  function loadScript(url, isModule) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = url;
      if (isModule) s.type = 'module';
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('Failed to load ' + url)); };
      document.body.appendChild(s);
    });
  }

  function showError(msg) {
    document.body.innerHTML =
      '<div style="padding:24px;color:#fff;background:#3a0a0a;font-family:system-ui;min-height:100vh;">'
      + '<h2 style="margin:0 0 12px">Boot error</h2>'
      + '<pre style="white-space:pre-wrap;word-break:break-word">' + (msg || 'Unknown error') + '</pre>'
      + '<p style="margin-top:16px;opacity:.7">Buka DevTools console untuk detail teknis.</p>'
      + '</div>';
  }

  (async function boot() {
    try {
      var bodyRes = await fetch(CDN + '/body.html');
      
      if (!bodyRes.ok) {
        // FALLBACK: Jika body.html gagal, gunakan HTML minimal
        console.warn('body.html fetch failed, using fallback...');
        var fallbackHtml = `
          <div id="login-overlay" style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a0a;font-family:system-ui;">
            <div style="background:#1a1a1a;padding:40px;border-radius:16px;max-width:400px;width:100%;text-align:center;color:#fff;border:1px solid #2a2a2a;">
              <div style="font-size:48px;margin-bottom:8px;">📸</div>
              <h1 style="font-size:24px;font-weight:700;color:#ea580c;margin:0;">Affiliate Go</h1>
              <p style="color:#888;margin:4px 0 20px;">Foto Studio by Dian</p>
              <input type="email" id="emailInput" placeholder="Email pembelian kamu..." style="width:100%;padding:14px;border-radius:10px;border:1px solid #333;background:#222;color:#fff;font-size:16px;box-sizing:border-box;margin-bottom:12px;">
              <button onclick="window.login()" style="width:100%;padding:14px;background:#ea580c;border:none;border-radius:10px;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">⚡ MASUK SEKARANG</button>
              <p style="color:#666;font-size:12px;margin-top:12px;">🔒 Akses Terenkripsi & Aman</p>
            </div>
          </div>
          <div id="main-app" style="display:none;"></div>
        `;
        document.body.insertAdjacentHTML('afterbegin', fallbackHtml);
        
        // Load bundles
        await loadScript(CDN + '/bundle-classic.js', false);
        await loadScript(CDN + '/bundle-module.js', true);
        return;
      }
      
      var bodyHtml = await bodyRes.text();
      var loader = document.getElementById('__loader');
      if (loader) loader.remove();
      document.body.insertAdjacentHTML('afterbegin', bodyHtml);

      await loadScript(CDN + '/bundle-classic.js', false);
      await loadScript(CDN + '/bundle-module.js', true);
    } catch (err) {
      console.error('Bootstrap failed:', err);
      showError(err && err.message ? err.message : String(err));
    }
  })();
})();
