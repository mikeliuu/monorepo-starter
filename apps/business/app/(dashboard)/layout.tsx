export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="bg-muted/20 w-56 border-r p-4">
        <p className="mb-6 font-semibold">Business Portal</p>
        <nav className="space-y-1 text-sm">
          <a href="/dashboard" className="hover:bg-accent block rounded-md px-3 py-2">
            Products
          </a>
          <a href="/dashboard/orders" className="hover:bg-accent block rounded-md px-3 py-2">
            Orders
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
