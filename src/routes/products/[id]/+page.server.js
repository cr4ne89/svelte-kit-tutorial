import { addToCart, loadCartItems } from '$lib/server/cart.js';
import { loadProducts } from '$lib/server/product.js';

export async function load({ locals, params }) {
  const products = await loadProducts();
  const productId = params.id;
  const product = await products.find((product) => productId === product.id);
  const relatedProducts = await products.filter((product) => productId !== product.id);

  let cart = [];
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId);
  }

  return { product, relatedProducts, cart };
}

// actionsは様々な名前の関数を保持するオブジェクト
// 現状はdefaultという名前の関数しか定義していない
export const actions = {
  default: async ({ locals, request }) => {
    if (locals.currentUser) {
      const data = await request.formData();
      await addToCart(locals.currentUser.userId, data.get('productId'));
    }
  }
}