"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

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

    return (
        <header className={`hdr${dark ? " hdr--dark" : ""}`}>
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
                    <a href="#iletisim" className="btn btn--cobalt">
                        Teklif alın
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
