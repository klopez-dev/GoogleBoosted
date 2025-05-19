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
    chrome.storage.local.get({ savedLinks: [] }, (data) => {
        const links = data.savedLinks;
        if (!links.includes(url)) {
            links.push(url);
            chrome.storage.local.set({ savedLinks: links }, () => renderLinks(links));
        }
    });
    input.value = '';
};

chrome.storage.local.get({ savedLinks: [] }, (data) => renderLinks(data.savedLinks)); 