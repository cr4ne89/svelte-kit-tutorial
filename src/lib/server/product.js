import { readFile } from 'fs/promises';
import { database } from './mongodb';

export async function loadProducts() {
  const products = await database.collection('products').find();
  return await products.toArray();

  // const content = await readFile('data/products.json', {encoding: 'utf-8'});
  // return JSON.parse(content);
}

export async function getRecommends(baseId) {
  const products = await loadProducts();
  const candidated = products.filter((product) => product.id !== baseId);
  return randomSelect(candidated, 3);
}

function randomSelect(array, n) {
  const indices = Array.from( { length: array.length }, (_, i) => i );
  indices.sort(() => Math.random() - 0.5);
  const count = Math.floor(Math.random() * n + 1);
  return Array.from({ length: count }, (_, i) => array[indices[i]]);
}