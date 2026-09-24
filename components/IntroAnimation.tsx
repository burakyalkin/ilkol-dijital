"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { CARD_IMAGES, cardLabel } from "@/lib/cards";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, index, target }: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Ön yüz */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-white"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${cardLabel(index)} çalışması`} className="h-full w-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Arka yüz */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-ink flex flex-col items-center justify-center p-2"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
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
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 1600; // Sanal kaydırma aralığı
const MORPH_END = 500; // Çember → yay dönüşümünün bittiği nokta
const IMAGES = CARD_IMAGES;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation({ nextSectionId = "yaklasim" }: { nextSectionId?: string }) {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
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

        const shouldCapture = (deltaY: number) => {
            const heroAtTop = container.getBoundingClientRect().top >= -1;
            if (!heroAtTop) return false;
            if (deltaY > 0 && scrollRef.current >= MAX_SCROLL) return false;
            if (deltaY < 0 && scrollRef.current <= 0) return false;
            return true;
        };

        const apply = (deltaY: number) => {
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
        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph: 0 (çember) → 1 (alt yay)
    const morphProgress = useTransform(virtualScroll, [0, MORPH_END], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Yay üzerinde kaydırma (karıştırma)
    const scrollRotate = useTransform(virtualScroll, [MORPH_END, MAX_SCROLL], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

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
            const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setIntroPhase("circle");
            return;
        }
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(
        () =>
            IMAGES.map(() => ({
                x: (Math.random() - 0.5) * 1500,
                y: (Math.random() - 0.5) * 1000,
                rotation: (Math.random() - 0.5) * 180,
                scale: 0.6,
                opacity: 0,
            })),
        []
    );

    // --- Render Loop ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const a = smoothMorph.on("change", setMorphValue);
        const b = smoothScrollRotate.on("change", setRotateValue);
        const c = smoothMouseX.on("change", setParallaxValue);
        return () => {
            a();
            b();
            c();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);
    const contentPointer = useTransform(smoothMorph, (v: number) => (v > 0.85 ? "auto" : "none"));

    const skip = () => {
        scrollRef.current = MAX_SCROLL;
        virtualScroll.set(MAX_SCROLL);
        document.getElementById(nextSectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div ref={containerRef} className="hero relative w-full overflow-hidden bg-paper" aria-label="İlkol Dijital tanıtım animasyonu">
            <div className="flex h-full w-full flex-col items-center justify-center" style={{ perspective: 1000 }}>
                {/* Giriş metni (kaybolur) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={
                            introPhase === "circle" && morphValue < 0.5
                                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                                : { opacity: 0, filter: "blur(10px)" }
                        }
                        transition={{ duration: 1 }}
                        className="font-display text-[26px] font-semibold tracking-[-0.03em] text-ink md:text-[44px] leading-[1.05]"
                    >
                        Sade tasarla,
                        <br />
                        <span className="text-cobalt">zirveye taşı.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.6 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-5 font-mono text-[11px] font-medium tracking-[0.2em] text-muted"
                    >
                        KAYDIRARAK KEŞFEDİN
                    </motion.p>
                </div>

                {/* Yay aktifken görünen içerik */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY, pointerEvents: contentPointer }}
                    className="absolute top-[15%] md:top-[14%] z-10 flex flex-col items-center justify-center text-center px-4"
                >
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-cobalt mb-4">
                        İlkol Dijital · Yaratıcı ve sade
                    </p>
                    <h2 className="font-display text-[34px] md:text-[64px] font-semibold text-ink tracking-[-0.04em] leading-[1] mb-5">
                        Markanızı üste taşıyoruz.
                    </h2>
                    <p className="text-[15px] md:text-[17px] text-muted max-w-[34rem] leading-relaxed">
                        Hızlı açılan, net konuşan siteler tasarlıyor; onları Google&apos;da bulunur hale getiriyoruz.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        <a href="#iletisim" className="btn btn--cobalt">
                            Teklif alın
                        </a>
                        <a href="#isler" className="btn btn--ghost">
                            İşlerimizi görün
                        </a>
                    </div>
                </motion.div>

                {/* Kartlar */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 70;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // A. Çember
                            const circleRadius = Math.min(minDimension * 0.35, 350);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // B. Alt yay (gökkuşağı)
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.2 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;
                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - spreadAngle / 2;
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.35; // yay ekrandan tamamen çıkmasın
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + i * step + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                            };

                            // C. Ara değer
                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard key={i} src={src} index={i} total={TOTAL_IMAGES} phase={introPhase} target={target} />
                        );
                    })}
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
