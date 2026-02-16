"use client";

import CopyButton from "./CopyButton";
import { Account } from "@/types";

interface AccountCardProps {
    account: Account;
    platformName?: string;
    platformColor?: string;
    platformLogo?: string;
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function getDaysLeft(endDate: string) {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
}

export default function AccountCard({ account, platformName, platformColor, platformLogo }: AccountCardProps) {
    const daysLeft = getDaysLeft(account.endDate);
    const isExpired = daysLeft <= 0;
    const isExpiringSoon = daysLeft > 0 && daysLeft <= 7;

    return (
        <div className="bg-card rounded-xl p-3 active:scale-[0.97] transition-transform duration-150" style={{ boxShadow: 'var(--shadow-card)' }}>
            {/* Header: Platform + Status */}
            <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                    {platformLogo && (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-muted to-background flex items-center justify-center p-1.5 shrink-0">
                            <img
                                src={platformLogo}
                                alt={platformName || "App"}
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerText = (platformName || "A").charAt(0);
                                    e.currentTarget.parentElement!.className += " text-sm font-bold text-muted-foreground";
                                }}
                            />
                        </div>
                    )}
                    <div>
                        <div className="text-xs font-semibold text-foreground">
                            จอ {account.screenName || "-"}
                        </div>
                    </div>
                </div>
                <div className={`
                    px-2 py-0.5 rounded-lg text-[10px] font-semibold
                    ${isExpired
                        ? "bg-danger/10 text-danger"
                        : isExpiringSoon
                            ? "bg-warning/10 text-warning"
                            : "bg-success/10 text-success"
                    }
                `}>
                    {isExpired ? "หมดอายุ" : `${daysLeft} วัน`}
                </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0" suppressHydrationWarning>
                    {account.userName?.trim()?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-foreground truncate">
                        {account.userName || "ไม่ระบุชื่อ"}
                    </div>
                </div>
            </div>

            {/* Credentials */}
            <div className="space-y-2 bg-muted/50 rounded-lg p-3 mb-2.5">
                {account.email && (
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase tracking-wide">
                                อีเมล
                            </div>
                            <div className="text-xs font-medium text-foreground break-all">
                                {account.email}
                            </div>
                        </div>
                        <CopyButton text={account.email} />
                    </div>
                )}
                {account.password && (
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase tracking-wide">
                                รหัสผ่าน
                            </div>
                            <div className="text-xs font-medium text-foreground break-all font-mono">
                                {account.password}
                            </div>
                        </div>
                        <CopyButton text={account.password} />
                    </div>
                )}
                {account.link && (
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase tracking-wide">
                                ลิงก์
                            </div>
                            <div className="text-xs font-medium text-foreground break-all">
                                {account.link}
                            </div>
                        </div>
                        <CopyButton text={account.link} />
                    </div>
                )}
            </div>

            {/* Footer: Date + Price */}
            <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground font-medium">
                    {formatDate(account.startDate)} - {formatDate(account.endDate)}
                </span>
                <span className="font-bold text-foreground text-sm">
                    ฿{account.amount?.toLocaleString() || "0"}
                </span>
            </div>
        </div>
    );
}
