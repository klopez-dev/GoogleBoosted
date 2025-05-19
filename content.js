function createChatGPTButton() {
    // Chercher le bouton "Images" dans la barre de navigation
    const navLinks = Array.from(document.querySelectorAll('a'));
    const imagesLink = navLinks.find(link => link.textContent.trim() === 'Images');

    if (!imagesLink) {
        setTimeout(createChatGPTButton, 1000);
        return;
    }

    // Vérifier si le bouton existe déjà
    if (document.getElementById('chatgpt-search-button')) {
        return;
    }

    // Créer le bouton
    const chatGPTButton = document.createElement('a');
    chatGPTButton.id = 'chatgpt-search-button';
    chatGPTButton.className = imagesLink.className + ' chatgpt-button';
    chatGPTButton.href = '#';
    chatGPTButton.textContent = 'ChatGPT';
    chatGPTButton.style.marginLeft = '8px';
    chatGPTButton.style.backgroundColor = '#10a37f';
    chatGPTButton.style.color = 'white';
    chatGPTButton.style.borderRadius = '4px';
    chatGPTButton.style.textDecoration = 'none';
    chatGPTButton.style.fontSize = '14px';
    chatGPTButton.style.fontWeight = '500';
    chatGPTButton.style.padding = '0 12px';
    chatGPTButton.style.height = imagesLink.offsetHeight + 'px';
    chatGPTButton.style.display = 'inline-flex';
    chatGPTButton.style.alignItems = 'center';

    // Ajouter l'événement de clic
    chatGPTButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchQuery = document.querySelector('input[name="q"]').value;
        console.log('[ChatGPT Extension] Requête Google récupérée :', searchQuery);
        const cleanQuery = searchQuery.trim();
        navigator.clipboard.writeText(cleanQuery).then(() => {
            window.open(`https://chatgpt.com/chat`, '_blank');
        }).catch(() => {
            alert('Impossible de copier automatiquement la recherche. Veuillez la copier manuellement.');
            window.open(`https://chatgpt.com/chat`, '_blank');
        });
    });

    // Insérer le bouton juste après le bouton "Images"
    imagesLink.parentNode.insertBefore(chatGPTButton, imagesLink.nextSibling);

    // Ajout du bouton Maps à droite de ChatGPT
    let chatgptBtn = document.getElementById('chatgpt-search-button');
    if (chatgptBtn && !document.getElementById('maps-search-button')) {
        const mapsButton = document.createElement('a');
        mapsButton.id = 'maps-search-button';
        mapsButton.className = chatgptBtn.className;
        mapsButton.href = '#';
        mapsButton.textContent = 'Maps';
        mapsButton.style.marginLeft = '8px';
        mapsButton.style.backgroundColor = '#4285F4';
        mapsButton.style.color = 'white';
        mapsButton.style.borderRadius = '4px';
        mapsButton.style.textDecoration = 'none';
        mapsButton.style.fontSize = '14px';
        mapsButton.style.fontWeight = '500';
        mapsButton.style.padding = '0 12px';
        mapsButton.style.height = chatgptBtn.offsetHeight + 'px';
        mapsButton.style.display = 'inline-flex';
        mapsButton.style.alignItems = 'center';
        mapsButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://www.google.fr/maps?hl=fr', '_blank');
        });
        chatgptBtn.parentNode.insertBefore(mapsButton, chatgptBtn.nextSibling);
    }

    // Ajout du bouton Wikipedia à droite de Maps
    let mapsBtn = document.getElementById('maps-search-button');
    if (mapsBtn && !document.getElementById('wikipedia-search-button')) {
        const wikipediaButton = document.createElement('a');
        wikipediaButton.id = 'wikipedia-search-button';
        wikipediaButton.className = mapsBtn.className;
        wikipediaButton.href = '#';
        wikipediaButton.textContent = 'Wikipedia';
        wikipediaButton.style.marginLeft = '8px';
        wikipediaButton.style.backgroundColor = '#E9A825';
        wikipediaButton.style.color = 'black';
        wikipediaButton.style.borderRadius = '4px';
        wikipediaButton.style.textDecoration = 'none';
        wikipediaButton.style.fontSize = '14px';
        wikipediaButton.style.fontWeight = '500';
        wikipediaButton.style.padding = '0 12px';
        wikipediaButton.style.height = mapsBtn.offsetHeight + 'px';
        wikipediaButton.style.display = 'inline-flex';
        wikipediaButton.style.alignItems = 'center';
        wikipediaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const searchQuery = document.querySelector('input[name="q"]').value.trim().replace(/ /g, '_');
            window.open(`https://fr.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`, '_blank');
        });
        mapsBtn.parentNode.insertBefore(wikipediaButton, mapsBtn.nextSibling);
    }

    // Ajout du bouton Youtube à droite de Wikipedia
    let wikipediaBtn = document.getElementById('wikipedia-search-button');
    if (wikipediaBtn && !document.getElementById('youtube-search-button')) {
        const youtubeButton = document.createElement('a');
        youtubeButton.id = 'youtube-search-button';
        youtubeButton.className = wikipediaBtn.className;
        youtubeButton.href = '#';
        youtubeButton.textContent = 'Youtube';
        youtubeButton.style.marginLeft = '8px';
        youtubeButton.style.backgroundColor = '#FF0000';
        youtubeButton.style.color = 'white';
        youtubeButton.style.borderRadius = '4px';
        youtubeButton.style.textDecoration = 'none';
        youtubeButton.style.fontSize = '14px';
        youtubeButton.style.fontWeight = '500';
        youtubeButton.style.padding = '0 12px';
        youtubeButton.style.height = wikipediaBtn.offsetHeight + 'px';
        youtubeButton.style.display = 'inline-flex';
        youtubeButton.style.alignItems = 'center';
        youtubeButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://www.youtube.com/', '_blank');
        });
        wikipediaBtn.parentNode.insertBefore(youtubeButton, wikipediaBtn.nextSibling);
    }

    // Ajout du bouton Gmail à droite de Youtube
    let youtubeBtn = document.getElementById('youtube-search-button');
    if (youtubeBtn && !document.getElementById('gmail-search-button')) {
        const gmailButton = document.createElement('a');
        gmailButton.id = 'gmail-search-button';
        gmailButton.className = youtubeBtn.className;
        gmailButton.href = '#';
        gmailButton.textContent = 'Gmail';
        gmailButton.style.marginLeft = '8px';
        gmailButton.style.backgroundColor = '#34A853';
        gmailButton.style.color = 'white';
        gmailButton.style.borderRadius = '4px';
        gmailButton.style.textDecoration = 'none';
        gmailButton.style.fontSize = '14px';
        gmailButton.style.fontWeight = '500';
        gmailButton.style.padding = '0 12px';
        gmailButton.style.height = youtubeBtn.offsetHeight + 'px';
        gmailButton.style.display = 'inline-flex';
        gmailButton.style.alignItems = 'center';
        gmailButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
        });
        youtubeBtn.parentNode.insertBefore(gmailButton, youtubeBtn.nextSibling);
    }

    // Ajout du bouton Drive à droite de Gmail
    let gmailBtn = document.getElementById('gmail-search-button');
    if (gmailBtn && !document.getElementById('drive-search-button')) {
        const driveButton = document.createElement('a');
        driveButton.id = 'drive-search-button';
        driveButton.className = gmailBtn.className;
        driveButton.href = '#';
        driveButton.textContent = 'Drive';
        driveButton.style.marginLeft = '8px';
        driveButton.style.backgroundColor = '#1A73E8';
        driveButton.style.color = 'white';
        driveButton.style.borderRadius = '4px';
        driveButton.style.textDecoration = 'none';
        driveButton.style.fontSize = '14px';
        driveButton.style.fontWeight = '500';
        driveButton.style.padding = '0 12px';
        driveButton.style.height = gmailBtn.offsetHeight + 'px';
        driveButton.style.display = 'inline-flex';
        driveButton.style.alignItems = 'center';
        driveButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://drive.google.com/drive/u/0/home', '_blank');
        });
        gmailBtn.parentNode.insertBefore(driveButton, gmailBtn.nextSibling);
    }
}

// Observer les changements dans le DOM pour s'assurer que le bouton est ajouté même après les mises à jour dynamiques
const observer = new MutationObserver((mutations) => {
    if (!document.getElementById('chatgpt-search-button')) {
        createChatGPTButton();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Exécuter une première fois
createChatGPTButton(); 