# İlkol Dijital — web sitesi

**Slogan:** İlk ol. (Alt satır: Rakibiniz daha çok harcar. Siz daha üstte çıkarsınız.)

Next.js 15 (App Router) + Tailwind CSS v4 + framer-motion. Tek sayfa: hero animasyonu, Yaklaşım, Hizmetler, Süreç, İşler, İletişim.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Yayına alma (Cloudflare Pages — ticari kullanım ücretsiz)

Site tamamen statik (`next.config.mjs` → `output: "export"`), derleme sonunda dosyalar `out/` klasörüne çıkar.

1. Proje GitHub'da olsun.
2. dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git** → depoyu seç.
3. Ayarlar: Framework preset **None** (ya da Next.js (Static HTML Export)), Build command `npm run build`, Build output directory `out`.
   Environment variables: `NODE_VERSION` = `22`.
4. **Save and Deploy**. Site `xxx.pages.dev` adresinde açılır.
5. Proje → **Custom domains** → `ilkoldijital.com` ve `www.ilkoldijital.com` ekle; Cloudflare'in istediği DNS kayıtlarını gir.
6. `.com.tr` adresleri için Cloudflare'de **Redirect Rules** (301) ile `https://ilkoldijital.com` adresine yönlendirme.

Not: Vercel'in ücretsiz Hobby planı yalnızca kişisel/ticari olmayan kullanım içindir.

## Düzenleme

| Ne | Nerede |
|---|---|
| E-posta, slogan, açıklama | `lib/site.ts` → `SITE` |
| Hizmetler, süreç adımları, referans işler | `lib/site.ts` |
| Renkler, yazı tipleri, bölüm stilleri | `app/globals.css` (en üstteki `:root`) |
| Hero animasyonu | `components/IntroAnimation.tsx` |
| Kart görselleri | `lib/cards.ts` — kodla üretilen SVG'ler. Gerçek proje görselleri hazır olunca `CARD_IMAGES` dizisini `/public` içindeki dosya yollarıyla değiştirin (20 adet, dikey 60:85 oran). |

## Hero'da orijinal bileşene göre yapılan değişiklikler

- Sayfa hero'da kilitlenmesin diye: animasyon sonuna gelince tekerlek/dokunma sayfayı normal kaydırır, yukarı dönünce animasyon geri sarar.
- Sanal kaydırma aralığı 3000 → 1600 (daha az tekerlek çevirmesiyle biter), yay kayması %80 → %35 (kartlar ekrandan tamamen çıkmıyor).
- Mobilde yay biraz yukarı alındı (0.35 → 0.2), metinle kartlar arasında boşluk kalmasın diye.
- "Geç" düğmesi ve ilerleme çizgisi eklendi; `prefers-reduced-motion` açıkken giriş animasyonu atlanır.
- Dış görsel bağlantıları (21st.dev CDN) kaldırıldı, kartlar kendi SVG'lerimiz.
