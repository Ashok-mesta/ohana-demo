/* ============================================================
   Aloha · the white-label sender portal (Global Fincon) — five flows
   Loaded after the engine in prototype.html; extends Component.prototype,
   FLOWS and DEMO_FLOW, then prototype.html calls app.mount().
   Screens are prefixed al-* ; per-flow state lives in state.al.
   ============================================================ */
const AL_EMAIL = 'ashok@mesta.xyz', AL_NAME = 'Ashok', AL_CO = 'Ashok Pays Co';
const AL_EMPTY = {
  reg: { pw: '', pw2: '', agree: false, mfa: 'qr', code: '' },
  onb: { country: '', phase: 'country', step: 1, name: '', phone: '', biz: '', docs: [false, false], emp: '', sof: '', first: '', last: '', own: '', pep: '', upload: null, filled: false, submitted: false, linkOn: false, verified: false },
  w: { step: 'security', net: '', pw: '', dl: false, ack: false, created: false },
  fa: { modal: false, cur: '', busy: false, prov: false, live: false, reveal: false, next: false },
  p: { type: '', step: 1, src: '', asset: '', net: '', rcur: '', rail: '', send: '', recv: '', to: '', method: '', purpose: '', sof: '', rel: '', auth: '', code: '', orders: [], tracked: false, detail: null }
};
const AL_COUNTRIES = ['AU 🇦🇺 Australia', 'BR 🇧🇷 Brazil', 'CA 🇨🇦 Canada', 'DE 🇩🇪 Germany', 'IN 🇮🇳 India', 'MX 🇲🇽 Mexico', 'SG 🇸🇬 Singapore', 'AE 🇦🇪 United Arab Emirates', 'GB 🇬🇧 United Kingdom of Great Britain and Northern Ireland', 'US 🇺🇸 United States of America'];
const AL_RATES = { f2s: 0.9785, s2f: 0.652, s2s: 0.9733 };
const AL_ORDER_IDS = { f2s: '031106...c4f075', s2f: '28f95f...d3920d', s2s: 'a0d01f...0ee3a5' };
const AL_BENES = [['Pacific Ledger Services', '🇺🇸 United States of America'], [AL_CO, '🇺🇸 United States of America']];
const alPath = (obj, path, value) => { const o = JSON.parse(JSON.stringify(obj)); let c = o; const ks = path.split('.'); for (let i = 0; i < ks.length - 1; i++) c = c[ks[i]]; c[ks[ks.length - 1]] = value; return o; };
const alP = (s, grp, patch) => ({ al: { ...s.al, [grp]: { ...s.al[grp], ...patch } } });
const OPEN_AL_CREATE = { ...OPEN_CREATE, screen: 'al-create' };
const alCalc = (type, send) => { const v = parseFloat(String(send).replace(/,/g, '')); return isNaN(v) ? '' : (Math.round(v * AL_RATES[type] * 100) / 100).toFixed(2); };
const alMoney = { f2s: { sa: '10.22', sc: 'USD', sk: '🇺🇸', ra: '10.00', rc: 'USDC', rk: 'usdc' }, s2f: { sa: '15.00', sc: 'USDC', sk: 'usdc', ra: '9.78', rc: 'USD', rk: '🇺🇸' }, s2s: { sa: '15.00', sc: 'USDC', sk: 'usdc', ra: '14.60', rc: 'USDT', rk: 'usdt' } };
const acoin = k => k === 'usdc' ? '<span class="coin c-usdc" style="width:20px;height:20px;border-radius:50%;background:#2775ca;color:#fff;display:inline-flex;align-items:center;justify-content:center;font:700 10px Geist">$</span>' : k === 'usdt' ? '<span class="coin c-usdt" style="width:20px;height:20px;border-radius:50%;background:#26a17b;color:#fff;display:inline-flex;align-items:center;justify-content:center;font:700 10px Geist">T</span>' : `<span style="font-size:18px">${k}</span>`;
const AL_ICONS = {
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0"/>', copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>', lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrowr: '<path d="M5 12h14M13 6l6 6-6 6"/>', arrowl: '<path d="M19 12H5M11 6l-6 6 6 6"/>', link: '<path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/>', idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M14 10h4M14 14h4M5 18c0-2 2-3 4-3s4 1 4 3"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>', warn: '<path d="M12 3 2.5 20h19z"/><path d="M12 9v5M12 17h.01"/>', pen: '<path d="M4 20h4l10-10-4-4L4 16zM12 6l4 4"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>', paperclip: '<path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 6"/>', info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  chev2: '<path d="m11 7-5 5 5 5M18 7l-5 5 5 5"/>', moneyin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 10h3.5a1.5 1.5 0 0 1 0 3h-2a1.5 1.5 0 0 0 0 3h3.5"/>', sign: '<path d="M4 20h16M6 16l10-10 2 2-10 10H6z"/>'
};
Object.assign(I, AL_ICONS);

