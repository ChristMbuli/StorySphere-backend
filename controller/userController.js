import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

// Contrôleur pour créer un compte utilisateur
export const Register = async (req, res) => {
  const { fname, password } = req.body;

  try {
    // Vérifiez si un utilisateur avec le même fname existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { fname: fname },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Le nom d'utilisateur existe déjà" });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur avec Prisma
    const newUser = await prisma.user.create({
      data: {
        fname,
        password: hashedPassword,
      },
    });

    // Réponse avec le nouvel utilisateur créé
    res.status(200).json(newUser);
  } catch (error) {
    // En cas d'erreur, affichage de l'erreur dans la console
    console.error(error);
    // Réponse avec le statut 500 en cas d'échec
    res
      .status(500)
      .json({ message: "Impossible de créer un compte utilisateur" });
  }
};
