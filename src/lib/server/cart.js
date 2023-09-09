import { database } from '$lib/server/mongodb';

export async function addToCart(productId) {
  await database.collection('cart').insertOne({ productId });

  // const cart = await loadCart();
  // if (!cart.includes(productId)) {
  //   cart.push(productId);
  // }
  // await writeFile(dataPath, JSON.stringify(cart), { encoding: 'utf-8'});
}

export async function loadCart() {
  const cart = await database.collection('cart').find();
  return await cart.map((doc) => doc.productId).toArray();

  // try {
  //   const content = await readFile(dataPath);
  //   return JSON.parse(content);
  // } catch (err) {
  //   if (err.code === 'ENOENT') {
  //     return [];
  //   } else {
  //     throw err;
  //   }
  // }
}