Object.assign(Component.prototype, {
  /* ---------- helpers ---------- */
  alsel(key, value, placeholder, opts, label, cls = '') {
    const s = this.state, open = s.openSel === key;
    return `<div class="sel ${cls} ${open ? 'focus' : ''}" data-act="sel" data-arg="${key}" aria-label="${esc(label || placeholder)}"><span style="${value ? '' : 'color:var(--mute)'}">${esc(value || placeholder)}</span><span class="sp"></span>${ic('down', 'sm')}
      ${open ? `<div class="dd light" data-stop="1">${opts.map(o => `<div class="${o === value ? 'on' : ''}" data-act="pickOpt" data-arg="${key}|${esc(o)}" aria-label="${esc(o)}">${esc(o)}</div>`).join('')}</div>` : ''}</div>`;
  },
  ainp(key, value, label, placeholder = '', cls = '', type = 'text') { return `<input class="inp ${cls}" type="${type}" data-bind="${key}" aria-label="${esc(label)}" placeholder="${esc(placeholder)}" value="${esc(value)}">`; },
  alTicker() {
    const rows = [['🇺🇸 USD → <span class="coin">◎ USDC</span> <span class="n">ETH</span>', 'On-ramp · 12s · 1s ago', '2,500 USDC', 'from $ 2,500'], ['🇺🇸 USD → 🇧🇷 BRL', 'PIX · São Paulo · 31s · 4s ago', 'R$ 18,500', 'from $ 3,700'], ['<span class="coin">◎ USDC</span> <span class="n">ETH</span> → 🇺🇸 USD', 'Bank · ACH · next day · 7s ago', '$ 6,200', 'from 6,200 USDC'], ['<span class="coin">◎ USDT</span> <span class="n">TRX</span> → <span class="coin">◎ USDC</span> <span class="n">ETH</span>', 'Swap · 1m · 10s ago', '4,194 USDC', 'from 4,200 USDT'], ['🇺🇸 USD → <span class="coin">◎ USDT</span> <span class="n">TRX</span>', 'On-ramp · 14s · 12s ago', '1,800 USDT', 'from $ 1,800'], ['🇺🇸 USD → 🇦🇪 AED', 'Bank · Dubai · same day · 17s ago', 'AED 16,160', 'from $ 4,400'], ['🇪🇺 EUR → 🇰🇪 KES', 'M-Pesa · Nairobi · Instant · 19s ago', 'KSh 75,400', 'from € 540']];
    const dots = [[62, 20, '#9b5de5'], [48, 29, '#f9c74f'], [40, 32, '#4cc9f0'], [78, 43, '#43aa8b'], [69, 47, '#f3722c'], [50, 56, '#f94144'], [32, 70, '#90be6d'], [55, 79, '#43aa8b']].map(([x, y, c]) => `<i class="dot" style="left:${x}%;top:${y}%;background:${c};box-shadow:0 0 10px ${c}"></i>`).join('');
    return `<div class="left"><div class="meta"><div><span class="live">●</span> LIVE · 24/7</div><div>FIAT · STABLECOIN · 41 CURRENCIES</div></div>${dots}
      <div class="rows">${rows.map(r => `<div class="rw"><div><div class="a"><span style="color:#43aa8b">✓</span> ${r[0]}</div><div class="b">${r[1]}</div></div><div class="r">${r[2]}<small>${r[3]}</small></div></div>`).join('')}</div><div class="foot">GLOBAL FINCON</div></div>`;
  },
  /* ---------- shell ---------- */
  rAlShell() {
    const s = this.state, al = s.al, full = { 'al-inbox': this.rAlInbox, 'al-setup': this.rAlSetup, 'al-2fa': this.rAl2fa, 'al-passkey': this.rAlPasskey, 'al-login': this.rAlLogin }[s.screen];
    if (full) return `<div class="al" style="display:flex;flex:1;min-width:0;position:relative">${full.call(this)}${s.toast ? `<div class="toast ok">${ic('check', 'sm')}${esc(s.toast)}</div>` : ''}</div>`;
    const navOf = { 'al-dash': 'dash', 'al-onb': 'dash', 'al-fiat': 'fiat', 'al-wallets': 'wallets', 'al-wnew': 'wallets', 'al-benes': 'benes', 'al-create': 'benes', 'al-orders': 'orders', 'al-pay': 'orders', 'al-odet': 'orders' }[s.screen];
    const nav = (key, icon, label) => `<div class="nav ${navOf === key ? 'on' : ''}" data-act="alNav" data-arg="${key}" aria-label="${label}">${ic(icon)}${label}</div>`;
    const crumb = { 'al-dash': 'Home', 'al-onb': 'Home', 'al-fiat': 'Home &nbsp;/&nbsp; <b>Fiat accounts</b>', 'al-wallets': 'Home &nbsp;/&nbsp; <b>Wallets</b>', 'al-wnew': 'Home &nbsp;/&nbsp; <b>Wallets</b>', 'al-benes': 'Home &nbsp;/&nbsp; <b>Beneficiaries</b>', 'al-create': 'Home &nbsp;/&nbsp; <b>Create beneficiary</b>', 'al-orders': 'Home &nbsp;/&nbsp; <b>Orders</b>', 'al-pay': 'Home &nbsp;/&nbsp; <b>New payment</b>', 'al-odet': 'Home &nbsp;/&nbsp; Orders &nbsp;/&nbsp; <b>' + (al.p.detail ? AL_ORDER_IDS[al.p.detail] : '') + '</b>' }[s.screen] || 'Home';
    const body = { 'al-dash': this.rAlDash, 'al-onb': this.rAlOnb, 'al-fiat': this.rAlFiat, 'al-wallets': this.rAlWallets, 'al-wnew': this.rAlWalletNew, 'al-benes': this.rAlBenes, 'al-create': this.rCreate, 'al-orders': this.rAlOrders, 'al-pay': this.rAlPay, 'al-odet': this.rAlOrderDetail }[s.screen].call(this);
    const onb = s.screen === 'al-onb', ordersN = al.p.orders.length;
    const topRight = onb ? `<span class="signed">Signed in as <b>${AL_EMAIL}</b></span><span class="signed" data-act="noop"><b>Sign out</b></span>`
      : `<span class="bell">${ic('bell')}${ordersN ? `<i>${ordersN}</i>` : ''}</span><span class="acct"><span class="t"><b>${AL_NAME}</b><span>${AL_EMAIL}</span></span><span class="av">AS</span>${ic('down', 'sm')}</span>`;
    const modal = s.modal === 'sending' ? this.rSending() : s.screen === 'al-fiat' && al.fa.modal ? this.rAlFiatModal() : s.screen === 'al-pay' && (al.p.auth === 'code' || al.p.auth === 'verifying') ? this.rAlCodeModal() : '';
    return `<div class="al" style="display:flex;flex:1;min-width:0;position:relative">
      <div class="side"><div class="logo">${gfLogo('sm')}</div>
        <div class="sec mono">Home</div>${nav('dash', 'home', 'Dashboard')}
        <div class="sec mono">Accounts</div>${nav('fiat', 'bank', 'Fiat accounts')}${nav('wallets', 'wallet', 'Wallets')}
        <div class="sec mono">People</div>${nav('benes', 'users', 'Beneficiaries')}
        <div class="sec mono">Payments</div>${nav('orders', 'orders', 'Orders')}
        <div class="sec mono">Reports</div>${nav('reports', 'file', 'Reports')}
        <div class="sec mono">Support</div>${nav('support', 'circle', 'Support')}
        <div class="sec mono">Account</div>${nav('settings', 'gear', 'Settings')}
        <div class="foot">${ic('chev2')}</div></div>
      <div class="main"><div class="top"><span class="crumb">${crumb}</span><span class="sp"></span>${topRight}</div>
        <div class="content">${body}</div>${modal}
        ${s.toast ? `<div class="toast ok">${ic('check', 'sm')}${esc(s.toast)}</div>` : ''}</div></div>`;
  },
  /* ---------- registration: inbox, account, 2FA, passkey ---------- */
  rAlInbox() {
    const on = this.state.al.reg.linkHover;
    return `<div class="inbox"><div class="gside"><div class="l w"></div><div class="l"></div><div class="l w"></div><div class="l"></div><div class="l w"></div><div class="l"></div></div>
      <div class="gmain"><div class="gtop"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="mail"><h2>Invite to join Global Fincon's Global Payment Platform <span class="tg">External</span><span class="tg b">Inbox ×</span></h2>
        <div class="from"><div class="av">${ic('user')}</div><div><b>Team Global Fincon</b><span>&lt;invitations@global-fincon.aloha.stg.mesta.xyz&gt;</span><small>to me ▾</small></div></div>
        <p>Hi ${AL_NAME},</p><p>You are invited to join Global Fincon's Global Payment Platform. Use the following link to get set up and start transacting.</p>
        <a class="lk ${on ? 'on' : ''}" data-act="alOpenInvite">https://global-fincon.aloha.stg.mesta.xyz/auth/setup?token=18f74f5d-f1d3-47bb-8d52-4196353ee322</a>
        <p style="margin-top:18px">Best Regards,<br>Team Global Fincon</p>
        <div class="acts"><span>↩ Reply</span><span>↪ Forward</span><span>Share in chat</span></div></div></div></div>`;
  },
  rAlSetup() {
    const r = this.state.al.reg;
    return `<div class="authpage">${this.alTicker()}<div class="right"><div class="aform">${gfLogo()}<h1>Set up your account</h1><div class="s">Welcome, ${AL_EMAIL}</div>
      <div class="fld"><label class="lbl">Email</label><input class="inp" aria-label="Email" value="${AL_EMAIL}" readonly style="background:#f6f7f8"></div>
      <div class="fld"><label class="lbl">Password<i>*</i></label><div class="pw">${this.ainp('al.reg.pw', r.pw, 'Create a password', 'Create a password', '', 'password')}${ic('eye')}</div></div>
      <div class="fld"><label class="lbl">Confirm Password<i>*</i></label><div class="pw">${this.ainp('al.reg.pw2', r.pw2, 'Confirm your password', 'Confirm your password', '', 'password')}${ic('eye')}</div></div>
      <label class="chk ${r.agree ? 'on' : ''}" data-act="alAgree"><span class="b">${r.agree ? ic('check', 'sm') : ''}</span>I agree to <u style="margin-left:4px">Global Fincon's Terms and Conditions</u></label>
      <button class="btn teal wide" data-act="alSetup">Set up account · next: MFA enrollment</button>
      <div class="n">Already have an account? <b>Sign in</b></div></div></div></div>`;
  },
  rAl2fa() {
    const r = this.state.al.reg, qr = (() => { let out = ''; const seed = [...'globalfincon-mfa-2026'].reduce((a, c) => a + c.charCodeAt(0), 0); for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) { const fin = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13); const onf = fin ? (x % 7 === 0 || x % 7 === 6 || y % 7 === 0 || y % 7 === 6 || (x % 7 > 1 && x % 7 < 5 && y % 7 > 1 && y % 7 < 5)) : (((x * 31 + y * 17 + seed) % 7) < 3); if (onf) out += `<rect x="${x}" y="${y}" width="1" height="1"/>`; } return `<svg viewBox="0 0 21 21" shape-rendering="crispEdges">${out}</svg>`; })();
    const body = r.mfa === 'qr' ? `<div class="s">Scan with an authenticator app (Google Authenticator, 1Password, Authy) — it generates a fresh 6-digit code every 30 seconds.</div><div class="qr">${qr}</div><span class="link" data-act="alScanned">I've scanned the code</span>`
      : `<div class="s" style="margin-bottom:10px">Enter the 6-digit code from your authenticator app.</div><div class="otp"><input class="code" data-bind="al.reg.code" aria-label="Authentication code" placeholder="000000" value="${esc(r.code)}" maxlength="6" style="width:260px;height:52px;border:1px solid var(--line);border-radius:10px;text-align:center;font:500 22px 'Geist Mono',monospace;letter-spacing:.4em"></div>
        <button class="btn teal wide" data-act="alVerify" ${r.code.length >= 6 ? '' : 'disabled'}>Verify code</button><span class="link" data-act="alBackQr">Back to QR code</span>`;
    return `<div class="authpage">${this.alTicker()}<div class="right"><div class="aform">${gfLogo()}<div class="k mono">Verify</div><h1>Two-factor authentication</h1><div class="s">Open your authenticator app — codes rotate every 30 seconds.</div><span class="sess">Session expires in 4:58</span>${body}<span class="link u" style="margin-top:22px">Back to sign in</span></div></div></div>`;
  },
  rAlPasskey() {
    return `<div class="pkpage"><div class="bar">${gfLogo('sm')}<span class="secure">${ic('shield')} SECURE SESSION</span><span class="sp"></span><span class="signed"><small>SIGNED IN AS</small>${AL_EMAIL}</span><button class="btn">Sign out</button></div>
      <div class="body"><div class="fingerring">${ic('finger')}</div><div class="k mono" style="font-size:11px;letter-spacing:.16em;color:var(--mute);margin-bottom:10px">Passkey setup</div><h1 style="font-size:32px">Add your passkey</h1><p style="font-size:16px;color:var(--ink2);max-width:560px;text-align:center;line-height:1.5;margin:10px 0 0">Sign in with a passkey instead of a password and a 6-digit code. One Touch ID prompt and you're in.</p>
        <div class="pkcard"><div class="li">${ic('check')}<span><b>Phishing-proof.</b> Cryptographically tied to this site — useless on any other domain, even a perfect look-alike.</span></div><div class="li">${ic('check')}<span><b>Faster than 6-digit codes.</b> One Touch ID prompt — average ceremony completes in 2–3 seconds.</span></div><div class="li">${ic('check')}<span><b>Private to you.</b> Your biometric never leaves this device — only a public key is shared.</span></div><hr>
          <label class="lbl">Name this device (optional)</label><input class="inp" aria-label="Device name" placeholder="e.g., MacBook Pro, Personal iPhone"><div class="help">We'll auto-detect the device if you leave this blank.</div>
          <button class="btn teal wide" style="margin-top:18px" data-act="alPasskeyLater">${ic('finger')} Add a passkey · continue</button><div style="text-align:center;margin-top:16px"><span class="link" style="display:inline-flex;align-items:center;gap:8px" data-act="alPasskeyLater">Maybe later ${ic('arrowr', 'sm')}</span></div></div>
        ${this.state.toast ? '' : `<div class="toast ok">${ic('check', 'sm')}Two-factor authentication enabled</div>`}</div></div>`;
  },
  rAlLogin() {
    return `<div class="authpage">${this.alTicker()}<div class="right"><div class="aform">${gfLogo()}<div class="k mono">Sign in</div><h1>Welcome back</h1><div class="s">Sign in to your sender portal</div>
      <div class="fld"><label class="lbl">Email<i>*</i></label><input class="inp" aria-label="Email" value="${AL_EMAIL}"></div>
      <div class="fld"><label class="lbl">Password<i>*</i></label><div class="pw"><input class="inp" type="password" aria-label="Password" value="correct-horse-battery">${ic('eye')}</div></div>
      <button class="btn teal wide" data-act="alLogin">Sign in</button><div class="n">Protected with a passkey or a 6-digit code · <b>Forgot password?</b></div></div></div></div>`;
  },
  /* ---------- onboarding: Get verified to send payments ---------- */
  rAlOnb() {
    const s = this.state, o = s.al.onb;
    const head = `<div class="k mono">Onboarding</div><h1>Get verified to send payments</h1><div class="s">We'll guide you step by step · progress saves automatically · KYB review typically clears in 24–48 hours, and we'll email you the moment compliance reaches a decision.</div>`;
    if (o.submitted) return this.rAlReview();
    if (o.phase === 'country') return `<div class="onb">${head}<div class="onbcard" style="max-width:880px;margin:0 auto"><h3>Select your country</h3><label class="lbl">Country<i>*</i></label>${this.alsel('al.onb.country', o.country, 'Select country', AL_COUNTRIES, 'Select country')}<button class="btn teal wide" style="margin-top:18px" data-act="alOnbStart" ${o.country ? '' : 'disabled'}>Continue</button></div></div>`;
    const names = ['Business details', 'Documents', 'Onboarding & risk profile', 'Ultimate beneficial owners'];
    const stepper = `<div class="osteps">${names.map((n, i) => { const k = i + 1, cls = k < o.step || (o.filled && k < 4 && k !== o.step) ? 'done' : k === o.step ? 'cur' : ''; return `${i ? `<div class="ln ${k <= o.step ? 'on' : ''}"></div>` : ''}<div class="o ${cls}" data-act="alOnbStep" data-arg="${k}" aria-label="${n}"><div class="d">${cls === 'done' ? ic('check') : '<i></i>'}</div>${n}</div>`; }).join('')}</div>`;
    const banner = o.step === 1 ? this.rAlOnbUpload() : '';
    const shead = ['Step 1 of 4 · Business details · Next: Documents', 'Step 2 of 4 · Documents · Next: Onboarding & risk profile', 'Step 3 of 4 · Onboarding & risk profile · Next: Ultimate beneficial owners', 'Step 4 of 4 · Ultimate beneficial owners · Next: Submit for review'][o.step - 1];
    const foot = (label, act) => `<div class="saved">Progress saved</div><div class="onbfoot">${o.step > 1 ? '<button class="btn ghost" data-act="alOnbBack">Back</button>' : ''}<button class="btn teal" data-act="${act}">${label}</button></div>`;
    let body = '';
    if (o.step === 1) body = `<div class="g2"><div><label class="lbl">Full Name</label>${this.ainp('al.onb.name', o.name, 'Full Name')}</div><div><label class="lbl">Email</label><input class="inp" aria-label="Email" value="${AL_EMAIL}" readonly style="background:#f6f7f8"></div>
        <div><label class="lbl">Phone Number<i>*</i></label>${this.ainp('al.onb.phone', o.phone, 'Phone Number', '🇺🇸 +1')}</div><div><label class="lbl">Sender Type</label>${this.alsel('al.onb.stype', 'Business', 'Business', ['Business', 'Individual'], 'Sender Type')}</div>
        <div><label class="lbl">Date Of Registration</label><input class="inp" aria-label="Date of registration" value="${o.filled ? '07 / 15 / 2026' : ''}" placeholder="mm / dd / yyyy"></div><div><label class="lbl">Business Registration Number</label><input class="inp" aria-label="Business registration number" value="${o.filled ? '889645290' : ''}"><div class="help">Business registration number or tax ID</div></div>
        <div><label class="lbl">Business Type</label>${this.alsel('al.onb.biz', o.biz, 'Select Business Type', ['Sole Proprietorship', 'Corporation', 'Limited Liability Company', 'Partnership'], 'Business Type')}</div><div></div></div>
        <h4 style="margin:18px 0 10px;font-size:16px">Address</h4><div class="g2"><div><label class="lbl">Street</label><input class="inp" aria-label="Street" value="${o.filled ? '1889 turtle creek drive' : ''}"></div><div><label class="lbl">City</label><input class="inp" aria-label="City" value="${o.filled ? 'aurora' : ''}"></div><div><label class="lbl">Postal Code</label><input class="inp" aria-label="Postal code" value="${o.filled ? '60503' : ''}"></div><div><label class="lbl">Country</label>${this.alsel('al.onb.c2', 'US 🇺🇸 United States of America', '', [], 'Country')}<div class="help">Country is determined by the selection above.</div></div><div><label class="lbl">State</label>${this.alsel('al.onb.state', o.filled ? 'Illinois' : '', 'Select a state', ['Illinois', 'California', 'New York', 'Texas'], 'State')}</div></div>` + foot('Continue · Documents', 'alOnbNext');
    if (o.step === 2) body = `<div class="drops"><div><label class="lbl">Business registration document</label><div class="dz ${o.docs[0] ? 'has' : ''}" data-act="alDoc" data-arg="0">${ic('upload')}${o.docs[0] ? '✓ business_registration_mock.pdf' : 'Drop files here or click to browse'}</div></div><div><label class="lbl">Proof of address</label><div class="dz ${o.docs[1] ? 'has' : ''}" data-act="alDoc" data-arg="1">${ic('upload')}${o.docs[1] ? '✓ proof_of_address_july.pdf' : 'Drop files here or click to browse'}</div></div></div>` + foot('Continue · Onboarding & risk profile', 'alOnbNext');
    if (o.step === 3) body = `<div class="riskbox"><h4>${ic('shield')}Onboarding & risk profile</h4><div class="d">Required for KYC/KYB verification and AML risk scoring — drives screening depth and corridor limits.</div>
        <div class="g2"><div><label class="lbl">Is the business a financial institution?<i>*</i></label>${this.alsel('al.onb.fin', 'No', 'Select', ['No', 'Yes'], 'Financial institution')}</div><div><label class="lbl">Number of employees<i>*</i></label>${this.alsel('al.onb.emp', o.emp, 'Select', ['1', '2-10', '11-50', '51-200', '201-1000', '1000+', 'Unknown'], 'Number of employees')}</div>
          <div><label class="lbl">Website URL</label><input class="inp" aria-label="Website URL" placeholder="https://example.com" value="${o.filled ? 'https://ashokpays.co' : ''}"></div><div><label class="lbl">Source of funds<i>*</i></label>${this.alsel('al.onb.sof', o.sof, 'Select', ['Business Income', 'Investment Returns', 'Loan', 'Other'], 'Source of funds')}</div>
          <div><label class="lbl">Expected monthly volume (USD)<i>*</i></label>${this.alsel('al.onb.vol', '500K-1M', 'Select', ['<500K', '500K-1M', '1M-5M', '>5M'], 'Expected monthly volume')}</div><div><label class="lbl">Average transaction size (USD)<i>*</i></label><input class="inp" aria-label="Average transaction size" placeholder="e.g., 5000" value="10000"></div>
          <div><label class="lbl">Nature of payments<i>*</i></label>${this.alsel('al.onb.nat', 'Vendor payment ×', 'Select payment purposes', ['Vendor payment', 'Payroll', 'Services'], 'Nature of payments')}</div><div><label class="lbl">Primary counterparty jurisdictions<i>*</i></label>${this.alsel('al.onb.jur', 'IN 🇮🇳 India ×', 'Select', ['IN 🇮🇳 India', 'BR 🇧🇷 Brazil'], 'Primary counterparty jurisdictions')}</div></div></div>` + foot('Continue · Ultimate beneficial owners', 'alOnbNext');
    if (o.step === 4) body = `<div class="ubobox"><div class="hd"><span>OWNER 1 · ${esc((o.first + ' ' + o.last).trim().toUpperCase() || 'NEW OWNER')}${o.own ? ' · ' + esc(o.own) + '%' : ''}</span><span class="sp" style="flex:1"></span>${ic('trash')}</div>
        <h4>Personal information</h4><div class="g2"><div><label class="lbl">First name<i>*</i></label>${this.ainp('al.onb.first', o.first, 'First name')}</div><div><label class="lbl">Last name<i>*</i></label>${this.ainp('al.onb.last', o.last, 'Last name')}</div><div><label class="lbl">Email<i>*</i></label><input class="inp" aria-label="Owner email" value="${o.filled ? AL_EMAIL : ''}"></div><div><label class="lbl">Phone<i>*</i></label><input class="inp" aria-label="Owner phone" value="${o.filled ? '🇺🇸 +1 925 404 9988' : '🇺🇸 +1'}"></div><div><label class="lbl">Ownership percentage<i>*</i></label>${this.ainp('al.onb.own', o.own, 'Ownership percentage')}</div><div><label class="lbl">Date of birth<i>*</i></label><input class="inp" aria-label="Date of birth" value="${o.filled ? '12 / 12 / 1980' : ''}" placeholder="mm / dd / yyyy"></div></div>
        <h4>Address information</h4><div class="fld"><label class="lbl">Street<i>*</i></label><input class="inp" aria-label="Owner street" placeholder="Start typing an address…" value="${o.filled ? '1889 turtle creek drive' : ''}"></div><div class="g2"><div><label class="lbl">City<i>*</i></label><input class="inp" aria-label="Owner city" value="${o.filled ? 'aurora' : ''}"></div><div><label class="lbl">State</label>${this.alsel('al.onb.ostate', o.filled ? 'Illinois' : '', 'Select a state', ['Illinois'], 'Owner state')}</div><div><label class="lbl">Country<i>*</i></label>${this.alsel('al.onb.oc', 'US 🇺🇸 United States of America', '', [], 'Owner country')}</div><div><label class="lbl">Postal code<i>*</i></label><input class="inp" aria-label="Owner postal code" value="${o.filled ? '60503' : ''}"></div></div>
        <h4>Identity information</h4><div class="g2"><div><label class="lbl">Country code<i>*</i></label>${this.alsel('al.onb.icc', 'US 🇺🇸 United States of America', '', [], 'Identity country')}</div><div><label class="lbl">Document type<i>*</i></label>${this.alsel('al.onb.doc', 'Ssn9', '', [], 'Document type')}</div></div><div class="fld"><label class="lbl">Document number<i>*</i></label><input class="inp" aria-label="Document number" value="${o.filled ? '987657872' : ''}"></div>
        <hr style="border:0;border-top:1px solid var(--line2);margin:18px 0"><h4 style="margin-top:0">PEP declaration</h4><div style="font-size:14.5px;color:var(--ink2);line-height:1.5">Is this person — or an immediate family member or close associate — entrusted with a prominent public function? <i style="color:var(--red);font-style:normal">*</i></div>
        <div class="pepbtns"><div class="${o.pep === 'No' ? 'on' : ''}" data-act="alPep" data-arg="No" aria-label="No">No</div><div class="${o.pep === 'Yes' ? 'on' : ''}" data-act="alPep" data-arg="Yes" aria-label="Yes">Yes</div></div></div>
        <div class="addubo">${ic('userplus')} Add Another UBO</div>` + foot('Submit for review · locks your application', 'alSubmit');
    return `<div class="onb">${head}<div class="onbcard" id="onb-card">${banner}${stepper}<div class="shead mono">${shead}</div>${body}</div></div>`;
  },
  rAlOnbUpload() {
    const o = this.state.al.onb, u = o.upload;
    if (!u || u === 'filled') return `<div class="banner" id="skip-banner"${u === 'filled' ? ' style="background:#fff"' : ''}><div class="ic"${u === 'filled' ? ' style="background:var(--green-bg);color:var(--green)"' : ''}>${ic(u === 'filled' ? 'check' : 'sparkle', u === 'filled' ? '' : 'fill')}</div><div class="t"><b>${u === 'filled' ? 'Filled 16 fields from your documents — upload more anytime.' : 'Skip the typing — fill this form from documents'}</b>${u === 'filled' ? '' : "<span>Business registration, proof of address, owners' register, bank statement — I'll read them, fill every field they prove, and show you receipts.</span>"}</div><button class="btn teal" data-act="alOnbUpload" data-arg="drop">Upload documents</button></div>`;
    if (u === 'drop' || u === 'picked') return `<div class="ucard" id="skip-banner"><div class="lead">Drop whatever you have · business registration, proof of address, owners' register, bank statement. You review every value; nothing submits without you.</div>
      <div class="drop ${u === 'picked' ? 'has' : ''}" data-act="alOnbPick">${u === 'picked' ? '<span class="pdf">PDF</span><span>ashok_enterprise_mock_business_profile.pdf</span>' : 'Drop files here or click to browse · PDF, PNG, JPG, WEBP, GIF — or an iPhone photo (HEIC)'}</div>
      <div class="acts"><button class="btn teal" data-act="alOnbRead" ${u === 'picked' ? '' : 'disabled'}>Read documents</button><button class="btn link" data-act="alOnbUpload" data-arg="cancel">Cancel</button></div></div>`;
    if (u === 'reading') return `<div class="ucard" id="skip-banner"><div class="glow"></div><div class="rd"><div class="h">${ic('sparkle', 'fill')}Reading your document<span class="sp"></span><span class="tm">12s</span></div><div class="ln ok">${ic('check', 'sm')}<span>Loaded your document</span></div><div class="ln run">${ic('loader', 'sm')}<span><b>Reading them</b><small>ashok_enterprise_mock_business_profile.pdf</small><small>…extracting the business profile and the owners' register</small></span></div><div class="ln"><span>Compiling your receipts</span></div><div class="pbar"><i></i></div><div class="foot">Every value arrives with its source and evidence — nothing fills in until you approve it.</div></div></div>`;
    return `<div class="ucard" id="skip-banner"><div class="res"><div class="h"><span class="ok">${ic('check')}</span><span class="t">Read 1 document · found <b>9 details</b> and <b>1 owner</b>. Fill the form in one click — your answers are never overwritten, and nothing submits.</span><button class="btn teal" data-act="alOnbFill">Fill the form</button><button class="btn link" data-act="alOnbUpload" data-arg="cancel">Start over</button></div>
      <div class="abox"><div class="k mono">Needs your eyes · 3 values were interpreted, not copied</div><div class="it"><span>Business type</span><b style="display:block">Sole proprietorship</b><small style="color:var(--mute)">from ashok_enterprise_mock_business_profile.pdf · "Business structure Sole proprietorship"</small></div><div class="it"><span>Registered address — country</span><b style="display:block">US</b><small style="color:var(--mute)">from ashok_enterprise_mock_business_profile.pdf · "1889 turtle creek drive aurora il 60503"</small></div><div class="it"><span>Owner 1 · ${AL_NAME} Dheeravath · Owner country</span><b style="display:block">US</b><small style="color:var(--mute)">from ashok_enterprise_mock_business_profile.pdf · "1889 turtle creek drive aurora il 60503"</small></div></div>
      <div class="still">› 16 verbatim values · show the full ledger</div><div class="still" style="color:var(--mute)">9 fields couldn't be read from your documents · you'll complete them next.</div><div class="still">› 2 notes from the review</div></div></div>`;
  },
  rAlReview() {
    const o = this.state.al.onb, ok = o.verified;
    return `<div class="review"><div style="text-align:center;margin:0 0 18px">${gfLogo('sm')}</div>
      <div class="rcard2"><div class="h"><div class="ic">${ic('link')}</div><div style="flex:1"><b>Terms of Service</b><span>Share this link to accept the Terms of Service.</span></div><span class="chip g">Accepted</span></div><div class="row"><span style="color:var(--ink2)">Accepted 3m ago.</span></div></div>
      <div class="rcard2"><div class="h"><div class="ic">${ic('idcard')}</div><div style="flex:1"><b>UBO Identity Verification</b><span>Share these links with each beneficial owner to complete their identity verification via selfie/liveness check.</span></div></div>
        <div class="row"><span>${AL_NAME} Dheeravath</span><span class="chip ${ok ? 'g' : 'a'}">${ok ? 'Verified' : 'Not Started'}</span></div>
        <div class="lnk ${o.linkOn ? 'on' : ''}" data-act="alUboLink" aria-label="UBO verification link"><span>https://verify-sandbox.aiprise.com/?verification_session_id=9f2c…b7e1</span>${ic('copy', 'sm')}</div><small>Expires Oct 9, 2026 · Oct 9 · 12:04 PM</small></div>
      <div class="rcard2"><div class="urev ${ok ? 'ok' : ''}"><div class="clock"><i>${ic(ok ? 'check' : 'clock')}</i></div><div class="k mono">${ok ? 'Approved' : 'Under review'}</div><h2>${ok ? 'You are onboarded' : 'Reviewing your application'}</h2>
        <p>${ok ? 'Compliance approved your application and verified the beneficial owner. Funds, beneficiaries and wallets are now unlocked.' : 'Submitted Just now. Compliance is reviewing your application · typically 24–48 hours · next: approval or follow-up questions by email.'}</p>
        <p style="font-size:13.5px">${ok ? 'Head to the dashboard to start using the portal.' : "You'll receive an email the moment a decision is made — funds, beneficiaries, and wallets stay paused until approval."}</p>
        <div class="ref"><small>APPLICATION REFERENCE</small>adabb470-bd29-4ae6-b22a-60fbd0f126d1</div>${ok ? `<div style="margin-top:18px"><button class="btn teal" data-act="alGoDash">Open the dashboard</button></div>` : ''}</div></div></div>`;
  },
  /* ---------- dashboard ---------- */
  rAlDash() {
    const s = this.state, al = s.al, hasW = al.w.created, orders = al.p.orders;
    const stat = (k, v, live) => `<div class="dstat"><div class="k mono">${k}${live ? ' · <em>● live</em>' : ''}</div><div class="v">${v}</div></div>`;
    const vol = orders.length ? '$' + orders.reduce((a, o) => a + (o.type === 'f2s' ? 10.22 : 15), 0).toFixed(2) : '$0';
    return `<div class="dash"><div class="page-h"><div><div class="k mono">Overview</div><h1>Welcome, ${AL_NAME}</h1><div class="s">Your portfolio across 41 currencies — PIX, SPEI, SEPA, M-Pesa, UPI, USDC and more · last 90 days.</div></div><div class="sp"></div><button class="btn teal" data-act="alNewPayment">${ic('plus')} New payment · Lock a rate for 5 min</button></div>
      <div class="dstats">${stat('Total volume · 90d', vol)}${stat('Orders · 90d', orders.length)}${stat('Pending', orders.filter(o => o.st !== 'Success').length, true)}${stat('Avg. processing · 90d', '—')}</div>
      <div class="dtwo"><div class="dcard2"><div class="k mono">Overall portfolio</div><div class="k mono" style="margin-bottom:6px">Fiat accounts</div><div class="mut">${al.fa.live ? '<b style="font-family:Geist Mono">$0.00</b> USD · 1 account' : 'No fiat balances yet'}</div><div class="k mono" style="margin:14px 0 4px">Stablecoins</div><div class="coins"><span>${acoin('usdc')} USDC ${hasW ? '0.00' : '0.00'}</span><span>${acoin('usdt')} USDT 0.00</span></div></div>
        <div class="dcard2"><div class="k mono">Stablecoin distribution</div><div class="bar"></div><div class="mut">No balances yet · fund a wallet to see your USDC / USDT split.</div></div></div>
      <div class="dcharts"><div class="dchart"><h4>Volume trends · 30 days</h4><svg viewBox="0 0 900 200" width="100%" height="200">${[0, 1, 2, 3, 4].map(i => `<line x1="40" x2="880" y1="${20 + i * 40}" y2="${20 + i * 40}" stroke="#eef0f2" stroke-dasharray="3 3"/><text x="28" y="${24 + i * 40}" text-anchor="end">${4 - i}</text>`).join('')}${[...Array(15)].map((_, i) => `<text x="${40 + i * 60}" y="196">Sep ${String(2 + i * 2).padStart(2, '0')}</text>`).join('')}</svg></div>
        <div class="dchart"><h4>Volume by source currency · 90 days</h4><div class="ph">No currencies yet · the donut fills with USD, BRL, MXN, EUR, INR (and more) as your payments settle.</div></div></div>
      <div class="dwallets" id="dw"><div class="k mono">Self-custody wallets<span class="sp"></span><a>View all</a></div>${hasW ? `<div class="wtile"><span class="nb pol" style="width:34px;height:34px;font-size:14px">P</span><div><b style="display:block">Polygon</b><small style="font-family:'Geist Mono';color:var(--ink2)">0xc133…5932 · 0.00 USDC</small></div></div>` : `<div class="cwtile" data-act="alCreateWallet" aria-label="Create wallet">${ic('plus')}Create wallet</div>`}</div>
      <div class="dchart" style="margin-top:16px;min-height:120px"><div class="k mono" style="font-size:10.5px;color:var(--mute);margin-bottom:8px">● Activity · ${orders.length} total</div><h4>Recent transactions</h4>${orders.length ? orders.map(o => `<div class="mut" style="padding:6px 0;font-family:'Geist Mono'">${alMoney[o.type].sc} → ${alMoney[o.type].rc} · ${o.st}</div>`).join('') : '<div class="ph" style="padding:20px">USD → BRL · Pending · rail &nbsp;&nbsp; USD → MXN · Pending · rail</div>'}</div></div>`;
  },
  /* ---------- wallets ---------- */
  rAlWallets() {
    const w = this.state.al.w;
    return `<div class="wpage"><div class="page-h"><div><div class="k mono">Self-custody · ${w.created ? '1 wallet' : 'no wallets yet'}</div><h1>Wallets</h1><div class="s">You hold one half of your wallet key; the other half is secured for you. Every send is unlocked by your passkey, then co-signed by both halves.</div></div><div class="sp"></div><button class="btn teal" data-act="alCreateWallet">${ic('plus')} Create wallet</button></div>
      <div class="secup"><div class="sh">${ic('shield')}</div><div><div class="k mono">Security upgrade · 10-second setup</div><b>Protect your wallet with Touch ID</b><span>Tap-to-confirm withdraws · no 6-digit codes to type.</span><div class="acts"><button class="btn dark">Set up Touch ID</button><span style="font-size:14px;color:var(--ink2)">Not now</span></div></div></div>
      <div class="netchips"><span class="netchip"><span class="nb eth">E</span>Ethereum <small>· USDC/USDT</small></span><span class="netchip"><span class="nb pol">P</span>Polygon <small>· ${w.created ? '1 wallet' : 'USDC/USDT'}</small>${w.created ? '<span class="g"></span>' : ''}</span><span class="netchip"><span class="nb trx">T</span>Tron <small>· USDT</small></span></div>
      <div class="onlywarn">${ic('warn')} Only <b>USDC</b> and <b>USDT</b> are supported on these wallets. Sending any other token, or sending on an unsupported network, may cause permanent loss we cannot recover.</div>
      <div class="hdr">${ic('shield', 'sm')} Self-custody wallets <span class="tag">Passkey co-signed</span></div>
      <div class="wsum"><div><div class="k mono">Total self-custody value</div><div class="v">$0.00</div></div><div class="div"><div class="k mono">Portfolio diversity</div><div class="r"><span>Other</span><b>100%</b></div><div class="bar"></div></div></div>
      ${w.created ? `<div class="wcard"><div class="h"><span class="nb pol">P</span><div><b>Polygon</b><span class="ad">0xc133...5932 ${ic('copy', 'sm')}</span></div><span class="sp"></span><span class="erc">${ic('shield', 'sm')} ● ERC-20</span></div><div class="bal">0.00<small>USDC</small></div><div class="bal">0.00<small>USDT</small></div></div>`
        : `<div class="empty" style="padding:50px 20px"><b>No wallets yet</b><span>Create your first self-custody wallet on Ethereum, Polygon or Tron — it takes under a minute.</span><div style="margin-top:18px"><button class="btn teal" data-act="alCreateWallet">${ic('plus')} Create your first wallet</button></div></div>`}</div>`;
  },
  rAlWalletNew() {
    const w = this.state.al.w, order = ['security', 'network', 'generate', 'backup', 'ready'], cur = w.step === 'pw' || w.step === 'saved' ? 'backup' : w.step, ci = order.indexOf(cur);
    const steps = `<div class="wsteps">${['Security', 'Network', 'Generate', 'Backup', 'Ready'].map((n, i) => `${i ? `<div class="ln ${i <= ci ? 'on' : ''}"></div>` : ''}<div class="o ${i < ci ? 'done' : i === ci ? 'cur' : ''}"><div class="d">${i < ci ? ic('check') : '<i></i>'}</div>${n}${i === 2 && ci > 2 ? '<small>Complete</small>' : i === 2 && ci === 2 ? '<small>Getting address…</small>' : ''}</div>`).join('')}</div>`;
    let body = '';
    if (w.step === 'security') body = `<div class="ico-big">${ic('shield')}</div><h2>Create your self-custody wallet</h2><p>Split key: you hold one half on this device, a secure enclave holds the other. Neither side can move funds without the other plus your passkey.</p>
      <div class="wlist"><div class="li on"><div class="ic">${ic('shield')}</div><div><b>Split key · neither side can sign alone</b><span>Your half lives on this device · the other half sits behind hardened key-management hardware at Portal HQ</span></div></div><div class="li"><div class="ic">${ic('lock')}</div><div><b>Encrypted with your password · separate key per wallet</b><span>Backup material is encrypted on-device before it ever leaves — passkey or password unwraps it on restore</span></div></div><div class="li"><div class="ic">${ic('finger')}</div><div><b>Passkey or 12-word seed · restore on any device</b><span>Lose this device → enroll a passkey, recover your share, resume signing in under a minute</span></div></div></div>
      <div class="cta"><button class="btn teal wide" data-act="alWStep" data-arg="network">Continue · pick a network</button></div>`;
    if (w.step === 'network') body = `<h2>Pick a network for your wallet</h2><p>Each chain settles at a different speed and carries different stablecoins. You can spin up another wallet on any other network later — they share the same MPC key infrastructure.</p>
      <div class="nets">${[['eth', 'Ethereum', 'ERC-20', 'USDC · USDT'], ['pol', 'Polygon', 'ERC-20', 'USDC · USDT'], ['trx', 'Tron', 'TRC-20', 'USDT']].map(([k, n, t, c]) => `<div class="net ${w.net === k ? 'on' : ''}" data-act="alWNet" data-arg="${k}" aria-label="${n}">${w.net === k ? `<span class="tick">${ic('check')}</span>` : ''}<span class="nb ${k}">${n[0]}</span><b>${n}</b><small>${t}</small><span>${c}</span></div>`).join('')}</div>
      ${w.net ? `<div class="picked">Picked <b>${{ eth: 'Ethereum', pol: 'Polygon POS', trx: 'Tron' }[w.net]}</b> · stablecoins ${w.net === 'trx' ? 'USDT' : 'USDC, USDT'} · gas paid in stablecoin</div>` : '<div class="picked">Pick a network to continue</div>'}
      <div class="two"><button class="btn ghost" data-act="alWStep" data-arg="security">Back</button><button class="btn teal" data-act="alWGenerate" ${w.net ? '' : 'disabled'}>Create wallet</button></div>`;
    if (w.step === 'generate') body = `<div class="ico-big"><div class="spin" style="width:34px;height:34px;border-width:3px;border-color:var(--al);border-left-color:transparent;margin:0"></div></div><h2>Generating your self-custody wallet</h2><p style="margin-bottom:12px">Keys are generated in your browser — they never leave this device.</p>
      <div class="gen"><div class="li ok"><span class="c">${ic('check')}</span>Generating your wallet key — both halves, in your browser</div><div class="li run"><span class="c"></span>Deriving wallet address</div><div class="li"><span class="c"></span>Registering address with backend</div></div>`;
    if (w.step === 'backup') body = `<div class="ico-big warn">${ic('warn')}</div><h2>Back up your wallet key now</h2><p>Without a backup, losing this device means sends are paused for every wallet under this account. Funds stay on-chain, but you can't move them until the key is restored.</p>
      <div class="yellow">${ic('warn', 'sm')}<span><b>This step cannot be skipped.</b> If you lose access to this device without a backup, your wallet and any funds in it will be permanently inaccessible. No one can recover your wallet for you.</span></div>
      <div class="bkopt" data-act="alWStep" data-arg="pw"><div class="ic">${ic('key')}</div><div><b>Back up with password</b><span>Download an encrypted backup file. You'll need the file + your password to recover on any device.</span></div></div>`;
    if (w.step === 'pw') { const n = w.pw.length, m = n >= 16 ? 4 : n >= 12 ? 3 : n >= 8 ? 2 : n ? 1 : 0; body = `<div class="ico-big warn">${ic('warn')}</div><h2>Back up your wallet key now</h2><p>Without a backup, losing this device means sends are paused for every wallet under this account. Funds stay on-chain, but you can't move them until the key is restored.</p>
      <div class="yellow">${ic('warn', 'sm')}<span><b>This step cannot be skipped.</b> If you lose access to this device without a backup, your wallet and any funds in it will be permanently inaccessible. No one can recover your wallet for you.</span></div>
      <div class="bkopt"><div class="ic">${ic('key')}</div><div><b>Back up with password</b><span>Download an encrypted backup file. You'll need the file + your password to recover on any device.</span></div></div>
      <div class="bkform"><div class="red">${ic('warn', 'sm')}<span><b>This file plus your password is the only way to recover your wallet.</b> Only one half of your key is stored on our servers, so no one can restore this wallet for you. Lose the file or forget the password and this wallet — and any funds in it — becomes permanently unrecoverable. Save both before you continue.</span></div>
        <label class="lbl">Encryption password (min 12 characters)</label>${this.ainp('al.w.pw', w.pw, 'Enter a strong password', 'Enter a strong password', '', 'password')}<div class="meter">${[1, 2, 3, 4].map(i => `<i class="${i <= m ? (m >= 3 ? 'g' : 'a') : ''}"></i>`).join('')}</div>
        <div class="tips">Store this file securely:<br><b>Do</b> · keep in a password manager or offline storage<br><span class="no">Don't</span> · email it, screenshot it, or store in cloud notes</div>
        <div class="acts"><button class="btn ghost" data-act="alWStep" data-arg="backup">Cancel</button><button class="btn teal" data-act="alWDownload" ${n >= 12 ? '' : 'disabled'}>Download backup</button></div></div>`; }
    if (w.step === 'saved') body = `<div class="ico-big ok">${ic('shield')}</div><h2>Backup saved · sends protected</h2><p>Your wallet key (for all networks) is encrypted and recoverable with your backup file and password. Keep both safe — it is the only way to restore this wallet.</p>
      <div class="okbox"><div class="ic">${ic('key')}</div><div><b>Backed up with password · encrypted file</b><span>.json on your device · recover anywhere with the file + your password</span></div>${ic('check', 't')}</div>
      <div class="ack"><label class="chk ${w.ack ? 'on' : ''}" data-act="alWAck"><span class="b">${w.ack ? ic('check', 'sm') : ''}</span>I understand that keeping my backup safe is my responsibility, and that losing it means permanently losing access to my wallet.</label></div>
      <div class="cta"><button class="btn teal wide" data-act="alWStep" data-arg="ready" ${w.ack ? '' : 'disabled'}>Continue to wallet</button></div>`;
    if (w.step === 'ready') body = `<div class="ico-big ok">${ic('shield')}</div><h2>Your wallet is ready</h2><p>Polygon POS wallet · USDC and USDT · passkey co-signed.</p><div class="readycard"><span class="nb pol" style="width:40px;height:40px;font-size:16px">P</span><div><b>Polygon wallet</b><small>0xc1337e6b2a4f91d0e8c3a7b5f2d4e6a8c0b1d5932</small></div><span style="margin-left:auto">${ic('eye')}</span></div><div class="cta" style="margin-top:22px"><button class="btn teal wide" data-act="alWDone">Done</button></div>`;
    return `<div class="wiz"><div class="back" data-act="alNav" data-arg="wallets">${ic('arrowl')} Back to wallets</div>${steps}${body}</div>`;
  },
  /* ---------- fiat accounts ---------- */
  rAlFiat() {
    const f = this.state.al.fa, live = f.live, prov = f.prov && !live;
    const chip = (fl, c, r, on, spin) => `<span class="c ${on ? 'on' : ''}"><span class="fl">${fl}</span>${c} <small>· ${r}</small>${on ? '<span class="g"></span>' : spin ? '<span class="spin" style="width:12px;height:12px;border-width:2px;margin:0"></span>' : ''}</span>`;
    const card = live ? `<div class="acctcard"><div class="h"><span class="fl">🇺🇸</span><div><b>US Dollar</b><small>USD</small></div></div><div class="bal">0.00<small>USD</small></div>
        <div class="num">${f.reveal ? '<span>369637ac-cdc4-48c6-a7ff-4fa82a73aa46</span>' : '<span>•••• aa46</span>'}${f.reveal ? ic('copy', 'sm') : ''}<span data-act="alFaReveal" aria-label="Reveal account number" style="display:inline-flex">${ic('eye', 'sm')}</span></div><div class="bank">${ic('bank', 'sm')} SSB</div><button class="btn ghost" data-act="noop">View routing &amp; transactions</button></div>`
      : prov ? `<div class="acctcard prov"><div class="h"><span class="fl">🇺🇸</span><div><b>US Dollar</b><small>USD</small></div><span class="sp"></span><span class="chip a">Provisioning</span></div><div class="mut"><small>⚡ FUNDS ARRIVE VIA ACH</small></div><div class="k mono">Account number</div><div class="pb"><i></i></div><div class="mut"><small>~60s typical · 2s elapsed</small>Setting up with our partner bank. It appears here automatically when ready, so you can safely leave this page.</div></div>` : '';
    return `<div class="wpage"><div class="page-h"><div><div class="k mono">Fiat accounts${live ? ' · 1 account live' : prov ? ' · 1 generating' : ''}</div><h1>Fiat accounts</h1><div class="s">Receive in USD, EUR, GBP, or MXN — named to you, routed on the local rail the moment funds land.</div></div><div class="sp"></div><button class="btn teal" data-act="alFaOpen">${ic('plus')} Request account</button></div>
      <div class="fcrow">${chip('🇺🇸', 'USD', 'ACH', live, prov)}${chip('🇪🇺', 'EUR', 'SEPA Instant')}${chip('🇬🇧', 'GBP', 'FPS')}${chip('🇲🇽', 'MXN', 'SPEI')}</div>
      ${card || `<div class="fempty"><div class="ghost"><div><i></i><b></b><small>ACH</small></div><div><i></i><b></b><small>SEPA INSTANT</small></div><div><i></i><b></b><small>FPS</small></div><div><i></i><b></b><small>SPEI</small></div></div><h3>No fiat accounts yet</h3><p>Provision a named bank account in USD, EUR, GBP, or MXN. Funds you receive land in the same currency, then convert to USDC/USDT or pay out to a beneficiary on the matching local rail.</p><button class="btn teal" data-act="alFaOpen">${ic('plus')} Request your first account</button></div>`}</div>`;
  },
  rAlFiatModal() {
    const f = this.state.al.fa;
    return `<div class="fmodal"><div class="bx"><h3>${ic('moneyin')} Request deposit account</h3><span class="x" data-act="alFaClose">${ic('x')}</span>
      <div class="info">${ic('info')}<span>Select a currency to provision a new deposit bank account. Your bank account will be generated shortly.</span></div>
      <label class="lbl">Currency<i>*</i></label>${this.alsel('al.fa.cur', f.cur, 'Select currency', ['EUR (Euro)', 'GBP (British Pound)', 'MXN (Mexican Peso)', 'USD (US Dollar)'], 'Select currency')}
      <div class="acts"><button class="btn ghost" data-act="alFaClose">Cancel</button><button class="btn teal" data-act="alFaGenerate" ${f.cur ? '' : 'disabled'}>${f.busy ? 'Creating account…' : 'Generate account'}</button></div>
      ${f.busy ? `<div class="busy"><div class="spin"></div>Requesting ${f.cur.slice(0, 3)} deposit account…</div>` : ''}</div></div>`;
  },
  /* ---------- beneficiaries (sender portal list) ---------- */
  rAlBenes() {
    const s = this.state, created = s.created, ap = s.newStatus === 'approved', name = s.form.fullName || 'Lincoln Strategy Labs LLP';
    const total = created ? 1 : 0, active = ap ? 1 : 0;
    return `<div class="blist"><div class="page-h"><div><div class="kicker mono">Beneficiaries · ${total} total · ${active} active · rails: PIX · SPEI · M-Pesa · SEPA · +more</div><h1>Beneficiaries</h1><div class="sub">Verified payees with rail-ready destinations across 41 currencies — PIX, SPEI, SEPA, M-Pesa, UPI, USDC and more. We confirm KYB before any send.</div></div><div class="sp"></div><button class="btn">${ic('export')} Export</button><button class="btn teal" data-act="alOpenCreate">${ic('plus')} Add beneficiary</button></div>
      <div class="card" style="margin-top:22px"><div class="tabs">${['All', 'Approved', 'Pending', 'Declined', 'Unverified'].map(t => `<div class="${s.tab === t ? 'on' : ''}" data-act="tab" data-arg="${t}">${t}</div>`).join('')}</div><div class="pills2"><span class="f">Name</span><span class="f">Email</span><span class="f">Phone number</span><span class="sp" style="flex:1"></span><span class="sel" style="padding:8px 12px;width:150px"><span>Newest</span><span class="sp"></span>${ic('down', 'sm')}</span></div></div>
      <div class="card" style="margin-top:14px"><div class="live"><span style="color:var(--green)">●</span> LIVE · 30S &nbsp; ${total} beneficiar${total === 1 ? 'y' : 'ies'}<span class="sp"></span><span class="kk">Active <b>${active}</b></span><span class="kk">Verification <b>${total ? Math.round(active / total * 100) : 0}%</b></span></div></div>
      <div class="card" style="margin-top:14px;overflow:hidden"><table><thead><tr><th class="mono">Name</th><th class="mono">Country</th><th class="mono">Type</th><th class="mono">Status</th><th class="mono">Rail</th><th class="mono">Added</th><th></th></tr></thead>
        <tbody>${created && (s.tab === 'All' || s.tab === (ap ? 'Approved' : 'Pending')) ? `<tr class="new"><td><span class="nm"><span class="bi ${ap ? 'g' : 'a'}">${ic('bldg')}</span>${esc(name)}</span></td><td><span class="cc">🇮🇳 IN <span class="cur">· INR</span></span></td><td><span class="ty">${ic('bldg', 'sm')}Business</span></td><td><span class="chip ${ap ? 'g' : 'a'}">${ap ? 'Approved' : 'Pending'}</span></td><td>UPI</td><td>Just now</td><td class="arr">${ic('right', 'sm')}</td></tr>` : `<tr><td colspan="7"><div class="ghostrow"></div></td></tr>`}</tbody></table>
        <div style="display:flex;justify-content:flex-end;gap:18px;padding:14px 18px;font-size:13px;color:var(--ink2)">Rows per page: 50 ▾ <span>${total ? '1–1 of 1' : '0–0 of 0'}</span></div></div></div>`;
  },
  /* ---------- orders ---------- */
  rAlOrders() {
    const p = this.state.al.p, rows = p.orders;
    const chip = st => ({ Created: 'p', 'In Progress': 'a', Success: 'g' })[st];
    return `<div class="wpage"><div class="page-h"><div><div class="k mono">Orders${rows.length ? ' · ' + rows.length + ' total' : ''} · live</div><h1>Orders</h1><div class="s">Cross-border payments across 41 currencies — PIX, SPEI, SEPA, M-Pesa, UPI, USDC and more · sortable, filterable, exportable.</div></div><div class="sp"></div><button class="btn">${ic('export')} Export</button><button class="btn teal" data-act="alNewPayment">${ic('plus')} Create payment · Lock a rate for 5 min</button></div>
      <div class="card" style="margin-top:22px;padding:16px 18px"><div class="osearch">${ic('search', 'sm')} Search by order ID</div><div class="k mono" style="font-size:10.5px;color:var(--mute);margin-bottom:10px">Quick filters</div><div class="qf"><span class="on">Today's orders</span><span>Created</span><span>In progress</span><span>Awaiting funds</span><span>Awaiting funds timeout</span><span>Success</span><span>Failed</span><span>Refunded</span><span>Rejected</span><span>Returned</span><span>Cancelled</span><span style="margin-left:auto">⚟ Advanced filters</span></div></div>
      <div class="ocount"><b>${rows.length}</b> orders</div>
      <div class="card otable" style="overflow:hidden"><table><thead><tr><th class="mono">Order</th><th class="mono">Amount</th><th class="mono">Status</th><th class="mono">Sender</th><th class="mono">Beneficiary</th></tr></thead><tbody>
        ${rows.length ? rows.map((o, i) => { const m = alMoney[o.type]; return `<tr class="${i === 0 ? 'new' : ''}"><td><div class="oid">${AL_ORDER_IDS[o.type]} ${ic('copy', 'sm')}<small>${o.when}</small></div></td><td><div class="amt">${acoin(m.sk)} ${m.sa} <small>${m.sc}</small> → ${acoin(m.rk)} ${m.ra} <small>${m.rc}</small></div></td><td><span class="chip ${chip(o.st)}">${o.st}</span></td><td>${AL_CO}</td><td>Pacific Ledger Services</td></tr>`; }).join('')
          : `<tr><td colspan="5"><div class="otl">${['Created', 'Awaiting funds', 'Funds received', 'Disbursed', 'Sent to beneficiary', 'Completed'].map((n, i) => `<div class="n ${i ? '' : 'first'}"><i></i>${n}</div>`).join('')}</div></td></tr>`}</tbody></table>
        <div style="display:flex;justify-content:flex-end;gap:18px;padding:14px 18px;font-size:13px;color:var(--ink2)">Rows per page: 50 ▾ <span>${rows.length ? `1–${rows.length} of ${rows.length}` : '0–0 of 0'}</span></div></div></div>`;
  },
  rAlOrderDetail() {
    const p = this.state.al.p, t = p.detail || 'f2s', m = alMoney[t];
    return `<div class="odet"><div class="page-h"><div><div class="k mono">Order · live</div><h1>Order details</h1><div class="s">Status timeline, rail, FX rate, deposit instructions, and receipt for this payment.</div></div><div class="sp"></div><button class="btn" data-act="alNav" data-arg="orders">${ic('arrowl', 'sm')} Back to orders</button><button class="btn">${ic('refresh', 'sm')} Refresh</button></div>
      <div class="grid3"><div class="card3"><div class="kvs">${ic('check', 'sm')} ORDER ID<span class="chip p" style="margin-left:auto">Created</span></div><div class="kvv mono2">${AL_ORDER_IDS[t]} ${ic('copy', 'sm')}</div><div class="kvs">${ic('clock', 'sm')} CREATED</div><div class="kvv">Just now</div><div class="kvs">${ic('user', 'sm')} SENDER</div><div class="kvv" style="border:0;margin:0;padding-bottom:6px">${AL_CO}</div><div class="amtbox">SOURCE AMOUNT<span class="v">${acoin(m.sk)} ${m.sa} <small>${m.sc}</small></span></div><div class="kvs">${ic('bank', 'sm')} BENEFICIARY</div><div class="kvv" style="border:0;margin:0;padding-bottom:6px">Pacific Ledger Services</div><div class="amtbox">TARGET AMOUNT<span class="v">${acoin(m.rk)} ${m.ra} <small>${m.rc}</small></span></div></div>
        <div><div class="card3 tl"><div class="kvs">ORDER TIMELINE</div><div style="font-size:16px;font-weight:600;margin-bottom:4px">Each step recorded as it happened</div><div class="ev"><i></i><div><b>Created</b><small>Just now</small></div></div></div><div style="margin-top:16px;text-align:right"><button class="btn" style="background:#c93b4b;color:#fff;border-color:#c93b4b">Cancel order</button></div></div></div></div>`;
  },
  /* ---------- create payment ---------- */
  rAlPay() {
    const s = this.state, p = s.al.p, t = p.type;
    const types = [['f2s', 'Fiat → Stable', 'USD → USDC · ETHEREUM', 'bank', 'dollar'], ['s2f', 'Stable → Fiat', 'USDC → BRL · PIX', 'dollar', 'bank'], ['s2s', 'Stable → Stable', 'USDC → USDT · ETHEREUM', 'dollar', 'dollar']];
    const cards = `<div class="ptypes">${types.map(([k, n, c, a, b]) => `<div class="ptype ${t === k ? 'on' : ''}" data-act="alPType" data-arg="${k}" aria-label="${n}"><div class="ic">${ic(a)}<span class="ar">⇢</span>${ic(b)}</div><b>${n}</b><small>${c}${t === k ? '<span class="g"></span>' : ''}</small></div>`).join('')}</div>`;
    const stepper = `<div class="psteps">${['Amount', 'Parties', 'Review'].map((n, i) => { const k = i + 1; return `${i ? `<div class="ln ${k <= p.step ? 'on' : ''}"></div>` : ''}<div class="o ${k < p.step ? 'done' : k === p.step ? 'cur' : ''}"><div class="d">${k < p.step ? ic('check') : '<i></i>'}</div>${n}${k === 2 && p.step === 2 ? '<small>Choose sender and recipient</small>' : ''}</div>`; }).join('')}</div>`;
    if (p.auth) return this.rAlAuth();
    if (p.step === 3) return `<div class="pay">${this.rAlSummary()}</div>`;
    const head = p.step === 1 ? `<h1>Create payment</h1>${cards}<div class="pback" data-act="alNav" data-arg="orders">${ic('arrowl', 'sm')} Back to orders</div>` : `${cards}<div class="pback" data-act="alPBack">${ic('arrowl', 'sm')} Back</div>`;
    return `<div class="pay">${head}${stepper}<div class="pgrid"><div>${p.step === 1 ? this.rAlPayAmount() : this.rAlPayParties()}</div>${this.rAlDraft()}</div></div>`;
  },
  rAlPayAmount() {
    const p = this.state.al.p, t = p.type, stable = t !== 'f2s';
    const src = stable ? `<div class="pcard2"><h4>Select source wallet<small>Self-custody</small></h4><div class="srcrow ${p.src === 'eth' ? 'on' : ''}" data-act="alPSrc" data-arg="eth" aria-label="Ethereum wallet"><span class="nb eth" style="width:40px;height:40px;font-size:13px">Et</span><div><b aria-label="Ethereum wallet name">Ethereum</b><small>0x3550df...de7e</small></div><div class="amt"><div>${acoin('usdc')} ${t === 's2s' && this.state.al.p.orders.some(o => o.type === 's2f') ? '64.99' : '80.00'} <small style="display:inline;margin:0">USDC</small></div><div>${acoin('usdt')} 0.00 <small style="display:inline;margin:0">USDT</small></div></div></div></div>`
      : `<div class="pcard2"><h4>Select source account</h4><div class="srcrow ${p.src === 'usd' ? 'on' : ''}" data-act="alPSrc" data-arg="usd" aria-label="USD account"><div><b>USD account</b><span class="tag">USD</span><small>••••feb4</small></div><div class="amt">$196.80 USD</div></div><div class="srcrow ${p.src === 'gbp' ? 'on' : ''}" data-act="alPSrc" data-arg="gbp" aria-label="GBP account"><div><b>GBP account</b><span class="tag">GBP</span><small>••••8847</small></div><div class="amt">£0.00 GBP</div></div></div>`;
    if (!p.src) return src + `<div class="pfoot"><button class="btn ghost" data-act="alNav" data-arg="orders">Cancel</button><button class="btn teal" disabled>Continue</button></div>`;
    let assets = '';
    if (t === 'f2s') assets = `<div class="pcard2"><label class="lbl2">Receive asset<i style="color:var(--red);font-style:normal">*</i></label><div class="psel">${this.alsel('al.p.asset', p.asset, 'Select stablecoin', ['USDT', 'USDC'], 'Select stablecoin')}</div><label class="lbl2">Network<i style="color:var(--red);font-style:normal">*</i></label><div class="psel">${this.alsel('al.p.net', p.net, 'Select network', ['Ethereum', 'Polygon', 'Tron'], 'Select network')}</div></div>`;
    if (t === 's2f') assets = `<div class="pcard2"><label class="lbl2">Send asset<i style="color:var(--red);font-style:normal">*</i></label><div class="psel">${this.alsel('al.p.asset2', 'USDC', 'USDC', ['USDC', 'USDT'], 'Send asset')}</div><label class="lbl2">Recipient currency<i style="color:var(--red);font-style:normal">*</i></label><div class="psel">${this.alsel('al.p.rcur', p.rcur, 'Select currency', ['CAD', 'AUD', 'INR', 'EUR', 'USD', 'MXN', 'GBP'], 'Select currency')}</div>
      ${p.rcur ? `<label class="lbl2">Routing rail</label><div class="rails">${[['wire', 'Domestic Wire', 'Same-day before bank cut-off', 'Same-day · US business hours · $5.00 flat fee', 'bolt'], ['ach', 'ACH Transfer', 'Lowest fee · usually T+1–2', 'T+1 to T+2 business days · $5.00 flat fee', 'bank'], ['swift', 'International Wire (SWIFT)', 'Cross-border · usually T+1–3', 'T+1 to T+3 days · $5.00 flat fee', 'globe'], ['rtp', 'Real-Time Payments', 'Coming soon', 'Instant · $5.00 flat fee', 'refresh']].map(([k, n, d, sub, i]) => `<div class="rr ${p.rail === k ? 'on' : ''} ${k === 'rtp' ? 'off' : ''}" data-act="alPRail" data-arg="${k}" aria-label="${n}">${ic(i)}<div><b>${n}</b><span>· ${d}</span><small>${sub}</small></div>${p.rail === k ? ic('check', 't') : ''}</div>`).join('')}</div>` : ''}</div>`;
    if (t === 's2s') assets = `<div class="pcard2"><label class="lbl2">Send asset<i style="color:var(--red);font-style:normal">*</i></label><div class="psel">${this.alsel('al.p.asset2', 'USDC', 'USDC', ['USDC', 'USDT'], 'Send asset')}</div><label class="lbl2">Receive asset<i style="color:var(--red);font-style:normal">*</i></label><div class="psel">${this.alsel('al.p.asset', p.asset, 'Select stablecoin', ['USDT', 'USDC'], 'Select stablecoin')}</div><label class="lbl2">Network<i style="color:var(--red);font-style:normal">*</i></label><div class="psel">${this.alsel('al.p.net', p.net, 'Select network', ['Ethereum', 'Polygon', 'Tron'], 'Select network')}</div></div>`;
    const ready = t === 'f2s' ? p.asset && p.net : t === 's2f' ? p.rcur && p.rail : p.asset && p.net;
    const sc = t === 'f2s' ? ['🇺🇸', 'USD'] : ['usdc', 'USDC'], rc = t === 'f2s' ? ['usdc', p.asset || 'USDC'] : t === 's2f' ? ['🇺🇸', p.rcur || 'USD'] : ['usdt', p.asset || 'USDT'];
    const amounts = ready ? `<div class="pcard2"><label class="lbl2">You send</label><div class="amtin">${this.ainp('al.p.send', p.send, 'You send', '0.00')}<span class="cur">${acoin(sc[0])} ${sc[1]}</span></div>${t !== 'f2s' && p.send ? `<div class="total"><div><b>Total leaving wallet</b><small>Includes up to 0.01 network fee charged on top of the amount you send</small></div><span class="mono2">up to ${(parseFloat(p.send || 0) + 0.01).toFixed(2)} USDC</span></div>` : ''}<div class="rate">${p.send ? 'Rate on quote' : 'Rate on quote'}</div><label class="lbl2">They receive</label><div class="amtin">${this.ainp('al.p.recv', p.recv, 'They receive', '0.00')}<span class="cur">${acoin(rc[0])} ${rc[1]}</span></div></div>` : '';
    return src + assets + amounts + `<div class="pfoot"><button class="btn ghost" data-act="alNav" data-arg="orders">Cancel</button><button class="btn teal" data-act="alPContinue" ${ready && p.send ? '' : 'disabled'}>Continue</button></div>`;
  },
  rAlPayParties() {
    const s = this.state, p = s.al.p, t = p.type, open = s.openSel === 'al.p.to';
    const to = `<label class="tolbl">TO</label><div class="tobox"><input class="inp" data-act="alPToOpen" aria-label="Search beneficiaries" placeholder="Search beneficiaries by name, email, phone, or ID…" value="${esc(p.to)}" readonly>${p.to ? `<span class="x" data-act="alPToClear">${ic('x', 'sm')}</span>` : `<span class="x">${ic('search', 'sm')}</span>`}
      ${open ? `<div class="dd2" data-stop="1">${AL_BENES.map(([n, c]) => `<div class="r" data-act="alPTo" data-arg="${esc(n)}" aria-label="${esc(n)}"><span class="bi">${ic('bldg')}</span><div><b>${esc(n)}</b><small>${c}</small></div><span class="ok">${ic('shield', 'sm')}</span></div>`).join('')}</div>` : ''}</div>`;
    const pm = p.to ? (t === 's2f' ? `<label class="lbl2">Payment method</label><div class="help" style="margin:-4px 0 10px">Select how the beneficiary will receive the funds</div><div class="pmcard" data-act="alPMethod" data-arg="bank" aria-label="Bank Account" style="${p.method ? '' : 'border-color:var(--line)'}"><span class="bi">${ic('bank')}</span><div><b>Bank Account</b><span class="tag">Primary Bank</span><small><i>Wire</i> ••••7643 · BANK OF AMERICA N.A. 🇺🇸</small></div>${p.method ? `<span class="ok">${ic('check')}</span>` : ''}</div>`
      : `<label class="lbl2">Payment method</label><div class="help" style="margin:-4px 0 10px">Select how the beneficiary will receive the funds</div><div class="pmcard" data-act="alPMethod" data-arg="wallet" aria-label="Crypto Wallet" style="${p.method ? '' : 'border-color:var(--line)'}"><span class="bi" style="color:#627eea">◆</span><div><b>Crypto Wallet</b><span class="tag">Primary Stable</span><small><i>ETHEREUM</i> 0xca63...A5Ca</small></div>${p.method ? `<span class="ok">${ic('check')}</span>` : ''}</div>`) : `<label class="lbl2">Payment method</label><div class="help" style="margin:-4px 0 10px">Select how the beneficiary will receive the funds</div><div style="height:140px;background:linear-gradient(#f6f7f8,#fbfbfc);border-radius:12px;filter:blur(2px)"></div>`;
    const det = p.method ? `<div class="pdet"><h4>Payment details</h4><div class="g2"><div><label class="lbl">${ic('circle', 'sm')} Purpose<i>*</i></label><div class="psel">${this.alsel('al.p.purpose', p.purpose, 'Select purpose…', ['Payroll', 'Operational expense', 'Vendor payment', 'Subsidiary transfer', 'Accounting services', 'Business profits'], 'Select purpose')}</div><div class="help">Purpose is required for compliance reporting on every payment.</div></div><div><label class="lbl">${ic('bank', 'sm')} Source of funds<i>*</i></label><div class="psel">${this.alsel('al.p.sof', p.sof, 'Select source…', ['Advance from director', 'Advance from shareholder', 'Business income', 'Claims', 'Compensation'], 'Select source')}</div><div class="help">Source of funds is required for AML compliance on every payment.</div></div>
      <div><label class="lbl">${ic('users', 'sm')} Relationship<i>*</i></label><div class="psel">${this.alsel('al.p.rel', p.rel, 'Select relationship…', ['Employee', 'Franchisee', 'Holding company', 'Self', 'Subsidiary company', 'Supplier'], 'Select relationship')}</div><div class="help">Beneficiary relationship is required for KYC on every payment.</div></div><div><label class="lbl">Reference (optional)</label><input class="inp" aria-label="Reference" placeholder="e.g. INV-2024-001"></div></div>
      <div class="docs">${ic('paperclip', 'sm')} Supporting documents (optional)</div></div>` : '';
    return `<div class="pcard2" style="border:0;padding:0;background:transparent">${to}${pm}${det}</div><div class="pfoot"><button class="btn ghost" data-act="alPBack">Back</button><button class="btn teal" data-act="alPContinue" ${p.purpose && p.sof && p.rel ? '' : 'disabled'}>Continue</button></div>`;
  },
  rAlDraft() {
    const p = this.state.al.p, t = p.type, m = alMoney[t] || alMoney.f2s, quoted = !!p.send;
    const sc = t === 'f2s' ? ['🇺🇸', 'USD'] : ['usdc', 'USDC'], rc = t === 'f2s' ? ['usdc', p.asset || 'USDC'] : t === 's2f' ? ['🇺🇸', p.rcur || 'USD'] : ['usdt', p.asset || 'USDT'];
    const rate = { f2s: '1 USD = 0.9785 USDC', s2f: '1 USDC = 0.6520 USD', s2s: '1 USDC = 0.9733 USDT' }[t];
    if (!quoted) return `<div class="draft"><div class="k mono">Your payment · draft</div><b class="t">Fills in as you type</b><p>Enter an amount and a destination currency. This panel fills with your live quote · rate, locked window, and total · the moment we pick a rail.</p></div>`;
    return `<div class="draft"><div class="k mono">Your payment · draft · step ${p.step} / 3<span class="ql">QUOTE LIVE</span></div><b class="t">${p.step === 1 ? 'Quote ready' : 'Ready to lock + send'}</b>
      <div class="amtl">${acoin(sc[0])} ${p.send} ${sc[1]}</div><div class="arrow">↓</div><div class="amtl">${acoin(rc[0])} ${p.recv} ${rc[1]}</div>
      <div class="eff">Effective rate: ${rate} · fees included${t === 's2f' ? '<br>Transfer method: <b>Domestic Wire · same-day, US hours</b> · Same-day · US business hours' : ''}${t !== 'f2s' ? `<br>Network fee: up to 0.01 USDC<br><b>Total from wallet: up to ${(parseFloat(p.send) + 0.01).toFixed(2)} USDC</b>` : ''}</div>
      ${t === 's2f' ? `<div class="fee">${ic('info', 'sm')} This quote includes a flat fee of 5 USDC_ETH</div>` : ''}
      <div class="qbox"><div class="k mono">${ic('sparkle', 'sm')} Current quote</div><span class="pill">${ic('clock', 'sm')} Quote expires in 4m 58s${p.step > 1 ? ' · renews automatically' : ''}</span></div>
      <div class="kv"><b>From:</b> ${AL_NAME}</div>${p.to ? `<div class="kv"><b>To:</b> ${esc(p.to)}</div>` : ''}${p.method ? `<div class="kv"><b>Via:</b> ${p.method === 'bank' ? 'Bank Account ···7643' : 'Crypto Wallet'}</div>` : ''}
      <div class="kv">${p.step === 1 ? 'Step 2: Select parties<br>' : ''}Step 3: Review &amp; send</div></div>`;
  },
  rAlSummary() {
    const p = this.state.al.p, t = p.type, fiat = t === 'f2s';
    const sc = fiat ? ['🇺🇸', 'USD'] : ['usdc', 'USDC'], rc = fiat ? ['usdc', p.asset || 'USDC'] : t === 's2f' ? ['🇺🇸', p.rcur || 'USD'] : ['usdt', p.asset || 'USDT'];
    const rate = { f2s: '1 USD = 0.9785 USDC', s2f: '1 USDC = 0.6520 USD', s2s: '1 USDC = 0.9733 USDT' }[t];
    return `<div class="summ"><div class="final">Final confirmation</div><h2>Payment summary</h2>
      <div class="scard"><div class="h">Exchange details<span class="ed">${ic('pen', 'sm')} Edit</span></div><div class="r">You send<span class="v">${acoin(sc[0])} ${p.send} ${sc[1]}</span></div><div class="r">They receive<span class="v">${acoin(rc[0])} ${p.recv} ${rc[1]}</span></div><div class="r">Effective rate<span class="v">${rate} <small>FEES INCLUDED</small></span></div>${fiat ? '' : `<div class="r" style="border-top:1px solid var(--line2);margin-top:4px;padding-top:12px">Network fee<span class="v">up to 0.01 USDC</span></div><div class="r tot">Total from wallet<span class="v">up to ${(parseFloat(p.send) + 0.01).toFixed(2)} USDC</span></div><div class="note">The actual network fee may be lower; any remainder stays in your wallet.</div>`}<span class="exp">Rate expires in 4m 38s</span></div>
      <div class="scard"><div class="h">Participants<span class="ed">${ic('pen', 'sm')} Edit</span></div><div class="party"><span class="bi">${ic('bldg')}</span><div class="t"><small>From</small><b>${AL_NAME}</b><span>Business</span></div></div><div style="color:var(--mute);margin-left:12px">↓</div><div class="party"><span class="bi">${ic('bldg')}</span><div class="t"><small>To</small><b>${esc(p.to)}</b><span>Business · Approved</span></div></div><div class="via">Via <b>${p.method === 'bank' ? 'Bank Account · Wire ••••7643 · BANK OF AMERICA N.A.' : 'Crypto Wallet · Ethereum 0xca63...A5Ca'}</b></div></div>
      <div class="scard"><div class="h">Payment details<span class="ed">${ic('pen', 'sm')} Edit</span></div><div class="r">Purpose<span class="v" style="font-family:Geist">${esc(p.purpose)}</span></div><div class="r">Source of funds<span class="v" style="font-family:Geist">${esc(p.sof)}</span></div><div class="r">Relationship<span class="v" style="font-family:Geist">${esc(p.rel)}</span></div></div>
      <div class="foot"><button class="btn ghost" data-act="alPBack">Back</button><small>${fiat ? 'By sending, you agree to the Terms &amp; Conditions.' : 'Next: authorize from your self-custody wallet.'}</small><button class="btn teal" data-act="alPSend">${fiat ? 'Send payment' : 'Create payment'}</button></div></div>`;
  },
  rAlAuth() {
    const p = this.state.al.p, m = alMoney[p.type];
    if (p.auth === 'signing') return `<div class="authz"><div class="k mono">${ic('shield', 'sm')} Authorize · self-custody</div><h2>Authorize your payment</h2><p>Approve the transfer from your wallet to fund this order. This is a one-time step — if you close it or leave before approving, this order is abandoned and you'll need to start a new one.</p><div class="spinwrap"><div class="spin" style="width:34px;height:34px;border-width:3px;border-color:var(--al);border-left-color:transparent;margin:0 auto"></div><div style="margin-top:14px;color:var(--ink2)">Signing with your wallet…</div></div></div>`;
    return `<div class="authz"><div class="k mono">${ic('shield', 'sm')} Authorize · self-custody</div><h2>Authorize your payment</h2><p>Approve the transfer from your wallet to fund this order. This is a one-time step — if you close it or leave before approving, this order is abandoned and you'll need to start a new one.</p>
      <p>${m.sa} ${m.sc} → ${m.ra} ${m.rc} · effective ${{ s2f: '1 USDC = 0.6520 USD', s2s: '1 USDC = 0.9733 USDT' }[p.type]} · fees included · to Pacific Ledger Services</p>
      <div class="wal"><div class="k mono">${ic('wallet', 'sm')} Your self-custody wallet</div><p>Send the USDC for this order straight from your self-custody wallet on Ethereum · no Ether needed, and you'll authorize it with your passkey.</p><div class="mut">Network fee: up to 0.01 USDC — the actual fee may be lower and any remainder stays in your wallet.</div><div class="tc">By authorizing this payment, you agree to the <u>Terms &amp; Conditions</u>.</div>
        <button class="btn teal" data-act="alPPay">${ic('export', 'sm')} Pay ${m.sa} USDC from your wallet</button>${p.auth === 'preparing' ? '<div class="prep">Preparing your wallet…</div>' : ''}
        <div class="warn2">${ic('warn', 'sm')}<span>Keep this page open until signing completes. If you refresh or close the page now, this order will fail and you'll need to start over.</span></div></div></div>`;
  },
  rAlCodeModal() {
    const p = this.state.al.p, m = alMoney[p.type], v = p.auth === 'verifying';
    return `<div class="codem"><div class="bx"><span class="x" data-act="alPCodeClose">${ic('x')}</span><div class="fingerring">${ic('finger')}</div><h3>Authentication code</h3><div class="s">Enter the 6-digit code from your authenticator app</div><div class="amt">${parseFloat(m.sa)}<small>USDC</small></div><div class="tm">${ic('clock', 'sm')} 4:59 to authorize</div>
      <div class="warn2">${ic('warn', 'sm')}<span>Keep this page open until signing completes. If you refresh or close the page now, this order will fail and you'll need to start over.</span></div>
      <input class="code" data-bind="al.p.code" aria-label="Authentication code" placeholder="000000" maxlength="6" value="${esc(p.code)}"><button class="btn teal wide" data-act="alPVerify" ${p.code.length >= 6 && !v ? '' : 'disabled'}>${v ? '<span class="spin" style="width:14px;height:14px;border-width:2px;margin:0;border-color:#fff;border-left-color:transparent"></span>' : ic('key', 'sm')} Verify code</button>
      <div class="tip2">Tip: set up a passkey from Settings to skip the 6-digit code next time.</div><button class="btn ghost wide" data-act="alPCodeClose">Cancel</button><div class="proto mono">${ic('lock', 'sm')} Secure transaction protocol</div></div></div>`;
  },
  /* ---------- Aloha actions (run before the Ohana action map; return true when handled) ---------- */
  alAct(name, arg) {
    const s = this.state, al = s.al, A = {
      noop: () => {},
      alOpenInvite: () => this.setState({ screen: 'al-setup' }),
      alAgree: () => this.setState(alP(s, 'reg', { agree: !al.reg.agree })),
      alSetup: () => { if (!al.reg.pw || !al.reg.pw2 || !al.reg.agree) return this.setState({ toast: 'Create and confirm a password, then accept the terms' }); this.setState({ screen: 'al-2fa', ...alP(s, 'reg', { mfa: 'qr' }) }); },
      alScanned: () => this.setState(alP(s, 'reg', { mfa: 'code' })), alBackQr: () => this.setState(alP(s, 'reg', { mfa: 'qr' })),
      alVerify: () => { if (al.reg.code.length < 6) return; this.setState({ screen: 'al-passkey', toast: 'Two-factor authentication enabled' }); },
      alPasskeyLater: () => this.setState({ screen: 'al-onb', toast: '' }),
      alLogin: () => this.setState({ screen: 'al-dash' }),
      alNav: () => { const to = { dash: 'al-dash', fiat: 'al-fiat', wallets: 'al-wallets', benes: 'al-benes', orders: 'al-orders' }[arg]; if (to) this.setState({ screen: to, openSel: null, countryOpen: false }); else this.setState({ toast: 'Not part of this demo' }); },
      alOnbStart: () => { if (!al.onb.country) return; this.setState(alP(s, 'onb', { phase: 'form', step: 1 })); },
      alOnbStep: () => this.setState({ openSel: null, ...alP(s, 'onb', { step: +arg }) }),
      alOnbNext: () => this.setState({ openSel: null, ...alP(s, 'onb', { step: Math.min(4, al.onb.step + 1) }) }),
      alOnbBack: () => this.setState({ openSel: null, ...alP(s, 'onb', { step: Math.max(1, al.onb.step - 1) }) }),
      alDoc: () => { const docs = [...al.onb.docs]; docs[+arg] = true; this.setState(alP(s, 'onb', { docs })); },
      alPep: () => this.setState(alP(s, 'onb', { pep: arg })),
      alOnbUpload: () => this.setState(alP(s, 'onb', { upload: arg === 'cancel' ? null : arg, step: 1 })),
      alOnbPick: () => { if (al.onb.upload === 'drop') this.setState(alP(s, 'onb', { upload: 'picked' })); },
      alOnbRead: () => { if (al.onb.upload !== 'picked') return; this.setState(alP(s, 'onb', { upload: 'reading' })); this.later('alread', 3400, () => this.state.al.onb.upload === 'reading' && this.setState(alP(this.state, 'onb', { upload: 'results' }))); },
      alOnbFill: () => this.setState(alP(s, 'onb', AL_FILL)),
      alSubmit: () => { if (!al.onb.pep) return this.setState({ toast: 'Answer the PEP declaration first' }); this.setState(alP(s, 'onb', { submitted: true })); },
      alUboLink: () => this.setState({ toast: 'Verification link copied', ...alP(s, 'onb', { linkOn: true }) }),
      alGoDash: () => this.setState({ screen: 'al-dash' }),
      alCreateWallet: () => this.setState({ screen: 'al-wnew', ...alP(s, 'w', { step: al.w.created ? 'security' : al.w.step === 'ready' ? 'security' : al.w.step }) }),
      alWStep: () => this.setState(alP(s, 'w', { step: arg })),
      alWNet: () => this.setState(alP(s, 'w', { net: arg })),
      alWGenerate: () => { if (!al.w.net) return; this.setState(alP(s, 'w', { step: 'generate' })); this.later('wgen', 2800, () => this.state.al.w.step === 'generate' && this.setState(alP(this.state, 'w', { step: 'backup' }))); },
      alWDownload: () => { if (al.w.pw.length < 12) return; this.setState({ toast: 'wallet-backup-polygon.json downloaded', ...alP(s, 'w', { dl: true, step: 'saved' }) }); },
      alWAck: () => this.setState(alP(s, 'w', { ack: !al.w.ack })),
      alWDone: () => this.setState({ screen: 'al-wallets', ...alP(s, 'w', { created: true }) }),
      alFaOpen: () => al.fa.live || al.fa.prov ? this.setState({ toast: 'Use Request account for your next currency', ...alP(s, 'fa', { next: true }) }) : this.setState(alP(s, 'fa', { modal: true })),
      alFaClose: () => this.setState({ openSel: null, ...alP(s, 'fa', { modal: false, busy: false }) }),
      alFaGenerate: () => { if (!al.fa.cur) return; this.setState({ openSel: null, ...alP(s, 'fa', { busy: true }) }); this.later('fa1', 2200, () => this.setState({ toast: "Account requested · we'll generate it shortly", ...alP(this.state, 'fa', { modal: false, busy: false, prov: true }) })); this.later('fa2', 6200, () => this.setState(alP(this.state, 'fa', { live: true }))); },
      alFaReveal: () => this.setState(alP(s, 'fa', { reveal: !al.fa.reveal })),
      alOpenCreate: () => this.setState({ ...OPEN_AL_CREATE, form: { ...INIT.form } }),
      alNewPayment: () => this.setState({ screen: 'al-pay', openSel: null, ...alP(s, 'p', { ...AL_EMPTY.p, orders: al.p.orders, tracked: al.p.tracked }) }),
      alPType: () => this.setState({ openSel: null, ...alP(s, 'p', { type: arg, src: '', asset: '', net: '', rcur: '', rail: '', send: '', recv: '' }) }),
      alPSrc: () => this.setState(alP(s, 'p', { src: arg })),
      alPRail: () => { if (arg === 'rtp') return; this.setState(alP(s, 'p', { rail: arg })); },
      alPContinue: () => { const p = al.p; if (p.step === 1 && !p.send) return this.setState({ toast: 'Enter an amount first' }); if (p.step === 2 && !(p.purpose && p.sof && p.rel)) return this.setState({ toast: 'Fill the purpose, source of funds and relationship' }); this.setState({ openSel: null, toast: p.step === 1 ? 'Rate locked' : '', ...alP(s, 'p', { step: p.step + 1 }) }); },
      alPBack: () => this.setState({ openSel: null, ...alP(s, 'p', { step: Math.max(1, al.p.step - 1) }) }),
      alPToOpen: () => this.setState({ openSel: s.openSel === 'al.p.to' ? null : 'al.p.to' }),
      alPTo: () => this.setState({ openSel: null, ...alP(s, 'p', { to: arg }) }), alPToClear: () => this.setState(alP(s, 'p', { to: '', method: '' })),
      alPMethod: () => this.setState(alP(s, 'p', { method: arg })),
      alPSend: () => { const p = al.p; if (p.type === 'f2s') this.alCreateOrder(); else this.setState(alP(s, 'p', { auth: 'page' })); },
      alPPay: () => { this.setState(alP(s, 'p', { auth: 'preparing' })); this.later('ppay', 1500, () => this.setState(alP(this.state, 'p', { auth: 'code' }))); },
      alPCodeClose: () => this.setState(alP(s, 'p', { auth: 'page', code: '' })),
      alPVerify: () => { if (al.p.code.length < 6) return; this.setState(alP(s, 'p', { auth: 'verifying' })); this.later('pv1', 1600, () => this.setState(alP(this.state, 'p', { auth: 'signing' }))); this.later('pv2', 3400, () => this.alCreateOrder()); },
      alTrack: () => this.setState(alP(s, 'p', { tracked: true, orders: al.p.orders.map(o => ({ ...o, st: o.type === 'f2s' ? 'Success' : o.type === 's2f' ? 'In Progress' : 'Created' })) }))
    };
    if (!A[name]) return false; A[name](); return true;
  },
  alCreateOrder() { this.setState(alOrderPatch(this.state)); },
  alBind(key, value) {
    const s = this.state, path = key.slice(3), al = alPath(s.al, path, value);
    if (path === 'p.send') { al.p.recv = alCalc(al.p.type, value); const el = document.querySelector('[data-bind="al.p.recv"]'); if (el) el.value = al.p.recv; this.later('alq', 700, () => this.render()); }
    if (path === 'p.recv') { const r = AL_RATES[al.p.type], v = parseFloat(value); al.p.send = isNaN(v) ? '' : (Math.round(v / r * 100) / 100).toFixed(2); const el = document.querySelector('[data-bind="al.p.send"]'); if (el) el.value = al.p.send; this.later('alq', 700, () => this.render()); }
    if (path === 'w.pw' || path === 'reg.code' || path === 'p.code') this.later('alq', 300, () => this.render());
    s.al = al;
  }
});
const alOrderPatch = s => { const p = s.al.p, orders = [{ type: p.type, st: 'Created', when: 'Just now' }, ...p.orders.map(o => ({ ...o, st: o.type === 'f2s' ? 'Success' : o.st === 'Created' ? 'In Progress' : o.st, when: o.when === 'Just now' ? '2m ago' : '5m ago' }))]; return { screen: 'al-odet', openSel: null, toast: 'Payment created', ...alP(s, 'p', { ...AL_EMPTY.p, orders, detail: p.type, tracked: p.tracked }) }; };
const AL_FILL = { filled: true, upload: 'filled', name: AL_CO, phone: '+1 202 555 0147', biz: 'Sole Proprietorship', docs: [true, true], emp: '2-10', sof: 'Business Income', first: AL_NAME, last: 'Dheeravath', own: '100' };

