"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const el = document.getElementById("iletisim-eposta");
            if (el) {
                const range = document.createRange();
                range.selectNodeContents(el);
                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
            }
        }
    };
    return (
        <button type="button" className="btn btn--outline-light" onClick={copy} aria-live="polite">
            {copied ? "Kopyalandı" : "Adresi kopyala"}
        </button>
    );
}
