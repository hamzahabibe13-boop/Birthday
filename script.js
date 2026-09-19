const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const askCard = document.getElementById('askCard');
const resultCard = document.getElementById('resultCard');
const music = document.getElementById('bgMusic');
const buttonContainer = document.getElementById('buttonContainer');
const wrapper = document.querySelector('.wrapper');
const musicBtn = document.getElementById('musicBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPage2Btn = document.getElementById('nextPage2Btn');
const prevPage2Btn = document.getElementById('prevPage2Btn');
const page2Card = document.getElementById('page2Card');
const page3Card = document.getElementById('page3Card');

function createBgHearts() {
    const bgHearts = document.getElementById('bgHearts');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '❤️', '🩷'];

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.animationDuration = 15 + Math.random() * 10 + 's';
        heart.style.fontSize = 15 + Math.random() * 20 + 'px';
        bgHearts.appendChild(heart);
    }
}

function createSparkles() {
    for (let i = 0; i < 18; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(sparkle);
    }
}

let noClickCount = 0;

const cuteMessages = [
    { text: 'Please don\'t say that... 🥺', noText: 'No' },
    { text: 'Think of our memories together! 💕', noText: 'Nooo' },
    { text: 'You are still my favorite person 💔', noText: 'No...' },
    { text: 'Come on, just one little yes? 🍒', noText: 'Nope' },
    { text: 'I will be extra cute if you say yes 😢', noText: 'N-no' },
    { text: 'Last chance to make me smile 🙏', noText: '...' },
    { text: 'Okay fine... I will love you anyway 💖', noText: '' },
];

function showCutePopup(message) {
    const popup = document.createElement('div');
    popup.className = 'cute-popup';
    popup.innerHTML = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

function handleNoClick() {
    noClickCount++;

    const messageIndex = Math.min(noClickCount - 1, cuteMessages.length - 1);
    const currentMessage = cuteMessages[messageIndex];

    showCutePopup(currentMessage.text);

    const yesScale = 1 + noClickCount * 0.25;
    yesBtn.style.transform = `scale(${Math.min(yesScale, 2.5)})`;
    yesBtn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    if (noClickCount >= 3) {
        yesBtn.style.boxShadow = '0 15px 50px rgba(255, 77, 148, 0.6)';
    }
    if (noClickCount >= 5) {
        yesBtn.style.boxShadow = '0 20px 60px rgba(255, 77, 148, 0.8)';
    }

    const noScale = Math.max(1 - noClickCount * 0.15, 0.3);
    noBtn.style.transform = `scale(${noScale})`;
    noBtn.style.opacity = Math.max(1 - noClickCount * 0.12, 0.3);
    noBtn.textContent = currentMessage.noText || 'No';

    if (noClickCount >= cuteMessages.length) {
        noBtn.style.transition = 'all 0.5s ease';
        noBtn.style.transform = 'scale(0)';
        noBtn.style.opacity = '0';

        setTimeout(() => {
            noBtn.style.display = 'none';
            showCutePopup('The No button gave up! Just click Yes! 💖');
        }, 500);
    }
}

noBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    handleNoClick();
});

noBtn.addEventListener('touchend', e => {
    e.preventDefault();
    handleNoClick();
}, { passive: false });

yesBtn.addEventListener('click', () => {
    askCard.classList.add('hide');

    setTimeout(() => {
        askCard.style.display = 'none';
        resultCard.classList.add('show');

        music.volume = 0.5;
        music.play().catch(() => console.log('Audio autoplay blocked'));

        launchHearts();
        launchConfetti();
        launchFloatingPhotos();

        setInterval(launchHearts, 6000);
    }, 500);
});

