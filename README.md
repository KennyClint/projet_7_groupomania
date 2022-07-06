# Sommaire
## 1. Informations générales
## 2. Technologies
## 3. Installation

---
## 1. Informations générales
Ce projet est la toute première version d'un projet de réseau social d'entreprise du groupe "Groupomania". Cette première version sera à faire tester par quelques employés de Groupomania pour valider la partie fonctionnelle. Actuellement, cette première version est terminée et est en attente de validation.
Le projet est composé de deux parties. La première partie est le front-end et la seconde partie est l'API, cette dernière se trouvant dans le dossier "backend".

---
## 2. Technologies
Liste des différentes technologies utilisé dans la partie "frontend" du projet :
* "@fortawesome/fontawesome-svg-core": "^6.1.1"
* "@fortawesome/free-regular-svg-icons": "^6.1.1"
* "@fortawesome/free-solid-svg-icons": "^6.1.1"
* "@fortawesome/react-fontawesome": "^0.2.0"
* "@testing-library/jest-dom": "^5.16.4"
* "@testing-library/react": "^13.3.0"
* "@testing-library/user-event": "^13.5.0"
* "prop-types": "^15.8.1"
* "react": "^18.2.0"
* "react-dom": "^18.2.0"
* "react-router-dom": "^6.3.0"
* "react-scripts": "5.0.1"
* "styled-components": "^5.3.5"
* "web-vitals": "^2.1.4"

Liste des différentes technologies utilisé la création de l'API du projet :
* "express": "^4.18.1"
* "bcrypt": "^5.0.1"
* "dotenv": "^16.0.1"
* "jsonwebtoken": "^8.5.1"
* "mongoose": "^6.4.0"
* Base de de données : mongoDB
* "mongoose-unique-validator": "^3.1.0"
* "multer": "^1.4.5-lts.1"

---
## 3. Installation
$ git clone https://github.com/KennyClint/projet_7_groupomania.git
$ cd projet_7_groupomania
$ npm install
$ npm start

Puis ouvrir un deuxième terminal de commande dans le dossier "backend" :
$ npm install
$ npm start

Dans le dossier "backend" renomer le fichier ".env.example" en ".env" et à l'intérieur compléter les données manquantes.

Le ".env" du dossier racine, comporte le port des urls utilisés pour les liens. 
Le ".env" du dossier "backend", comporte l'url avec les identifiants vers la base de données.