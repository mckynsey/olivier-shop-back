const express = require('express');
const router = express.Router();
const db = require('../db');

// Route pour ajouter un article au panier (ou mettre à jour la quantité si l'article existe déjà)
router.post('/', async (req, res) => {
  const { id, title, price, description, image, quantity } = req.body;

  try {
    const selectQuery = 'SELECT * FROM paniers WHERE id = ?';
    const [existingRows] = await db.query(selectQuery, [id]);

    if (existingRows.length > 0) {
      // L'article existe déjà dans le panier, mettre à jour la quantité
      const updateQuery = 'UPDATE paniers SET quantity = quantity + ? WHERE id = ?';
      await db.query(updateQuery, [quantity, id]);
    } else {
      // L'article n'existe pas, l'ajouter au panier
      const insertQuery = 'INSERT INTO paniers (id, title, price, description, image, quantity) VALUES (?, ?, ?, ?, ?, ?)';
      await db.query(insertQuery, [id, title, price, description, image, quantity]);
    }

    res.status(201).json({ message: 'Article ajouté au panier avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'article au panier' });
  }
});

// Route pour récupérer tous les articles du panier
router.get('/', async (req, res) => {
  try {
    const selectQuery = 'SELECT * FROM paniers';
    const [rows] = await db.query(selectQuery);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des articles du panier' });
  }
});

// Route pour supprimer un article du panier
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deleteQuery = 'DELETE FROM paniers WHERE id = ?';
    await db.query(deleteQuery, [id]);
    res.status(200).json({ message: 'Article supprimé du panier avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'article du panier' });
  }
});

module.exports = router;