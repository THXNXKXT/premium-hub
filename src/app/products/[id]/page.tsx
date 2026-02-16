import { getProducts, getAccounts } from "@/lib/api";
import AccountCard from "@/components/AccountCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductNoteButton from "@/components/ProductNoteButton";

interface Props {
    params: Promise<{ id: string }>;
}

function getDaysLeft(endDate: string) {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const [products, accounts] = await Promise.all([
        getProducts(),
        getAccounts(),
    ]);

    const product = products.find((p) => p.id === id);
    if (!product) return notFound();

    const productAccounts = accounts.filter((a) => a.platform === id);

    // Sort by days remaining (descending)
    const sortedAccounts = [...productAccounts].sort((a, b) => {
        return getDaysLeft(b.endDate) - getDaysLeft(a.endDate);
    });

    const activeAccounts = sortedAccounts.filter((a) => getDaysLeft(a.endDate) > 0);
    const expiredAccounts = sortedAccounts.filter((a) => getDaysLeft(a.endDate) <= 0);

    return (
        <div className="px-4 py-4 md:py-6">
            {/* Back button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 active:scale-95 transition-transform"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                กลับ
            </Link>

            {/* Product Header */}
            <div className="mb-4">
                <div className="flex items-start gap-4 mb-3">
                    {/* Logo */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-muted flex items-center justify-center p-2.5 shrink-0 border border-border/30">
                        <img
                            src={product.logoImage}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1 py-1">
                        <div className="flex items-center gap-2 mb-1.5">
                            <h1 className="text-xl font-bold text-foreground leading-tight tracking-tight">
                                {product.name}
                            </h1>
                            <div className={`w-2 h-2 rounded-full ring-2 ring-white ${product.isActive ? "bg-success" : "bg-muted-foreground/30"}`} />
                        </div>

                        <div className="flex items-center gap-3 text-xs flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                                <span className="text-muted-foreground font-medium">{product.screen} จอ</span>
                            </div>
                            <div className="w-px h-3 bg-border" />
                            <span className="text-muted-foreground font-medium">
                                <span className="font-bold text-foreground">{activeAccounts.length}</span> ใช้งานได้
                            </span>
                        </div>
                    </div>

                    {/* Note Button */}
                    <ProductNoteButton remark={product.remark} />
                </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
                <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    แพ็กเกจราคา
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {product.type.map((t) => (
                        <div
                            key={t._id}
                            className="bg-card border border-border/50 rounded-xl p-3 hover:border-border transition-all duration-200"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: product.colorPrimary }} />
                                <p className="text-[10px] md:text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                                    {t.dayType} วัน
                                </p>
                            </div>
                            <p className="text-lg md:text-xl font-bold text-foreground mb-3">฿{t.price.toLocaleString()}</p>
                            <div className="space-y-1.5 pt-2 border-t border-border/30">
                                <div className="flex items-center justify-between text-[10px] md:text-xs">
                                    <span className="text-muted-foreground">ทุน</span>
                                    <span className="font-semibold text-foreground">฿{t.cost.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] md:text-xs">
                                    <span className="text-muted-foreground">ตัวแทน</span>
                                    <span className="font-semibold text-foreground">฿{t.agentPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] md:text-xs pt-1.5 border-t border-border/30">
                                    <span className="text-muted-foreground">กำไร</span>
                                    <span className="font-bold text-success">฿{(t.price - t.cost).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Remark Section Removed */}

            {/* Accounts */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        บัญชีสัปดาห์นี้
                    </h2>
                    <span className="px-3 py-1 text-xs font-bold bg-muted rounded-full text-muted-foreground">
                        {productAccounts.length} บัญชี
                    </span>
                </div>

                {productAccounts.length === 0 ? (
                    <div className="text-center py-16 bg-card border border-border rounded-2xl">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                        </div>
                        <p className="text-sm text-muted-foreground">ไม่มีบัญชีในสัปดาห์นี้</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {activeAccounts.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-success" />
                                    <h3 className="text-sm font-semibold text-success">
                                        ใช้งานได้ ({activeAccounts.length})
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {activeAccounts.map((account) => (
                                        <AccountCard
                                            key={account._id}
                                            account={account}
                                            platformName={product.name}
                                            platformColor={product.colorPrimary}
                                            platformLogo={product.logoImage}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {expiredAccounts.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-danger" />
                                    <h3 className="text-sm font-semibold text-danger">
                                        หมดอายุ ({expiredAccounts.length})
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 opacity-60">
                                    {expiredAccounts.map((account) => (
                                        <AccountCard
                                            key={account._id}
                                            account={account}
                                            platformName={product.name}
                                            platformColor={product.colorPrimary}
                                            platformLogo={product.logoImage}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
}
