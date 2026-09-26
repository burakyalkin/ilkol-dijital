"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
    motion,
    animate,
    useTransform,
    useSpring,
    useMotionValue,
    useMotionTemplate,
    type MotionValue,
    type AnimationPlaybackControls,
} from "framer-motion";
import { CARD_IMAGES, cardLabel } from "@/lib/cards";
import { CONTACT } from "@/lib/site";
import { ChatIcon, PhoneIcon } from "./Icons";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

type Target = { x: number; y: number; rotation: number; scale: number; opacity: number };
type Size = { width: number; height: number };
type Drivers = { morph: MotionValue<number>; rotate: MotionValue<number>; mouse: MotionValue<number> };

// --- Sabitler ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 1600; // Sanal kaydırma aralığı
const MORPH_END = 500; // Çember → yay dönüşümünün bittiği nokta
const IMAGES = CARD_IMAGES;
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Giriş gösterisi yavaş ve süzülerek; sonrasında kaydırmaya çabuk tepki versin.
const INTRO_SPRING = { type: "spring", stiffness: 40, damping: 15 } as const;
const SCROLL_SPRING = { type: "spring", stiffness: 140, damping: 24 } as const;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
/** 0–1 arası, (i, k) için her zaman aynı sonucu veren sözde-rastgele sayı. */
const seeded = (i: number, k: number) => {
    const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
    return v - Math.floor(v);
};

