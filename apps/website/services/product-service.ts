import { apiClient } from '@starter/api';
import { ProductSchema, CreateProductInputSchema, paginatedSchema } from '@starter/types';
import type { CreateProductInput } from '@starter/types';

export async function getProducts() {
  const res = await apiClient.get('/products');
  return paginatedSchema(ProductSchema).parse(res.data);
}

export async function getProduct(id: string) {
  const res = await apiClient.get(`/products/${id}`);
  return ProductSchema.parse(res.data);
}

export async function createProduct(data: CreateProductInput) {
  const res = await apiClient.post('/products', CreateProductInputSchema.parse(data));
  return ProductSchema.parse(res.data);
}
