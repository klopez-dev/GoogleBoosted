// --- Injection dynamique des boutons selon l'ordre sauvegardé ---
const defaultOrder = [
    {name: 'ChatGPT', icon: '🤖'},
    {name: 'Maps', icon: '🗺️'},
    {name: 'Wikipedia', icon: '📚'},
    {name: 'Youtube', icon: '▶️'},
    {name: 'Gmail', icon: '✉️'},
    {name: 'Drive', icon: '💾'}
];

function injectButtons(order) {
    // Nettoyage des doublons d'URL (on garde le dernier)
    const unique = [];
    const seen = new Set();
    for (let i = order.length - 1; i >= 0; i--) {
        const btn = order[i];
        if (!btn.url || !seen.has(btn.url)) {
            unique.unshift(btn);
            if (btn.url) seen.add(btn.url);
        }
    }
    // Supprimer tous les anciens boutons personnalisés (icône 🔗 ou class custom-btn-...)
    document.querySelectorAll('a.chatgpt-button').forEach(a => {
        if (a.querySelector('span') && a.querySelector('span').textContent.includes('🔗')) {
            a.remove();
        }
        if (a.id && a.id.startsWith('custom-btn-')) {
            a.remove();
        }
    });
    // Chercher le bouton "Images" dans la barre de navigation
    const navLinks = Array.from(document.querySelectorAll('a'));
    const imagesLink = navLinks.find(link => link.textContent.trim() === 'Images');
    if (!imagesLink) {
        setTimeout(() => injectButtons(unique), 1000);
        return;
    }
    // Supprimer les anciens boutons par défaut si présents
    [
        'chatgpt-search-button',
        'maps-search-button',
        'wikipedia-search-button',
        'youtube-search-button',
        'gmail-search-button',
        'drive-search-button'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
    let lastBtn = imagesLink;
    unique.forEach(btn => {
        const a = document.createElement('a');
        a.className = imagesLink.className + ' chatgpt-button';
        a.href = '#';
        a.style.marginLeft = '8px';
        a.style.borderRadius = '4px';
        a.style.textDecoration = 'none';
        a.style.fontSize = '14px';
        a.style.fontWeight = '500';
        a.style.padding = '0 12px';
        a.style.height = imagesLink.offsetHeight + 'px';
        a.style.display = 'inline-flex';
        a.style.alignItems = 'center';
        a.innerHTML = `<span style=\"margin-right:6px;\">${btn.icon}</span> ${btn.name}`;
        // Couleurs et actions
        switch(btn.name) {
            case 'ChatGPT':
                a.id = 'chatgpt-search-button';
                a.style.backgroundColor = '#10a37f';
                a.style.color = 'white';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const searchQuery = document.querySelector('input[name=\"q\"]').value;
                    const cleanQuery = searchQuery.trim();
                    navigator.clipboard.writeText(cleanQuery).then(() => {
                        window.open(`https://chatgpt.com/chat`, '_blank');
                    }).catch(() => {
                        alert('Impossible de copier automatiquement la recherche. Veuillez la copier manuellement.');
                        window.open(`https://chatgpt.com/chat`, '_blank');
                    });
                });
                break;
            case 'Maps':
                a.id = 'maps-search-button';
                a.style.backgroundColor = '#4285F4';
                a.style.color = 'white';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open('https://www.google.fr/maps?hl=fr', '_blank');
                });
                break;
            case 'Wikipedia':
                a.id = 'wikipedia-search-button';
                a.style.backgroundColor = '#E9A825';
                a.style.color = 'black';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const searchQuery = document.querySelector('input[name=\"q\"]').value.trim().replace(/ /g, '_');
                    window.open(`https://fr.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`, '_blank');
                });
                break;
            case 'Youtube':
                a.id = 'youtube-search-button';
                a.style.backgroundColor = '#FF0000';
                a.style.color = 'white';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open('https://www.youtube.com/', '_blank');
                });
                break;
            case 'Gmail':
                a.id = 'gmail-search-button';
                a.style.backgroundColor = '#34A853';
                a.style.color = 'white';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
                });
                break;
            case 'Drive':
                a.id = 'drive-search-button';
                a.style.backgroundColor = '#1A73E8';
                a.style.color = 'white';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open('https://drive.google.com/drive/u/0/home', '_blank');
                });
                break;
            default:
                // Bouton personnalisé
                a.id = `custom-btn-${btn.name.replace(/\s+/g, '-').toLowerCase()}`;
                a.style.backgroundColor = '#f3f6fa';
                a.style.color = '#1a73e8';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open(btn.url, '_blank');
                });
                break;
        }
        lastBtn.parentNode.insertBefore(a, lastBtn.nextSibling);
        lastBtn = a;
    });
}

// Charger l'ordre et injecter les boutons
chrome.storage.local.get({ buttonOrder: defaultOrder }, (data) => {
    injectButtons(data.buttonOrder);
});

// Observer les changements dans le DOM pour s'assurer que le bouton est ajouté même après les mises à jour dynamiques
const observer = new MutationObserver(() => {
    chrome.storage.local.get({ buttonOrder: defaultOrder }, (data) => {
        injectButtons(data.buttonOrder);
    });
});
observer.observe(document.body, {
    childList: true,
    subtree: true
}); 