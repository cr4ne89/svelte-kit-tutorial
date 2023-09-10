import { addToCart, loadCartItems } from '$lib/server/cart.js';
import { loadProducts } from '$lib/server/product.js';

export async function load({ locals, params }) {
  const products = await loadProducts();
  const productId = params.id;
  const product = await products.find((product) => productId === product.id);
  const relatedProducts = await products.filter((product) => productId !== product.id);
  return { product, relatedProducts };
}

export const prerender = true;