/* ---------- engine hooks ---------- */
(() => {
  const P = Component.prototype, isAl = c => (c.flow() || {}).shell === 'aloha';
  const _rShell = P.rShell; P.rShell = function () { return isAl(this) ? this.rAlShell() : _rShell.call(this); };
  const _renderApp = P.renderApp; P.renderApp = function () { _renderApp.call(this); document.getElementById('app').classList.toggle('al-root', isAl(this)); };
  const _renderBar = P.renderBar; P.renderBar = function () { _renderBar.call(this); if (isAl(this)) { const b = document.querySelector('#presenter .brand'); if (b) b.textContent = 'ALOHA DEMO'; } };
  const _act = P.act; P.act = function (name, arg) {
    if (isAl(this)) {
      if (this.alAct(name, arg)) return;
      const s = this.state;
      if (name === 'pickOpt' && arg.startsWith('al.')) { const [k, v] = arg.split('|'); this.alBind(k, v); this.setState({ openSel: null }); return; }
      if (name === 'backToList' || name === 'saveExit') return this.setState({ screen: 'al-benes', ...(name === 'saveExit' ? { toast: 'Draft saved · synced to your account' } : {}) });
      if (name === 'submit') { this.setState({ modal: 'sending', openSel: null }); this.later('m1', 2600, () => this.setState({ modal: null, success: true })); this.later('m2', 5200, () => this.setState({ screen: 'al-benes', success: false, created: true, newStatus: 'pending' })); return; }
      if (name === 'nav') return this.act('alNav', arg);
    }
    return _act.call(this, name, arg);
  };
  const _bindSet = P.bindSet; P.bindSet = function (key, value) { if (key.startsWith('al.')) return this.alBind(key, value); return _bindSet.call(this, key, value); };
  const _pp = P.placePrompt; P.placePrompt = function () { if (isAl(this) && this.state.success) { if (this._prompts) this._prompts.style.display = 'none'; return; } return _pp.call(this); };
})();
Object.assign(SCREEN_OF, { 'aloha-beneficiary': 'al-benes' });

