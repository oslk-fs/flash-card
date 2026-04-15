# Flash Cards App

Une application web simple pour créer et réviser des cartes mémoire organisées par matières.

## Fonctionnalités

### Gestion des Matières
- **Ajouter une matière** : Saisissez un titre unique dans le champ en haut et cliquez sur "Ajouter" ou appuyez sur Entrée.
- **Modifier le titre** : Cliquez sur le titre d'une matière pour l'éditer (limite de 20 caractères).
- **Supprimer une matière** : Cliquez sur le bouton "X" avec confirmation pour éviter les suppressions accidentelles.

### Gestion des Cartes Mémoire
- **Ajouter des cartes** : Cliquez sur le bouton "+" d'une matière pour ouvrir un modal et saisir une question et une réponse.
- **Réviser les cartes** : Cliquez sur "Voir les cartes" pour ouvrir le modal de révision.
  - Barre de progression indiquant la carte actuelle.
  - Navigation avec boutons "Précédent" et "Suivant".
  - Bouton pour afficher/masquer la réponse.
  - Possibilité de supprimer une carte individuelle avec confirmation.

### Fonctionnalités Supplémentaires
- **Persistance des données** : Toutes les données sont sauvegardées localement dans le navigateur (localStorage).
- **Interface responsive** : Design adapté aux différents écrans.
- **Aide intégrée** : Bouton d'aide pour afficher des instructions.

## Comment utiliser

1. **Démarrer l'application** : Ouvrez `index.html` dans un navigateur web.
2. **Ajouter une matière** : Tapez un titre et cliquez sur "Add Card".
3. **Ajouter des cartes** : Cliquez sur "+" pour une matière et remplissez question/réponse.
4. **Réviser** : Cliquez sur "Voir les cartes" et utilisez les contrôles de navigation.

## Structure des fichiers

- `index.html` : Structure HTML principale
- `script.js` : Logique JavaScript pour la gestion des matières et interactions
- `modal.js` : Fonctions pour les modals (ajout, révision, confirmation, messages)
- `styles.css` : Styles CSS pour l'interface
- `assets/` : Dossier pour les ressources (images, etc.)

## Technologies utilisées

- **HTML5** : Structure de la page
- **CSS3** : Mise en page et styles
- **JavaScript (ES6+)** : Logique interactive et gestion des données
- **localStorage** : Stockage persistant des données côté client

## Fonctionnalités à venir

- Export/Import des cartes
- Thèmes personnalisables
- Statistiques de révision
- Mode hors ligne amélioré

## Contribution

Pour contribuer :
1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Auteur

**KAKA Fulbert**
---
[https://oslk-fs.github.io/flash-card/]
