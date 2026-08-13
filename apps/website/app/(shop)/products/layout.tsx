export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center px-4">
          <span className="font-semibold">Shop</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