/* ---------- the five Aloha flows ---------- */
const alOps = L => ({ ops: L.map(x => ['set', x[2] || {}, x[1] || undefined]), caps: L.map(x => x[0]) });
const alStart = (screen, al = {}) => ({ screen, al: JSON.parse(JSON.stringify({ ...AL_EMPTY, ...al })) });
const SIGN_IN = { t: 'Sign in', target: ['=Sign in'], say: 'Click Sign in to open the sender portal.', act: () => ({ screen: 'al-dash' }), done: s => s.screen !== 'al-login' };
const dyn = (open, closed) => open ? ['=' + open] : closed;

FLOWS['aloha-register'] = {
  title: 'Sender registration', shell: 'aloha', account: AL_NAME, start: alStart('al-inbox'),
  steps: c => [
    { title: 'Open the invitation and create your account', screen: 'al-inbox', doneIf: s => ['al-onb', 'al-dash'].includes(s.screen), subs: [
      { t: 'Invitation link', target: ['https://global-fincon'], say: 'Open your email and click the invitation link.', act: () => ({ screen: 'al-setup' }), done: s => s.screen !== 'al-inbox' },
      { t: 'Password', target: ['=Create a password'], say: 'Create a password.', act: s => alP(s, 'reg', { pw: 'Gl0bal-F1ncon!2026' }), done: s => !!s.al.reg.pw },
      { t: 'Confirm password', target: ['=Confirm your password'], say: 'Confirm the password.', act: s => alP(s, 'reg', { pw2: 'Gl0bal-F1ncon!2026' }), done: s => !!s.al.reg.pw2 },
      { t: 'Accept the terms', target: ['I agree to'], say: "Tick I agree to Global Fincon's Terms and Conditions.", act: s => alP(s, 'reg', { agree: true }), done: s => s.al.reg.agree },
      { t: 'Set up account', target: ['Set up account'], say: 'Click Set up account · next: MFA enrollment.', act: s => ({ screen: 'al-2fa', ...alP(s, 'reg', { mfa: 'qr' }) }), done: s => !['al-inbox', 'al-setup'].includes(s.screen) },
      { t: 'Scan the QR code', target: ["I've scanned"], say: "Scan the QR code with your authenticator app, then click I've scanned the code.", act: s => alP(s, 'reg', { mfa: 'code' }), done: s => s.al.reg.mfa === 'code' || !['al-inbox', 'al-setup', 'al-2fa'].includes(s.screen) },
      { t: 'Authentication code', target: ['=Authentication code'], say: 'Type the 6-digit code from your authenticator app.', act: s => alP(s, 'reg', { code: '482913' }), done: s => s.al.reg.code.length >= 6 || !['al-inbox', 'al-setup', 'al-2fa'].includes(s.screen) },
      { t: 'Verify code', target: ['Verify code'], say: 'Click Verify code. Two-factor authentication is now enabled.', act: () => ({ screen: 'al-passkey' }), done: s => ['al-passkey', 'al-onb', 'al-dash'].includes(s.screen) },
      { t: 'Passkey (later)', target: ['Maybe later'], say: 'Add a passkey now, or click Maybe later to continue to onboarding.', act: () => ({ screen: 'al-onb', toast: '' }), done: s => ['al-onb', 'al-dash'].includes(s.screen) } ] },
    { title: 'Select the country and enter business details', screen: 'al-onb', doneIf: s => s.al.onb.step >= 2 || s.al.onb.filled, subs: [
      { t: 'Country', target: dyn(c.state.openSel === 'al.onb.country' && 'US 🇺🇸 United States of America', ['=Select country']), say: 'Select the country where the business is registered: open the list and pick United States of America.', act: s => ({ openSel: null, ...alP(s, 'onb', { country: 'US 🇺🇸 United States of America' }) }), done: s => !!s.al.onb.country },
      { t: 'Continue', target: ['=Continue'], say: 'Click Continue. Now there are two ways to provide the business information: manual entry, or document upload.', act: s => alP(s, 'onb', { phase: 'form', step: 1 }), done: s => s.al.onb.phase === 'form' },
      { t: 'Full name', target: ['=Full Name'], say: 'Manual entry first: type the business name.', act: s => alP(s, 'onb', { name: AL_CO }), done: s => !!s.al.onb.name },
      { t: 'Phone number', target: ['=Phone Number'], say: 'Type the phone number.', act: s => alP(s, 'onb', { phone: '+1 202 555 0147' }), done: s => !!s.al.onb.phone },
      { t: 'Business type', target: dyn(c.state.openSel === 'al.onb.biz' && 'Sole Proprietorship', ['=Business Type']), say: 'Pick the business type: open the list and choose Sole Proprietorship.', act: s => ({ openSel: null, ...alP(s, 'onb', { biz: 'Sole Proprietorship' }) }), done: s => !!s.al.onb.biz },
      { t: 'Continue · Documents', target: ['Continue · Documents'], say: 'Click Continue · Documents.', act: s => alP(s, 'onb', { step: 2 }), done: s => s.al.onb.step >= 2 } ] },
    { title: 'Documents, risk profile and beneficial owners', screen: 'al-onb', doneIf: s => s.al.onb.filled || s.al.onb.submitted, subs: [
      { t: 'Business registration document', target: ['Drop files here or click to browse'], say: 'Upload the business registration document.', act: s => alP(s, 'onb', { docs: [true, s.al.onb.docs[1]] }), done: s => s.al.onb.docs[0] },
      { t: 'Proof of address', target: ['Drop files here or click to browse'], say: 'Upload the proof of address.', act: s => alP(s, 'onb', { docs: [true, true] }), done: s => s.al.onb.docs[1] },
      { t: 'Continue · Risk profile', target: ['Continue · Onboarding'], say: 'Click Continue · Onboarding & risk profile.', act: s => alP(s, 'onb', { step: 3 }), done: s => s.al.onb.step >= 3 },
      { t: 'Number of employees', target: dyn(c.state.openSel === 'al.onb.emp' && '2-10', ['=Number of employees']), say: 'Complete the onboarding and risk profile: pick the number of employees (2-10).', act: s => ({ openSel: null, ...alP(s, 'onb', { emp: '2-10' }) }), done: s => !!s.al.onb.emp },
      { t: 'Source of funds', target: dyn(c.state.openSel === 'al.onb.sof' && 'Business Income', ['=Source of funds']), say: 'Pick the source of funds: Business Income.', act: s => ({ openSel: null, ...alP(s, 'onb', { sof: 'Business Income' }) }), done: s => !!s.al.onb.sof },
      { t: 'Continue · Owners', target: ['Continue · Ultimate'], say: 'Click Continue · Ultimate beneficial owners.', act: s => alP(s, 'onb', { step: 4 }), done: s => s.al.onb.step >= 4 },
      { t: 'First name', target: ['=First name'], say: "Provide information about the ultimate beneficial owners: type the owner's first name.", act: s => alP(s, 'onb', { first: AL_NAME }), done: s => !!s.al.onb.first },
      { t: 'Last name', target: ['=Last name'], say: 'Type the last name.', act: s => alP(s, 'onb', { last: 'Dheeravath' }), done: s => !!s.al.onb.last },
      { t: 'Ownership percentage', target: ['=Ownership percentage'], say: 'Type the ownership percentage.', act: s => alP(s, 'onb', { own: '100' }), done: s => !!s.al.onb.own } ] },
    { title: 'Or upload documents and let the portal fill the form', screen: 'al-onb', doneIf: s => s.al.onb.filled || s.al.onb.submitted, subs: [
      { t: 'Business details', target: ['=Business details'], say: 'The second option is document upload. Go back to the Business details step.', act: s => alP(s, 'onb', { step: 1 }), done: s => s.al.onb.step === 1 || !!s.al.onb.upload },
      { t: 'Upload documents', target: ['Upload documents'], say: 'Select Upload documents.', act: s => alP(s, 'onb', { upload: 'drop', step: 1 }), done: s => !!s.al.onb.upload },
      { t: 'Pick a business document', target: ['Drop files here'], say: 'Click the drop zone and pick a business document.', act: s => alP(s, 'onb', { upload: 'picked' }), done: s => ['picked', 'reading', 'results', 'filled'].includes(s.al.onb.upload) },
      { t: 'Read documents', target: ['Read documents'], say: 'Click Read documents. The platform reads the document and extracts the available information.', act: s => alP(s, 'onb', { upload: 'results' }), done: s => ['reading', 'results', 'filled'].includes(s.al.onb.upload) },
      { t: 'Fill the form', target: ['Fill the form'], say: 'Click Fill the form. You only provide the fields that are missing.', act: s => alP(s, 'onb', AL_FILL), done: s => s.al.onb.filled } ] },
    { title: 'Submit for review and get verified', screen: 'al-onb', subs: [
      { t: 'Review the owners', target: ['=Ultimate beneficial owners'], say: 'Whichever option you choose, the final step is the same: review every required field. Open Ultimate beneficial owners.', act: s => alP(s, 'onb', { step: 4 }), done: s => s.al.onb.step === 4 || s.al.onb.submitted },
      { t: 'PEP declaration', target: ['=No'], say: 'Answer the PEP declaration: No.', act: s => alP(s, 'onb', { pep: 'No' }), done: s => !!s.al.onb.pep || s.al.onb.submitted },
      { t: 'Submit for review', target: ['Submit for review'], say: 'Click Submit for review. The profile is now sent for verification.', act: s => alP(s, 'onb', { submitted: true }), done: s => s.al.onb.submitted },
      { t: 'UBO verification link', target: ['=UBO verification link'], say: 'Open the generated UBO verification link and complete the identity verification for each ultimate beneficial owner.', act: s => alP(s, 'onb', { linkOn: true }), done: s => s.al.onb.linkOn },
      { t: 'Verification', target: ['Do it for me'], bar: true, say: 'Compliance reviews the profile and the UBO details. Click Do it for me to fast-forward to approval.', act: s => ({ screen: 'al-dash', ...alP(s, 'onb', { verified: true }) }), done: s => s.al.onb.verified } ] }
  ],
  ...alOps([
    ['To register as a sender, open your email, and find the invitation link.'],
    ['Click on the invitation link.', ['https://global-fincon'], { screen: 'al-setup' }],
    ['This takes you to the customer portal, where you can start creating an account.'],
    ['Create a password,', ['=Create a password'], { _type: ['al.reg.pw', 'Gl0bal-F1ncon!2026'] }],
    ['Create a password,', ['=Confirm your password'], { _type: ['al.reg.pw2', 'Gl0bal-F1ncon!2026'] }],
    ['and set up multi-factor authentication.', ['I agree to'], s => alP(s, 'reg', { agree: true })],
    ['and set up multi-factor authentication.', ['Set up account'], s => ({ screen: 'al-2fa', ...alP(s, 'reg', { mfa: 'qr' }) })],
    ['and set up multi-factor authentication.', ["I've scanned"], s => alP(s, 'reg', { mfa: 'code' })],
    ['and set up multi-factor authentication.', ['=Authentication code'], { _type: ['al.reg.code', '482913'] }],
    ['and set up multi-factor authentication.', ['Verify code'], { screen: 'al-passkey' }],
    ['and set up multi-factor authentication.', ['Maybe later'], { screen: 'al-onb', toast: '' }],
    ['Once you’re in, select the country where the business is registered.', ['=Select country'], { openSel: 'al.onb.country' }],
    ['Once you’re in, select the country where the business is registered.', ['=US 🇺🇸 United States of America'], s => ({ openSel: null, ...alP(s, 'onb', { country: 'US 🇺🇸 United States of America' }) })],
    ['Once you’re in, select the country where the business is registered.', ['=Continue'], s => alP(s, 'onb', { phase: 'form', step: 1 })],
    ['Now, there are two ways to provide the business information: manual entry, or document upload. Let’s look at both.'],
    ['The first option is manual entry. Start by entering the business details.', ['=Full Name'], { _type: ['al.onb.name', AL_CO] }],
    ['The first option is manual entry. Start by entering the business details.', ['=Phone Number'], { _type: ['al.onb.phone', '+1 202 555 0147'] }],
    ['The first option is manual entry. Start by entering the business details.', ['=Business Type'], { openSel: 'al.onb.biz' }],
    ['The first option is manual entry. Start by entering the business details.', ['=Sole Proprietorship'], s => ({ openSel: null, ...alP(s, 'onb', { biz: 'Sole Proprietorship' }) })],
    ['The first option is manual entry. Start by entering the business details.', ['Continue · Documents'], s => alP(s, 'onb', { step: 2 })],
    ['Then upload the required documents.', ['Drop files here or click to browse'], s => alP(s, 'onb', { docs: [true, false] })],
    ['Then upload the required documents.', ['Drop files here or click to browse'], s => alP(s, 'onb', { docs: [true, true] })],
    ['Then upload the required documents.', ['Continue · Onboarding'], s => alP(s, 'onb', { step: 3 })],
    ['Next, complete the onboarding and risk profile.', ['=Number of employees'], { openSel: 'al.onb.emp' }],
    ['Next, complete the onboarding and risk profile.', ['=2-10'], s => ({ openSel: null, ...alP(s, 'onb', { emp: '2-10' }) })],
    ['Next, complete the onboarding and risk profile.', ['=Source of funds'], { openSel: 'al.onb.sof' }],
    ['Next, complete the onboarding and risk profile.', ['=Business Income'], s => ({ openSel: null, ...alP(s, 'onb', { sof: 'Business Income' }) })],
    ['Next, complete the onboarding and risk profile.', ['Continue · Ultimate'], s => alP(s, 'onb', { step: 4 })],
    ['And finally, provide information about the ultimate beneficial owners.', ['=First name'], { _type: ['al.onb.first', AL_NAME] }],
    ['And finally, provide information about the ultimate beneficial owners.', ['=Last name'], { _type: ['al.onb.last', 'Dheeravath'] }],
    ['And finally, provide information about the ultimate beneficial owners.', ['=Ownership percentage'], { _type: ['al.onb.own', '100'] }],
    ['The second option is document upload. Instead of typing, select Upload documents on the business details step, and upload a business document.', ['=Business details'], s => alP(s, 'onb', { step: 1 })],
    ['The second option is document upload. Instead of typing, select Upload documents on the business details step, and upload a business document.', ['Upload documents'], s => alP(s, 'onb', { upload: 'drop' })],
    ['The second option is document upload. Instead of typing, select Upload documents on the business details step, and upload a business document.', ['Drop files here'], s => alP(s, 'onb', { upload: 'picked' })],
    ['The second option is document upload. Instead of typing, select Upload documents on the business details step, and upload a business document.', ['Read documents'], s => alP(s, 'onb', { upload: 'reading' })],
    ['The platform reads the document, extracts the available information, and fills in the form. You only provide the fields that are missing.', null, s => alP(s, 'onb', { upload: 'results' })],
    ['The platform reads the document, extracts the available information, and fills in the form. You only provide the fields that are missing.', ['Fill the form'], s => alP(s, 'onb', AL_FILL)],
    ['Whichever option you choose, the final step is the same. Review the information, and confirm that all required fields and documents have been provided.', ['=Ultimate beneficial owners'], s => alP(s, 'onb', { step: 4 })],
    ['Whichever option you choose, the final step is the same. Review the information, and confirm that all required fields and documents have been provided.', ['=No'], s => alP(s, 'onb', { pep: 'No' })],
    ['Then select Submit for Review. The profile is now sent for verification.', ['Submit for review'], s => alP(s, 'onb', { submitted: true })],
    ['Open the generated UBO verification link, and complete the required identity verification for each ultimate beneficial owner.', ['=UBO verification link'], s => alP(s, 'onb', { linkOn: true })],
    ['Once the profile and UBO details are verified, you are onboarded, and can begin using the platform.', null, s => alP(s, 'onb', { verified: true })],
    ['The sender registration process is complete. You can now access the portal, and use the available services.', null, { screen: 'al-dash' }]
  ])
};

