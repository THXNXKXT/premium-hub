"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";

const navItems = [
    {
        href: "/",
        label: "แอพทั้งหมด",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),
        position: "left"
    },
    {
        href: "#", // Static, non-clickable
        label: "Premium Hub",
        icon: (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-xl transform border-4 border-background ring-2 ring-accent/20 overflow-hidden">
                <img
                    src="/img/logo.png"
                    alt="Logo"
                    className="w-full h-full object-cover"
                />
            </div>
        ),
        position: "center",
        isAction: true
    },
    {
        href: "/accounts",
        label: "บัญชี",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        position: "right"
    },
];

export default function BottomNav() {
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden animate-slide-up w-full max-w-[320px]">
                <div
                    className="flex items-center justify-between px-6 h-[72px] rounded-full transition-all duration-300"
                    style={{
                        backgroundColor: 'var(--glass-bg)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--shadow-lg)'
                    }}
                >
                    {navItems.map((item) => {
                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                        if (item.position === "center") {
                            return (
                                <button
                                    key="logo-center"
                                    onClick={() => setIsSearchOpen(true)}
                                    className="relative -mt-12 mx-2 group z-50 transform transition-transform duration-300 hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-accent blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-full" />
                                    {item.icon}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    relative flex flex-col items-center justify-center flex-1 h-full rounded-full transition-all duration-300 active:scale-90 group
                                    ${isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"}
                                `}
                            >
                                {/* Active Indicator (Glow) */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-accent/5 rounded-full blur-md" />
                                )}

                                {/* Icon */}
                                <div className={`relative z-10 transition-transform duration-300 ${isActive ? "-translate-y-1" : "group-hover:-translate-y-0.5"}`}>
                                    {item.icon}
                                </div>

                                {/* Label Indicator for Active State */}
                                {isActive && (
                                    <div className="absolute bottom-3 w-1 h-1 bg-accent rounded-full animate-scale-in" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}
