// Kart görselleri: dış bağlantı gerektirmeyen, kodla üretilen SVG mockup'lar.
// Her kart, İlkol Dijital'in yaptığı işlerden birini temsil eden soyut bir kompozisyon:
// site ekranı, mobil ekran, arama sonucu (1. sıra), büyüme grafiği veya afiş.
// Gerçek proje görselleri hazır olduğunda CARD_IMAGES dizisini .jpg/.webp yollarıyla değiştirmeniz yeterli.

type Palette = { bg: string; primary: string; soft: string; text: string };

const PALETTES: Palette[] = [
    { bg: "#F2F3F5", primary: "#2438F5", soft: "#D9DDFD", text: "#0F1115" },
    { bg: "#FFF3EB", primary: "#FF6A2B", soft: "#FFD9C4", text: "#1E1A18" },
    { bg: "#E8F4F2", primary: "#0E8C7F", soft: "#C3E4DF", text: "#0F2A27" },
    { bg: "#14161B", primary: "#7FA2FF", soft: "#2A3040", text: "#F2F3F5" },
    { bg: "#FBEEF1", primary: "#D93A63", soft: "#F5CBD6", text: "#2A1218" },
    { bg: "#F1F2E4", primary: "#66761A", soft: "#DCE0B8", text: "#1F2310" },
    { bg: "#F0EEFB", primary: "#5B3FD9", soft: "#D8D0F7", text: "#17122E" },
    { bg: "#1A1414", primary: "#FF5A45", soft: "#3A2A28", text: "#F5EDEB" },
    { bg: "#EAF3FB", primary: "#1C7ED6", soft: "#C6DEF4", text: "#0B2239" },
    { bg: "#F5EFE4", primary: "#A8561A", soft: "#E8D5BF", text: "#2B2118" },
];

const W = 120;
const H = 170;

