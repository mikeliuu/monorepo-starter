'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Badge,
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
import { useProducts, useCreateProduct, useDeleteProduct } from '@/hooks/use-products';

function AddProductForm() {
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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
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
                <FormLabel>Price ($)</FormLabel>
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
        </div>
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
          {isPending ? 'Adding…' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}

export function DashboardPageClient() {
  const { data, isLoading, isError } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Product Management</h1>
        <p className="text-muted-foreground">Manage your product catalogue.</p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Catalogue</h2>
        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {isError && (
          <p className="text-destructive">Failed to load products. Is the API running?</p>
        )}
        {data && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-muted-foreground text-center">
                    No products yet.
                  </TableCell>
                </TableRow>
              ) : (
                data.items.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => deleteProduct(product.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Add Product</h2>
        <div className="max-w-2xl rounded-lg border p-6">
          <AddProductForm />
        </div>
      </section>
    </div>
  );
}
