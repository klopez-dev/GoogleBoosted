# Extension Google Search Button Boost

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Chrome](https://img.shields.io/badge/Chrome-✓-green.svg)
![Firefox](https://img.shields.io/badge/Firefox-✓-green.svg)
![Edge](https://img.shields.io/badge/Edge-✓-green.svg)

## 📝 Description

Cette extension ajoute plusieurs boutons à la barre de recherche Google, permettant d'accéder rapidement à différents services avec votre recherche Google. Une solution élégante pour améliorer votre productivité lors de vos recherches.

## ✨ Fonctionnalités

- 🔍 Ajout de boutons rapides à la barre de recherche Google
- 🎨 Design moderne et intégré
- 📱 Compatible avec tous les navigateurs majeurs
- 💫 Interface intuitive et responsive
- 🔄 Accès instantané aux services populaires

## 📋 Services disponibles

- **ChatGPT** : Copie la recherche dans le presse-papiers et ouvre ChatGPT
- **Maps** : Ouvre Google Maps avec votre recherche
- **Wikipedia** : Accès direct à la page Wikipédia correspondante
- **Youtube** : Recherche instantanée sur YouTube
- **Gmail** : Accès rapide à votre boîte mail
- **Drive** : Ouverture directe de Google Drive

## 🚀 Installation

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

## 🎯 Utilisation

1. Allez sur Google.com
2. Tapez votre recherche dans la barre de recherche
3. Cliquez sur le bouton souhaité (ChatGPT, Maps, Wikipedia, Youtube, Gmail, Drive)
4. Pour ChatGPT, la recherche est copiée dans le presse-papiers, il suffit de faire Ctrl+V dans la zone de saisie

## 🛠️ Structure du projet

```
GoogleBoost/
├── manifest.json     # Configuration de l'extension
├── content.js        # Code qui injecte les boutons
├── styles.css        # Styles des boutons
└── icons/           # Dossier contenant les icônes
    ├── icon16.png   # Icône 16x16
    ├── icon48.png   # Icône 48x48
    └── icon128.png  # Icône 128x128
```

## ⚠️ Note importante

Pour ChatGPT, l'injection automatique n'est plus possible à cause des protections du site. La recherche est donc copiée dans le presse-papiers pour un collage manuel.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

Made with ❤️ pour améliorer votre expérience de recherche Google 