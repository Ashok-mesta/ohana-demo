const DEMOS = [
  { flow: 'beneficiary', group: 'Ohana', num: '01', title: 'Create a Beneficiary', intro: 'Add a business beneficiary: pick the entity type and country, upload a document and let Ohana pre-fill the form, add bank, SWIFT or wallet payment methods, then create. The beneficiary moves from Pending to Approved.', steps: [
    ['Log in and open Beneficiaries', ['Sign in', 'Open Beneficiaries', 'Create beneficiary']], ['Choose the entity type and country', ['Entity type', 'Country list', 'Pick India']], ['Upload a document and complete the details', ['Upload documents', 'Pick the invoice', 'Read documents', 'Fill the form', 'Done', 'Full name', 'Continue']], ['Add payment methods', ['Bank account', 'SWIFT', 'Crypto wallet']], ['Create and verify', ['Create beneficiary', 'Verification']] ] },
  { flow: 'sender', group: 'Ohana', num: '02', title: 'Create a Sender', intro: 'Onboard a business sender: entity type and country, business details, supporting documents, the onboarding and risk profile, and the ultimate beneficial owners. Or upload the business documents and let Ohana pre-fill the application. Verification links are generated for each owner.', steps: [
    ['Log in and open Senders', ['Sign in', 'Open Senders', 'Create sender']], ['Choose the entity type and country', ['Entity type', 'Country list', 'Pick Brazil']], ['Business details and documents', ['Business details', 'Supporting documents']], ['Risk profile and beneficial owners', ['Onboarding & risk profile', 'Beneficial owners']], ['Create and verify', ['Verification links', 'KYB approved']] ] },
  { flow: 'order', group: 'Ohana', num: '03', title: 'Create a Payment Order', intro: 'Create a payment in three steps: set the amount and lock the rate, choose the sender, beneficiary and payment method, then review and send. Track the order from Created through Awaiting funds to Success.', steps: [
    ['Log in and open Orders', ['Sign in', 'Open Orders', 'Create payment']], ['Set the amount and lock the rate', ['Source currency', 'Pick USDC', 'Destination currency', 'Pick USD', 'Amount', 'Transfer type', 'Lock the rate']], ['Choose the parties', ['Sender', 'Pick Mesta Payments LLC', 'Beneficiary', 'Pick FORTULL INC', 'Payment method', 'Purpose', 'Source of funds', 'Relationship', 'Continue']], ['Review and send', ['Send payment']], ['Track the order', ['Back to orders', 'Funds and settlement']] ] },
  { flow: 'portal-setup', group: 'Portal Studio', num: '04', title: 'Set up your portal', intro: 'The white-label sender portal in four stages. Step 1: branding (logos, favicon, colours), portal details (name, terms, support email), the portal URL and a custom domain, the settlement wallet, then Save Changes and switch the portal on.', steps: [
    ['Log in and open Portal Studio', ['Sign in', 'Open Portal Studio']], ['Branding', ['Dark logo', 'Light logo', 'Favicon', 'Brand colour', 'Accent colour']], ['Portal details', ['Portal name', 'Terms URL', 'Support email']], ['Portal URL and settlement wallet', ['Portal address', 'Custom domain', 'Settlement network', 'Wallet address']], ['Save and switch the portal on', ['Save changes', 'Update URL', 'Portal on']] ] },
  { flow: 'portal-default', group: 'Portal Studio', num: '05', title: 'Set your default pricing', intro: 'Tiered pricing across every corridor you operate in, applied to all senders uniformly. Add tiers by transaction volume (first tier from 0, last tier to 1 trillion), set an effective date, review the structure, fees and what you earn, then confirm and save.', steps: [
    ['Open Default pricing', ['Default pricing tab']], ['Add a default', ['Add default', 'Currency pair']], ['Tier ladder', ['Add tier', 'Volume from', 'Volume to']], ['Effective date and review', ['Effective from', 'Review pricing']], ['Confirm and save', ['Confirm & save']] ] },
  { flow: 'portal-sender', group: 'Portal Studio', num: '06', title: 'Add custom sender pricing', intro: 'Per-sender overrides that replace the default pricing when that sender transacts on the portal. Select the sender, add an override with its tiers, review and confirm.', steps: [
    ['Open Sender pricing', ['Sender pricing tab']], ['Select the sender', ['Filter by sender', 'Pick Prateek Jain', 'Add override']], ['Tiers and pricing', ['Add tiers', 'Volume from', 'Volume to']], ['Review', ['Review pricing']], ['Confirm and save', ['Confirm & save']] ] },
  { flow: 'portal-senders', group: 'Portal Studio', num: '07', title: 'Manage your senders', intro: 'Invite new senders by email, share the invite link on any channel, and track existing senders through verification until they can transact on the portal.', steps: [
    ['Open Senders', ['Senders tab']], ['Invite a new sender', ['Sender email', 'Send invitation']], ['Share the invite link', ['Copy the link']], ['Track existing senders', ['Existing senders']], ['Verified senders can transact', ['Verification']] ] },
  { flow: 'aloha-register', group: 'Aloha · sender portal', num: '08', title: 'Sender registration', intro: 'From the invitation email to a verified, onboarded profile on the white-label sender portal: create the account with multi-factor authentication, select the country, provide the business information by manual entry or by uploading a business document the portal reads and fills in, submit for review, then share the UBO verification link.', steps: [
    ['Open the invitation and create your account', ['Invitation link', 'Password', 'Confirm password', 'Accept the terms', 'Set up account', 'Scan the QR code', 'Authentication code', 'Verify code', 'Passkey (later)']], ['Select the country and enter business details', ['Country', 'Continue', 'Full name', 'Phone number', 'Business type', 'Continue · Documents']], ['Documents, risk profile and beneficial owners', ['Business registration document', 'Proof of address', 'Continue · Risk profile', 'Number of employees', 'Source of funds', 'Continue · Owners', 'First name', 'Last name', 'Ownership percentage']], ['Or upload documents and let the portal fill the form', ['Business details', 'Upload documents', 'Pick a business document', 'Read documents', 'Fill the form']], ['Submit for review and get verified', ['Review the owners', 'PEP declaration', 'Submit for review', 'UBO verification link', 'Verification']] ] },
  { flow: 'aloha-wallet', group: 'Aloha · sender portal', num: '09', title: 'Create a self-custody wallet', intro: 'Pick a network, create the wallet, and keep an encrypted backup: the security overview, Ethereum / Polygon / Tron, key generation in the browser, the password-protected backup file, and the acknowledgement before the wallet is ready.', steps: [
    ['Log in and open Wallets', ['Sign in', 'Open Wallets', 'Create wallet']], ['Read the security overview', ['Continue']], ['Pick a network and generate the wallet', ['Polygon', 'Create wallet']], ['Back up with a password', ['Back up with password', 'Encryption password', 'Download backup', 'Acknowledge', 'Continue to wallet']], ['Your wallet is ready', ['Done']] ] },
  { flow: 'aloha-account', group: 'Aloha · sender portal', num: '10', title: 'Generate a virtual named account', intro: 'Request a named fiat account in USD, EUR, GBP or MXN: open Fiat accounts, request the first account, choose the currency, generate it, wait for provisioning, then reveal the account number.', steps: [
    ['Log in and open Fiat accounts', ['Sign in', 'Fiat accounts']], ['Request your first account', ['Request your first account']], ['Choose the currency', ['Currency']], ['Generate the account', ['Generate account']], ['Your account is live', ['Reveal the account number', 'Next accounts']] ] },
  { flow: 'aloha-beneficiary', group: 'Aloha · sender portal', num: '11', title: 'Add a beneficiary', intro: 'Create a verified payee from the sender portal: entity type and country, then either upload the invoice and let the portal pre-fill the application, or enter the details and a payment method manually. The beneficiary moves from Pending to Approved.', steps: [
    ['Log in and open Beneficiaries', ['Sign in', 'Beneficiaries', 'Add beneficiary']], ['Choose the entity type and country', ['Entity type', 'Country list', 'Pick India']], ['Option 1 · upload the invoice', ['Upload documents', 'Pick the invoice', 'Read documents', 'Fill the form', 'Done']], ['Option 2 · enter the details manually', ['Full name', 'Continue', 'Bank account']], ['Create and verify', ['Create beneficiary', 'Verification']] ] },
  { flow: 'aloha-payment', group: 'Aloha · sender portal', num: '12', title: 'Create a payment', intro: 'Three payment types from the sender portal: fiat to stablecoin from a fiat account, stablecoin to fiat and stablecoin to stablecoin from the self-custody wallet, each with the beneficiary, payment method, purpose, source of funds and relationship, the review, and for wallet payments the authorization with a 6-digit code. All three orders then appear on the Orders page.', steps: [
    ['Log in, open Orders and choose a payment type', ['Sign in', 'Orders', 'Create payment']], ['Option 1 · Fiat to stable', ['Fiat → Stable', 'Source account', 'Stablecoin', 'Network', 'Amount', 'Continue', 'Beneficiary', 'Payment method', 'Purpose', 'Source of funds', 'Relationship', 'Continue', 'Send payment']], ['Option 2 · Stable to fiat', ['Back to orders', 'Create payment', 'Stable → Fiat', 'Source wallet', 'Recipient currency', 'Payment rail', 'Amount', 'Continue', 'Beneficiary', 'Payment method', 'Purpose', 'Source of funds', 'Relationship', 'Continue', 'Create payment', 'Pay from your wallet', 'Authentication code', 'Verify code']], ['Option 3 · Stable to stable', ['Back to orders', 'Create payment', 'Stable → Stable', 'Source wallet', 'Receive asset', 'Network', 'Amount', 'Continue', 'Beneficiary', 'Payment method', 'Purpose', 'Source of funds', 'Relationship', 'Continue', 'Create payment', 'Pay from your wallet', 'Authentication code', 'Verify code']], ['Track all three orders', ['Back to orders', 'Track the status']] ] }
];
const GROUP = { 'Ohana': 'ohana', 'Portal Studio': 'portal', 'Aloha · sender portal': 'aloha' };
const BEATS = { beneficiary: 33, sender: 33, order: 30, 'portal-setup': 45, 'portal-default': 14, 'portal-sender': 13, 'portal-senders': 8, 'aloha-register': 43, 'aloha-wallet': 17, 'aloha-account': 13, 'aloha-beneficiary': 22, 'aloha-payment': 74 };
const BUILD = 'v' + 20261028 + 'c'; /* bump to bypass the Pages/browser cache for the embedded prototype */
const mins = b => Math.max(1, Math.round(b * 5.3 / 60));
const $ = id => document.getElementById(id);
const PRODUCT = document.body.dataset.product || '';
const ICON = {
  play: '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  steps: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h10M4 18h6"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l12 7-5 1.5L10 17z"/></svg>'
};

