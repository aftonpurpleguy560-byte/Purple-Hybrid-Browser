/**
 * Purpleguy Browser - Renderer Logic
 * Author: Efe
 * Signature: Purpleguy © 2026 - tablet power
 */

// Element Seçicileri
const urlInput = document.getElementById('url-input');
const goBtn = document.getElementById('go-btn');
const view = document.getElementById('view');
const gxPanel = document.getElementById('gx-panel');
const ramRange = document.getElementById('ram-range');
const ramVal = document.getElementById('ram-val');
const cpuRange = document.getElementById('cpu-range');
const cpuVal = document.getElementById('cpu-val');
const splashScreen = document.getElementById('splash-screen');

// 1. AÇILIŞ EKRANI (SPLASH SCREEN) YÖNETİMİ
window.addEventListener('DOMContentLoaded', () => {
    // 3 saniye sonra splash screen'i yavaşça kaldır
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 600);
        }
    }, 3000);
});

// 2. NAVİGASYON VE URL YÖNETİMİ
function navigate() {
    let url = urlInput.value.trim();
    
    if (url === "") return;

    // Eğer başında http yoksa ve nokta içeriyorsa (site ise) ekle
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        if (url.includes('.')) {
            url = 'https://' + url;
        } else {
            // Nokta yoksa Google'da ara
            url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
        }
    }
    
    // WebView içeriğini yükle
    view.src = url;
}

// Buton tıklama ve Enter tuşu dinleyicileri
goBtn.addEventListener('click', navigate);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') navigate();
});

// 3. GX & BRAVE PANEL KONTROLLERİ
function togglePanel() {
    gxPanel.classList.toggle('active');
}

// RAM Slider Güncelleme
ramRange.addEventListener('input', (e) => {
    ramVal.textContent = e.target.value + ".0 GB";
    console.log(`[GX Core] RAM Limit set to: ${e.target.value}GB`);
});

// CPU Slider Güncelleme
cpuRange.addEventListener('input', (e) => {
    cpuVal.textContent = e.target.value + "%";
    console.log(`[GX Core] CPU Limit set to: ${e.target.value}%`);
});

// 4. HACKER MODE (GİZLİ MOD) FONKSİYONU
function toggleHackerMode() {
    document.body.classList.toggle('hacker-mode');
    
    if (document.body.classList.contains('hacker-mode')) {
        console.warn("Hacker Mode: ON - Shielding active.");
        alert("Hacker Mode Aktif: İzleyiciler engelleniyor ve tema güncellendi.");
    } else {
        console.log("Hacker Mode: OFF");
    }
}

// 5. NAVİGASYON OKLARI (OPSİYONEL)
// Eğer index.html'deki oklara class/id eklediysen bunları kullanabilirsin
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.innerText === '⬅') view.goBack();
        if (btn.innerText === '➡') view.goForward();
        if (btn.innerText === '🔄') view.reload();
    });
});

