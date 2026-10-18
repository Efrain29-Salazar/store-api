const express = require('express');
const products = require('./products');
const validateProduct = require('./validateProduct');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /products: lista todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// GET /products/:id: devuelve un producto (reto opcional)
app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});

// POST /products: crea un producto nuevo
app.post('/products', (req, res) => {
  const errorMessage = validateProduct(req.body);

  if (errorMessage) {
    return res.status(400).json({ error: errorMessage });
  }

  const { name, price, stock, category } = req.body;
  const nextId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  const newProduct = { id: nextId, name: String(name).trim(), price, stock, category };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Enciende el servidor solo si se ejecuta directamente (no en las pruebas)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;