/* home: demo lists inside the product cards */
document.querySelectorAll('[data-list]').forEach(ul => {
  ul.innerHTML = DEMOS.filter(d => GROUP[d.group] === ul.dataset.list).map(d => `<li>${d.title}<span>${mins(BEATS[d.flow])} min</span></li>`).join('');
});

/* product page: its demos */
const shown = DEMOS.filter(d => GROUP[d.group] === PRODUCT);
if ($('demos')) {
  $('demos').innerHTML = shown.map((d, i) => `<article class="demo" id="d-${d.flow}">
    <button class="thumb" data-open="${d.flow}" data-mode="guided" aria-label="Watch ${d.title}"><img src="assets/stills/${d.flow}.jpg" width="800" height="450" alt="" loading="lazy"><span class="play">${ICON.play}</span></button>
    <div class="body"><div class="num">Demo ${i + 1} of ${shown.length}</div><h3>${d.title}</h3><p class="desc">${d.intro}</p>
      <div class="facts"><span>${ICON.steps}5 steps</span><span>${ICON.clock}About ${mins(BEATS[d.flow])} min</span></div>
      <div class="acts"><button class="btn btn-primary btn-sm" data-open="${d.flow}" data-mode="guided">${ICON.play}Watch</button><button class="btn btn-secondary btn-sm" data-open="${d.flow}" data-mode="self">Try it yourself</button></div></div>
  </article>`).join('');
  if (shown.length === 4) $('demos').classList.add('two');
  const total = shown.reduce((a, d) => a + mins(BEATS[d.flow]), 0);
  if ($('m-count')) $('m-count').textContent = shown.length;
  if ($('m-time')) $('m-time').textContent = total + ' min';
}

