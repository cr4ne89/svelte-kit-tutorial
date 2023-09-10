import { addToCart, removeFromCart } from '$lib/server/cart';
import { loadCartItems } from '$lib/server/cart.js';

export const actions = {
  add: async ({ locals, request }) => {
    if (locals.currentUser) {
      const data = await request.formData();
      await addToCart(locals.currentUser.userId, data.get('productId'));
    }
  },
  remove: async ({ locals, request }) => {
    if (locals.currentUser) {
      const data = await request.formData();
      await removeFromCart(locals.currentUser.userId, data.get('productId'));
    }
  }
}

export async function load({ locals }) {
  let cart = [];
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId);
  }
  return { cart }
}