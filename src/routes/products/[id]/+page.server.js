import { addToCart, loadCart } from '$lib/server/cart.js';
import { loadProducts } from '$lib/server/product.js';


export async function load({ params }) {
  const products = await loadProducts();
  const productId = params.id;
  const product = await products.find((product) => productId === product.id);
  const relatedProducts = await products.filter((product) => productId !== product.id);
  const cart = await loadCart();

  return { product, relatedProducts, cart };
}

// actionsは様々な名前の関数を保持するオブジェクト
// 現状はdefaultという名前の関数しか定義していない
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    await addToCart(data.get('productId'));
  }
}