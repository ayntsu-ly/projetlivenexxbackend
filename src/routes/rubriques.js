const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// recuperer tous les rubriques
router.get('/', async (req, res) => {
  try {
    const rubriques = await prisma.rubrique.findMany({
      include: {
        sousRubriques: true,
      },
    });
    res.json(rubriques);
  } catch (error) {
    res.status(500).json({ error: 'erreur sur le serveur' });
  }
});

// nouveaux rubrique
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newRubrique = await prisma.rubrique.create({
      data: {
        name,
      },
    });
    res.json(newRubrique);
  } catch (error) {
    res.status(500).json({ error: 'erreur sur le serveur' });
  }
});

// supprimer  rubrique par id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.rubrique.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'erreur sur le serveur' });
  }
});

// maj a rubrique par id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sousRubriques } = req.body;
    const updatedRubrique = await prisma.rubrique.update({
      where: { id: Number(id) },
      data: {
        name,
        sousRubriques: {
          set: sousRubriques.map((sub) => ({ name: sub })),
        },
      },
      include: {
        sousRubriques: true,
      },
    });
    res.json(updatedRubrique);
  } catch (error) {
    res.status(500).json({ error: 'erreur sur le serveur' });
  }
});

module.exports = router;
