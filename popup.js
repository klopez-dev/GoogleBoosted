function renderLinks(links) {
    const list = document.getElementById('linksList');
    list.innerHTML = '';
    links.forEach((link, idx) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = link;
        a.href = link;
        a.target = '_blank';
        a.className = 'link';
        li.appendChild(a);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✕';
        removeBtn.className = 'removeBtn';
        removeBtn.onclick = () => {
            links.splice(idx, 1);
            chrome.storage.local.set({ savedLinks: links }, () => renderLinks(links));
        };
        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

document.getElementById('addBtn').onclick = () => {
    const input = document.getElementById('linkInput');
    let url = input.value.trim();
    if (!url) return;
    if (!/^https?:\/\//.test(url)) url = 'https://' + url;
    chrome.storage.local.get({ savedLinks: [], buttonOrder: defaultOrder }, (data) => {
        const links = data.savedLinks;
        if (!links.includes(url)) {
            links.push(url);
            // Ajouter aussi comme bouton rapide
            let domain;
            try {
                domain = (new URL(url)).hostname.replace('www.', '');
            } catch {
                domain = 'Lien';
            }
            const btnName = domain.length > 18 ? domain.slice(0, 15) + '…' : domain;
            // Empêcher les doublons d'URL (même URL, peu importe le nom)
            const alreadyExists = data.buttonOrder.some(b => b.url === url);
            if (!alreadyExists) {
                const newBtn = { name: btnName, icon: '🔗', url };
                const buttonOrder = data.buttonOrder.filter(b => b.url !== url);
                buttonOrder.push(newBtn);
                chrome.storage.local.set({ savedLinks: links, buttonOrder }, () => {
                    renderLinks(links);
                    renderExtButtons(buttonOrder);
                });
            } else {
                chrome.storage.local.set({ savedLinks: links }, () => renderLinks(links));
            }
        }
    });
    input.value = '';
};

chrome.storage.local.get({ savedLinks: [] }, (data) => renderLinks(data.savedLinks));

// --- Drag & Drop pour les boutons d'extension ---
const defaultOrder = [
    {name: 'ChatGPT', icon: '🤖'},
    {name: 'Maps', icon: '🗺️'},
    {name: 'Wikipedia', icon: '📚'},
    {name: 'Youtube', icon: '▶️'},
    {name: 'Gmail', icon: '✉️'},
    {name: 'Drive', icon: '💾'}
];

function renderExtButtons(order) {
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
    const list = document.getElementById('extButtonsList');
    list.innerHTML = '';
    unique.forEach(btn => {
        const div = document.createElement('div');
        div.className = 'ext-btn';
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-btn', btn.name);
        div.innerHTML = `<span class=\"ext-ico\">${btn.icon}</span> ${btn.name}`;
        if (btn.url) {
            const removeBtn = document.createElement('span');
            removeBtn.className = 'remove-user-btn';
            removeBtn.title = 'Supprimer ce bouton';
            removeBtn.textContent = '✕';
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                chrome.storage.local.get({ buttonOrder: defaultOrder }, (data) => {
                    const newOrder = data.buttonOrder.filter(b => !(b.name === btn.name && b.url === btn.url));
                    chrome.storage.local.set({ buttonOrder: newOrder }, () => {
                        renderExtButtons(newOrder);
                    });
                });
            };
            div.appendChild(removeBtn);
        }
        list.appendChild(div);
    });
    addDragDropListeners();
    // Sauvegarde le nettoyage si besoin
    chrome.storage.local.set({ buttonOrder: unique });
}

function addDragDropListeners() {
    const items = document.querySelectorAll('.ext-btn');
    let dragSrc = null;
    items.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            dragSrc = this;
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
        item.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        item.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        item.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            if (dragSrc && dragSrc !== this) {
                const list = this.parentNode;
                const nodes = Array.from(list.children);
                const from = nodes.indexOf(dragSrc);
                const to = nodes.indexOf(this);
                if (from > -1 && to > -1) {
                    nodes.splice(to, 0, nodes.splice(from, 1)[0]);
                    nodes.forEach(n => list.appendChild(n));
                    // Sauvegarder le nouvel ordre
                    const newOrder = Array.from(list.children).map(n => {
                        const name = n.getAttribute('data-btn');
                        // Chercher dans l'ordre courant (boutons par défaut + personnalisés)
                        return (JSON.parse(localStorage.getItem('lastButtonOrder')) || defaultOrder).find(b => b.name === name) || {name, icon: '🔗'};
                    });
                    chrome.storage.local.set({ buttonOrder: newOrder });
                    localStorage.setItem('lastButtonOrder', JSON.stringify(newOrder));
                }
            }
        });
    });
}

// Charger l'ordre au démarrage
chrome.storage.local.get({ buttonOrder: defaultOrder }, (data) => {
    renderExtButtons(data.buttonOrder);
    localStorage.setItem('lastButtonOrder', JSON.stringify(data.buttonOrder));
});

// Ajout d'un bouton personnalisé
document.getElementById('addCustomBtnForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('customBtnName').value.trim();
    const url = document.getElementById('customBtnUrl').value.trim();
    if (!name || !url) return;
    chrome.storage.local.get({ buttonOrder: defaultOrder }, (data) => {
        const exists = data.buttonOrder.some(b => b.name === name);
        if (exists) {
            alert('Un bouton avec ce nom existe déjà.');
            return;
        }
        const newBtn = { name, icon: '🔗', url };
        const newOrder = [...data.buttonOrder, newBtn];
        chrome.storage.local.set({ buttonOrder: newOrder }, () => {
            renderExtButtons(newOrder);
            document.getElementById('addCustomBtnForm').reset();
        });
    });
}; 