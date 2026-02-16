"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Search } from "lucide-react";
import { useState } from "react";
import SearchModal from "./SearchModal";

const navItems = [
    {
        href: "/",
        label: "แอพทั้งหมด",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),
    },
    {
        href: "/accounts",
        label: "บัญชี",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <aside className="hidden md:flex flex-col w-16 h-screen fixed left-0 top-0 bg-card border-r border-border">
                {/* Logo - Minimal */}
                <div className="flex flex-col items-center gap-4 pt-4 border-b border-border pb-4">
                    <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center shadow-md overflow-hidden">
                        <img
                            src="/img/logo.png"
                            alt="Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Search Trigger */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                        title="ค้นหา"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation - Vertical Icons */}
                <nav className="flex flex-col items-center gap-2 py-6 flex-1">
                    {navItems.map((item) => {
                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group relative flex flex-col items-center w-full py-2"
                            >
                                {/* Active Indicator - Left Bar */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-foreground rounded-r-full" />
                                )}

                                {/* Icon */}
                                <div
                                    className={`transition-all duration-200 ${isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground group-hover:text-foreground"
                                        }`}
                                >
                                    {item.icon}
                                </div>

                                {/* Label - Vertical Text */}
                                <span
                                    className={`text-[9px] font-medium mt-1.5 transition-all duration-200 ${isActive
                                        ? "text-foreground font-semibold"
                                        : "text-muted-foreground group-hover:text-foreground"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer - Minimal Dot */}
                <div className="flex items-center justify-center py-4 border-t border-border">
                    <div className="w-1.5 h-1.5 rounded-full bg-border" />
                </div>
            </aside>

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}
