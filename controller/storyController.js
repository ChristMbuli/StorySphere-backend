import prisma from "../lib/prisma.js";

// Fonction pour ajouter une histoire
export const createStory = async (req, res) => {
  const { userId, title, histoire } = req.body;

  try {
    // Création d'une nouvelle histoire avec Prisma
    const newStory = await prisma.story.create({
      data: {
        userId,
        title,
        histoire,
      },
    });

    // Réponse avec l'histoire créée
    res.status(200).json(newStory);
  } catch (error) {
    // En cas d'erreur, affichage de l'erreur dans la console
    console.error(error);
    // Réponse avec le statut 500 en cas d'échec
    res.status(500).json({ message: "Impossible de créer une histoire" });
  }
};

// Fonction pour afficher toutes les histoires
export const getStories = async (req, res) => {
  try {
    // Récupération de toutes les histoires
    const stories = await prisma.story.findMany();

    // Réponse avec les histoires récupérées
    res.status(200).json(stories);
  } catch (error) {
    // En cas d'erreur, affichage de l'erreur dans la console
    console.log(error);
    // Réponse avec le statut 500 en cas d'échec
    res.status(500).json({ message: "Impossible de récupérer les histoires" });
  }
};

// Fonction pour modifier une histoire par ID
export const updateStory = async (req, res) => {
  const { id } = req.params;
  const { histoire } = req.body;

  try {
    // Mise à jour de l'histoire dans la base de données
    const updatedStory = await prisma.story.update({
      where: {
        id: parseInt(id),
      },
      data: {
        histoire,
      },
    });

    // Vérifier si l'histoire a été mise à jour avec succès
    if (updatedStory) {
      res.status(200).json(updatedStory);
    } else {
      res
        .status(404)
        .json({ message: `Aucune histoire trouvée avec l'ID ${id}` });
    }
  } catch (error) {
    // En cas d'erreur, affichage de l'erreur dans la console
    console.log(error);
    // Réponse avec le statut 500 en cas d'échec
    res.status(500).json({
      message: `Impossible de mettre à jour l'histoire avec l'ID ${id}`,
    });
  }
};

// Fonction pour supprimer une histoire par ID
export const deleteStory = async (req, res) => {
  const id = req.params.id;

  try {
    // Suppression de l'histoire dans la base de données
    const deletedStory = await prisma.story.delete({
      where: { id },
    });

    // Vérifier si l'histoire a été supprimée avec succès
    if (deletedStory) {
      res
        .status(200)
        .json({ message: `Histoire avec l'ID ${id} supprimée avec succès` });
    } else {
      res
        .status(404)
        .json({ message: `Aucune histoire trouvée avec l'ID ${id}` });
    }
  } catch (error) {
    // En cas d'erreur, affichage de l'erreur dans la console
    console.error(error);
    // Réponse avec le statut 500 en cas d'échec
    res
      .status(500)
      .json({ message: `Impossible de supprimer l'histoire avec l'ID ${id}` });
  }
};
