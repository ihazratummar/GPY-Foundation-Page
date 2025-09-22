function get(q) { const u = new URL(location.href); return u.searchParams.get(q) || ''; }
const pa = get('pa') || '7407714217@upi';
const pn = decodeURIComponent(get('pn') || 'GPY Foundation');
const tr = get('tr') || ('REF' + Date.now());
const tn = decodeURIComponent(get('tn') || 'দান (সদকা/জাকাত/ফান্ড)');
const am = get('am') || '';
const cu = get('cu') || 'INR';

let upi = `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}`;
if (am) upi += `&am=${encodeURIComponent(am)}`;
if (tr) upi += `&tr=${encodeURIComponent(tr)}`;
if (tn) upi += `&tn=${encodeURIComponent(tn)}`;
if (cu) upi += `&cu=${encodeURIComponent(cu)}`;

document.getElementById('msg').innerHTML = '<span class="spinner"></span>পেমেন্ট প্রস্তুত করা হচ্ছে...';

// Always show fallback after 1.2s (no iframe, no auto-redirect)
setTimeout(showFallback, 1200);

function showFallback() {
    document.getElementById('msg').style.display = 'none';
    document.getElementById('fallback').style.display = 'block';
    document.getElementById('vpaText').innerText = pa;
    document.getElementById('amountText').innerText = am ? `পরিমাণ: ₹${am}` : '';
    document.getElementById('purposeText').innerText = tn ? `উদ্দেশ্য: ${tn}` : '';
    const qr = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(upi);
    document.getElementById('qrImg').src = qr;
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