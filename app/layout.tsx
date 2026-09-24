import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--ff-display", display: "swap" });
const body = Figtree({ subsets: ["latin", "latin-ext"], variable: "--ff-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--ff-mono", display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: `${SITE.name} · ${SITE.slogan}`,
    description: SITE.description,
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "tr_TR",
        url: SITE.url,
        siteName: SITE.name,
        title: `${SITE.name} · ${SITE.slogan}`,
        description: SITE.description,
    },
    icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
    themeColor: "#F2F3F5",
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    slogan: SITE.slogan,
    description: SITE.description,
    areaServed: "TR",
    knowsAbout: ["Web tasarım", "E-ticaret", "SEO", "Google Ads"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr" className={`${display.variable} ${body.variable} ${mono.variable}`}>
            <body>
                {children}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </body>
        </html>
    );
}
