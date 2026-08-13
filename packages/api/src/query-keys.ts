export const queryKeys = {
  products: {
    all: () => ['products'] as const,
    lists: () => ['products', 'list'] as const,
    list: (params?: Record<string, unknown>) => ['products', 'list', params] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
  },
  orders: {
    all: () => ['orders'] as const,
    lists: () => ['orders', 'list'] as const,
    list: (params?: Record<string, unknown>) => ['orders', 'list', params] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
  users: {
    all: () => ['users'] as const,
    me: () => ['users', 'me'] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },
} as const;
