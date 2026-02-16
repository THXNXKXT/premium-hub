import { getProducts, getAccounts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function HomePage() {
  const [products, accounts] = await Promise.all([
    getProducts(),
    getAccounts(),
  ]);

  // Count accounts per platform
  const accountCounts: Record<string, number> = {};
  accounts.forEach((acc) => {
    const pid = acc.platform;
    accountCounts[pid] = (accountCounts[pid] || 0) + 1;
  });

  const activeProducts = products.filter((p) => p.isActive);
  const inactiveProducts = products.filter((p) => !p.isActive);

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">


      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1 leading-tight tracking-tight">
            แอพทั้งหมด
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent text-[10px] font-bold">
              {activeProducts.length}
            </span>
            <span>รายการที่เปิดให้บริการ</span>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Products Grid */}
      <div className="px-5 pb-6 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              accountCount={accountCounts[product.id] || 0}
            />
          ))}
        </div>

        {/* Inactive products */}
        {inactiveProducts.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                ปิดการใช้งาน
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 opacity-60">
              {inactiveProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  accountCount={accountCounts[product.id] || 0}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