FLOWS['aloha-wallet'] = {
  title: 'Self-custody wallet', shell: 'aloha', account: AL_NAME, start: alStart('al-login'),
  steps: c => [
    { title: 'Log in and open Wallets', screen: 'al-login', doneIf: s => s.screen === 'al-wnew' || s.al.w.created, subs: [ SIGN_IN,
      { t: 'Open Wallets', target: ['=Wallets'], say: 'Open the wallet section from the panel on the left. A new user can also create the first wallet from the dashboard.', act: () => ({ screen: 'al-wallets' }), done: s => ['al-wallets', 'al-wnew'].includes(s.screen) },
      { t: 'Create wallet', target: ['Create wallet'], say: 'Select Create wallet.', act: s => ({ screen: 'al-wnew', ...alP(s, 'w', { step: 'security' }) }), done: s => s.screen === 'al-wnew' } ] },
    { title: 'Read the security overview', screen: 'al-wnew', doneIf: s => s.al.w.step !== 'security', subs: [
      { t: 'Continue', target: ['Continue · pick'], say: 'Read the information shown on the screen, then select Continue · pick a network.', act: s => alP(s, 'w', { step: 'network' }), done: s => s.al.w.step !== 'security' } ] },
    { title: 'Pick a network and generate the wallet', screen: 'al-wnew', doneIf: s => ['backup', 'pw', 'saved', 'ready'].includes(s.al.w.step) || s.al.w.created, subs: [
      { t: 'Polygon', target: ['=Polygon'], say: 'Choose one of the available networks: Ethereum, Polygon, or Tron. Pick Polygon.', act: s => alP(s, 'w', { net: 'pol' }), done: s => !!s.al.w.net },
      { t: 'Create wallet', target: ['=Create wallet'], say: 'Select Create wallet, then wait for the confirmation.', act: s => alP(s, 'w', { step: 'backup' }), done: s => !['security', 'network'].includes(s.al.w.step) } ] },
    { title: 'Back up with a password', screen: 'al-wnew', doneIf: s => s.al.w.step === 'ready' || s.al.w.created, subs: [
      { t: 'Back up with password', target: ['Back up with password'], say: 'To create an encrypted backup, select the wallet backup option.', act: s => alP(s, 'w', { step: 'pw' }), done: s => ['pw', 'saved', 'ready'].includes(s.al.w.step) || s.al.w.created },
      { t: 'Encryption password', target: ['=Enter a strong password'], say: 'Enter a strong password (12+ characters). Store it somewhere safe; you may need it to restore the wallet.', act: s => alP(s, 'w', { pw: 'orchid-harbor-2026-keys' }), done: s => s.al.w.pw.length >= 12 || s.al.w.dl },
      { t: 'Download backup', target: ['Download backup'], say: 'Select Download backup, then store the file in a secure location.', act: s => alP(s, 'w', { dl: true, step: 'saved' }), done: s => s.al.w.dl },
      { t: 'Acknowledge', target: ['I understand'], say: 'Tick I understand that keeping my backup safe is my responsibility.', act: s => alP(s, 'w', { ack: true }), done: s => s.al.w.ack },
      { t: 'Continue to wallet', target: ['Continue to wallet'], say: 'Select Continue to wallet.', act: s => alP(s, 'w', { step: 'ready' }), done: s => s.al.w.step === 'ready' || s.al.w.created } ] },
    { title: 'Your wallet is ready', screen: 'al-wnew', subs: [
      { t: 'Done', target: ['=Done'], say: 'Your self-custody wallet has been created and backed up. Click Done to return to Wallets. For subsequent wallets, use Create wallet on the top right.', act: s => ({ screen: 'al-wallets', ...alP(s, 'w', { created: true }) }), done: s => s.al.w.created } ] }
  ],
  ...alOps([
    ['Let’s create a self-custody wallet. Log in to the portal.', ['=Sign in'], { screen: 'al-dash' }],
    ['Open the wallet section from the panel on the left.', ['=Wallets'], { screen: 'al-wallets' }],
    ['If you are a new user, you can also create your first wallet from the dashboard.', ['=Dashboard'], { screen: 'al-dash', _scroll: '#dw' }],
    ['Select Create Wallet.', ['=Create wallet'], s => ({ screen: 'al-wnew', ...alP(s, 'w', { step: 'security' }) })],
    ['Read the information shown on the screen.'],
    ['Then select Continue.', ['Continue · pick'], s => alP(s, 'w', { step: 'network' })],
    ['Choose one of the available networks: Ethereum, Polygon, or Tron.', ['=Polygon'], s => alP(s, 'w', { net: 'pol' })],
    ['And select Create Wallet.', ['=Create wallet'], s => alP(s, 'w', { step: 'generate' })],
    ['Wait for the confirmation.', null, s => alP(s, 'w', { step: 'backup' })],
    ['Next, to create an encrypted backup, select the wallet backup option.', ['Back up with password'], s => alP(s, 'w', { step: 'pw' })],
    ['Enter a strong password. Store this password somewhere safe, because you may need it to restore the wallet.', ['=Enter a strong password'], { _type: ['al.w.pw', 'orchid-harbor-2026-keys'] }],
    ['Then select Download Backup.', ['Download backup'], s => ({ toast: 'wallet-backup-polygon.json downloaded', ...alP(s, 'w', { dl: true, step: 'saved' }) })],
    ['Store the downloaded backup file in a secure location.', ['I understand'], s => alP(s, 'w', { ack: true })],
    ['Your self-custody wallet has been created and backed up. You can now start using it.', ['Continue to wallet'], s => alP(s, 'w', { step: 'ready' })],
    ['Your self-custody wallet has been created and backed up. You can now start using it.', ['=Done'], s => ({ screen: 'al-wallets', ...alP(s, 'w', { created: true }) })],
    ['For all subsequent wallets, click on Wallets in the left panel, and then click on Create wallet on the top right.', ['=Wallets'], {}],
    ['For all subsequent wallets, click on Wallets in the left panel, and then click on Create wallet on the top right.', ['Create wallet'], {}]
  ])
};

