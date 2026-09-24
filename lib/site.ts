// Sitenin tüm metin ve iletişim bilgileri tek yerde. Değiştirmek için burayı düzenleyin.
export const SITE = {
    name: "İlkol Dijital",
    slogan: "Sade tasarla, zirveye taşı.",
    url: "https://ilkoldijital.com",
    email: "info@ilkoldijital.com",
    description:
        "İlkol Dijital; hızlı açılan, net konuşan web siteleri tasarlar ve SEO ile Google Ads çalışmalarıyla markaları arama sonuçlarında üst sıralara taşır.",
};

export const NAV = [
    { href: "#yaklasim", label: "Yaklaşım" },
    { href: "#hizmetler", label: "Hizmetler" },
    { href: "#surec", label: "Süreç" },
    { href: "#isler", label: "İşler" },
];

export const SERVICES = [
    {
        name: "Web Tasarım",
        desc: "Kurumsal siteler ve açılış sayfaları. Markanıza özel tasarlanır, her ekranda hızlı ve düzgün açılır.",
        tags: ["Özgün tasarım", "Mobil uyum", "Hız optimizasyonu"],
    },
    {
        name: "E-Ticaret",
        desc: "Ürünlerinizi düzenli bir katalogda sergileyen, satışa ya da teklif almaya hazır mağazalar.",
        tags: ["WooCommerce", "Ürün kataloğu", "Ödeme altyapısı"],
    },
    {
        name: "SEO",
        desc: "Müşterinizin Google'da yazdığı aramalarda sitenizin ilk sayfada, üst sıralarda görünmesi için çalışırız.",
        tags: ["Teknik SEO", "Yerel SEO", "İçerik planı"],
    },
    {
        name: "Google Ads",
        desc: "Bütçenizi doğru aramalara harcayan kampanyalar. Hangi tıklamanın müşteriye dönüştüğünü birlikte izleriz.",
        tags: ["Kampanya kurulumu", "Dönüşüm takibi", "Aylık rapor"],
    },
    {
        name: "Bakım ve Destek",
        desc: "Site yayına girdikten sonra da yanınızdayız. Güncellemeler, yedekler ve küçük düzenlemeler bizde.",
        tags: ["Güncelleme", "Yedekleme", "Hızlı düzenleme"],
    },
];

export const STEPS = [
    { title: "Dinle", desc: "İşinizi, müşterinizi ve rakiplerinizi tanırız. Hedefi birlikte netleştiririz." },
    { title: "Tasarla", desc: "Gereksiz her şeyi çıkarır, markanıza ait sade bir tasarım kurarız." },
    { title: "Yayınla", desc: "Hızlı, mobil uyumlu ve arama motorlarına hazır şekilde siteyi canlıya alırız." },
    { title: "Yükselt", desc: "SEO ve reklamla sitenizi üst sıralara taşır, sonuçları düzenli raporlarız." },
];

export type MockKind = "site" | "mobile" | "rank" | "chart";

export type Work = {
    client: string;
    kind: string;
    desc: string;
    url: string;
    domain: string;
    bg: string;
    cards: ReadonlyArray<readonly [MockKind, number]>;
};

export const WORKS: Work[] = [
    {
        client: "Dostlar Boya",
        kind: "E-ticaret · Katalog sitesi",
        desc: "Oto tamir ve sanayi boyası bayisi için WordPress ve WooCommerce üzerinde kurulan ürün kataloğu. Ziyaretçi aradığı markayı ve ürünü birkaç tıklamada buluyor.",
        url: "https://dostlarboya.com.tr",
        domain: "dostlarboya.com.tr",
        bg: "#FFE9DC",
        cards: [["site", 1], ["mobile", 1], ["site", 9]],
    },
    {
        client: "Palmiye Baca",
        kind: "Google Ads · Arama görünürlüğü",
        desc: "Baca ürünleri ve hizmetleri için Google Ads kampanyaları ve arama sonuçlarında üst sıra hedefli çalışma.",
        url: "https://baca.com.tr",
        domain: "baca.com.tr",
        bg: "#DDE3FF",
        cards: [["chart", 0], ["site", 8], ["rank", 0]],
    },
];
