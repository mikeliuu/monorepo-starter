import { Button } from '@starter/ui';
import Link from 'next/link';

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Monorepo Starter</h1>
      <p className="text-muted-foreground text-lg">
        Next.js 15 · React Query · shadcn/ui · Turborepo · Bun
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </Button>
      </div>
    </main>
  );
}
