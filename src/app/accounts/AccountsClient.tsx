"use client";

import { useState } from "react";
import { Product, Account } from "@/types";
import AccountCard from "@/components/AccountCard";

interface AccountsClientProps {
    initialProducts: Product[];
    initialAccounts: Account[];
}

function getDaysLeft(endDate: string) {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
}

export default function AccountsClient({ initialProducts, initialAccounts }: AccountsClientProps) {
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expired">("all");
    const [selectedPlatform, setSelectedPlatform] = useState<string>("all");

    // Build platform lookup
    const platformMap: Record<string, { name: string; color: string; logo: string }> = {};
    initialProducts.forEach((p) => {
        platformMap[p.id] = { name: p.name, color: p.colorPrimary, logo: p.logoImage };
    });

    // Filter accounts
    let filteredAccounts = initialAccounts;

    // Filter by status
    if (filterStatus === "active") {
        filteredAccounts = filteredAccounts.filter((acc) => getDaysLeft(acc.endDate) > 0);
    } else if (filterStatus === "expired") {
        filteredAccounts = filteredAccounts.filter((acc) => getDaysLeft(acc.endDate) <= 0);
    }

    // Filter by platform
    if (selectedPlatform !== "all") {
        filteredAccounts = filteredAccounts.filter((acc) => acc.platform === selectedPlatform);
    }

    // Sort by days remaining (descending)
    filteredAccounts = [...filteredAccounts].sort((a, b) => {
        const timeDiff = new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        if (timeDiff !== 0) return timeDiff;
        return (a._id || "").localeCompare(b._id || ""); // Tie-breaker for stability
    });

    // Group accounts by platform
    const grouped: Record<string, typeof filteredAccounts> = {};
    filteredAccounts.forEach((acc) => {
        const pid = acc.platform;
        if (!grouped[pid]) grouped[pid] = [];
        grouped[pid].push(acc);
    });

    // Get unique platforms
    const uniquePlatforms = Array.from(new Set(initialAccounts.map((a) => a.platform)));

    const activeCount = initialAccounts.filter((acc) => getDaysLeft(acc.endDate) > 0).length;

    return (
        <div className="min-h-screen">
            {/* iOS-Style Large Title Header */}
            <div className="px-5 pt-6 pb-2">
                <h1 className="text-2xl font-bold text-foreground mb-1.5 leading-tight tracking-tight">
                    บัญชีทั้งหมด
                </h1>

                {/* Stats */}
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground font-medium text-xs">
                        <span className="font-bold text-foreground">{initialAccounts.length}</span> ทั้งหมด
                    </span>
                    <div className="w-px h-3 bg-border" />
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        <span className="text-muted-foreground font-medium text-xs">
                            <span className="font-bold text-foreground">{activeCount}</span> ใช้งานได้
                        </span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="px-4 pb-4 space-y-6 mt-5">
                {/* Status Filter */}
                <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                        สถานะ
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <button
                            onClick={() => setFilterStatus("all")}
                            className={`
                                px-4 py-2 rounded-xl text-sm font-medium
                                transition-all duration-150 active:scale-95 border
                                ${filterStatus === "all"
                                    ? "bg-foreground text-background border-transparent"
                                    : "bg-card text-foreground border-border/50 hover:bg-muted/50"
                                }
                            `}
                            style={filterStatus !== "all" ? { boxShadow: 'var(--shadow-xs)' } : undefined}
                        >
                            ทั้งหมด
                        </button>
                        <button
                            onClick={() => setFilterStatus("active")}
                            className={`
                                px-4 py-2 rounded-xl text-sm font-medium
                                transition-all duration-150 active:scale-95 border
                                ${filterStatus === "active"
                                    ? "bg-success text-white border-transparent shadow-lg shadow-success/20"
                                    : "bg-card text-foreground border-border/50 hover:bg-muted/50"
                                }
                            `}
                            style={filterStatus !== "active" ? { boxShadow: 'var(--shadow-xs)' } : undefined}
                        >
                            ใช้งานได้
                        </button>
                        <button
                            onClick={() => setFilterStatus("expired")}
                            className={`
                                px-4 py-2 rounded-xl text-sm font-medium
                                transition-all duration-150 active:scale-95 border
                                ${filterStatus === "expired"
                                    ? "bg-danger text-white border-transparent shadow-lg shadow-danger/20"
                                    : "bg-card text-foreground border-border/50 hover:bg-muted/50"
                                }
                            `}
                            style={filterStatus !== "expired" ? { boxShadow: 'var(--shadow-xs)' } : undefined}
                        >
                            หมดอายุ
                        </button>
                    </div>
                </div>

                {/* Platform Filter */}
                <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                        แพลตฟอร์ม
                    </div>
                    <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                        <button
                            onClick={() => setSelectedPlatform("all")}
                            className={`
                                px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                                transition-all duration-150 active:scale-95 border
                                ${selectedPlatform === "all"
                                    ? "bg-foreground text-background border-transparent"
                                    : "bg-card text-foreground border-border/50 hover:bg-muted/50"
                                }
                            `}
                            style={selectedPlatform !== "all" ? { boxShadow: 'var(--shadow-xs)' } : undefined}
                        >
                            ทั้งหมด
                        </button>
                        {uniquePlatforms.map((pid) => {
                            const platform = platformMap[pid];
                            if (!platform) return null;
                            return (
                                <button
                                    key={pid}
                                    onClick={() => setSelectedPlatform(pid)}
                                    className={`
                                        px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                                        transition-all duration-150 active:scale-95 border
                                        ${selectedPlatform === pid
                                            ? "bg-accent text-white border-transparent shadow-lg shadow-accent/20"
                                            : "bg-card text-foreground border-border/50 hover:bg-muted/50"
                                        }
                                    `}
                                    style={selectedPlatform !== pid ? { boxShadow: 'var(--shadow-xs)' } : undefined}
                                >
                                    {platform.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Grouped accounts */}
            <div className="px-4 pb-6">
                {filteredAccounts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </div>
                        <p className="text-base text-muted-foreground font-medium">ไม่พบบัญชีที่ตรงกับเงื่อนไข</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(grouped).map(([platformId, accs]) => {
                            const platform = platformMap[platformId];
                            return (
                                <section key={platformId}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: platform?.color || "#171717" }}
                                        />
                                        <h2 className="text-lg font-bold text-foreground">
                                            {platform?.name || "Unknown"}
                                        </h2>
                                        <span className="px-2.5 py-1 text-xs font-bold bg-muted rounded-full text-muted-foreground">
                                            {accs.length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {accs.map((account) => (
                                            <AccountCard
                                                key={account._id}
                                                account={account}
                                                platformName={platform?.name}
                                                platformColor={platform?.color}
                                                platformLogo={platform?.logo}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
