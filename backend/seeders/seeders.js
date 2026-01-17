import { Course, Lesson, Quiz, User, Progress } from "../Models/index.js";
import bcrypt from "bcrypt";

export const seedDatabase = async () => {
  try {
    console.log("🌱 Début du seeding...");

    // ========== USERS ==========
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Admins et Profs
    const adminUsers = await User.bulkCreate(
      [
        {
          nom: "Admin Principal",
          email: "younesshafa@test.com",
          mot_de_passe: hashedPassword,
          role: "admin",
        },
        {
          nom: "Prof Ahmed Alami",
          email: "prof.ahmed@physiclearn.com",
          mot_de_passe: hashedPassword,
          role: "prof",
        },
        {
          nom: "Prof Fatima Benali",
          email: "prof.fatima@physiclearn.com",
          mot_de_passe: hashedPassword,
          role: "prof",
        },
      ],
      { ignoreDuplicates: true },
    );

    // 20 Étudiants
    const etudiantsData = [
      { nom: "Youssef Alaoui", email: "youssef.alaoui@student.com" },
      { nom: "Salma Benjelloun", email: "salma.benjelloun@student.com" },
      { nom: "Omar Tazi", email: "omar.tazi@student.com" },
      { nom: "Meryem Idrissi", email: "meryem.idrissi@student.com" },
      { nom: "Amine Fassi", email: "amine.fassi@student.com" },
      { nom: "Laila Marouane", email: "laila.marouane@student.com" },
      { nom: "Mehdi Cherkaoui", email: "mehdi.cherkaoui@student.com" },
      { nom: "Nadia Hamidi", email: "nadia.hamidi@student.com" },
      { nom: "Karim Berrada", email: "karim.berrada@student.com" },
      { nom: "Zineb Amrani", email: "zineb.amrani@student.com" },
      { nom: "Hassan Khalil", email: "hassan.khalil@student.com" },
      { nom: "Asma Bennani", email: "asma.bennani@student.com" },
      { nom: "Rachid Filali", email: "rachid.filali@student.com" },
      { nom: "Hanane Sebti", email: "hanane.sebti@student.com" },
      { nom: "Samir Iraqi", email: "samir.iraqi@student.com" },
      { nom: "Imane Chraibi", email: "imane.chraibi@student.com" },
      { nom: "Bilal Ouazzani", email: "bilal.ouazzani@student.com" },
      { nom: "Dounia Lazrak", email: "dounia.lazrak@student.com" },
      { nom: "Tarek Mansouri", email: "tarek.mansouri@student.com" },
      { nom: "Khadija Tazi", email: "khadija.tazi@student.com" },
    ];

    const etudiants = await User.bulkCreate(
      etudiantsData.map((etudiant) => ({
        ...etudiant,
        mot_de_passe: hashedPassword,
        role: "etudiant",
      })),
      { ignoreDuplicates: true },
    );

    console.log("✅ 20 étudiants + 3 admins/profs créés");

    // ========== COURS 1ÈRE BAC ==========
    const cours1ereBac = await Course.bulkCreate([
      {
        titre: "Mécanique - Cinématique et Dynamique",
        description:
          "Étude des mouvements, forces et lois de Newton. Comprendre les bases de la mécanique classique.",
        categorie: "Mécanique",
        niveau: "1ère Bac",
        image:
          "https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Mécanique",
        duree_estimee: 45,
        ordre: 1,
        actif: true,
      },
      {
        titre: "Électricité - Circuits et Lois",
        description:
          "Circuits électriques, loi d'Ohm, résistances et puissance électrique.",
        categorie: "Électricité",
        niveau: "1ère Bac",
        image:
          "https://via.placeholder.com/400x200/EF4444/FFFFFF?text=Électricité",
        duree_estimee: 40,
        ordre: 2,
        actif: true,
      },
      {
        titre: "Optique Géométrique",
        description:
          "Propagation de la lumière, réflexion, réfraction et lentilles.",
        categorie: "Optique",
        niveau: "1ère Bac",
        image: "https://via.placeholder.com/400x200/10B981/FFFFFF?text=Optique",
        duree_estimee: 35,
        ordre: 3,
        actif: true,
      },
      {
        titre: "Chimie - Réactions et Atomes",
        description: "Structure atomique, liaisons chimiques et réactions.",
        categorie: "Chimie",
        niveau: "1ère Bac",
        image: "https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Chimie",
        duree_estimee: 40,
        ordre: 4,
        actif: true,
      },
      {
        titre: "Ondes Mécaniques",
        description: "Propagation des ondes, vitesse et fréquence.",
        categorie: "Ondes",
        niveau: "1ère Bac",
        image: "https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Ondes",
        duree_estimee: 30,
        ordre: 5,
        actif: true,
      },
    ]);

    // ========== COURS 2ÈME BAC ==========
    const cours2emeBac = await Course.bulkCreate([
      {
        titre: "Mécanique - Oscillations et Gravitation",
        description:
          "Oscillations, pendules, mouvement circulaire et loi de gravitation universelle.",
        categorie: "Mécanique",
        niveau: "2ème Bac",
        image:
          "https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Mécanique+Avancée",
        duree_estimee: 50,
        ordre: 1,
        actif: true,
      },
      {
        titre: "Électromagnétisme",
        description:
          "Champs électriques, magnétiques et induction électromagnétique.",
        categorie: "Électromagnétisme",
        niveau: "2ème Bac",
        image:
          "https://via.placeholder.com/400x200/EF4444/FFFFFF?text=Électromagnétisme",
        duree_estimee: 55,
        ordre: 2,
        actif: true,
      },
      {
        titre: "Ondes Électromagnétiques",
        description: "Spectre électromagnétique, propagation et applications.",
        categorie: "Ondes",
        niveau: "2ème Bac",
        image:
          "https://via.placeholder.com/400x200/10B981/FFFFFF?text=Ondes+EM",
        duree_estimee: 45,
        ordre: 3,
        actif: true,
      },
      {
        titre: "Thermodynamique",
        description:
          "Lois de la thermodynamique, gaz parfaits et transformations.",
        categorie: "Thermodynamique",
        niveau: "2ème Bac",
        image:
          "https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Thermodynamique",
        duree_estimee: 40,
        ordre: 4,
        actif: true,
      },
      {
        titre: "Mécanique Quantique Introduction",
        description:
          "Dualité onde-corpuscule, effet photoélectrique et atome de Bohr.",
        categorie: "Physique Moderne",
        niveau: "2ème Bac",
        image:
          "https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Quantique",
        duree_estimee: 50,
        ordre: 5,
        actif: true,
      },
      {
        titre: "Radioactivité et Noyau",
        description:
          "Désintégration radioactive, demi-vie et réactions nucléaires.",
        categorie: "Physique Nucléaire",
        niveau: "2ème Bac",
        image:
          "https://via.placeholder.com/400x200/EC4899/FFFFFF?text=Radioactivité",
        duree_estimee: 35,
        ordre: 6,
        actif: true,
      },
    ]);

    console.log("✅ 11 cours créés (5 pour 1ère Bac, 6 pour 2ème Bac)");

    // ========== LEÇONS POUR 1ÈRE BAC ==========

    // Mécanique 1ère Bac
    const lessonsMeca1 = await Lesson.bulkCreate([
      {
        titre: "Cinématique du point matériel",
        contenu: `# Cinématique du point matériel

## 1. Position et référentiel
Le mouvement d'un point M est étudié par rapport à un référentiel (système de coordonnées).

**Vecteur position**: OM(t)

## 2. Vitesse
- **Vitesse moyenne**: v_moy = Δx/Δt
- **Vitesse instantanée**: v = dx/dt

## 3. Accélération
L'accélération mesure la variation de vitesse:
a = dv/dt = d²x/dt²

## Exercices pratiques
Calculer la vitesse et l'accélération d'un mobile en mouvement rectiligne.`,
        id_course: cours1ereBac[0].id,
        type_contenu: "texte",
        duree: 50,
        ordre: 1,
      },
      {
        titre: "Mouvement Rectiligne Uniforme (MRU)",
        contenu: `# MRU - Mouvement Rectiligne Uniforme

## Caractéristiques
- Vitesse constante: v = constante
- Accélération nulle: a = 0
- Trajectoire rectiligne

## Équation horaire
**x(t) = x₀ + v·t**

Où:
- x₀ : position initiale
- v : vitesse constante
- t : temps

## Applications
- Voiture sur autoroute à vitesse constante
- Train sur voie rectiligne`,
        id_course: cours1ereBac[0].id,
        type_contenu: "texte",
        duree: 45,
        ordre: 2,
      },
      {
        titre: "Mouvement Rectiligne Uniformément Varié (MRUV)",
        contenu: `# MRUV

## Définition
Mouvement avec accélération constante.

## Équations horaires
1. v(t) = v₀ + a·t
2. x(t) = x₀ + v₀·t + ½a·t²
3. v² = v₀² + 2a·Δx

## Exemple: Chute libre
Un objet lâché sans vitesse initiale:
- a = g = 9.8 m/s²
- v₀ = 0
- v(t) = g·t
- h(t) = ½g·t²`,
        id_course: cours1ereBac[0].id,
        type_contenu: "texte",
        duree: 55,
        ordre: 3,
      },
      {
        titre: "Les Trois Lois de Newton",
        contenu: `# Lois de Newton

## 1ère Loi - Principe d'Inertie
Un corps au repos reste au repos, un corps en mouvement reste en mouvement rectiligne uniforme, sauf si une force extérieure agit sur lui.

## 2ème Loi - Principe Fondamental de la Dynamique
**F = m·a**

La force résultante est égale au produit de la masse par l'accélération.

## 3ème Loi - Action-Réaction
Toute action entraîne une réaction égale et opposée:
**F₁₂ = -F₂₁**

## Applications
- Freinage d'une voiture
- Décollage d'une fusée
- Marche d'une personne`,
        id_course: cours1ereBac[0].id,
        type_contenu: "texte",
        duree: 60,
        ordre: 4,
      },
    ]);

    // Électricité 1ère Bac
    const lessonsElec1 = await Lesson.bulkCreate([
      {
        titre: "Introduction aux circuits électriques",
        contenu: `# Circuits Électriques

## Composants de base
1. **Générateur**: Fournit l'énergie (pile, batterie)
2. **Récepteur**: Consomme l'énergie (lampe, moteur)
3. **Conducteurs**: Transportent le courant (fils)
4. **Interrupteur**: Contrôle le circuit

## Grandeurs électriques
- **Tension (U)**: Différence de potentiel [Volt]
- **Intensité (I)**: Débit de charges [Ampère]
- **Résistance (R)**: Opposition au passage du courant [Ohm]`,
        id_course: cours1ereBac[1].id,
        type_contenu: "texte",
        duree: 40,
        ordre: 1,
      },
      {
        titre: "Loi d'Ohm et résistances",
        contenu: `# Loi d'Ohm

## Énoncé
La tension aux bornes d'une résistance est proportionnelle à l'intensité qui la traverse.

**U = R × I**

## Résistances en série
R_total = R₁ + R₂ + R₃ + ...

## Résistances en parallèle
1/R_total = 1/R₁ + 1/R₂ + 1/R₃ + ...

## Exemple
Pour R₁ = 10Ω et I = 2A:
U = 10 × 2 = 20V`,
        id_course: cours1ereBac[1].id,
        type_contenu: "texte",
        duree: 50,
        ordre: 2,
      },
      {
        titre: "Puissance et Énergie Électrique",
        contenu: `# Puissance et Énergie

## Puissance électrique
**P = U × I** [Watt]

Ou avec la loi d'Ohm:
- P = R × I²
- P = U²/R

## Énergie électrique
**E = P × t** [Joule]

En kWh: E = P(kW) × t(h)

## Application
Une lampe de 60W allumée 5h:
E = 60 × 5 = 300 Wh = 0.3 kWh`,
        id_course: cours1ereBac[1].id,
        type_contenu: "texte",
        duree: 45,
        ordre: 3,
      },
    ]);

    // Optique 1ère Bac
    const lessonsOpt1 = await Lesson.bulkCreate([
      {
        titre: "Propagation de la lumière",
        contenu: `# Propagation de la Lumière

## Principes
1. La lumière se propage en ligne droite dans un milieu homogène
2. Vitesse dans le vide: c = 3×10⁸ m/s
3. Indice de réfraction: n = c/v

## Sources de lumière
- **Primaires**: Soleil, lampe, LED
- **Secondaires**: Lune, objets éclairés`,
        id_course: cours1ereBac[2].id,
        type_contenu: "texte",
        duree: 40,
        ordre: 1,
      },
      {
        titre: "Réflexion et Réfraction",
        contenu: `# Lois de Réflexion et Réfraction

## Loi de la réflexion
- Angle d'incidence = Angle de réflexion
- i₁ = i₂

## Loi de Snell-Descartes (Réfraction)
**n₁ sin(i₁) = n₂ sin(i₂)**

## Réflexion totale
Se produit quand la lumière passe d'un milieu plus réfringent vers un milieu moins réfringent.`,
        id_course: cours1ereBac[2].id,
        type_contenu: "texte",
        duree: 50,
        ordre: 2,
      },
    ]);

    // ========== LEÇONS POUR 2ÈME BAC ==========

    // Mécanique 2ème Bac
    const lessonsMeca2 = await Lesson.bulkCreate([
      {
        titre: "Oscillations Libres - Pendule Simple",
        contenu: `# Pendule Simple

## Définition
Masse ponctuelle suspendue à un fil inextensible de longueur L.

## Période
**T = 2π√(L/g)**

Indépendante de:
- La masse
- L'amplitude (pour petits angles)

## Énergie
- Énergie potentielle: Ep = mgh
- Énergie cinétique: Ec = ½mv²
- Énergie mécanique: Em = Ep + Ec = constante`,
        id_course: cours2emeBac[0].id,
        type_contenu: "texte",
        duree: 60,
        ordre: 1,
      },
      {
        titre: "Mouvement Circulaire Uniforme",
        contenu: `# MCU - Mouvement Circulaire Uniforme

## Caractéristiques
- Trajectoire circulaire
- Vitesse constante en module
- Accélération centripète dirigée vers le centre

## Grandeurs
- **Vitesse angulaire**: ω = 2π/T
- **Vitesse linéaire**: v = ω·R
- **Accélération centripète**: a = v²/R = ω²R

## Exemples
- Satellite en orbite
- Manège`,
        id_course: cours2emeBac[0].id,
        type_contenu: "texte",
        duree: 55,
        ordre: 2,
      },
      {
        titre: "Loi de Gravitation Universelle",
        contenu: `# Gravitation de Newton

## Loi
**F = G × (m₁×m₂)/r²**

Où:
- G = 6.67×10⁻¹¹ N·m²/kg²
- m₁, m₂: masses
- r: distance entre les centres

## Applications
- Poids: P = mg
- Satellites artificiels
- Marées
- Mouvement des planètes`,
        id_course: cours2emeBac[0].id,
        type_contenu: "texte",
        duree: 50,
        ordre: 3,
      },
    ]);

    // Électromagnétisme 2ème Bac
    const lessonsEM2 = await Lesson.bulkCreate([
      {
        titre: "Champ Électrique",
        contenu: `# Champ Électrique

## Définition
Zone de l'espace où une charge électrique subit une force.

## Champ créé par une charge ponctuelle
**E = k × q/r²**

k = 9×10⁹ N·m²/C²

## Force électrique
**F = q × E**

## Applications
- Condensateurs
- Tubes cathodiques
- Accélérateurs de particules`,
        id_course: cours2emeBac[1].id,
        type_contenu: "texte",
        duree: 55,
        ordre: 1,
      },
      {
        titre: "Champ Magnétique",
        contenu: `# Champ Magnétique

## Sources
1. Aimants permanents
2. Courants électriques

## Champ créé par un fil rectiligne
**B = (μ₀×I)/(2πr)**

μ₀ = 4π×10⁻⁷ T·m/A

## Force de Laplace
Force sur un conducteur parcouru par un courant dans un champ magnétique:
**F = I × L × B × sin(θ)**`,
        id_course: cours2emeBac[1].id,
        type_contenu: "texte",
        duree: 60,
        ordre: 2,
      },
      {
        titre: "Induction Électromagnétique",
        contenu: `# Loi de Faraday

## Principe
Une variation de flux magnétique induit une tension.

## Loi de Faraday
**e = -dΦ/dt**

## Loi de Lenz
Le courant induit s'oppose à la cause qui lui donne naissance.

## Applications
- Alternateurs
- Transformateurs
- Plaques à induction`,
        id_course: cours2emeBac[1].id,
        type_contenu: "texte",
        duree: 55,
        ordre: 3,
      },
    ]);

    // Thermodynamique 2ème Bac
    const lessonsThermo = await Lesson.bulkCreate([
      {
        titre: "Gaz Parfaits",
        contenu: `# Loi des Gaz Parfaits

## Équation d'état
**PV = nRT**

Où:
- P: Pression [Pa]
- V: Volume [m³]
- n: Quantité de matière [mol]
- R = 8.314 J/(mol·K)
- T: Température [K]

## Lois dérivées
- Loi de Boyle-Mariotte: PV = cte (T constante)
- Loi de Charles: V/T = cte (P constante)
- Loi de Gay-Lussac: P/T = cte (V constante)`,
        id_course: cours2emeBac[3].id,
        type_contenu: "texte",
        duree: 50,
        ordre: 1,
      },
      {
        titre: "Premier Principe de la Thermodynamique",
        contenu: `# Conservation de l'Énergie

## Énoncé
L'énergie ne peut être ni créée ni détruite, seulement transformée.

## Formule
**ΔU = Q + W**

Où:
- ΔU: Variation d'énergie interne
- Q: Chaleur échangée
- W: Travail échangé

## Transformations
- Isotherme: ΔT = 0
- Adiabatique: Q = 0
- Isochore: ΔV = 0
- Isobare: ΔP = 0`,
        id_course: cours2emeBac[3].id,
        type_contenu: "texte",
        duree: 55,
        ordre: 2,
      },
    ]);

    console.log("✅ Leçons créées pour tous les cours");

    // ========== QUIZ ==========

    // Quiz Mécanique 1ère Bac
    const quizMeca1 = await Quiz.create({
      titre: "QCM Mécanique - Cinématique",
      description: "Test sur la cinématique et les mouvements",
      id_course: cours1ereBac[0].id,
      duree: 20,
      note_passage: 60,
      ordre: 1,
      questions: [
        {
          id: 1,
          question: "Quelle est l'unité SI de la vitesse ?",
          options: ["km/h", "m/s", "cm/s", "mph"],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 2,
          question: "La vitesse est la dérivée de :",
          options: ["L'accélération", "La position", "Le temps", "La force"],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 3,
          question: "Dans un MRU, l'accélération est :",
          options: ["Positive", "Négative", "Nulle", "Variable"],
          reponse_correcte: 2,
          points: 1,
        },
        {
          id: 4,
          question: "La formule F = ma représente :",
          options: [
            "1ère loi de Newton",
            "2ème loi de Newton",
            "3ème loi de Newton",
            "Loi de Hooke",
          ],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 5,
          question: "Un corps en chute libre a une accélération de :",
          options: ["0 m/s²", "5 m/s²", "9.8 m/s²", "15 m/s²"],
          reponse_correcte: 2,
          points: 1,
        },
        {
          id: 6,
          question: "Dans un MRUV, la vitesse :",
          options: [
            "Est constante",
            "Augmente linéairement",
            "Diminue exponentiellement",
            "Est nulle",
          ],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 7,
          question: "La 3ème loi de Newton concerne :",
          options: [
            "L'inertie",
            "La dynamique",
            "L'action-réaction",
            "La gravitation",
          ],
          reponse_correcte: 2,
          points: 1,
        },
        {
          id: 8,
          question:
            "Pour doubler la vitesse en MRUV avec la même accélération, le temps :",
          options: [
            "Reste le même",
            "Double",
            "Quadruple",
            "Diminue de moitié",
          ],
          reponse_correcte: 1,
          points: 1,
        },
      ],
    });

    // Quiz Électricité 1ère Bac
    const quizElec1 = await Quiz.create({
      titre: "QCM Électricité - Loi d'Ohm",
      description: "Évaluation sur les circuits et la loi d'Ohm",
      id_course: cours1ereBac[1].id,
      duree: 15,
      note_passage: 60,
      ordre: 1,
      questions: [
        {
          id: 1,
          question: "La loi d'Ohm s'écrit :",
          options: ["I = U/R", "U = R×I", "R = U/I", "Toutes les réponses"],
          reponse_correcte: 3,
          points: 1,
        },
        {
          id: 2,
          question: "L'unité de la résistance est :",
          options: ["Volt", "Ampère", "Ohm", "Watt"],
          reponse_correcte: 2,
          points: 1,
        },
        {
          id: 3,
          question:
            "Si on double la tension avec la même résistance, l'intensité :",
          options: ["Reste la même", "Double", "Diminue de moitié", "Triple"],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 4,
          question: "La puissance électrique se calcule par :",
          options: ["P = U/I", "P = U×I", "P = U+I", "P = I/U"],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 5,
          question: "Deux résistances de 10Ω en série donnent :",
          options: ["5Ω", "10Ω", "20Ω", "100Ω"],
          reponse_correcte: 2,
          points: 1,
        },
      ],
    });

    // Quiz Optique 1ère Bac
    const quizOpt1 = await Quiz.create({
      titre: "QCM Optique Géométrique",
      description: "Test sur la lumière et les lentilles",
      id_course: cours1ereBac[2].id,
      duree: 15,
      note_passage: 60,
      ordre: 1,
      questions: [
        {
          id: 1,
          question: "La vitesse de la lumière dans le vide est :",
          options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10¹² m/s"],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 2,
          question: "Lors de la réflexion, l'angle d'incidence :",
          options: [
            "Est supérieur à l'angle de réflexion",
            "Est égal à l'angle de réflexion",
            "Est inférieur à l'angle de réflexion",
            "Dépend du milieu",
          ],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 3,
          question: "L'indice de réfraction est :",
          options: ["n = v/c", "n = c/v", "n = c×v", "n = c+v"],
          reponse_correcte: 1,
          points: 1,
        },
      ],
    });

    // Quiz Mécanique 2ème Bac
    const quizMeca2 = await Quiz.create({
      titre: "QCM Oscillations et Gravitation",
      description: "Test sur les pendules et la gravitation",
      id_course: cours2emeBac[0].id,
      duree: 25,
      note_passage: 65,
      ordre: 1,
      questions: [
        {
          id: 1,
          question: "La période d'un pendule simple dépend de :",
          options: ["Sa masse", "Sa longueur", "Son amplitude", "Sa couleur"],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 2,
          question: "Si on quadruple la longueur d'un pendule, sa période :",
          options: [
            "Reste la même",
            "Double",
            "Quadruple",
            "Diminue de moitié",
          ],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 3,
          question: "L'énergie mécanique d'un pendule sans frottement est :",
          options: ["Croissante", "Décroissante", "Constante", "Nulle"],
          reponse_correcte: 2,
          points: 1,
        },
        {
          id: 4,
          question: "La constante de gravitation G vaut :",
          options: ["6.67×10⁻¹¹", "9.8", "3×10⁸", "6.02×10²³"],
          reponse_correcte: 0,
          points: 1,
        },
        {
          id: 5,
          question: "Dans un MCU, l'accélération est :",
          options: ["Nulle", "Tangentielle", "Centripète", "Centrifuge"],
          reponse_correcte: 2,
          points: 1,
        },
        {
          id: 6,
          question: "Le poids est une application de :",
          options: [
            "La loi d'Ohm",
            "La gravitation",
            "L'électromagnétisme",
            "La thermodynamique",
          ],
          reponse_correcte: 1,
          points: 1,
        },
      ],
    });

    // Quiz Électromagnétisme 2ème Bac
    const quizEM2 = await Quiz.create({
      titre: "QCM Électromagnétisme",
      description: "Test sur les champs et l'induction",
      id_course: cours2emeBac[1].id,
      duree: 20,
      note_passage: 65,
      ordre: 1,
      questions: [
        {
          id: 1,
          question: "L'unité du champ électrique est :",
          options: ["V", "V/m", "N", "A"],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 2,
          question: "Le champ magnétique est mesuré en :",
          options: ["Volt", "Ampère", "Tesla", "Ohm"],
          reponse_correcte: 2,
          points: 1,
        },
        {
          id: 3,
          question: "La force de Laplace s'applique sur :",
          options: [
            "Une charge au repos",
            "Un conducteur parcouru par un courant",
            "Un aimant",
            "Un isolant",
          ],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 4,
          question: "La loi de Faraday concerne :",
          options: [
            "La résistance",
            "L'induction",
            "La capacité",
            "La puissance",
          ],
          reponse_correcte: 1,
          points: 1,
        },
        {
          id: 5,
          question: "μ₀ est appelé :",
          options: [
            "Constante diélectrique",
            "Perméabilité du vide",
            "Charge élémentaire",
            "Nombre d'Avogadro",
          ],
          reponse_correcte: 1,
          points: 1,
        },
      ],
    });

    // Quiz Thermodynamique 2ème Bac
    const quizThermo = await Quiz.create({
      titre: "QCM Thermodynamique",
      description: "Test sur les gaz parfaits et les principes",
      id_course: cours2emeBac[3].id,
      duree: 20,
      note_passage: 60,
      ordre: 1,
      questions: [
        {
          id: 1,
          question: "La loi des gaz parfaits s'écrit :",
          options: ["PV = nRT", "PV = nT", "P = nRT", "V = nRT"],
          reponse_correcte: 0,
          points: 1,
        },
        {
          id: 2,
          question: "R (constante des gaz parfaits) vaut :",
          options: ["8.314", "6.67", "9.8", "3×10⁸"],
          reponse_correcte: 0,
          points: 1,
        },
        {
          id: 3,
          question: "Dans une transformation isotherme :",
          options: [
            "P est constante",
            "V est constant",
            "T est constante",
            "n est constant",
          ],
          reponse_correcte: 2,
          points: 1,
        },
        {
          id: 4,
          question: "Le premier principe de la thermodynamique est :",
          options: ["ΔU = Q + W", "ΔU = Q - W", "ΔU = Q/W", "ΔU = QW"],
          reponse_correcte: 0,
          points: 1,
        },
        {
          id: 5,
          question: "Dans une transformation adiabatique :",
          options: ["Q = 0", "W = 0", "ΔU = 0", "P = 0"],
          reponse_correcte: 0,
          points: 1,
        },
      ],
    });

    console.log("✅ Quiz créés pour tous les cours");

    // ========== PROGRESSION POUR LES ÉTUDIANTS ==========

    const progressData = [];

    // Pour chaque étudiant
    for (let i = 0; i < etudiants.length; i++) {
      const etudiant = etudiants[i];

      // Progression aléatoire pour 1ère Bac (cours 0-4)
      for (let courseIndex = 0; courseIndex < 3; courseIndex++) {
        const course = cours1ereBac[courseIndex];

        // Récupérer les leçons du cours
        const lessons = await Lesson.findAll({
          where: { id_course: course.id },
        });

        // Marquer certaines leçons comme terminées (70% de chance)
        for (const lesson of lessons) {
          if (Math.random() > 0.3) {
            progressData.push({
              id_user: etudiant.id,
              id_lesson: lesson.id,
              lecon_terminee: true,
              temps_passe: Math.floor(Math.random() * 3600) + 600, // Entre 10min et 1h
              derniere_tentative: new Date(
                Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
              ), // Dans les 30 derniers jours
            });
          }
        }

        // Quiz du cours (50% de chance d'avoir été passé)
        if (Math.random() > 0.5) {
          const quizzes = await Quiz.findAll({
            where: { id_course: course.id },
          });
          for (const quiz of quizzes) {
            const score = Math.floor(Math.random() * 40) + 40; // Score entre 40 et 80
            const tentatives = Math.floor(Math.random() * 3) + 1; // 1 à 3 tentatives

            progressData.push({
              id_user: etudiant.id,
              id_quiz: quiz.id,
              score_quiz: score,
              nombre_tentatives: tentatives,
              temps_passe: Math.floor(Math.random() * 1800) + 300, // Entre 5min et 30min
              derniere_tentative: new Date(
                Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
              ),
              reponses: quiz.questions.map((q, idx) =>
                Math.random() > 0.5
                  ? q.reponse_correcte
                  : (q.reponse_correcte + 1) % q.options.length,
              ),
            });
          }
        }
      }

      // Progression pour 2ème Bac (seulement pour certains étudiants - 60%)
      if (Math.random() > 0.4) {
        for (let courseIndex = 0; courseIndex < 2; courseIndex++) {
          const course = cours2emeBac[courseIndex];

          const lessons = await Lesson.findAll({
            where: { id_course: course.id },
          });

          for (const lesson of lessons) {
            if (Math.random() > 0.4) {
              progressData.push({
                id_user: etudiant.id,
                id_lesson: lesson.id,
                lecon_terminee: true,
                temps_passe: Math.floor(Math.random() * 4200) + 900,
                derniere_tentative: new Date(
                  Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000,
                ),
              });
            }
          }

          if (Math.random() > 0.6) {
            const quizzes = await Quiz.findAll({
              where: { id_course: course.id },
            });
            for (const quiz of quizzes) {
              const score = Math.floor(Math.random() * 35) + 50; // Score entre 50 et 85
              const tentatives = Math.floor(Math.random() * 2) + 1;

              progressData.push({
                id_user: etudiant.id,
                id_quiz: quiz.id,
                score_quiz: score,
                nombre_tentatives: tentatives,
                temps_passe: Math.floor(Math.random() * 2400) + 600,
                derniere_tentative: new Date(
                  Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000,
                ),
                reponses: quiz.questions.map((q, idx) =>
                  Math.random() > 0.4
                    ? q.reponse_correcte
                    : (q.reponse_correcte + 1) % q.options.length,
                ),
              });
            }
          }
        }
      }
    }

    // Insérer toutes les progressions
    await Progress.bulkCreate(progressData);

    console.log(
      `✅ ${progressData.length} entrées de progression créées pour 20 étudiants`,
    );

    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 SEEDING TERMINÉ AVEC SUCCÈS !
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 RÉSUMÉ DES DONNÉES :

👥 UTILISATEURS (${adminUsers.length + etudiants.length} total)
   • ${adminUsers.length} Admins/Profs
   • ${etudiants.length} Étudiants

📚 COURS (${cours1ereBac.length + cours2emeBac.length} total)
   • ${cours1ereBac.length} cours de 1ère Bac
   • ${cours2emeBac.length} cours de 2ème Bac

📖 LEÇONS
   • ${lessonsMeca1.length} leçons Mécanique 1ère Bac
   • ${lessonsElec1.length} leçons Électricité 1ère Bac
   • ${lessonsOpt1.length} leçons Optique 1ère Bac
   • ${lessonsMeca2.length} leçons Mécanique 2ème Bac
   • ${lessonsEM2.length} leçons Électromagnétisme 2ème Bac
   • ${lessonsThermo.length} leçons Thermodynamique 2ème Bac

❓ QUIZ
   • 6 quiz répartis sur tous les cours
   • Total: ~40 questions

📈 PROGRESSION
   • ${progressData.length} entrées de progression
   • Leçons terminées et quiz passés pour chaque étudiant

🔐 COMPTES DE TEST :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📧 Admin:     younesshafa@test.com
   🔑 Password:  password123
   
   📧 Prof 1:    prof.ahmed@physiclearn.com
   🔑 Password:  password123
   
   📧 Prof 2:    prof.fatima@physiclearn.com
   🔑 Password:  password123
   
   📧 Étudiant:  youssef.alaoui@student.com
   🔑 Password:  password123
   
   (+ 19 autres étudiants avec password123)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

    return {
      users: adminUsers.length + etudiants.length,
      courses: cours1ereBac.length + cours2emeBac.length,
      lessons:
        lessonsMeca1.length +
        lessonsElec1.length +
        lessonsOpt1.length +
        lessonsMeca2.length +
        lessonsEM2.length +
        lessonsThermo.length,
      quizzes: 6,
      progress: progressData.length,
    };
  } catch (error) {
    console.error("❌ Erreur lors du seeding:", error);
    throw error;
  }
};

// Fonction pour réinitialiser la base de données
export const resetDatabase = async () => {
  try {
    console.log("🗑️  Suppression des données existantes...");

    await Progress.destroy({ where: {}, truncate: true, cascade: true });
    await Quiz.destroy({ where: {}, truncate: true, cascade: true });
    await Lesson.destroy({ where: {}, truncate: true, cascade: true });
    await Course.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });

    console.log("✅ Base de données réinitialisée");
  } catch (error) {
    console.error("❌ Erreur lors de la réinitialisation:", error);
    throw error;
  }
};
