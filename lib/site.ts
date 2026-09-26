// Sitenin tüm metin ve iletişim bilgileri tek yerde. Değiştirmek için burayı düzenleyin.
export const SITE = {
    name: "İlkol Dijital",
    slogan: "İlk ol.",
    url: "https://ilkoldijital.com",
    email: "info@ilkoldijital.com",
    phone: "+905345209005",
    phoneDisplay: "0534 520 90 05",
    description:
        "İlkol Dijital; hızlı açılan, net konuşan web siteleri tasarlar ve SEO ile Google Ads çalışmalarıyla markaları arama sonuçlarında üst sıralara taşır.",
};

// Ana çağrı her yerde aynı: WhatsApp; ikincisi arama.
export const CONTACT = {
    tel: `tel:${SITE.phone}`,
    whatsapp: `https://wa.me/${SITE.phone.replace("+", "")}?text=${encodeURIComponent("Merhaba, web sitem hakkında görüşmek istiyorum.")}`,
    whatsappLabel: "WhatsApp'tan yazın",
    callLabel: "Hemen arayın",
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
        desc: "İlk izlenim sitenizde başlar. Telefonda da bilgisayarda da hızlı açılan, ziyaretçiyi aramaya ya da yazmaya yönlendiren sayfalar.",
        tags: ["Özgün tasarım", "Mobil uyum", "Hız optimizasyonu"],
    },
    {
        name: "E-Ticaret",
        desc: "Dükkânınız kapansa da vitrininiz açık kalsın. Ürünlerinizi düzenli sergileyen, siparişe ya da teklife hazır mağazalar.",
        tags: ["WooCommerce", "Ürün kataloğu", "Ödeme altyapısı"],
    },
    {
        name: "SEO",
        desc: "Müşteriniz “yakınımdaki boya bayisi” yazdığında karşısına rakibiniz değil, siz çıkın.",
        tags: ["Teknik SEO", "Yerel SEO", "İçerik planı"],
    },
    {
        name: "Google Ads",
        desc: "Bütçeniz tıklamaya değil, müşteriye harcansın. Hangi liranın ne getirdiğini her ay sade bir raporla görürsünüz.",
        tags: ["Kampanya kurulumu", "Dönüşüm takibi", "Aylık rapor"],
    },
    {
        name: "Bakım ve Destek",
        desc: "Yayından sonra da buradayız. Güncelleme, yedek ve küçük düzenlemeler bizde; siz işinize bakın.",
        tags: ["Güncelleme", "Yedekleme", "Hızlı düzenleme"],
    },
];

export const STEPS = [
    { title: "Dinle", desc: "İşinizi, müşterinizi ve rakiplerinizi tanırız. Neyin başarı sayılacağını en baştan birlikte yazarız." },
    { title: "Tasarla", desc: "Gereksiz her şeyi çıkarırız. Yayına almadan önce tasarımı görür, onaylarsınız." },
    { title: "Yayınla", desc: "Hızlı, mobil uyumlu ve Google'a hazır şekilde canlıya alırız. İlk günden ölçmeye başlarız." },
    { title: "Yükselt", desc: "SEO ve reklamla sitenizi üst sıralara taşırız. Neyin işe yaradığını rakamlarla görürsünüz." },
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
        desc: "Oto tamir ve sanayi boyası bayisinin ürünlerini WordPress ve WooCommerce üzerinde tek katalogda topladık. Usta, aradığı markayı ve ürünü birkaç dokunuşla buluyor.",
        url: "https://dostlarboya.com.tr",
        domain: "dostlarboya.com.tr",
        bg: "#FFE9DC",
        cards: [["site", 1], ["mobile", 1], ["site", 9]],
    },
    {
        client: "Palmiye Baca",
        kind: "Google Ads · Arama görünürlüğü",
        desc: "Google'da baca arayan kişinin karşısına Palmiye Baca'yı çıkaran kampanyalar. Bütçe, gerçekten ihtiyacı olan kişilere harcanıyor.",
        url: "https://baca.com.tr",
        domain: "baca.com.tr",
        bg: "#DDE3FF",
        cards: [["chart", 0], ["site", 8], ["rank", 0]],
    },
];
