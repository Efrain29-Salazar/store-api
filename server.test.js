const request = require('supertest');
const app = require('./server');

describe('GET /products', () => {
  it('responds with 200 and an array of products', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });
});

describe('POST /products', () => {
  it('creates a product and responds with 201 and its id', async () => {
    const newProduct = { name: 'Gorra', price: 12.5, stock: 10, category: 'ropa' };

    const response = await request(app).post('/products').send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newProduct);
    expect(response.body.id).toBeDefined();
  });

  it('responds with 400 when name or price are missing', async () => {
    const response = await request(app).post('/products').send({ stock: 5 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El nombre y el precio son obligatorios');
  });

  it.each([[0], [-5], ['abc']])(
    'responds with 400 when price is invalid (%p)',
    async (price) => {
      const response = await request(app)
        .post('/products')
        .send({ name: 'Producto', price });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('El precio debe ser un número mayor que 0');
    }
  );
});

describe('GET /products/:id', () => {
  it('responds with 200 and the product when it exists', async () => {
    const response = await request(app).get('/products/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('responds with 404 when the product does not exist', async () => {
    const response = await request(app).get('/products/9999');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado');
  });
});
