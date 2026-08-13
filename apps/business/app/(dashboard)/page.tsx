import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, queryKeys } from '@starter/api';
import { getProducts } from '@/services/product-service';
import { DashboardPageClient } from './dashboard-page-client';

export default async function DashboardPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.lists(),
    queryFn: getProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPageClient />
    </HydrationBoundary>
  );
}
