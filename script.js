if (localStorage.getItem("birthdayAccess") !== "granted") {
    window.location.href = "login.html";
}

const birthdayDate = new Date(Date.now() + 5000);
let unlocked = false;

function launchConfetti() {
    let c = 0;
    const i = setInterval(() => {
        confetti({ particleCount: 60, spread: 90 });
        c++;
        if (c >= 5) clearInterval(i);
    }, 700);
}

function openPopup() {
    document.getElementById('birthdayPopup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('birthdayPopup').classList.add('hidden');
}

function countdown() {
    const d = birthdayDate - new Date();
    if (d <= 0) {
        if (!unlocked) {
            unlocked = true;
            document.getElementById('lockedMessage').style.display = 'none';
            document.getElementById('friendsLocked').style.display = 'none';
            document.getElementById('friendsSection').style.display = 'block';
            document.getElementById('unlockText').style.display = 'block';
            document.getElementById('openPopupWrap').classList.remove('hidden');

            if (!sessionStorage.getItem('popupShown')) {
                sessionStorage.setItem('popupShown', 'true');
                document.getElementById('birthdayPopup').classList.remove('hidden');
                launchConfetti();
            }
        }
        document.getElementById('days').textContent    = '00';
        document.getElementById('hours').textContent   = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    document.getElementById('days').textContent    = String(Math.floor(d / 86400000)).padStart(2, '0');
    document.getElementById('hours').textContent   = String(Math.floor(d % 86400000 / 3600000)).padStart(2, '0');
    document.getElementById('minutes').textContent = String(Math.floor(d % 3600000 / 60000)).padStart(2, '0');
    document.getElementById('seconds').textContent = String(Math.floor(d % 60000 / 1000)).padStart(2, '0');
}

// Kalau udah pernah unlock sebelumnya di sesi ini, langsung tampil tombol
if (sessionStorage.getItem('popupShown')) {
    unlocked = true;
    document.getElementById('lockedMessage').style.display = 'none';
    document.getElementById('friendsLocked').style.display = 'none';
    document.getElementById('friendsSection').style.display = 'block';
    document.getElementById('unlockText').style.display = 'block';
    document.getElementById('openPopupWrap').classList.remove('hidden');
}

function toggleLetter(card) {
    card.classList.toggle('active');
}

countdown();
setInterval(countdown, 1000);