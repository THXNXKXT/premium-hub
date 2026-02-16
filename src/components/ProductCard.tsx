"use client";

import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
    product: Product;
    accountCount?: number;
}

export default function ProductCard({ product, accountCount }: ProductCardProps) {
    const minPrice = product.type.length > 0 ? Math.min(...product.type.map((t) => t.price)) : 0;

    return (
        <Link href={`/products/${product.id}`} className="block group relative">
            <div
                className="bg-card rounded-[var(--radius-card)] p-3 border border-border/40 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-border/60 group-active:scale-[0.98]"
                style={{
                    boxShadow: 'var(--shadow-card)',
                }}
            >
                <div
                    className="absolute inset-0 rounded-[var(--radius-card)] transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ boxShadow: 'var(--shadow-card-hover)' }}
                />

                <div className="flex items-start justify-between mb-2.5 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-background flex items-center justify-center p-2 shrink-0 border border-border/50 shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <img
                            src={product.logoImage}
                            alt={product.name}
                            className="w-full h-full object-contain drop-shadow-sm"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerText = product.name.charAt(0);
                                e.currentTarget.parentElement!.className += " text-base font-bold text-muted-foreground";
                            }}
                        />
                    </div>
                </div>

                {/* Product Name */}
                <h3 className="text-sm font-semibold text-foreground mb-0.5 line-clamp-1 leading-snug group-hover:text-accent transition-colors duration-200">
                    {product.name}
                </h3>

                {/* Details: Screens + Price */}
                <div className="flex items-center justify-between text-xs mt-1.5">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-accent/50 transition-colors" />
                        {product.screen} จอ
                    </div>
                    <span className="font-bold text-foreground text-sm">
                        ฿{minPrice.toLocaleString()}
                    </span>
                </div>

                {/* Account Count (if provided) */}
                {accountCount !== undefined && accountCount > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-border/30">
                        <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${product.isActive ? 'bg-success' : 'bg-muted'}`} />
                            <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                                {accountCount} บัญชี
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}
