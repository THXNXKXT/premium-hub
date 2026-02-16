import { getProducts, getAccounts } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { ChevronLeft } from "lucide-react";

interface Props {
    params: Promise<{ id: string }>;
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function getDaysLeft(endDate: string) {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
}

export default async function AccountDetailPage({ params }: Props) {
    const { id } = await params;

    // Fetch all data
    const [products, accounts] = await Promise.all([
        getProducts(),
        getAccounts(),
    ]);

    // Find account
    const account = accounts.find((a) => a._id === id);
    if (!account) return notFound();

    // Find associated product (platform)
    const platform = products.find((p) => p.id === account.platform);

    const daysLeft = getDaysLeft(account.endDate);
    const isExpired = daysLeft <= 0;

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                กลับหน้าหลัก
            </Link>

            {/* Header / Platform Info */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center p-3 shrink-0 border border-border/50 shadow-sm">
                    {platform ? (
                        <img
                            src={platform.logoImage}
                            alt={platform.name}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="text-xl font-bold text-muted-foreground">
                            {account.userName?.charAt(0) || "A"}
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {platform?.name || "Premium Account"}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${isExpired
                            ? "bg-danger/10 text-danger"
                            : "bg-success/10 text-success"
                            }`}>
                            {isExpired ? "หมดอายุแล้ว" : `เหลือ ${daysLeft} วัน`}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            หมดอายุ: {formatDate(account.endDate)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Account Details Card */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/30">
                    <h2 className="font-semibold text-foreground">รายละเอียดบัญชี</h2>
                </div>

                <div className="p-4 space-y-4">
                    {/* Username */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-muted-foreground uppercase">ชื่อบัญชี / Username</label>
                        <div className="flex items-center gap-3">
                            <div className="font-mono text-sm bg-muted/50 px-3 py-2 rounded-lg flex-1 border border-border/50 break-all min-w-0">
                                {account.userName || "-"}
                            </div>
                            {account.userName && <CopyButton text={account.userName} />}
                        </div>
                    </div>

                    {/* Email */}
                    {account.email && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase">อีเมล</label>
                            <div className="flex items-center gap-3">
                                <div className="font-mono text-sm bg-muted/50 px-3 py-2 rounded-lg flex-1 border border-border/50 break-all min-w-0">
                                    {account.email}
                                </div>
                                <CopyButton text={account.email} />
                            </div>
                        </div>
                    )}

                    {/* Password */}
                    {account.password && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase">รหัสผ่าน</label>
                            <div className="flex items-center gap-3">
                                <div className="font-mono text-sm bg-muted/50 px-3 py-2 rounded-lg flex-1 border border-border/50 break-all min-w-0">
                                    {account.password}
                                </div>
                                <CopyButton text={account.password} />
                            </div>
                        </div>
                    )}

                    {/* Link */}
                    {account.link && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase">ลิงก์ใช้งาน</label>
                            <div className="flex items-center gap-3">
                                <div className="font-mono text-sm bg-muted/50 px-3 py-2 rounded-lg flex-1 border border-border/50 break-all min-w-0">
                                    {account.link}
                                </div>
                                <CopyButton text={account.link} />
                                <a
                                    href={account.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-xl border border-border">
                    <div className="text-xs text-muted-foreground mb-1">หน้าจอ</div>
                    <div className="font-semibold text-lg">{account.screenName || "-"}</div>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border">
                    <div className="text-xs text-muted-foreground mb-1">ราคา</div>
                    <div className="font-semibold text-lg">฿{account.amount?.toLocaleString()}</div>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border col-span-2">
                    <div className="text-xs text-muted-foreground mb-1">วันที่เริ่มใช้งาน</div>
                    <div className="font-medium">{formatDate(account.startDate)}</div>
                </div>
            </div>
        </div>
    );
}
