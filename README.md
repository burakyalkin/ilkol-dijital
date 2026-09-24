# İlkol Dijital — web sitesi

**Slogan:** Sade tasarla, zirveye taşı.

Next.js 15 (App Router) + Tailwind CSS v4 + framer-motion. Tek sayfa: hero animasyonu, Yaklaşım, Hizmetler, Süreç, İşler, İletişim.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Yayına alma (önerilen: Vercel)

1. Klasörü bir GitHub deposuna yükleyin.
2. vercel.com → "Add New Project" → depoyu seçin → Deploy (ayar gerekmez).
3. Project → Settings → Domains → `ilkoldijital.com` ve `ilkoldijital.com.tr` ekleyin.
   Vercel'in verdiği DNS kayıtlarını (A: 76.76.21.21, `www` için CNAME) alan adı panelinize girin.
   `.com.tr`'yi `.com`'a yönlendirme (redirect) olarak ayarlayın.

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
