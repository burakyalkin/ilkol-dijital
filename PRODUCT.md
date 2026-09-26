# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Türkiye'deki yerel KOBİ'ler ve esnaf: bayiler, servisler, üreticiler (örnek: oto boya bayisi, baca firması). İşletme sahibi genellikle teknik değil; derdi "Google'da rakibim çıkıyor, telefon çalmıyor". Siteye çoğunlukla telefondan, iş arasında bakıyor ve kısa sürede "bu ekip işimi yapar mı?" kararını veriyor.

## Product Purpose

İlkol Dijital'in tanıtım sitesi. Ajansın hizmetlerini (web tasarım, e-ticaret, SEO, Google Ads, bakım) anlatır ve ziyaretçiyi iletişime geçirir. Başarı: ziyaretçinin **telefonla aramasıdır ya da WhatsApp'tan yazmasıdır**. Telefon ve WhatsApp: 0534 520 90 05 (`lib/site.ts`). Ana çağrı her yerde "WhatsApp'tan yazın", ikincisi "Hemen arayın"; e-posta (`info@ilkoldijital.com`) ikincil alternatif.

## Positioning

Tasarımdan yayına, SEO'dan reklama kadar tek küçük ekip: "Siteyi kurmak işin yarısı, diğer yarısı bulunmak." Marka adı da iddiayı taşır: *İlkol* = "ilk ol" (aramada ilk sırada, akılda ilk). Reklam bütçesini verimli kullanmak vurgusu: "Rakibiniz daha çok harcar. Siz daha üstte çıkarsınız."

## Operating Context

- 2–5 kişilik küçük ekip; sitede "biz" dili kullanılır.
- Tek sayfalık site: Hero (kart animasyonu), Yaklaşım, Hizmetler, Süreç, İşler, İletişim.
- Next.js 15 statik çıktı, Cloudflare Pages'te barınır; GitHub `main` dalına her gönderim otomatik yayına girer.
- Alan adları: ilkoldijital.com (ana), ilkoldijital.com.tr (301 ile ana adrese yönlenir).

## Capabilities and Constraints

- Hizmetler: Web Tasarım, E-Ticaret (WooCommerce), SEO, Google Ads, Bakım ve Destek.
- Metin ve iletişim bilgileri tek yerde: `lib/site.ts`.
- Açık kararlar: fiyatlandırma, proje süreleri, SSS cevapları (sahiplik, süre, fiyat) henüz belirlenmedi.
- Google Ads da satıldığı için metinler reklamı küçümsememeli.

## Brand Commitments

- Ad: İlkol Dijital; logo `ilkol.` (kobalt nokta).
- Slogan: "İlk ol." Alt satır: "Rakibiniz daha çok harcar. Siz daha üstte çıkarsınız."
- Motto: "Yaratıcı ve sade."
- Dil: Türkçe, sade, müşterinin kendi derdiyle konuşan; abartı ve uydurma iddia yok.

## Evidence on Hand

- Referanslar: Dostlar Boya (dostlarboya.com.tr, WordPress/WooCommerce katalog), Palmiye Baca (baca.com.tr, Google Ads).
- Proje görselleri henüz yok; kartlar kodla üretilmiş SVG mockup'lar (`lib/cards.ts`).
- **Yok, uydurulmamalı:** sonuç rakamları, müşteri yorumları, ödüller, müşteri sayısı, garanti sıralama iddiaları.

## Product Principles

1. Müşterinin derdiyle konuş, ajansın işiyle değil.
2. Her iddia gerçek bir kanıta ya da somut bir süreç adımına dayansın.
3. Telefonda, iş arasında bir bakışta anlaşılsın.
4. İletişime geçmek tek dokunuş kadar kolay olsun.