FLOWS['aloha-account'] = {
  title: 'Virtual named account', shell: 'aloha', account: AL_NAME, start: alStart('al-login', { w: { ...AL_EMPTY.w, created: true } }),
  steps: c => [
    { title: 'Log in and open Fiat accounts', screen: 'al-login', doneIf: s => s.screen === 'al-fiat', subs: [ SIGN_IN,
      { t: 'Fiat accounts', target: ['=Fiat accounts'], say: 'From the panel on the left, find Accounts and select Fiat accounts.', act: () => ({ screen: 'al-fiat' }), done: s => s.screen === 'al-fiat' } ] },
    { title: 'Request your first account', screen: 'al-fiat', doneIf: s => s.al.fa.modal || s.al.fa.prov || s.al.fa.live, subs: [
      { t: 'Request your first account', target: ['Request your first account'], say: 'Select Request your first account.', act: s => alP(s, 'fa', { modal: true }), done: s => s.al.fa.modal || s.al.fa.prov || s.al.fa.live } ] },
    { title: 'Choose the currency', screen: 'al-fiat', doneIf: s => !!s.al.fa.cur, subs: [
      { t: 'Currency', target: dyn(c.state.openSel === 'al.fa.cur' && 'USD (US Dollar)', ['=Select currency']), say: 'Choose the fiat currency you want to use: open the list and pick USD (US Dollar).', act: s => ({ openSel: null, ...alP(s, 'fa', { cur: 'USD (US Dollar)' }) }), done: s => !!s.al.fa.cur } ] },
    { title: 'Generate the account', screen: 'al-fiat', doneIf: s => s.al.fa.prov || s.al.fa.live, subs: [
      { t: 'Generate account', target: ['Generate account'], say: 'Review your selection, then select Generate account and wait for the confirmation.', act: s => ({ openSel: null, ...alP(s, 'fa', { modal: false, busy: false, prov: true, live: true }) }), done: s => s.al.fa.prov || s.al.fa.live } ] },
    { title: 'Your account is live', screen: 'al-fiat', subs: [
      { t: 'Reveal the account number', target: ['=Reveal account number'], say: 'Your virtual named account has been generated. Click the eye to reveal the account number.', act: s => alP(s, 'fa', { live: true, reveal: true }), done: s => s.al.fa.reveal },
      { t: 'Next accounts', target: ['Request account'], say: 'For all subsequent accounts, click Fiat accounts in the left panel, then Request account on the top right.', act: s => ({ toast: 'Use Request account for your next currency', ...alP(s, 'fa', { next: true }) }), done: s => s.al.fa.next } ] }
  ],
  ...alOps([
    ['Let’s generate a virtual named account. Log in to the portal.', ['=Sign in'], { screen: 'al-dash' }],
    ['From the panel on the left, find Accounts.'],
    ['And select Fiat Accounts.', ['=Fiat accounts'], { screen: 'al-fiat' }],
    ['Select Request Your First Account.', ['Request your first account'], s => alP(s, 'fa', { modal: true })],
    ['Choose the fiat currency you want to use.', ['=Select currency'], { openSel: 'al.fa.cur' }],
    ['Choose the fiat currency you want to use.', ['=USD (US Dollar)'], s => ({ openSel: null, ...alP(s, 'fa', { cur: 'USD (US Dollar)' }) })],
    ['Review your selection.'],
    ['And select Generate Account.', ['Generate account'], s => alP(s, 'fa', { busy: true })],
    ['Wait for the account confirmation.', null, s => ({ toast: "Account requested · we'll generate it shortly", ...alP(s, 'fa', { modal: false, busy: false, prov: true }) })],
    ['Your virtual named account has been generated. You can now use it to start transacting.', null, s => alP(s, 'fa', { live: true })],
    ['Your virtual named account has been generated. You can now use it to start transacting.', ['=Reveal account number'], s => alP(s, 'fa', { reveal: true })],
    ['For all subsequent accounts, click on Fiat Accounts in the left panel, and then click on Request Account on the top right.', ['=Fiat accounts'], {}],
    ['For all subsequent accounts, click on Fiat Accounts in the left panel, and then click on Request Account on the top right.', ['Request account'], s => alP(s, 'fa', { next: true })]
  ])
};

