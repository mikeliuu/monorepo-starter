'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@starter/ui';
import { CreateProductInputSchema, type CreateProductInput } from '@starter/types';
import { useProducts, useCreateProduct } from '@/hooks/use-products';

function CreateProductForm() {
  const { mutate: createProduct, isPending } = useCreateProduct();

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(CreateProductInputSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
    },
  });

  function onSubmit(data: CreateProductInput) {
    createProduct(data, { onSuccess: () => form.reset() });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Optional description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating…' : 'Create Product'}
        </Button>
      </form>
    </Form>
  );
}

export function ShopPageClient() {
  const { data, isLoading, isError } = useProducts();

  return (
    <div className="container mx-auto space-y-10 py-8">
      <section>
        <h1 className="mb-4 text-2xl font-bold">Products</h1>
        {isLoading && <p className="text-muted-foreground">Loading products…</p>}
        {isError && (
          <p className="text-destructive">Failed to load products. Is the API running?</p>
        )}
        {data && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground text-center">
                    No products yet. Add one below.
                  </TableCell>
                </TableRow>
              ) : (
                data.items.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.description ?? '—'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Add Product</h2>
        <div className="max-w-md">
          <CreateProductForm />
        </div>
      </section>
    </div>
  );
}
