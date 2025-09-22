function get(q) { const u = new URL(location.href); return u.searchParams.get(q) || ''; }
const pa = get('pa') || '7407714217@upi';
const pn = decodeURIComponent(get('pn') || 'GPY Foundation');
const tr = get('tr') || ('REF' + Date.now());
const tn = decodeURIComponent(get('tn') || 'দান (সদকা/জাকাত/ফান্ড)');
let am = get('am') || '';
const cu = get('cu') || 'INR';

// Ensure minimum amount is 1 if not set or invalid
if (!am || isNaN(am) || Number(am) < 1) am = '50';

// Don't encode @ in pa
let upi = `upi://pay?pa=${pa}&pn=${encodeURIComponent(pn)}`;
if (am) upi += `&am=${encodeURIComponent(am)}`;
if (tr) upi += `&tr=${encodeURIComponent(tr)}`;
if (tn) upi += `&tn=${encodeURIComponent(tn)}`;
if (cu) upi += `&cu=${encodeURIComponent(cu)}`;

document.getElementById('msg').innerHTML = '<span class="spinner"></span>পেমেন্ট প্রস্তুত করা হচ্ছে...';

// In-app browser detection (Telegram, Facebook, Instagram, etc.)
function isInAppBrowser() {
    const ua = navigator.userAgent || '';
    return /FBAN|FBAV|Instagram|Line|MicroMessenger|Twitter|Snapchat|Telegram/i.test(ua);
}

// Copy page URL for user
function copyPageUrl() {
    navigator.clipboard?.writeText(window.location.href).then(() => {
        alert('লিঙ্ক কপি হয়েছে! এখন আপনার ব্রাউজারে পেস্ট করুন।');
    });
}

if (isInAppBrowser()) {
    document.getElementById('browserWarning').style.display = 'block';
    // Don't try to open UPI app, just show fallback
    showFallback();
} else {
    // Try to open UPI app (old logic)
    setTimeout(() => {
        const start = Date.now();
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = upi;
        document.body.appendChild(iframe);
        setTimeout(() => {
            // If user is still on page after ~1s, show fallback
            if (Date.now() - start < 3000) showFallback();
            try { document.body.removeChild(iframe); } catch (e) { }
        }, 1200);
    }, 50);
}

function showFallback() {
    document.getElementById('msg').style.display = 'none';
    document.getElementById('fallback').style.display = 'block';
    document.getElementById('vpaText').innerText = pa;
    document.getElementById('amountText').innerText = am ? `পরিমাণ: ₹${am}` : '';
    document.getElementById('purposeText').innerText = tn ? `উদ্দেশ্য: ${tn}` : '';
    const qr = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(upi);
    document.getElementById('qrImg').src = qr;

    // Add UPI open button handler
    const openBtn = document.getElementById('openUpiBtn');
    if (openBtn) {
        openBtn.onclick = function () {
            window.location.href = upi;
        };
    }
}

function copyVPA() {
    navigator.clipboard?.writeText(pa).then(() => {
        document.getElementById('copyBtn').innerText = 'কপি হয়েছে!';
        document.getElementById('thanks').style.display = 'block';
        setTimeout(() => {
            document.getElementById('copyBtn').innerText = 'ইউপিআই আইডি কপি করুন';
            document.getElementById('thanks').style.display = 'none';
        }, 1800);
    });
}