FLOWS['aloha-beneficiary'] = {
  title: 'Add a beneficiary', shell: 'aloha', account: AL_NAME, start: alStart('al-login', { w: { ...AL_EMPTY.w, created: true }, fa: { ...AL_EMPTY.fa, live: true } }),
  steps: c => [
    { title: 'Log in and open Beneficiaries', screen: 'al-login', doneIf: s => s.screen === 'al-create', subs: [ SIGN_IN,
      { t: 'Beneficiaries', target: ['=Beneficiaries'], say: 'From the panel on the left, select Beneficiaries.', act: () => ({ screen: 'al-benes' }), done: s => ['al-benes', 'al-create'].includes(s.screen) },
      { t: 'Add beneficiary', target: ['Add beneficiary'], say: 'Click Add beneficiary in the top-right corner.', act: () => ({ ...OPEN_AL_CREATE, form: { ...INIT.form } }), done: s => s.screen === 'al-create' } ] },
    { title: 'Choose the entity type and country', screen: 'al-create', doneIf: s => !!s.country, subs: [
      { t: 'Entity type', target: ['=Business'], say: 'Select Business as the beneficiary type.', act: () => ({ entity: 'business' }), done: s => !!s.entity },
      { t: 'Country list', target: ['Select country'], say: 'Open the country list.', act: () => ({ countryOpen: true }), done: s => s.countryOpen || !!s.country },
      { t: 'Pick India', target: ['=IN 🇮🇳 India'], say: 'Pick India. The portal loads the onboarding fields and the supporting documents for that rail.', act: () => ({ country: 'IN', countryOpen: false }), done: s => !!s.country } ] },
    { title: 'Option 1 · upload the invoice', screen: 'al-create', doneIf: s => s.upload === 'collapsed' || s.formStep === 2, subs: [
      { t: 'Upload documents', target: ['Upload documents'], say: "The first option is to simply upload the beneficiary's invoice. Click Upload documents.", act: () => ({ upload: 'drop' }), done: s => !!s.upload || s.filled },
      { t: 'Pick the invoice', target: ['Drop files here'], say: 'Click the drop zone to pick the invoice.', act: () => ({ upload: 'picked' }), done: s => past.includes(s.upload) || s.filled },
      { t: 'Read documents', target: ['Read documents'], say: 'Click Read documents. The portal extracts the relevant information from the invoice.', act: () => ({ upload: 'results' }), done: s => past.slice(1).includes(s.upload) || s.filled },
      { t: 'Fill the form', target: ['Fill the form'], say: 'Click Fill the form to pre-fill the application for your review.', act: s => c.T().fillForm(s), done: s => s.filled },
      { t: 'Done', target: ['Done'], say: 'Click Done. You only complete what could not be captured automatically.', act: () => ({ upload: 'collapsed' }), done: s => s.upload === 'collapsed' } ] },
    { title: 'Option 2 · enter the details manually', screen: 'al-create', doneIf: s => s.created || !!s.modal, subs: [
      { t: 'Full name', target: ['=Full name'], say: 'Or enter the information manually. Type the full name; it is the one field no document could prove.', act: s => ({ form: { ...s.form, fullName: 'Lincoln Strategy Labs LLP' } }), done: s => !!s.form.fullName.trim() },
      { t: 'Continue', target: ['Continue'], say: 'Click Continue to go to payment information.', act: () => ({ formStep: 2 }), done: s => s.formStep === 2 },
      { t: 'Bank account', target: ['Add payment method'], say: 'Click Add payment method to add a bank account.', act: () => ({ methods: [BANK] }), done: s => s.methods.length >= 1 } ] },
    { title: 'Create and verify', screen: 'al-create', subs: [
      { t: 'Create beneficiary', target: ['Create beneficiary'], say: 'Click Create beneficiary in the bottom-right corner. It is saved and sent for verification.', act: () => ({ modal: null, success: false, screen: 'al-benes', created: true, newStatus: 'pending' }), done: s => s.created },
      { t: 'Verification', target: ['Do it for me'], bar: true, say: 'Verification runs on the compliance side. Click Do it for me to move the status from Pending to Approved.', act: () => ({ newStatus: 'approved' }), done: s => s.newStatus === 'approved' } ] }
  ],
  ...alOps([
    ['Let’s add a beneficiary. Log in to the portal.', ['=Sign in'], { screen: 'al-dash' }],
    ['From the panel on the left, select Beneficiaries.', ['=Beneficiaries'], { screen: 'al-benes' }],
    ['To add a new beneficiary, click Add beneficiary in the top-right corner.', ['Add beneficiary'], s => ({ ...OPEN_AL_CREATE, form: { ...INIT.form } })],
    ['First, select the entity type, and the country where the beneficiary is registered.', ['=Business'], { entity: 'business' }],
    ['First, select the entity type, and the country where the beneficiary is registered.', ['Select country'], { countryOpen: true }],
    ['First, select the entity type, and the country where the beneficiary is registered.', ['=IN 🇮🇳 India'], { country: 'IN', countryOpen: false }],
    ['Based on your selection, the portal automatically displays the appropriate onboarding fields, and the supporting documents required for verification.', null, { _scroll: '#form-card' }],
    ['You can complete the onboarding in one of two ways.', null, { _scroll: '#skip-banner' }],
    ['The first option is to simply upload the beneficiary’s invoice.', ['Upload documents'], { upload: 'drop' }],
    ['The first option is to simply upload the beneficiary’s invoice.', ['Drop files here'], { upload: 'picked' }],
    ['The first option is to simply upload the beneficiary’s invoice.', ['Read documents'], { upload: 'reading' }],
    ['The portal automatically extracts the relevant information from the invoice, and pre-fills the application for your review.', null, { upload: 'results' }],
    ['The portal automatically extracts the relevant information from the invoice, and pre-fills the application for your review.', ['Fill the form'], s => ({ upload: 'filled', filled: true, form: { ...s.form, ...PREFILL } })],
    ['You only need to complete any information that couldn’t be captured automatically, making the onboarding process even faster.', ['Done'], { upload: 'collapsed' }],
    ['You only need to complete any information that couldn’t be captured automatically, making the onboarding process even faster.', ['=Full name'], { _type: ['form.fullName', 'Lincoln Strategy Labs LLP'] }],
    ['Or, you can enter the beneficiary’s information manually, including business details, payment method details, and supporting documents.', null, { _scroll: '#biz-details' }],
    ['Or, you can enter the beneficiary’s information manually, including business details, payment method details, and supporting documents.', ['Continue'], { formStep: 2 }],
    ['Or, you can enter the beneficiary’s information manually, including business details, payment method details, and supporting documents.', ['Add payment method'], { methods: [BANK] }],
    ['Once you’ve reviewed and completed all the required information, click Create Beneficiary in the bottom-right corner.', ['Create beneficiary'], { modal: 'sending' }],
    ['The beneficiary is now created, and submitted for verification.', null, { modal: null, success: true }],
    ['The beneficiary is now created, and submitted for verification.', null, { screen: 'al-benes', success: false, created: true, newStatus: 'pending' }],
    ['Once the verification process is successfully completed, the status moves from pending to approved, and the beneficiary is ready to receive payments.', null, { newStatus: 'approved' }]
  ])
};

