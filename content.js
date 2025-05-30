// --- Injection dynamique des boutons selon l'ordre sauvegardé ---
const defaultOrder = [
    {name: 'ChatGPT', icon: '🤖'},
    {name: 'Maps', icon: '🗺️'},
    {name: 'Wikipedia', icon: '📚'},
    {name: 'Youtube', icon: '▶️'},
    {name: 'Gmail', icon: '✉️'},
    {name: 'Drive', icon: '💾'}
];

// Variable pour suivre si l'injection est en cours
let isInjecting = false;
// Variable pour suivre si les boutons sont déjà injectés
let buttonsInjected = false;

function createButton(btn, imagesLink) {
    const a = document.createElement('a');
    a.className = imagesLink.className + ' chatgpt-button';
    a.href = 'javascript:void(0);'; // Utilisation de javascript:void(0) au lieu de #
    a.style.marginLeft = '8px';
    a.style.borderRadius = '4px';
    a.style.textDecoration = 'none';
    a.style.fontSize = '14px';
    a.style.fontWeight = '500';
    a.style.padding = '0 12px';
    a.style.height = imagesLink.offsetHeight + 'px';
    a.style.display = 'inline-flex';
    a.style.alignItems = 'center';
    a.style.cursor = 'pointer';
    a.innerHTML = `<span style="margin-right:6px;">${btn.icon}</span> ${btn.name}`;

    // Fonction de gestion des clics
    const handleClick = (e) => {
        console.log(`Clic sur ${btn.name} détecté`);
        e.preventDefault();
        e.stopPropagation();

        const actions = {
            'ChatGPT': () => {
                const searchQuery = document.querySelector('input[name="q"]')?.value;
                if (!searchQuery) {
                    console.error('Champ de recherche non trouvé');
                    return;
                }
                const cleanQuery = searchQuery.trim();
                navigator.clipboard.writeText(cleanQuery)
                    .then(() => window.open('https://chatgpt.com/chat', '_blank'))
                    .catch(() => {
                        alert('Impossible de copier la recherche. Veuillez la copier manuellement.');
                        window.open('https://chatgpt.com/chat', '_blank');
                    });
            },
            'Maps': () => window.open('https://www.google.fr/maps?hl=fr', '_blank'),
            'Wikipedia': () => {
                const searchQuery = document.querySelector('input[name="q"]')?.value.trim().replace(/ /g, '_');
                window.open(`https://fr.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`, '_blank');
            },
            'Youtube': () => window.open('https://www.youtube.com/', '_blank'),
            'Gmail': () => window.open('https://mail.google.com/mail/u/0/#inbox', '_blank'),
            'Drive': () => window.open('https://drive.google.com/drive/u/0/home', '_blank')
        };

        try {
            if (actions[btn.name]) {
                actions[btn.name]();
            } else if (btn.url) {
                window.open(btn.url, '_blank');
            }
        } catch (error) {
            console.error(`Erreur lors du clic sur ${btn.name}:`, error);
        }
    };

    // Ajout des styles et de l'ID selon le bouton
    switch(btn.name) {
        case 'ChatGPT':
            a.id = 'chatgpt-search-button';
            a.style.backgroundColor = '#10a37f';
            a.style.color = 'white';
            break;
        case 'Maps':
            a.id = 'maps-search-button';
            a.style.backgroundColor = '#4285F4';
            a.style.color = 'white';
            break;
        case 'Wikipedia':
            a.id = 'wikipedia-search-button';
            a.style.backgroundColor = '#E9A825';
            a.style.color = 'black';
            break;
        case 'Youtube':
            a.id = 'youtube-search-button';
            a.style.backgroundColor = '#FF0000';
            a.style.color = 'white';
            break;
        case 'Gmail':
            a.id = 'gmail-search-button';
            a.style.backgroundColor = '#34A853';
            a.style.color = 'white';
            break;
        case 'Drive':
            a.id = 'drive-search-button';
            a.style.backgroundColor = '#1A73E8';
            a.style.color = 'white';
            break;
        default:
            a.id = `custom-btn-${btn.name.replace(/\s+/g, '-').toLowerCase()}`;
            a.style.backgroundColor = '#f3f6fa';
            a.style.color = '#1a73e8';
    }

    // Ajout de l'événement de clic
    a.onclick = handleClick;
    return a;
}

function injectButtons(order) {
    if (isInjecting || buttonsInjected) return;

    isInjecting = true;
    console.log('Début de l\'injection des boutons');

    try {
        const existingButtons = document.querySelectorAll('.chatgpt-button');
        if (existingButtons.length > 0) {
            console.log('Les boutons existent déjà');
            buttonsInjected = true;
            isInjecting = false;
            return;
        }

        const navLinks = Array.from(document.querySelectorAll('a'));
        const imagesLink = navLinks.find(link => link.textContent.trim() === 'Images');
        
        if (!imagesLink) {
            console.log('Bouton Images non trouvé, nouvelle tentative dans 1 seconde');
            setTimeout(() => injectButtons(order), 1000);
            return;
        }

        // Nettoyage des anciens boutons
        document.querySelectorAll('.chatgpt-button, [id^="custom-btn-"]').forEach(el => el.remove());

        let lastBtn = imagesLink;
        order.forEach(btn => {
            try {
                const button = createButton(btn, imagesLink);
                lastBtn.parentNode.insertBefore(button, lastBtn.nextSibling);
                lastBtn = button;
                console.log(`Bouton ${btn.name} injecté avec succès`);
            } catch (error) {
                console.error(`Erreur lors de la création du bouton ${btn.name}:`, error);
            }
        });

        buttonsInjected = true;
        console.log('Injection des boutons terminée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'injection des boutons:', error);
    } finally {
        isInjecting = false;
    }
}

// Charger l'ordre et injecter les boutons
chrome.storage.local.get({ buttonOrder: defaultOrder }, (data) => {
    console.log('Données récupérées du stockage');
    injectButtons(data.buttonOrder);
});

// Observer les changements dans le DOM de manière plus ciblée
const observer = new MutationObserver((mutations) => {
    // Vérifier si les boutons existent toujours
    const existingButtons = document.querySelectorAll('.chatgpt-button');
    if (existingButtons.length === 0) {
        buttonsInjected = false;
        chrome.storage.local.get({ buttonOrder: defaultOrder }, (data) => {
            injectButtons(data.buttonOrder);
        });
    }
});

// Observer uniquement les changements dans la barre de navigation
const navObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.target.id === 'searchform' || 
            mutation.target.closest('#searchform') || 
            mutation.target.closest('form[role="search"]')) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            break;
        }
    }
});

// Observer le document pour détecter la barre de navigation
navObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
});

// Nettoyer les observateurs si la page est déchargée
window.addEventListener('unload', () => {
    observer.disconnect();
    navObserver.disconnect();
}); 