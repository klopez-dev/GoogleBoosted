# Extension Google Search Button Boost

Cette extension ajoute plusieurs boutons à la barre de recherche Google, permettant d'accéder rapidement à différents services avec votre recherche Google.

## Fonctionnalités

- Ajoute les boutons suivants à droite de la barre de navigation Google :
  - **ChatGPT** : Copie la recherche dans le presse-papiers et ouvre ChatGPT
  - **Maps** : Ouvre Google Maps
  - **Wikipedia** : Ouvre la page Wikipédia correspondant à la recherche
  - **Youtube** : Ouvre YouTube
  - **Gmail** : Ouvre Gmail
  - **Drive** : Ouvre Google Drive
- Compatible avec Chrome, Firefox et Edge
- Design moderne et intégré

## Installation

### Chrome
1. Téléchargez ou clonez ce dépôt
2. Ouvrez Chrome et accédez à `chrome://extensions/`
3. Activez le "Mode développeur" en haut à droite
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier contenant les fichiers de l'extension

### Firefox
1. Téléchargez ou clonez ce dépôt
2. Ouvrez Firefox et accédez à `about:debugging#/runtime/this-firefox`
3. Cliquez sur "Charger un module temporaire"
4. Sélectionnez le fichier `manifest.json` dans le dossier de l'extension

### Edge
1. Téléchargez ou clonez ce dépôt
2. Ouvrez Edge et accédez à `edge://extensions/`
3. Activez le "Mode développeur" en bas à gauche
4. Cliquez sur "Charger une extension non empaquetée"
5. Sélectionnez le dossier contenant les fichiers de l'extension

## Utilisation

1. Allez sur Google.com
2. Tapez votre recherche dans la barre de recherche
3. Cliquez sur le bouton souhaité (ChatGPT, Maps, Wikipedia, Youtube, Gmail, Drive)
4. Pour ChatGPT, la recherche est copiée dans le presse-papiers, il suffit de faire Ctrl+V dans la zone de saisie

## Structure des fichiers

- `manifest.json` : Configuration de l'extension
- `content.js` : Code qui injecte les boutons
- `styles.css` : Styles des boutons
- `icons/` : Dossier contenant les icônes de l'extension

## Note

Pour ChatGPT, l'injection automatique n'est plus possible à cause des protections du site. La recherche est donc copiée dans le presse-papiers pour un collage manuel. 