"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, User, AppWindow } from "lucide-react";
import { getProducts, getAccounts } from "@/lib/api";
import { Product, Account } from "@/types";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch data when modal opens
    useEffect(() => {
        if (isOpen && products.length === 0) {
            setLoading(true);
            Promise.all([getProducts(), getAccounts()])
                .then(([p, a]) => {
                    setProducts(p);
                    setAccounts(a);
                })
                .catch((err) => console.error("Search data fetch failed", err))
                .finally(() => setLoading(false));
        }
    }, [isOpen]);

    // Reset query when closed
    useEffect(() => {
        if (!isOpen) setQuery("");
    }, [isOpen]);

    // Filter results
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredAccounts = accounts.filter(a =>
    (a.userName?.toLowerCase().includes(query.toLowerCase()) ||
        a.email?.toLowerCase().includes(query.toLowerCase()))
    ).sort((a, b) => {
        const now = Date.now();
        const aActive = new Date(a.endDate).getTime() > now;
        const bActive = new Date(b.endDate).getTime() > now;

        // Active first
        if (aActive && !bActive) return -1;
        if (!aActive && bActive) return 1;

        // If both same status, sort by name
        return (a.userName || "").localeCompare(b.userName || "");
    });

    const hasResults = filteredProducts.length > 0 || filteredAccounts.length > 0;

    if (!isOpen) return null;

    const content = (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
            >
                {/* Header / Input */}
                <div className="flex items-center gap-3 p-4 border-b border-border bg-gray-50/50 dark:bg-slate-900/50">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="ค้นหาแอพ หรือ บัญชี..."
                        className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Results API */}
                <div className="overflow-y-auto flex-1 p-2 scrollbar-hide">
                    {loading ? (
                        <div className="flex items-center justify-center py-8 text-muted-foreground">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
                            กำลังโหลดข้อมูล...
                        </div>
                    ) : !query ? (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground opacity-50">
                            <Search className="w-12 h-12 mb-2" />
                            <span className="text-sm">พิมพ์เพื่อเริ่มค้นหา</span>
                        </div>
                    ) : !hasResults ? (
                        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                            <span className="text-sm">ไม่พบผลลัพธ์สำหรับ "{query}"</span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Products Section */}
                            {filteredProducts.length > 0 && (
                                <div>
                                    <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        แอพพลิเคชัน
                                    </h3>
                                    <div className="space-y-1">
                                        {filteredProducts.map(product => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                onClick={onClose}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center p-1.5 shrink-0 border border-border/50">
                                                    <img
                                                        src={product.logoImage}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <span className="flex-1 font-medium text-sm">{product.name}</span>
                                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Accounts Section */}
                            {filteredAccounts.length > 0 && (
                                <div>
                                    <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        บัญชี
                                    </h3>
                                    <div className="space-y-1">
                                        {filteredAccounts.map(account => {
                                            const platform = products.find(p => p.id === account.platform);
                                            return (
                                                <Link
                                                    key={account._id}
                                                    href={`/accounts/${account._id}`}
                                                    onClick={onClose}
                                                    className="flex items-center gap-3 p-2 rounded-lg bg-card/50 border border-transparent hover:border-border hover:bg-accent/5 transition-all group cursor-default"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center p-1 shrink-0">
                                                        {platform ? (
                                                            <img
                                                                src={platform.logoImage}
                                                                alt={platform.name}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                                                                {account.userName?.charAt(0).toUpperCase() || "U"}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                                                                {account.userName || "ไม่ระบุชื่อ"}
                                                            </div>
                                                            {platform && (
                                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                                                    {platform.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground truncate">
                                                            {account.email}
                                                        </div>
                                                    </div>
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${new Date(account.endDate).getTime() <= Date.now()
                                                        ? "bg-danger/10 text-danger"
                                                        : "bg-success/10 text-success"
                                                        }`}>
                                                        {new Date(account.endDate).getTime() <= Date.now() ? "หมดอายุ" : "ใช้งาน"}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-border bg-muted/20 text-[10px] text-muted-foreground flex justify-between px-4">
                    <span>กด Esc เพื่อปิด</span>
                    <span>ผลลัพธ์ {filteredProducts.length + filteredAccounts.length} รายการ</span>
                </div>
            </motion.div>
        </div>
    );

    return createPortal(
        <AnimatePresence>
            {isOpen && content}
        </AnimatePresence>,
        document.body
    );
}
