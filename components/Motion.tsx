"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// Bölümlerde kullanılan sade kaydırma efektleri. Hepsi bir kez oynar;
// "hareketi azalt" ayarı açıkken içerik doğrudan görünür.

const EASE = [0.2, 0.8, 0.2, 1] as const;

type RevealProps = {
    as?: "div" | "li" | "article";
    className?: string;
    delay?: number;
    y?: number;
    children: React.ReactNode;
};

/** Ekrana girince aşağıdan yukarı belirir. */
export function Reveal({ as = "div", className, delay = 0, y = 24, children }: RevealProps) {
    const reduce = useReducedMotion();
    const Tag = motion[as];
    if (reduce) return <Tag className={className}>{children}</Tag>;
    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay }}
        >
            {children}
        </Tag>
    );
}

/** keep: parça bölünmeden tek blok olarak kalır (satır sonunda ikiye ayrılmaz). */
export type Segment = { text: string; className?: string; keep?: boolean };

const toWords = (segments: Segment[]) =>
    segments.flatMap((s) =>
        s.keep ? [{ w: s.text, className: s.className }] : s.text.split(" ").filter(Boolean).map((w) => ({ w, className: s.className }))
    );

function ScrollWord({ progress, range, className, children }: { progress: MotionValue<number>; range: [number, number]; className?: string; children: string }) {
    const opacity = useTransform(progress, range, [0.16, 1]);
    return (
        <motion.span className={className} style={{ opacity }}>
            {children}{" "}
        </motion.span>
    );
}

/** Kaydırdıkça kelime kelime dolan cümle (manifesto). */
export function ScrollWords({ segments }: { segments: Segment[] }) {
    const ref = useRef<HTMLSpanElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
    const words = toWords(segments);

    if (reduce) {
        return (
            <span ref={ref}>
                {words.map(({ w, className }, i) => (
                    <span key={i} className={className}>
                        {w}{" "}
                    </span>
                ))}
            </span>
        );
    }
    return (
        <span ref={ref}>
            {words.map(({ w, className }, i) => (
                <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} className={className}>
                    {w}
                </ScrollWord>
            ))}
        </span>
    );
}

/** Ekrana girince kelimeleri sırayla yukarı kaldırır (dev başlıklar). */
export function RiseWords({ segments }: { segments: Segment[] }) {
    const reduce = useReducedMotion();
    const words = toWords(segments);
    return (
        <motion.span
            initial={reduce ? false : "hidden"}
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07 } } }}
        >
            {words.map(({ w, className }, i) => (
                <Fragment key={i}>
                    <span className="rise">
                        <motion.span
                            className={className}
                            style={{ display: "inline-block", whiteSpace: "nowrap" }}
                            variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
                            transition={{ duration: 0.7, ease: EASE }}
                        >
                            {w}
                        </motion.span>
                    </span>{" "}
                </Fragment>
            ))}
        </motion.span>
    );
}
