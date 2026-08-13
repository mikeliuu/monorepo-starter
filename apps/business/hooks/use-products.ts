'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@starter/api';
import { getProducts, createProduct, deleteProduct } from '@/services/product-service';
import type { CreateProductInput } from '@starter/types';

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.lists(),
    queryFn: getProducts,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductInput) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
      toast.success('Product created');
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Failed to create product');
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
      toast.success('Product deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Failed to delete product');
    },
  });
}
