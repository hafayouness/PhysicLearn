-Cahier des Charges – Application PhysicLearn (Physique)

📋 Informations Générales
Présentation du Projet

PhysicLearn est une application mobile E-learning spécialisée en physique. Elle permet aux étudiants d’accéder à des cours, leçons et quiz, et aux administrateurs de gérer tout le contenu et suivre la progression.

Contexte:

L’apprentissage de la physique est souvent difficile sans ressources centralisées. Cette application propose des cours structurés, des évaluations et un suivi de progression individualisé.

Objectifs

Faciliter l’apprentissage de la physique

Fournir une interface mobile intuitive

Suivre la progression et les résultats des étudiants

Permettre aux administrateurs de gérer le contenu

👥 Acteurs du Système
Administrateurs

Gérer les utilisateurs et leurs rôles (Admin / Prof / Étudiant)

Créer, modifier et supprimer les cours, leçons et quiz

Suivre la progression des étudiants

Étudiants

Consulter les cours et leçons

Passer les quiz

Suivre leur progression

Télécharger les fichiers pédagogiques

🎯 Fonctionnalités Principales
Module Administration

Gestion des utilisateurs (CRUD, rôle, profil)

Gestion des cours (CRUD, catégories, niveau, upload fichiers via Multer)

Gestion des leçons (texte, images, vidéos, validation)

Gestion des quiz (QCM, calcul automatique des scores)

Suivi de progression des étudiants

🏗️ Architecture Technique
Backend (API REST)

Technologies :

Node.js

Express.js

PostgreSQL (pg)

JWT pour authentification

Bcrypt pour hashage des mots de passe

Multer pour upload fichiers

CORS pour sécuriser l’accès

Structure Backend :

backend/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ ├── courseController.js
│ ├── lessonController.js
│ ├── quizController.js
│ └── progressController.js
├── models/
│ ├── User.js
│ ├── Course.js
│ ├── Lesson.js
│ ├── Quiz.js
│ └── Progress.js
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ ├── courseRoutes.js
│ ├── lessonRoutes.js
│ ├── quizRoutes.js
│ └── progressRoutes.js
├── middlewares/
│ ├── authMiddleware.js
│ ├── errorHandler.js
│ └── upload.js
├── utils/
│ └── helpers.js
└── app.js

Frontend (Application Mobile)

Technologies :

React Native + Expo Go

Axios pour requêtes API

AsyncStorage pour stockage local

Structure Frontend :

frontend/
├── app/
│ ├── \_layout.tsx # Layout global (SafeArea + React Query + Stack)
│ ├── (auth)/ # Routes publiques
│ │ ├── \_layout.tsx # Layout auth (si besoin)
│ │ ├── login.tsx
│ │ └── register.tsx
│ ├── (app)/ # Routes protégées
│ │ ├── \_layout.tsx # Auth guard ici
│ │ ├── home.tsx
│ │ ├── courses.tsx
│ │ ├── lessons.tsx
│ │ ├── quiz.tsx
│ │ └── profile.tsx
│ └── +not-found.tsx # Page 404
├── components/
│ ├── CourseCard.tsx
│ ├── LessonCard.tsx
│ └── QuizCard.tsx
├── services/
│ ├── api.js # Axios + Interceptor JWT
│ ├── authService.ts # Auth API calls
│ └── courseService.ts # Courses API calls
├── store/
│ ├── authStore.ts # Zustand auth
│ ├── courseStore.ts # Zustand courses
│ └── progressStore.ts # Zustand progress
├── hooks/
│ ├── useCourses.ts # React Query hooks
│ └── useAuth.ts # React Query hooks
├── types/
│ ├── user.ts
│ ├── course.ts
│ └── quiz.ts
├── utils/
│ └── constants.ts
└── app.json # Expo + deep linking config

💾 Modèle de Données Minimum

users : id, nom, email, role (admin/etudiant/prof), mot_de_passe

courses : id, titre, description, catégorie, niveau, fichiers

lessons : id, titre, contenu, id_course, fichiers

quizzes : id, titre, questions, id_course

progress : id_user, id_lesson, score_quiz, leçon_terminée

🛡️ Sécurité

JWT pour sécuriser les routes

Hashage des mots de passe avec Bcrypt

Upload sécurisé via Multer

CORS configuré pour le frontend mobile

🚀 Phases de Développement
Phase 1 – MVP

Backend : CRUD Users, Courses, Lessons, Quizzes, Progress + JWT + Multer

Frontend : Login/Register, liste des cours, leçons, quiz, suivi de progression

Phase 2 – Avancé

Notifications push

Recherche et filtres de cours

Upload vidéos et images plus volumineuses

Phase 3 – Optimisation

Tests unitaires et intégration

Documentation API

Optimisation mobile et backend

## 🔗 Liens Utiles

- **Repository** : [https://github.com/hafayouness/PhysicLearn]
- **Application en ligne** : [IN PROGRESS ... ]
- **Maquettes Figma/Adobe XD** : [IN PROGRESS ...]

---

## 👨‍💻 Équipe de Développement

- **Développeur(s)** : [Youness Hafa]
- **Formation** : [SIMPLOS - DEV MOBILE]
- **Période** : [22/09/2025 - 30/01/2026]
- **Encadrant** : [mohamed harbouli]

---

## 📧 Contact

Pour toute question concernant ce projet :

- Email : [ahfa.youness@gmail.com]
- GitHub : [hafayouness]
