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
Liste des différentes technologies utilisé pour la création du projet :
* NodeJs
* react
* express
* mongoose
* mongoDB

---
## 3. Installation
Cloner le repository :

    $ git clone https://github.com/KennyClint/projet_7_groupomania.git

Aller dans le dossier qui a été téléchargé :

    $ cd projet_7_groupomania

Installer les librairies :

    $ npm install

Démarrer le projet (par défaut le projet sera lancé sur le port 3000) :

    $ npm start

Ouvrir un deuxième terminal de commande dans le dossier "backend", puis installer les librairies :

    $ npm install

Démarrer le projet (par défaut le projet sera lancé sur le port 4200) :

    $ npm start

Dans le dossier "backend" renomer le fichier ".env.example" en ".env" et à l'intérieur compléter les données manquantes.

Le ".env" du dossier racine, comporte le port des urls utilisés pour les liens. 

Le ".env" du dossier "backend", comporte l'url avec les identifiants vers la base de données et la clé de cryptage utilisé par "jsonwebtoken".