const rect = (x: number, y: number, w: number, h: number, fill: string, r = 0, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;

function site(p: Palette, v: number) {
    const heroH = 44 + (v % 3) * 6;
    return [
        rect(0, 0, W, H, p.bg),
        rect(0, 0, W, 12, p.soft),
        `<circle cx="7" cy="6" r="1.8" fill="${p.primary}"/><circle cx="13" cy="6" r="1.8" fill="${p.text}" opacity=".35"/><circle cx="19" cy="6" r="1.8" fill="${p.text}" opacity=".35"/>`,
        rect(10, 20, 22, 4, p.text, 2),
        rect(72, 20, 10, 3, p.text, 1.5, 'opacity=".4"'),
        rect(86, 20, 10, 3, p.text, 1.5, 'opacity=".4"'),
        rect(100, 19, 12, 5, p.primary, 2.5),
        rect(10, 36, 76, 8, p.text, 2),
        rect(10, 48, 56, 8, p.text, 2),
        rect(10, 62, 70, 3, p.text, 1.5, 'opacity=".35"'),
        rect(10, 68, 60, 3, p.text, 1.5, 'opacity=".35"'),
        rect(10, 78, 30, 9, p.primary, 4.5),
        rect(10, 96, W - 20, heroH, p.primary, 6, 'opacity=".9"'),
        `<circle cx="${88 - (v % 4) * 8}" cy="${96 + heroH / 2}" r="${12 + (v % 3) * 3}" fill="${p.bg}" opacity=".35"/>`,
        rect(10, 150 + (heroH - 44) / 3, 30, 12, p.soft, 3),
        rect(45, 150 + (heroH - 44) / 3, 30, 12, p.soft, 3),
        rect(80, 150 + (heroH - 44) / 3, 30, 12, p.soft, 3),
    ].join("");
}

function mobile(p: Palette, v: number) {
    return [
        rect(0, 0, W, H, p.primary),
        `<circle cx="${20 + (v % 5) * 18}" cy="30" r="46" fill="${p.bg}" opacity=".12"/>`,
        rect(28, 18, 64, 136, p.text, 12),
        rect(32, 22, 56, 128, p.bg, 9),
        rect(52, 26, 16, 3, p.text, 1.5, 'opacity=".5"'),
        rect(38, 38, 44, 40, p.soft, 6),
        `<path d="M44 70 L56 54 L64 64 L70 58 L78 70 Z" fill="${p.primary}"/>`,
        rect(38, 86, 38, 5, p.text, 2),
        rect(38, 95, 30, 3, p.text, 1.5, 'opacity=".4"'),
        rect(38, 101, 34, 3, p.text, 1.5, 'opacity=".4"'),
        rect(38, 114, 44, 11, p.primary, 5.5),
        rect(38, 132, 20, 12, p.soft, 3),
        rect(62, 132, 20, 12, p.soft, 3),
    ].join("");
}

function rank(p: Palette, v: number) {
    const rows = [0, 1, 2, 3]
        .map((i) => {
            const y = 44 + i * 29;
            if (i === 0) {
                return [
                    rect(8, y - 3, W - 16, 25, p.primary, 5),
                    `<text x="16" y="${y + 13}" font-family="Arial, sans-serif" font-weight="700" font-size="11" fill="${p.bg}">1</text>`,
                    rect(28, y + 3, 56, 4, p.bg, 2),
                    rect(28, y + 11, 76, 3, p.bg, 1.5, 'opacity=".6"'),
                ].join("");
            }
            return [
                `<text x="16" y="${y + 13}" font-family="Arial, sans-serif" font-weight="700" font-size="9" fill="${p.text}" opacity=".35">${i + 1}</text>`,
                rect(28, y + 3, 50 - i * 4, 4, p.text, 2, 'opacity=".45"'),
                rect(28, y + 11, 70 - i * 6, 3, p.text, 1.5, 'opacity=".25"'),
            ].join("");
        })
        .join("");
    return [
        rect(0, 0, W, H, p.bg),
        rect(8, 12, W - 16, 16, p.soft, 8),
        `<circle cx="18" cy="20" r="3.2" fill="none" stroke="${p.text}" stroke-width="1.4"/><path d="M20.4 22.4 L23 25" stroke="${p.text}" stroke-width="1.4" stroke-linecap="round"/>`,
        rect(28, 18.5, 30 + (v % 4) * 8, 3, p.text, 1.5, 'opacity=".5"'),
        rows,
        `<path d="M${W - 18} 34 l6 -7 l6 7" fill="none" stroke="${p.primary}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-6 ${v % 2 ? 128 : 126})"/>`,
    ].join("");
}

function chart(p: Palette, v: number) {
    const pts = [0, 1, 2, 3, 4, 5, 6].map((i) => {
        const x = 14 + i * 15.5;
        const base = 140 - i * 14;
        const wobble = ((i * 7 + v * 3) % 5) * 3 - 6;
        return [x, Math.max(40, base + (i === 6 ? -8 : wobble))] as const;
    });
    const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    const last = pts[pts.length - 1];
    const area = `${line} L${last[0]} 150 L14 150 Z`;
    return [
        rect(0, 0, W, H, p.bg),
        rect(12, 14, 34, 5, p.text, 2),
        rect(12, 23, 22, 3, p.text, 1.5, 'opacity=".4"'),
        rect(W - 40, 12, 28, 12, p.soft, 6),
        [60, 90, 120].map((y) => rect(14, y, W - 28, 0.8, p.text, 0, 'opacity=".12"')).join(""),
        `<path d="${area}" fill="${p.primary}" opacity=".16"/>`,
        `<path d="${line}" fill="none" stroke="${p.primary}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`,
        `<circle cx="${last[0]}" cy="${last[1]}" r="4.5" fill="${p.primary}"/><circle cx="${last[0]}" cy="${last[1]}" r="8" fill="${p.primary}" opacity=".2"/>`,
        rect(14, 150, W - 28, 1.2, p.text, 0, 'opacity=".4"'),
    ].join("");
}

const LETTERS = "İLKOLDİJİTAL";

function poster(p: Palette, v: number) {
    const letter = LETTERS[v % LETTERS.length];
    return [
        rect(0, 0, W, H, p.primary),
        `<text x="${W / 2}" y="128" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="118" fill="${p.bg}">${letter}</text>`,
        rect(12, 14, 26, 3, p.bg, 1.5, 'opacity=".8"'),
        rect(12, 148, 44, 3, p.bg, 1.5, 'opacity=".8"'),
        rect(12, 155, 30, 3, p.bg, 1.5, 'opacity=".5"'),
        `<circle cx="${W - 18}" cy="152" r="6" fill="none" stroke="${p.bg}" stroke-width="1.6"/>`,
    ].join("");
}

const KINDS = [site, rank, mobile, chart, poster] as const;

export const CARD_LABELS = [
    "Kurumsal Site",
    "SEO",
    "Mobil Uyum",
    "Google Ads",
    "Marka Dili",
] as const;

function svgFor(i: number) {
    const kind = i % KINDS.length;
    const palette = PALETTES[(i * 3 + Math.floor(i / 10) * 5) % PALETTES.length];
    const body = KINDS[kind](palette, i);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * 3}" height="${H * 3}">${body}</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const CARD_IMAGES: string[] = Array.from({ length: 20 }, (_, i) => svgFor(i));

export const cardLabel = (i: number) => CARD_LABELS[i % CARD_LABELS.length];

// Proje vitrini için tekil mockup
export const mockup = (kind: "site" | "mobile" | "rank" | "chart", paletteIndex: number, variant = 0) => {
    const fn = { site, mobile, rank, chart }[kind];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * 3}" height="${H * 3}">${fn(PALETTES[paletteIndex % PALETTES.length], variant)}</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