/* payment: one main step per payment type */
const payParties = (c, type) => {
  const o = c.state.openSel, pm = type === 's2f' ? 'Bank Account' : 'Crypto Wallet';
  return [
    { t: 'Beneficiary', target: dyn(o === 'al.p.to' && 'Pacific Ledger Services', ['Search beneficiaries']), say: 'On the next page, select the beneficiary: open the search and pick Pacific Ledger Services.', act: s => ({ openSel: null, ...alP(s, 'p', { to: 'Pacific Ledger Services' }) }), done: s => !!s.al.p.to },
    { t: 'Payment method', target: ['=' + pm], say: `Select the payment method: ${pm}.`, act: s => alP(s, 'p', { method: type === 's2f' ? 'bank' : 'wallet' }), done: s => !!s.al.p.method },
    { t: 'Purpose', target: dyn(o === 'al.p.purpose' && 'Vendor payment', ['=Select purpose']), say: 'Enter the payment purpose: Vendor payment.', act: s => ({ openSel: null, ...alP(s, 'p', { purpose: 'Vendor payment' }) }), done: s => !!s.al.p.purpose },
    { t: 'Source of funds', target: dyn(o === 'al.p.sof' && 'Business income', ['=Select source']), say: 'Pick the source of funds: Business income.', act: s => ({ openSel: null, ...alP(s, 'p', { sof: 'Business income' }) }), done: s => !!s.al.p.sof },
    { t: 'Relationship', target: dyn(o === 'al.p.rel' && 'Supplier', ['=Select relationship']), say: 'Pick your relationship to the payee: Supplier. Invoice details and documents are optional.', act: s => ({ openSel: null, ...alP(s, 'p', { rel: 'Supplier' }) }), done: s => !!s.al.p.rel },
    { t: 'Continue', target: ['=Continue'], say: 'Select Continue to review the payment.', act: s => alP(s, 'p', { step: 3 }), done: s => s.al.p.step >= 3 }
  ];
};
const payAuth = () => [
  { t: 'Create payment', target: ['=Create payment'], say: 'Review the payment details, then select Create payment.', act: s => alP(s, 'p', { auth: 'page' }), done: s => !!s.al.p.auth },
  { t: 'Pay from your wallet', target: ['Pay 15.00 USDC'], say: 'Authorize the payment: select Pay from your wallet.', act: s => alP(s, 'p', { auth: 'code' }), done: s => ['preparing', 'code', 'verifying', 'signing'].includes(s.al.p.auth) },
  { t: 'Authentication code', target: ['=Authentication code'], say: 'Enter your 6-digit authentication code.', act: s => alP(s, 'p', { code: '482913' }), done: s => s.al.p.code.length >= 6 || s.al.p.auth === 'signing' },
  { t: 'Verify code', target: ['Verify code'], say: 'Click Verify code. The payment is signed automatically and the order is created.', act: s => alOrderPatch(s), done: s => s.screen === 'al-odet' || s.screen === 'al-orders' }
];
const hasOrder = (s, t) => s.al.p.orders.some(o => o.type === t);
FLOWS['aloha-payment'] = {
  title: 'Create a payment', shell: 'aloha', account: AL_NAME, start: alStart('al-login', { w: { ...AL_EMPTY.w, created: true }, fa: { ...AL_EMPTY.fa, live: true } }),
  steps: c => {
    const o = c.state.openSel, p = c.state.al.p;
    const openPay = type => ({ t: 'Create payment', target: ['Create payment'], say: 'Click Create payment in the top-right corner of the page.', act: s => ({ screen: 'al-pay', openSel: null, ...alP(s, 'p', { ...AL_EMPTY.p, orders: s.al.p.orders }) }), done: s => s.screen === 'al-pay' && !s.al.p.detail });
    const back = { t: 'Back to orders', target: ['Back to orders'], say: 'The payment is now created. Return to the Orders page to track it.', act: () => ({ screen: 'al-orders' }), done: s => s.screen !== 'al-odet' };
    const backLast = { ...back, done: s => s.screen === 'al-orders' || s.al.p.tracked };
    return [
      { title: 'Log in, open Orders and choose a payment type', screen: 'al-login', doneIf: s => s.screen === 'al-pay' || hasOrder(s, 'f2s'), subs: [ SIGN_IN,
        { t: 'Orders', target: ['=Orders'], say: 'From the panel on the left, select Orders.', act: () => ({ screen: 'al-orders' }), done: s => ['al-orders', 'al-pay'].includes(s.screen) },
        openPay('f2s') ] },
      { title: 'Option 1 · Fiat to stable', screen: 'al-pay', doneIf: s => hasOrder(s, 'f2s'), subs: [
        { t: 'Fiat → Stable', target: ['=Fiat → Stable'], say: 'Choose a payment type. The first option is fiat to stablecoin: select Fiat → Stable.', act: s => alP(s, 'p', { type: 'f2s' }), done: s => s.al.p.type === 'f2s' },
        { t: 'Source account', target: ['=USD account'], say: 'Select the source account: the USD account.', act: s => alP(s, 'p', { src: 'usd' }), done: s => !!s.al.p.src },
        { t: 'Stablecoin', target: dyn(o === 'al.p.asset' && 'USDC', ['=Select stablecoin']), say: 'Select the stablecoin: USDC.', act: s => ({ openSel: null, ...alP(s, 'p', { asset: 'USDC' }) }), done: s => !!s.al.p.asset },
        { t: 'Network', target: dyn(o === 'al.p.net' && 'Ethereum', ['=Select network']), say: 'And the network: Ethereum.', act: s => ({ openSel: null, ...alP(s, 'p', { net: 'Ethereum' }) }), done: s => !!s.al.p.net },
        { t: 'Amount', target: ['=You send'], say: 'Enter either the source amount or the destination amount; the other is filled in automatically.', act: s => alP(s, 'p', { send: '10.22', recv: '10.00' }), done: s => !!s.al.p.send },
        { t: 'Continue', target: ['=Continue'], say: 'Select Continue.', act: s => alP(s, 'p', { step: 2 }), done: s => s.al.p.step >= 2 },
        ...payParties(c, 'f2s'),
        { t: 'Send payment', target: ['Send payment'], say: 'Review the payment details, then select Send payment.', act: s => alOrderPatch(s), done: s => hasOrder(s, 'f2s') } ] },
      { title: 'Option 2 · Stable to fiat', screen: 'al-orders', doneIf: s => hasOrder(s, 's2f'), subs: [ back, openPay('s2f'),
        { t: 'Stable → Fiat', target: ['=Stable → Fiat'], say: 'The second option is stablecoin to fiat: select Stable → Fiat.', act: s => alP(s, 'p', { type: 's2f' }), done: s => s.al.p.type === 's2f' },
        { t: 'Source wallet', target: ['=Ethereum wallet'], say: 'Select the source wallet.', act: s => alP(s, 'p', { src: 'eth' }), done: s => !!s.al.p.src },
        { t: 'Recipient currency', target: dyn(o === 'al.p.rcur' && 'USD', ['=Select currency']), say: 'The stablecoin to send is USDC. Pick the recipient currency: USD.', act: s => ({ openSel: null, ...alP(s, 'p', { rcur: 'USD' }) }), done: s => !!s.al.p.rcur },
        { t: 'Payment rail', target: ['=Domestic Wire'], say: 'Pick the payment rail: Domestic Wire.', act: s => alP(s, 'p', { rail: 'wire' }), done: s => !!s.al.p.rail },
        { t: 'Amount', target: ['=You send'], say: 'Enter either the source amount or the destination amount.', act: s => alP(s, 'p', { send: '15', recv: '9.78' }), done: s => !!s.al.p.send },
        { t: 'Continue', target: ['=Continue'], say: 'Then select Continue.', act: s => alP(s, 'p', { step: 2 }), done: s => s.al.p.step >= 2 },
        ...payParties(c, 's2f'), ...payAuth() ] },
      { title: 'Option 3 · Stable to stable', screen: 'al-orders', doneIf: s => hasOrder(s, 's2s'), subs: [ back, openPay('s2s'),
        { t: 'Stable → Stable', target: ['=Stable → Stable'], say: 'The third option is stablecoin to stablecoin: select Stable → Stable.', act: s => alP(s, 'p', { type: 's2s' }), done: s => s.al.p.type === 's2s' },
        { t: 'Source wallet', target: ['=Ethereum wallet'], say: 'Select the source wallet.', act: s => alP(s, 'p', { src: 'eth' }), done: s => !!s.al.p.src },
        { t: 'Receive asset', target: dyn(o === 'al.p.asset' && 'USDT', ['=Select stablecoin']), say: 'The asset to send is USDC. Pick the asset to receive: USDT.', act: s => ({ openSel: null, ...alP(s, 'p', { asset: 'USDT' }) }), done: s => !!s.al.p.asset },
        { t: 'Network', target: dyn(o === 'al.p.net' && 'Ethereum', ['=Select network']), say: 'And the network: Ethereum.', act: s => ({ openSel: null, ...alP(s, 'p', { net: 'Ethereum' }) }), done: s => !!s.al.p.net },
        { t: 'Amount', target: ['=You send'], say: 'Enter either the source amount or the destination amount.', act: s => alP(s, 'p', { send: '15', recv: '14.60' }), done: s => !!s.al.p.send },
        { t: 'Continue', target: ['=Continue'], say: 'Then select Continue.', act: s => alP(s, 'p', { step: 2 }), done: s => s.al.p.step >= 2 },
        ...payParties(c, 's2s'), ...payAuth() ] },
      { title: 'Track all three orders', screen: 'al-orders', subs: [ backLast,
        { t: 'Track the status', target: ['Do it for me'], bar: true, say: 'All three payments now appear on the Orders page, where you can track their status. Click Do it for me to let them progress.', act: s => alP(s, 'p', { tracked: true, orders: s.al.p.orders.map(x => ({ ...x, st: x.type === 'f2s' ? 'Success' : x.type === 's2f' ? 'In Progress' : 'Created' })) }), done: s => s.al.p.tracked } ] }
    ];
  },
  ...alOps([
    ['Let’s create a payment. Log in to the portal.', ['=Sign in'], { screen: 'al-dash' }],
    ['From the panel on the left, select Orders.', ['=Orders'], { screen: 'al-orders' }],
    ['Then click Create a payment in the top-right corner of the page.', ['Create payment'], s => ({ screen: 'al-pay', ...alP(s, 'p', { ...AL_EMPTY.p, orders: s.al.p.orders }) })],
    ['Choose a payment type: fiat to stablecoin, stablecoin to fiat, or stablecoin to stablecoin. Let’s go through each one.'],
    ['The first option is fiat to stablecoin. Select Fiat to Stable.', ['=Fiat → Stable'], s => alP(s, 'p', { type: 'f2s' })],
    ['Select the source account.', ['=USD account'], s => alP(s, 'p', { src: 'usd' })],
    ['Then select the stablecoin, and the network.', ['=Select stablecoin'], { openSel: 'al.p.asset' }],
    ['Then select the stablecoin, and the network.', ['=USDC'], s => ({ openSel: null, ...alP(s, 'p', { asset: 'USDC' }) })],
    ['Then select the stablecoin, and the network.', ['=Select network'], { openSel: 'al.p.net' }],
    ['Then select the stablecoin, and the network.', ['=Ethereum'], s => ({ openSel: null, ...alP(s, 'p', { net: 'Ethereum' }) })],
    ['Enter either the source amount or the destination amount. The other amount is filled in automatically.', ['=You send'], { _type: ['al.p.send', '10.22'] }],
    ['Select Continue.', ['=Continue'], s => ({ toast: 'Rate locked', ...alP(s, 'p', { step: 2 }) })],
    ['On the next page, select the beneficiary, and the payment method.', ['Search beneficiaries'], { openSel: 'al.p.to' }],
    ['On the next page, select the beneficiary, and the payment method.', ['=Pacific Ledger Services'], s => ({ openSel: null, ...alP(s, 'p', { to: 'Pacific Ledger Services' }) })],
    ['On the next page, select the beneficiary, and the payment method.', ['=Crypto Wallet'], s => alP(s, 'p', { method: 'wallet' })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee.', ['=Select purpose'], { openSel: 'al.p.purpose' }],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee.', ['=Vendor payment'], s => ({ openSel: null, ...alP(s, 'p', { purpose: 'Vendor payment' }) })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee.', ['=Select source'], { openSel: 'al.p.sof' }],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee.', ['=Business income'], s => ({ openSel: null, ...alP(s, 'p', { sof: 'Business income' }) })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee.', ['=Select relationship'], { openSel: 'al.p.rel' }],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee.', ['=Supplier'], s => ({ openSel: null, ...alP(s, 'p', { rel: 'Supplier' }) })],
    ['You can also add invoice details, and upload supporting documents if needed. Then select Continue.', ['=Continue'], s => alP(s, 'p', { step: 3 })],
    ['Review the payment details, then select Send Payment.', ['Send payment'], s => alOrderPatch(s)],
    ['The payment is now created. Return to the Orders page to track the payment.', ['Back to orders'], { screen: 'al-orders' }],
    ['The second option is stablecoin to fiat. Click Create a payment, and select Stable to Fiat.', ['Create payment'], s => ({ screen: 'al-pay', ...alP(s, 'p', { ...AL_EMPTY.p, orders: s.al.p.orders }) })],
    ['The second option is stablecoin to fiat. Click Create a payment, and select Stable to Fiat.', ['=Stable → Fiat'], s => alP(s, 'p', { type: 's2f' })],
    ['Select the source wallet, the stablecoin to send, the recipient currency, and the payment rail.', ['=Ethereum wallet'], s => alP(s, 'p', { src: 'eth' })],
    ['Select the source wallet, the stablecoin to send, the recipient currency, and the payment rail.', ['=Select currency'], { openSel: 'al.p.rcur' }],
    ['Select the source wallet, the stablecoin to send, the recipient currency, and the payment rail.', ['=USD'], s => ({ openSel: null, ...alP(s, 'p', { rcur: 'USD' }) })],
    ['Select the source wallet, the stablecoin to send, the recipient currency, and the payment rail.', ['=Domestic Wire'], s => alP(s, 'p', { rail: 'wire' })],
    ['Enter either the source amount or the destination amount, then select Continue.', ['=You send'], { _type: ['al.p.send', '15'] }],
    ['Enter either the source amount or the destination amount, then select Continue.', ['=Continue'], s => ({ toast: 'Rate locked', ...alP(s, 'p', { step: 2 }) })],
    ['On the next page, select the beneficiary, and the payment method.', ['Search beneficiaries'], { openSel: 'al.p.to' }],
    ['On the next page, select the beneficiary, and the payment method.', ['=Pacific Ledger Services'], s => ({ openSel: null, ...alP(s, 'p', { to: 'Pacific Ledger Services' }) })],
    ['On the next page, select the beneficiary, and the payment method.', ['=Bank Account'], s => alP(s, 'p', { method: 'bank' })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Select purpose'], { openSel: 'al.p.purpose' }],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Vendor payment'], s => ({ openSel: null, ...alP(s, 'p', { purpose: 'Vendor payment' }) })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Select source'], { openSel: 'al.p.sof' }],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Business income'], s => ({ openSel: null, ...alP(s, 'p', { sof: 'Business income' }) })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Select relationship'], { openSel: 'al.p.rel' }],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Supplier'], s => ({ openSel: null, ...alP(s, 'p', { rel: 'Supplier' }) })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Continue'], s => alP(s, 'p', { step: 3 })],
    ['Review the payment details, then select Create Payment.', ['=Create payment'], s => alP(s, 'p', { auth: 'page' })],
    ['Authorize the payment on the next page. Select Pay from your wallet, and enter your authentication code.', ['Pay 15.00 USDC'], s => alP(s, 'p', { auth: 'code' })],
    ['Authorize the payment on the next page. Select Pay from your wallet, and enter your authentication code.', ['=Authentication code'], { _type: ['al.p.code', '482913'] }],
    ['Authorize the payment on the next page. Select Pay from your wallet, and enter your authentication code.', ['Verify code'], s => alP(s, 'p', { auth: 'signing' })],
    ['The payment is signed automatically, and the order is created. Return to the Orders page to track the order.', null, s => alOrderPatch(s)],
    ['The payment is signed automatically, and the order is created. Return to the Orders page to track the order.', ['Back to orders'], { screen: 'al-orders' }],
    ['The third option is stablecoin to stablecoin. Click Create a payment, and select Stable to Stable.', ['Create payment'], s => ({ screen: 'al-pay', ...alP(s, 'p', { ...AL_EMPTY.p, orders: s.al.p.orders }) })],
    ['The third option is stablecoin to stablecoin. Click Create a payment, and select Stable to Stable.', ['=Stable → Stable'], s => alP(s, 'p', { type: 's2s' })],
    ['Select the source wallet, the asset to send, the asset to receive, and the network.', ['=Ethereum wallet'], s => alP(s, 'p', { src: 'eth' })],
    ['Select the source wallet, the asset to send, the asset to receive, and the network.', ['=Select stablecoin'], { openSel: 'al.p.asset' }],
    ['Select the source wallet, the asset to send, the asset to receive, and the network.', ['=USDT'], s => ({ openSel: null, ...alP(s, 'p', { asset: 'USDT' }) })],
    ['Select the source wallet, the asset to send, the asset to receive, and the network.', ['=Select network'], { openSel: 'al.p.net' }],
    ['Select the source wallet, the asset to send, the asset to receive, and the network.', ['=Ethereum'], s => ({ openSel: null, ...alP(s, 'p', { net: 'Ethereum' }) })],
    ['Enter either the source amount or the destination amount, then select Continue.', ['=You send'], { _type: ['al.p.send', '15'] }],
    ['Enter either the source amount or the destination amount, then select Continue.', ['=Continue'], s => ({ toast: 'Rate locked', ...alP(s, 'p', { step: 2 }) })],
    ['On the next page, select the beneficiary, and the payment method.', ['Search beneficiaries'], { openSel: 'al.p.to' }],
    ['On the next page, select the beneficiary, and the payment method.', ['=Pacific Ledger Services'], s => ({ openSel: null, ...alP(s, 'p', { to: 'Pacific Ledger Services' }) })],
    ['On the next page, select the beneficiary, and the payment method.', ['=Crypto Wallet'], s => alP(s, 'p', { method: 'wallet' })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Select purpose'], { openSel: 'al.p.purpose' }],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Vendor payment'], s => ({ openSel: null, ...alP(s, 'p', { purpose: 'Vendor payment' }) })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Select source'], { openSel: 'al.p.sof' }],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Business income'], s => ({ openSel: null, ...alP(s, 'p', { sof: 'Business income' }) })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Select relationship'], { openSel: 'al.p.rel' }],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Supplier'], s => ({ openSel: null, ...alP(s, 'p', { rel: 'Supplier' }) })],
    ['Enter the payment purpose, the source of funds, and your relationship to the payee. You can also add invoice details, and upload documents if needed. Then select Continue.', ['=Continue'], s => alP(s, 'p', { step: 3 })],
    ['Review the payment details, then select Create Payment.', ['=Create payment'], s => alP(s, 'p', { auth: 'page' })],
    ['Authorize the payment on the next page. Select Pay from your wallet, and enter your authentication code.', ['Pay 15.00 USDC'], s => alP(s, 'p', { auth: 'code' })],
    ['Authorize the payment on the next page. Select Pay from your wallet, and enter your authentication code.', ['=Authentication code'], { _type: ['al.p.code', '482913'] }],
    ['Authorize the payment on the next page. Select Pay from your wallet, and enter your authentication code.', ['Verify code'], s => alP(s, 'p', { auth: 'signing' })],
    ['Once the payment is signed, the order is created. Return to the Orders page to track the order.', null, s => alOrderPatch(s)],
    ['Once the payment is signed, the order is created. Return to the Orders page to track the order.', ['Back to orders'], { screen: 'al-orders' }],
    ['All three payments now appear on the Orders page, where you can track their status.', null, s => alP(s, 'p', { tracked: true, orders: s.al.p.orders.map(x => ({ ...x, st: x.type === 'f2s' ? 'Success' : x.type === 's2f' ? 'In Progress' : 'Created' })) })]
  ])
};
Object.assign(DEMO_FLOW, { 8: 'aloha-register', 9: 'aloha-wallet', 10: 'aloha-account', 11: 'aloha-beneficiary', 12: 'aloha-payment' });
