import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Validate category parameter to avoid malicious characters
const validateCategory = (category) => {
  // Allow alphanumeric, underscores, and hyphens
  const regex = /^[a-zA-Z0-9_-]{1,50}$/;
  return regex.test(category);
};

// Get all products from a specific category
router.get('/:category', async (req, res) => {
  const { category } = req.params;

  try {
    // Fetch the category_id for the specified category name
    const categoryQuery = `
      SELECT id FROM categories WHERE category = $1;
    `;
    const categoryResult = await pool.query(categoryQuery, [category]);

    // Check if the category exists
    if (categoryResult.rows.length === 0) {
      return res.status(404).json({ message: `Category '${category}' not found` });
    }

    const categoryId = categoryResult.rows[0].id;

    // Fetch all products for the specified category_id
    const productsQuery = `
      SELECT p.*, c.category AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = $1
      ORDER BY p.name ASC;
    `;
    const productsResult = await pool.query(productsQuery, [categoryId]);

    // Add the base URL to the image paths
    const productsWithFullImageUrls = productsResult.rows.map((product) => ({
      ...product,
      image: `http://localhost:5000${product.image}`,
    }));

    res.status(200).json(productsWithFullImageUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;