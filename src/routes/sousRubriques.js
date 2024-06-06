const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// nouveaux sous-rubrique
router.post('/:rubriqueId/sous-rubriques', async (req, res) => {
  try {
    const { rubriqueId } = req.params;
    const { name } = req.body;
    const newSousRubrique = await prisma.sousRubrique.create({
      data: {
        name,
        rubrique: { connect: { id: parseInt(rubriqueId) } },
      },
    });
    res.json(newSousRubrique);
  } catch (error) {
    res.status(500).json({ error: 'erreur sur le serveur' });
  }
});

// suprimer  sous-rubrique par id
router.delete('/:rubriqueId/sous-rubriques/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sousRubrique.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'erreur sur le serveur' });
  }
});

// maj a sous-rubrique par id
router.patch('/:rubriqueId/sous-rubriques/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedSousRubrique = await prisma.sousRubrique.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(updatedSousRubrique);
  } catch (error) {
    res.status(500).json({ error: 'erreur sur le serveur ' });
  }
});

module.exports = router;
