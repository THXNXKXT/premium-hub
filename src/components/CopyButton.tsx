"use client";

import { useState } from "react";

interface CopyButtonProps {
    text: string;
    label?: string;
}

export default function CopyButton({ text, label = "คัดลอก" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`
                inline-flex gap-1.5 px-2.5 py-1.5 rounded-lg
                text-xs font-semibold
                transition-all duration-150
                active:scale-95
                ${copied
                    ? "bg-success/15 text-success"
                    : "bg-muted text-foreground"
                }
            `}
            style={!copied ? { boxShadow: 'var(--shadow-xs)' } : undefined}
            aria-label={copied ? "คัดลอกแล้ว" : label}
        >
            {copied ? (
                <>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>คัดลอกแล้ว</span>
                </>
            ) : (
                <>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{label}</span>
                </>
            )}
        </button>
    );
}
