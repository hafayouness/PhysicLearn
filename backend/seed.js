import sequelize from "./config/db.js";
import { seedDatabase, resetDatabase } from "./seeders/seeders.js";

const runSeed = async () => {
  try {
    console.log("📊 Synchronisation de la base de données...");
    await sequelize.sync({ force: true });

    const result = await seedDatabase();

    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SEEDING TERMINÉ AVEC SUCCÈS!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Résumé:
   • Utilisateurs: ${result.users}
   • Cours: ${result.courses}
   
🔐 Comptes créés:
   • Admin: admin@physiclearn.com / password123
   • Prof: prof.ahmed@physiclearn.com / password123
   • Étudiant: youssef.alaoui@student.com / password123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors du seeding:", error);
    process.exit(1);
  }
};

runSeed();
