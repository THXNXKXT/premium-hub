"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

interface ProductNoteButtonProps {
    remark?: string;
}

export default function ProductNoteButton({ remark }: ProductNoteButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!remark) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-10 h-10 rounded-full bg-danger/10 text-danger flex items-center justify-center shrink-0 active:scale-95 transition-transform hover:bg-danger/20"
                aria-label="View Remarks"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </button>

            {isOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative w-full max-w-sm bg-background border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-muted/40 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-danger">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span className="font-bold text-lg">หมายเหตุ</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80 hover:text-foreground transition-colors"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <p className="text-base font-medium text-foreground whitespace-pre-line leading-loose">
                                {remark}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-muted/40 border-t border-border/50 backdrop-blur-sm">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-3 rounded-xl bg-foreground text-background font-bold text-sm shadow-sm active:scale-95 transition-transform hover:opacity-90"
                            >
                                ตกลง, ทราบแล้ว
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
