"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/site";
import { ChatIcon } from "./Icons";

// Mobilde başparmağın ulaştığı yerde sabit WhatsApp butonu.
// Hero geçilince belirir; iletişim bölümü ekrandayken gizlenir (orada zaten butonlar var).
export default function FloatingContact() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const contact = document.getElementById("iletisim");
        const update = () => {
            const pastHero = window.scrollY > window.innerHeight * 0.9;
            const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
            setVisible(pastHero && !atContact);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="fab"
            data-visible={visible}
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
        >
            <ChatIcon />
            {CONTACT.whatsappLabel}
        </a>
    );
}