function launchHearts() {
    const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💝', '🩷', '💘', '💞'];

    for (let i = 0; i < 14; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.bottom = '-50px';
            heart.style.fontSize = 20 + Math.random() * 30 + 'px';
            heart.style.animationDuration = 3 + Math.random() * 2 + 's';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

function launchConfetti() {
    const colors = ['#ff6b9d', '#ff4d94', '#ffb6c1', '#ff69b4', '#ffd700', '#ff1493', '#ff85a2'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.width = 5 + Math.random() * 10 + 'px';
            confetti.style.height = 5 + Math.random() * 10 + 'px';
            confetti.style.animationDuration = 2 + Math.random() * 2 + 's';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

document.addEventListener('click', e => {
    if (resultCard.classList.contains('show')) {
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '💖';
            heart.style.left = e.clientX + (Math.random() - 0.5) * 50 + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.fontSize = '20px';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }
    }
});

let isMusicPlaying = false;

musicBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (isMusicPlaying) {
        music.pause();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
        isMusicPlaying = false;
    } else {
        music.volume = 0.5;
        music.play().then(() => {
            musicBtn.textContent = '🔊';
            musicBtn.classList.add('playing');
            isMusicPlaying = true;
        }).catch(() => {
            console.log('Click to enable music');
        });
    }
});

setTimeout(() => {
    musicBtn.style.animation = 'musicPulse 0.5s ease-in-out 3';
}, 2000);

nextPageBtn.addEventListener('click', () => {
    resultCard.classList.add('flipping', 'flip-out');

    setTimeout(() => {
        resultCard.classList.remove('show', 'flipping', 'flip-out');
        resultCard.style.display = 'none';

        page2Card.style.display = 'block';
        page2Card.classList.add('show', 'flipping', 'flip-in');
        wrapper.classList.add('letter-view');

        launchHearts();

        setTimeout(() => {
            page2Card.classList.remove('flipping', 'flip-in');
        }, 800);
    }, 750);
});

prevPageBtn.addEventListener('click', () => {
    page2Card.classList.add('flipping', 'flip-out-reverse');

    setTimeout(() => {
        page2Card.classList.remove('show', 'flipping', 'flip-out-reverse');
        page2Card.style.display = 'none';

        resultCard.style.display = 'block';
        resultCard.classList.add('show', 'flipping', 'flip-in-reverse');
        wrapper.classList.remove('letter-view');

        setTimeout(() => {
            resultCard.classList.remove('flipping', 'flip-in-reverse');
        }, 800);
    }, 750);
});

nextPage2Btn.addEventListener('click', () => {
    page2Card.classList.add('flipping', 'flip-out');

    setTimeout(() => {
        page2Card.classList.remove('show', 'flipping', 'flip-out');
        page2Card.style.display = 'none';

        page3Card.style.display = 'block';
        page3Card.classList.add('show', 'flipping', 'flip-in');
        wrapper.classList.add('letter-view');

        launchHearts();

        setTimeout(() => {
            page3Card.classList.remove('flipping', 'flip-in');
        }, 800);
    }, 750);
});

prevPage2Btn.addEventListener('click', () => {
    page3Card.classList.add('flipping', 'flip-out-reverse');

    setTimeout(() => {
        page3Card.classList.remove('show', 'flipping', 'flip-out-reverse');
        page3Card.style.display = 'none';

        page2Card.style.display = 'block';
        page2Card.classList.add('show', 'flipping', 'flip-in-reverse');
        wrapper.classList.add('letter-view');

        setTimeout(() => {
            page2Card.classList.remove('flipping', 'flip-in-reverse');
        }, 800);
    }, 750);
});

function launchFloatingPhotos() {
    const photos = [
        'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22 viewBox=%220 0 240 240%22%3E%3Crect width=%22240%22 height=%22240%22 rx=%2230%22 fill=%22%23ffd9e8%22/%3E%3Ccircle cx=%2270%22 cy=%2280%22 r=%2250%22 fill=%22%23fff4a8%22/%3E%3Ccircle cx=%22160%22 cy=%22100%22 r=%2240%22 fill=%22%23ffb3d1%22/%3E%3Ccircle cx=%2290%22 cy=%2280%22 r=%226%22 fill=%22%23333%22/%3E%3Ccircle cx=%22130%22 cy=%2290%22 r=%226%22 fill=%22%23333%22/%3E%3Cpath d=%22M80 110c10 12 30 12 40 0%22 stroke=%22%23e85d8d%22 stroke-width=%228%22 stroke-linecap=%22round%22 fill=%22none%22/%3E%3Cpath d=%22M78 170c18-32 66-32 84 0%22 fill=%22%23ffffff%22 fill-opacity=%220.7%22/%3E%3Ctext x=%22120%22 y=%22205%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2220%22 fill=%22%23d63384%22%3ECute%3C/text%3E%3C/svg%3E',
        'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22 viewBox=%220 0 240 240%22%3E%3Crect width=%22240%22 height=%22240%22 rx=%2230%22 fill=%22%23ffe7f1%22/%3E%3Ccircle cx=%22120%22 cy=%22100%22 r=%2262%22 fill=%22%23ff8fb8%22/%3E%3Ccircle cx=%22100%22 cy=%2290%22 r=%226%22 fill=%22%23333%22/%3E%3Ccircle cx=%22140%22 cy=%2290%22 r=%226%22 fill=%22%23333%22/%3E%3Cpath d=%22M95 122c15 18 35 18 50 0%22 stroke=%22%23ffffff%22 stroke-width=%228%22 stroke-linecap=%22round%22 fill=%22none%22/%3E%3Cpath d=%22M60 170c18-26 102-26 120 0%22 fill=%22%23fff%22 fill-opacity=%220.55%22/%3E%3Cpath d=%22M45 55l8-16 8 16 16 8-16 8-8 16-8-16-16-8z%22 fill=%22%23ffd166%22/%3E%3Ctext x=%22120%22 y=%22205%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2220%22 fill=%22%23d63384%22%3ELove%3C/text%3E%3C/svg%3E',
        'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22 viewBox=%220 0 240 240%22%3E%3Crect width=%22240%22 height=%22240%22 rx=%2230%22 fill=%22%23fff0f5%22/%3E%3Ccircle cx=%22100%22 cy=%2280%22 r=%2248%22 fill=%22%23a8e6cf%22/%3E%3Ccircle cx=%22140%22 cy=%22100%22 r=%2258%22 fill=%22%23b8c0ff%22/%3E%3Ccircle cx=%2290%22 cy=%2278%22 r=%226%22 fill=%22%23333%22/%3E%3Ccircle cx=%22128%22 cy=%2290%22 r=%226%22 fill=%22%23333%22/%3E%3Cpath d=%22M85 116c12 10 28 10 40 0%22 stroke=%22%23e85d8d%22 stroke-width=%228%22 stroke-linecap=%22round%22 fill=%22none%22/%3E%3Cpath d=%22M58 168c15-28 104-28 120 0%22 fill=%22%23fff%22 fill-opacity=%220.65%22/%3E%3Ctext x=%22120%22 y=%22205%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2220%22 fill=%22%23d63384%22%3ECute%3C/text%3E%3C/svg%3E',
        'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22 viewBox=%220 0 240 240%22%3E%3Crect width=%22240%22 height=%22240%22 rx=%2230%22 fill=%22%23ffe0ec%22/%3E%3Ccircle cx=%22120%22 cy=%22100%22 r=%2258%22 fill=%22%23ffcad4%22/%3E%3Ccircle cx=%22100%22 cy=%2290%22 r=%226%22 fill=%22%23333%22/%3E%3Ccircle cx=%22140%22 cy=%2290%22 r=%226%22 fill=%22%23333%22/%3E%3Cpath d=%22M92 122c14 14 42 14 56 0%22 stroke=%22%23ffffff%22 stroke-width=%228%22 stroke-linecap=%22round%22 fill=%22none%22/%3E%3Cpath d=%22M70 170c16-24 84-24 100 0%22 fill=%22%23fff%22 fill-opacity=%220.6%22/%3E%3Cpath d=%22M175 52c10 0 18 8 18 18s-8 18-18 18-18-8-18-18 8-18 18-18zm-12 18l12 12 24-24%22 fill=%22none%22 stroke=%22%23ff5d8f%22 stroke-width=%228%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3Ctext x=%22120%22 y=%22205%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2220%22 fill=%22%23d63384%22%3ELove%3C/text%3E%3C/svg%3E',
        'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22 viewBox=%220 0 240 240%22%3E%3Crect width=%22240%22 height=%22240%22 rx=%2230%22 fill=%22%23fff5d6%22/%3E%3Ccircle cx=%2290%22 cy=%2295%22 r=%2248%22 fill=%22%23ffd166%22/%3E%3Ccircle cx=%22150%22 cy=%2285%22 r=%2242%22 fill=%22%23ffb3c6%22/%3E%3Ccircle cx=%2278%22 cy=%2288%22 r=%226%22 fill=%22%23333%22/%3E%3Ccircle cx=%22118%22 cy=%2282%22 r=%226%22 fill=%22%23333%22/%3E%3Cpath d=%22M78 116c12 12 30 12 42 0%22 stroke=%22%23e85d8d%22 stroke-width=%228%22 stroke-linecap=%22round%22 fill=%22none%22/%3E%3Cpath d=%22M58 168c18-28 102-28 120 0%22 fill=%22%23fff%22 fill-opacity=%220.55%22/%3E%3Ctext x=%22120%22 y=%22205%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2220%22 fill=%22%23d63384%22%3ECute%3C/text%3E%3C/svg%3E'
    ];

    let launchIndex = 0;

    function launchOnePhoto(sideOverride) {
        const photo = photos[launchIndex % photos.length];
        launchIndex++;
        const sizes = ['small', 'small', 'medium'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];

        const img = document.createElement('img');
        img.src = photo;
        img.className = `floating-photo ${size}`;
        img.alt = 'Cute cartoon image';

        const side = sideOverride || (Math.random() > 0.5 ? 'left' : 'right');
        if (side === 'left') {
            img.style.left = Math.random() * 10 + 1 + '%';
        } else {
            img.style.right = Math.random() * 10 + 1 + '%';
            img.style.left = 'auto';
        }

        img.style.animationDuration = 12 + Math.random() * 6 + 's';

        document.body.appendChild(img);
        setTimeout(() => img.remove(), 18000);

        img.onerror = function () {
            this.style.display = 'none';
        };
    }

    launchOnePhoto('left');
    launchOnePhoto('right');
    setTimeout(() => launchOnePhoto('left'), 700);
    setTimeout(() => launchOnePhoto('right'), 1000);

    setInterval(() => {
        launchOnePhoto(launchIndex % 2 === 0 ? 'left' : 'right');
    }, 9000);
}

createBgHearts();
createSparkles();
