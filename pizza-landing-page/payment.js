document.addEventListener('DOMContentLoaded', () => {
    // Select Screens
    const screens = {
        selection: document.getElementById('screen-selection'),
        card: document.getElementById('screen-card'),
        summary: document.getElementById('screen-summary'),
        processing: document.getElementById('screen-processing'),
        success: document.getElementById('screen-success'),
        failure: document.getElementById('screen-failure')
    };

    let currentMethod = 'card';
    let cardData = { name: '', number: '', expiry: '', cvv: '' };

    // --- Navigation ---
    const showScreen = (target) => {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active', 'prev');
        });
        screens[target].classList.add('active');
    };

    // Method Selection click
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach(card => {
        card.addEventListener('click', () => {
            methodCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            currentMethod = card.getAttribute('data-method');
        });
    });

    // --- Screen Logic ---

    // 1. To Details/Card
    document.getElementById('btn-to-details').addEventListener('click', () => {
        if (currentMethod === 'card') {
            showScreen('card');
        } else {
            // Direct to summary for digital wallets/cash
            updateSummary();
            showScreen('summary');
        }
    });

    // 2. Card Validation & Formats
    const cardInput = document.getElementById('card-number');
    const nameInput = document.getElementById('card-name');
    const expiryInput = document.getElementById('card-expiry');
    const cvvInput = document.getElementById('card-cvv');

    const prevNumber = document.getElementById('prev-number');
    const prevName = document.getElementById('prev-name');
    const prevExpiry = document.getElementById('prev-expiry');

    // Number formatting
    cardInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formatted = val.match(/.{1,4}/g);
        if (formatted) {
            e.target.value = formatted.join(' ');
        }
        prevNumber.innerText = e.target.value || "#### #### #### ####";
    });

    // Name formatting
    nameInput.addEventListener('input', (e) => {
        prevName.innerText = e.target.value.toUpperCase() || "YOUR NAME";
    });

    // Expiry formatting
    expiryInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
        if (val.length >= 2) {
            e.target.value = val.slice(0, 2) + '/' + val.slice(2, 4);
        }
        prevExpiry.innerText = e.target.value || "MM/YY";
    });

    // Validate form before summary
    document.getElementById('btn-to-summary').addEventListener('click', () => {
        let isValid = true;

        if (nameInput.value.length < 3) {
            document.getElementById('group-name').classList.add('error');
            isValid = false;
        } else {
            document.getElementById('group-name').classList.remove('error');
        }

        if (cardInput.value.replace(/\s/g, '').length !== 16) {
            document.getElementById('group-number').classList.add('error');
            isValid = false;
        } else {
            document.getElementById('group-number').classList.remove('error');
        }

        if (expiryInput.value.length < 5) {
            document.getElementById('group-expiry').classList.add('error');
            isValid = false;
        } else {
            document.getElementById('group-expiry').classList.remove('error');
        }

        if (cvvInput.value.length < 3) {
            document.getElementById('group-cvv').classList.add('error');
            isValid = false;
        } else {
            document.getElementById('group-cvv').classList.remove('error');
        }

        if (isValid) {
            cardData = {
                name: nameInput.value,
                number: cardInput.value.slice(-4),
                expiry: expiryInput.value
            };
            updateSummary();
            showScreen('summary');
        }
    });

    // --- Update Summary Screen ---
    const updateSummary = () => {
        const icon = document.getElementById('summary-method-icon');
        const name = document.getElementById('summary-method-name');
        const details = document.getElementById('summary-method-details');

        if (currentMethod === 'card') {
            icon.className = 'fas fa-credit-card';
            name.innerText = 'Credit Card';
            details.innerText = `Ending in ${cardData.number}`;
        } else if (currentMethod === 'google') {
            icon.className = 'fab fa-google-pay';
            name.innerText = 'Google Pay';
            details.innerText = 'Verified Wallet';
        } else if (currentMethod === 'apple') {
            icon.className = 'fab fa-apple-pay';
            name.innerText = 'Apple Pay';
            details.innerText = 'Verified Wallet';
        } else {
            icon.className = 'fas fa-money-bill-wave';
            name.innerText = 'Cash on Delivery';
            details.innerText = 'Pay at your doorstep';
        }
    };

    // --- Pay Now Logic (Simulation) ---
    document.getElementById('btn-pay-now').addEventListener('click', () => {
        showScreen('processing');

        // Simulate random outcome
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; // 80% success rate
            if (isSuccess) {
                showScreen('success');
                // Automatically redirect to tracking page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'tracking.html';
                }, 2000);
            } else {
                showScreen('failure');
            }
        }, 3000);
    });

    // Back handlers
    document.querySelectorAll('.btn-back-selection').forEach(btn => {
        btn.addEventListener('click', () => showScreen('selection'));
    });
    document.querySelector('.btn-back-card').addEventListener('click', () => showScreen('card'));
    document.getElementById('btn-retry').addEventListener('click', () => showScreen('selection'));

});
