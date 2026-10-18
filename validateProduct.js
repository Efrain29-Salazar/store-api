// Devuelve un mensaje de error en español, o null si el producto es válido
function validateProduct(body) {
  const { name, price } = body || {};

  const nameIsMissing =
    name === undefined || name === null || String(name).trim() === '';
  const priceIsMissing = price === undefined || price === null || price === '';

  if (nameIsMissing || priceIsMissing) {
    return 'El nombre y el precio son obligatorios';
  }

  if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
    return 'El precio debe ser un número mayor que 0';
  }

  return null;
}

module.exports = validateProduct;
