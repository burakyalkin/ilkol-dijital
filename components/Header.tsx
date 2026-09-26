"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, CONTACT } from "@/lib/site";
import { ChatIcon } from "./Icons";

export default function Header() {
    const [dark, setDark] = useState(false);
    const [open, setOpen] = useState(false);

    // Menü, koyu zeminli bir bölümün üzerindeyken koyu görünüme geçer
    useEffect(() => {
        const check = () => {
            const probe = 40;
            const darkSections = document.querySelectorAll<HTMLElement>("[data-header='dark']");
            let isDark = false;
            darkSections.forEach((el) => {
                const r = el.getBoundingClientRect();
                if (r.top <= probe && r.bottom >= probe) isDark = true;
            });
            setDark(isDark);
        };
        check();
        window.addEventListener("scroll", check, { passive: true });
        window.addEventListener("resize", check);
        return () => {
            window.removeEventListener("scroll", check);
            window.removeEventListener("resize", check);
        };
    }, []);

    // Mobil menü açıkken dışarıya dokununca veya Esc'ye basınca kapanır
    const headerRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e: PointerEvent) => {
            if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <header ref={headerRef} className={`hdr${dark ? " hdr--dark" : ""}`}>
            <div className="hdr__bar">
                <a href="#" className="logo" aria-label="İlkol Dijital ana sayfa">
                    <span className="logo__mark">
                        ilkol<i>.</i>
                    </span>
                    <span className="logo__sub">dijital</span>
                </a>
                <nav className="nav" aria-label="Ana menü">
                    {NAV.map((n) => (
                        <a key={n.href} href={n.href}>
                            {n.label}
                        </a>
                    ))}
                </nav>
                <div className="hdr__actions">
                    <button
                        type="button"
                        className="hdr__menu"
                        aria-expanded={open}
                        aria-controls="mobil-menu"
                        onClick={() => setOpen((o) => !o)}
                    >
                        {open ? "Kapat" : "Menü"}
                    </button>
                    <a href={CONTACT.whatsapp} className="btn btn--cobalt" target="_blank" rel="noopener noreferrer">
                        <ChatIcon />
                        <span className="hdr__cta-long">{CONTACT.whatsappLabel}</span>
                        <span className="hdr__cta-short">WhatsApp</span>
                    </a>
                </div>
            </div>
            <nav id="mobil-menu" className="hdr__sheet" hidden={!open} aria-label="Mobil menü">
                {NAV.map((n) => (
                    <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                        {n.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}