/* lightbox */
const lb = $('lb');
if (lb) {
  const lbf = $('lbf'), lbplay = $('lbplay');
  let guided = true, paused = false, slow = false, flow = '';
  const post = m => lbf.contentWindow && lbf.contentWindow.postMessage({ type: 'demo', ...m }, '*');
  const src = () => 'prototype.html?flow=' + flow + (guided ? '&play=1' + (slow ? '&slow=1' : '') : '&manual=1') + '&b=' + BUILD;
  const shareUrl = () => new URL('prototype.html?flow=' + flow + (guided ? '&play=1' : ''), location.href).href;
  const goFull = () => { if (!document.fullscreenElement && lb.requestFullscreen) lb.requestFullscreen().catch(() => {}); };
  const open = (g, f) => {
    guided = g; flow = f; paused = false; lb.hidden = false; lbf.src = src();
    const d = DEMOS.find(x => x.flow === f); $('lbt').textContent = d.title + (g ? ' · Guided' : ' · Try it yourself');
    [lbplay, $('lbspeed'), $('lbspeedl')].forEach(el => { el.style.display = g ? '' : 'none'; });
    lbplay.textContent = 'Pause'; goFull();
  };
  const close = () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); lb.hidden = true; lbf.src = 'about:blank'; };
  document.addEventListener('click', e => { const t = e.target.closest('[data-open]'); if (!t) return; e.preventDefault(); open(t.dataset.mode !== 'self', t.dataset.open); });
  $('lbclose').onclick = close;
  $('lbfs').onclick = () => document.fullscreenElement ? document.exitFullscreen() : goFull();
  lbplay.onclick = () => { paused = !paused; post({ cmd: paused ? 'pause' : 'play' }); lbplay.textContent = paused ? 'Play' : 'Pause'; };
  $('lbrestart').onclick = () => { paused = false; lbplay.textContent = 'Pause'; if (guided) post({ cmd: 'restart' }); else lbf.src = src(); };
  const seg = v => { slow = v; $('slow').classList.toggle('on', v); $('normal').classList.toggle('on', !v); post({ speed: v ? 1.8 : 1 }); };
  $('slow').onclick = () => seg(true); $('normal').onclick = () => seg(false);
  $('lbcopy').onclick = async () => { const b = $('lbcopy'); try { await navigator.clipboard.writeText(shareUrl()); b.textContent = 'Link copied'; } catch (e) { b.textContent = shareUrl(); } setTimeout(() => { b.textContent = 'Copy link'; }, 1800); };
  addEventListener('message', e => { const d = e.data || {}; if (d.type === 'demo' && d.cmd === 'fullscreen' && !lb.hidden) goFull(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden && !document.fullscreenElement) close(); });
  document.addEventListener('fullscreenchange', () => { $('lbfs').textContent = document.fullscreenElement ? 'Exit full screen' : 'Full screen'; });
  const h = location.hash.slice(1); if (h && $('d-' + h)) setTimeout(() => $('d-' + h).scrollIntoView({ block: 'center' }), 200);
}

fetch('mesta-logo.svg').then(r => r.text()).then(t => { const s = t.replace(/\s(class|style|width|height)="[^"]*"/g, ''); document.querySelectorAll('.logo-slot').forEach(el => { el.innerHTML = s; }); }).catch(() => {});
