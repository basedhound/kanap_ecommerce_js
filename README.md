# Kanap

Quatrième projet du parcours "Développeur web" chez OpenClassrooms. 

L'objectif est de construire un site e-commerce en Vanilla JavaScript .

- [Cahier des charges](notes/Kanap%20-%20Specifications%20fonctionnelles.pdf)

- [Plan de test d'acceptation](notes/Kanap%20-%20Plan%20de%20test%20d'acceptation.pdf)

- [Visuels du site](notes/Kanap%20-%20Visuels%20Responsive.pdf)

![banniere du site](/front/images/banniere.png)

# Lancement

- Prérequis  : Node.js et NPM installés sur votre ordinateur

- Installation Backend : Depuis le dossier "back", lancez "npm install" depuis votre environnement de développement/Terminal.

- Lancement Serveur : Depuis le dossier "back", lancez "node serveur.js" depuis votre environnement de développement/Terminal.

- Le serveur devrait se lancer sur localhost port 3000 par défaut. Vous pouvez utiliser l'extension VSCode "Live Server" pour lancer le site depuis "index.html". 

# Compétences évaluées
- Interagir avec un web service avec JavaScript
- Valider des données issues de sources externes
- Créer un plan de test pour une application
- Gérer des événements JavaScript


# Technologies
**Utilisées :** 
- JavaScript Vanilla
- Node.js (API)
- HTML / CSS (Responsive)

**Interdites :** 
- Framework JavaScript

# Scénario
Vous êtes en poste dans une agence de développement web depuis quelques semaines maintenant. Après avoir réalisé avec succès l’intégration de quelques sites web (HTML/CSS), on vous confie une nouvelle mission.

Votre client est Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.


# Livrables
## Pages à intégrer selon les maquettes :
- **Page d’accueil** 
1. Affichage dynamique des produits via l'utilisation de l'API Fetch.

- **Page Produit**
1. Affichage dynamique du produit choisi sur l'accueil via l'utilisation de l'API Fetch.
2. Système d'ajout Panier via l'utilisation du localStorage.

- **Page Panier**
1. Affichage dynamique des produits ajoutés au Panier.
2. Calcul dynamique des totaux prix/quantité d'articles.
3. Modification de la quantité, suppression d'article, depuis le Panier.
4. Formulaire de commande, utilisation de REGEX.
5. Récupérer un numéro de commande envoyé par l'API après succès de l'achat.



