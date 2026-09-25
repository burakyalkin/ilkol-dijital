/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Site tamamen statik: `npm run build` sonunda yayına hazır dosyalar `out/` klasörüne çıkar.
  // Cloudflare Pages, Netlify ve Vercel'de aynı şekilde çalışır.
  output: "export",
  images: { unoptimized: true },
};
export default nextConfig;