/** Bir kartın o anki aşamaya ve kaydırma değerlerine göre hedef konumu. */
function computeTarget(i: number, phase: AnimationPhase, size: Size, scatter: Target, morph: number, rotate: number, parallax: number): Target {
    if (phase === "scatter") return scatter;
    if (phase === "line") {
        const lineSpacing = 70;
        return { x: i * lineSpacing - (TOTAL_IMAGES * lineSpacing) / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
    }

    const isMobile = size.width < 768;
    const minDimension = Math.min(size.width, size.height);

    // A. Çember
    const circleRadius = Math.min(minDimension * 0.35, 350);
    const circleAngle = (i / TOTAL_IMAGES) * 360;
    const circleRad = (circleAngle * Math.PI) / 180;

    // B. Alt yay (gökkuşağı)
    const baseRadius = Math.min(size.width, size.height * 1.5);
    const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
    const arcCenterY = size.height * (isMobile ? 0.2 : 0.25) + arcRadius;
    const spreadAngle = isMobile ? 100 : 130;
    const step = spreadAngle / (TOTAL_IMAGES - 1);
    const boundedRotation = -clamp01(rotate / 360) * spreadAngle * 0.35; // yay ekrandan tamamen çıkmasın
    const arcAngle = -90 - spreadAngle / 2 + i * step + boundedRotation;
    const arcRad = (arcAngle * Math.PI) / 180;

    // C. Ara değer
    return {
        x: lerp(Math.cos(circleRad) * circleRadius, Math.cos(arcRad) * arcRadius + parallax, morph),
        y: lerp(Math.sin(circleRad) * circleRadius, Math.sin(arcRad) * arcRadius + arcCenterY, morph),
        rotation: lerp(circleAngle + 90, arcAngle + 90, morph),
        scale: lerp(1, isMobile ? 1.4 : 1.8, morph),
        opacity: 1,
    };
}

// --- FlipCard ---
// Konum React render'ı yerine motion value'larla güncellenir: kaydırırken ve fare
// gezinirken 20 kart her karede yeniden render edilmez.
function FlipCard({
    src,
    index,
    phase,
    settled,
    instant,
    canHover,
    size,
    scatter,
    drivers,
}: {
    src: string;
    index: number;
    phase: AnimationPhase;
    settled: boolean;
    instant: boolean;
    canHover: boolean;
    size: Size;
    scatter: Target;
    drivers: Drivers;
}) {
    const x = useMotionValue(scatter.x);
    const y = useMotionValue(scatter.y);
    const rotation = useMotionValue(scatter.rotation);
    const scale = useMotionValue(scatter.scale);
    const opacity = useMotionValue(scatter.opacity);
    const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;

    useEffect(() => {
        const pairs = () => {
            const t = computeTarget(index, phase, size, scatter, drivers.morph.get(), drivers.rotate.get(), drivers.mouse.get());
            return [
                [x, t.x],
                [y, t.y],
                [rotation, t.rotation],
                [scale, t.scale],
                [opacity, t.opacity],
            ] as const;
        };
        let controls: AnimationPlaybackControls[] = [];
        const stop = () => controls.forEach((c) => c.stop());
        const jump = () => {
            stop();
            pairs().forEach(([mv, v]) => mv.set(v));
        };
        const glide = () => {
            stop();
            controls = pairs().map(([mv, v]) => animate(mv, v, settled ? SCROLL_SPRING : INTRO_SPRING));
        };

        if (instant) jump();
        else glide();
        if (phase !== "circle") return stop;

        // Kaydırma değerleri zaten yayla yumuşatılmış; oturduktan sonra doğrudan uygula.
        const onChange = settled || instant ? jump : glide;
        const unsubs = [drivers.morph.on("change", onChange), drivers.rotate.on("change", onChange), drivers.mouse.on("change", onChange)];
        return () => {
            unsubs.forEach((u) => u());
            stop();
        };
    }, [index, phase, settled, instant, size, scatter, drivers, x, y, rotation, scale, opacity]);

    return (
        <motion.div
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transform,
                opacity,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                // Dokunmatikte hover taklidi kartı ters çevirip bırakıyordu; sadece fareyle döner.
                whileHover={canHover ? { rotateY: 180 } : undefined}
            >
                {/* Ön yüz: dekoratif, ekran okuyucu atlar */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-white"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Arka yüz */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-ink flex flex-col items-center justify-center p-2"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    aria-hidden="true"
                >
                    <div className="text-center">
                        <p className="font-mono text-[6px] font-medium text-[#8e9cff] uppercase tracking-[0.14em] mb-1">
                            {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="font-display text-[9px] leading-tight font-semibold text-white">{cardLabel(index)}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
export default function IntroAnimation({ nextSectionId = "yaklasim" }: { nextSectionId?: string }) {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [settled, setSettled] = useState(false);
    const [reduce, setReduce] = useState(false);
    const [canHover, setCanHover] = useState(false);
    const [containerSize, setContainerSize] = useState<Size>({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
            }
        });
        observer.observe(containerRef.current);
        setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    // Hero ekranın tepesindeyken tekerlek/dokunma hareketini animasyona yönlendirir.
    // Animasyon sonuna gelince (veya başa dönünce) sayfa normal şekilde kaymaya devam eder.
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Sayfanın aşağısına inildi mi? Geri dönüşte yayın turunu tekrar sardırmamak için.
        let away = false;
        const handleScroll = () => {
            if (container.getBoundingClientRect().top < -1) away = true;
        };

        const shouldCapture = (deltaY: number) => {
            const heroAtTop = container.getBoundingClientRect().top >= -1;
            if (!heroAtTop) return false;
            if (deltaY > 0 && scrollRef.current >= MAX_SCROLL) return false;
            if (deltaY < 0 && scrollRef.current <= 0) return false;
            return true;
        };

        const apply = (rawDelta: number) => {
            let deltaY = rawDelta;
            if (deltaY < 0) {
                // Aşağıdan dönünce doğrudan yay → çember aşamasından başla; yukarı yön biraz daha hızlı.
                // Yayın dönüşü kendi yayıyla (≈0,3 sn) sıfıra süzülür.
                if (away && scrollRef.current > MORPH_END) scrollRef.current = MORPH_END;
                deltaY *= 1.5;
            }
            away = false;
            const next = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = next;
            virtualScroll.set(next);
        };

        const handleWheel = (e: WheelEvent) => {
            if (!shouldCapture(e.deltaY)) return;
            e.preventDefault();
            apply(e.deltaY);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = (touchStartY - touchY) * 1.6;
            touchStartY = touchY;
            if (!shouldCapture(deltaY)) return;
            e.preventDefault();
            apply(deltaY);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph: 0 (çember) → 1 (alt yay)
    const morphProgress = useTransform(virtualScroll, [0, MORPH_END], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 110, damping: 24 });

    // 2. Yay üzerinde kaydırma (karıştırma)
    const scrollRotate = useTransform(virtualScroll, [MORPH_END, MAX_SCROLL], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 110, damping: 24 });

    // Alt ilerleme çubuğu
    const progress = useTransform(virtualScroll, [0, MAX_SCROLL], [0, 1]);

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX.set((((e.clientX - rect.left) / rect.width) * 2 - 1) * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setReduce(true);
            setIntroPhase("circle");
            setSettled(true);
            return;
        }
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        const timer3 = setTimeout(() => setSettled(true), 4500); // çember oturduktan sonra
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    // --- Scatter Positions ---
    // Kart başına sabit sözde-rastgele değerler: sunucu ve tarayıcı aynı HTML'i üretir (hydration uyuşmazlığı olmaz).
    const scatterPositions = useMemo<Target[]>(
        () =>
            IMAGES.map((_, i) => ({
                x: Math.round((seeded(i, 1) - 0.5) * 1500),
                y: Math.round((seeded(i, 2) - 0.5) * 1000),
                rotation: Math.round((seeded(i, 3) - 0.5) * 180),
                scale: 0.6,
                opacity: 0,
            })),
        []
    );

    const drivers = useMemo<Drivers>(
        () => ({ morph: smoothMorph, rotate: smoothScrollRotate, mouse: smoothMouseX }),
        [smoothMorph, smoothScrollRotate, smoothMouseX]
    );

    // --- Kaydırmaya doğrudan bağlı görünürlükler (gecikmeli geçiş yok, kaydırmayı anında izler) ---
    const introOpacity = useTransform(smoothMorph, [0, 0.5], [1, 0]);
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentTransform = useTransform(smoothMorph, (v: number) => `translateY(${(1 - clamp01((v - 0.8) / 0.2)) * 20}px)`);
    const contentPointer = useTransform(smoothMorph, (v: number) => (v > 0.85 ? "auto" : "none"));
    const underlineTransform = useTransform(smoothMorph, (v: number) => `scaleX(${clamp01((v - 0.9) / 0.1)})`);

    const inCircle = introPhase === "circle";
    const introIn = (delay: number) => ({
        initial: { opacity: 0, transform: "translateY(16px)", filter: "blur(8px)" },
        animate: inCircle ? { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" } : undefined,
        transition: { duration: reduce ? 0 : 0.9, ease: EASE_OUT, delay: reduce ? 0 : delay },
    });

    const skip = () => {
        scrollRef.current = MAX_SCROLL;
        virtualScroll.set(MAX_SCROLL);
        document.getElementById(nextSectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div ref={containerRef} className="hero relative w-full overflow-hidden bg-paper" aria-label="İlkol Dijital tanıtım animasyonu">
            <div className="flex h-full w-full flex-col items-center justify-center" style={{ perspective: 1000 }}>
                {/* Giriş metni: bir kez belirir, sonra kaydırmayla birlikte söner */}
                <motion.div
                    style={{ opacity: introOpacity }}
                    className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4"
                >
                    <motion.h1
                        {...introIn(0)}
                        className="font-display text-[52px] font-bold tracking-[-0.06em] text-ink md:text-[128px] leading-[0.9]"
                    >
                        İlk ol<span className="text-cobalt">.</span>
                    </motion.h1>
                    <motion.p
                        {...introIn(0.35)}
                        className="mt-3 md:mt-4 font-display text-[14px] md:text-[21px] font-medium tracking-[-0.02em] text-muted leading-snug"
                    >
                        Rakibiniz daha çok harcar. <span className="block text-ink">Siz daha üstte çıkarsınız.</span>
                    </motion.p>
                    <motion.p
                        {...introIn(0.7)}
                        className="hidden md:block mt-6 font-mono text-[11px] font-medium tracking-[0.2em] text-muted/60"
                    >
                        KAYDIRARAK KEŞFEDİN
                    </motion.p>
                </motion.div>

                {/* Yay aktifken görünen içerik */}
                <motion.div
                    style={{ opacity: contentOpacity, transform: contentTransform, pointerEvents: contentPointer }}
                    className="absolute top-[15%] md:top-[14%] z-10 flex flex-col items-center justify-center text-center px-4"
                >
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-cobalt mb-4">
                        İlkol Dijital · Yaratıcı ve sade
                    </p>
                    <h2 className="font-display text-[32px] md:text-[60px] font-semibold text-ink tracking-[-0.04em] leading-[1.02] mb-5">
                        Müşteriniz sizi arıyor.
                        <br />
                        <span className="hero__mark text-cobalt">
                            Rakibinizi mi buluyor?
                            <motion.span className="hero__underline" aria-hidden="true" style={{ transform: underlineTransform }} />
                        </span>
                    </h2>
                    <p className="text-[15px] md:text-[17px] text-muted max-w-[36rem] leading-relaxed">
                        Hızlı açılan, net konuşan bir site kuruyor; onu Google&apos;da üst sıralara taşıyoruz. Tasarımdan reklama tek ekip.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        <a href={CONTACT.whatsapp} className="btn btn--cobalt" target="_blank" rel="noopener noreferrer">
                            <ChatIcon />
                            {CONTACT.whatsappLabel}
                        </a>
                        <a href={CONTACT.tel} className="btn btn--ghost">
                            <PhoneIcon />
                            {CONTACT.callLabel}
                        </a>
                    </div>
                </motion.div>

                {/* Kartlar */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => (
                        <FlipCard
                            key={i}
                            src={src}
                            index={i}
                            phase={introPhase}
                            settled={settled}
                            instant={reduce}
                            canHover={canHover}
                            size={containerSize}
                            scatter={scatterPositions[i]}
                            drivers={drivers}
                        />
                    ))}
                </div>
            </div>

            {/* İlerleme + atla */}
            <div className="hero__progress">
                <div className="hero__track" aria-hidden="true">
                    <motion.div className="hero__fill" style={{ scaleX: progress }} />
                </div>
                <button type="button" className="hero__skip" onClick={skip}>
                    Geç
                    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 1v10M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
