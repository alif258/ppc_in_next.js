"use client";
import React, { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Container from "./Container";

const steps = [
  {
    id: 1,
    title: "Discovery Targeting",
    description:
      "Every profitable growth journey begins with discovery. Using AI-powered analysis, broad match, automatic campaigns, and category targeting, we uncover how shoppers search, compare, and explore your category. This reveals hidden demand, untapped traffic, and new growth opportunities your competitors haven't captured yet.",
    image: "/Discovery-Targeting.webp",
  },
  {
    id: 2,
    title: "Intent Targeting",
    description:
      "Once new opportunities are identified, we focus on shoppers with proven buying intent. Through phrase match targeting, competitor ASIN conquesting, and high-intent keyword targeting, we capture shoppers actively comparing and ready to purchase — turning interest into conversions.",
    image: "/Intent-Targeting.webp",
  },
  {
    id: 3,
    title: "Ranking Targeting",
    description:
      "With consistent conversion data, the next step is strengthening your market position. Using exact match targeting and proven converting search terms, we increase sales velocity, improve keyword dominance, and accelerate your organic ranking on Amazon.",
    image: "/Ranking-Targeting.webp",
  },
  {
    id: 4,
    title: "Defensive Targeting",
    description:
      "As your visibility and rank grow, protecting your position becomes essential. Our data-driven defensive targeting secures your brand by targeting your own ASINs, protecting branded keywords, and preventing competitors from stealing your traffic and customers.",
    image: "/Defensive-Targeting.webp",
  },
  {
    id: 5,
    title: "Scale & Retargeting",
    description:
      "We scale what's already profitable and re-engage shoppers who showed intent but didn't convert. Through high-intent audience targeting, product view retargeting, purchase-based retargeting, and cart abandonment recovery, we expand revenue without sacrificing efficiency.",
    image: "/Scale-Retargeting.webp",
  },
];

const TOTAL = steps.length;

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}
function mapRange(v: number, a: number, b: number, c: number, d: number) {
  return c + (d - c) * clamp((v - a) / (b - a), 0, 1);
}

// ─── DESKTOP COMPONENTS (unchanged) ─────────────────────────────────────────

function StepImage({ scrollYProgress, step, index, total }: any) {
  const [visible, setVisible] = React.useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    const start = index / total;
    const end = (index + 1) / total;
    setVisible(latest >= start && latest < end);
  });
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}
    >
      <img src={step.image} className="w-full h-full object-contain" alt={step.title} />
    </div>
  );
}

function StepText({ scrollYProgress, step, index, total }: any) {
  const start = index / total;
  const end = (index + 1) / total;
  const y = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [250, 0, 0, -200]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  return (
    <motion.div style={{ y, opacity }} className="absolute inset-0 flex flex-col justify-center">
      <h3 className="font-serif text-[clamp(18px,3.4vw,2.3dvw)] font-normal bg-gradient-to-b from-[#61ffe6] to-[#038c75] bg-clip-text text-transparent mb-[10px]">
        {step.title}
      </h3>
      <p className="text-white text-[clamp(0.8rem,2vw,1.45rem)]">{step.description}</p>
    </motion.div>
  );
}

function StepDot({ scrollYProgress, index, total, onClick }: any) {
  const start = index / total;
  const end = (index + 1) / total;
  const bgColor = useTransform(scrollYProgress, [start, start + 0.01, end - 0.01, end], ["#6b7280", "#ffffff", "#ffffff", "#6b7280"]);
  const glowOpacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  return (
    <div onClick={onClick} className="relative flex items-center justify-center cursor-pointer">
      <motion.div style={{ opacity: glowOpacity }} className="absolute w-8 h-8 rounded-full bg-teal-400/20" />
      <motion.div style={{ backgroundColor: bgColor }} className="w-3 h-3 rounded-full" />
    </div>
  );
}

function DesktopSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return;
    const section = containerRef.current;
    const rect = section.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const midProgress = (index + 0.5) / TOTAL;
    const totalScrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: absoluteTop + totalScrollable * midProgress, behavior: "smooth" });
  };

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="bg-[#0b1219] text-white relative" style={{ height: `${TOTAL * 150}vh` }}>
      <Container className="sticky top-0 lg:pr-4 h-screen w-full flex flex-col justify-start overflow-hidden">
        <h2 className="text-[clamp(1.25rem,4vw,4rem)] font-normal bg-gradient-to-b from-[#61ffe6] from-[14.94%] to-[#038c75] to-[85.06%] bg-clip-text text-transparent md:mb-35 md:mt-20">
          The Secret Sauce Is In Targeting
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="w-full lg:w-[50%] aspect-video relative overflow-hidden">
            {steps.map((step, i) => <StepImage key={step.id} scrollYProgress={scrollYProgress} step={step} index={i} total={TOTAL} />)}
          </div>
          <div className="w-full lg:w-[45%] flex gap-10 items-center">
            <div className="flex-1 h-[350px] relative">
              {steps.map((step, i) => <StepText key={step.id} scrollYProgress={scrollYProgress} step={step} index={i} total={TOTAL} />)}
            </div>
            <div className="relative w-[2px] h-90 bg-[#2a3441] rounded-full">
              <motion.div className="absolute top-0 left-0 w-full bg-white origin-top" style={{ height: lineHeight }} />
              <div className="absolute inset-0 flex flex-col justify-between items-center">
                {steps.map((_, i) => <StepDot key={i} scrollYProgress={scrollYProgress} index={i} total={TOTAL} onClick={() => scrollToStep(i)} />)}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── MOBILE SECTION ──────────────────────────────────────────────────────────

function MobileSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fillRef    = useRef<HTMLDivElement>(null);
  const imgRefs    = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef     = useRef<number>(0);

  const applyXStyle = useCallback(
    (el: HTMLElement | null, progress: number, index: number) => {
      if (!el) return;
      const start = index / TOTAL;
      const end   = (index + 1) / TOTAL;
      const enter = start + 0.1;
      const exitS = end - 0.1;

      let x: number, op: number;

      if (progress < start) {
        x = 100; op = 0;
      } else if (progress < enter) {
        x  = mapRange(progress, start, enter, 100, 0);
        op = mapRange(progress, start, enter, 0, 1);
      } else if (progress < exitS) {
        x = 0; op = 1;
      } else if (progress < end) {
        x  = mapRange(progress, exitS, end, 0, -100);
        op = mapRange(progress, exitS, end, 1, 0);
      } else {
        x = -100; op = 0;
      }

      el.style.transform = `translateX(${x}%)`;
      el.style.opacity   = String(op);
    },
    []
  );

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;

      const scrolled    = -section.getBoundingClientRect().top;
      const totalScroll = section.offsetHeight - window.innerHeight;
      const progress    = clamp(scrolled / totalScroll, 0, 1);

      if (fillRef.current) fillRef.current.style.width = `${progress * 100}%`;

      const activeIdx = Math.min(Math.floor(progress * TOTAL), TOTAL - 1);

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const isActive = i === activeIdx;
        const isDone   = i < activeIdx;
        const core = dot.querySelector<HTMLElement>(".dot-core-m");
        if (core) {
          core.style.background = isActive ? "#ffffff" : isDone ? "#038c75" : "#4a5568";
          core.style.transform  = isActive ? "scale(1.3)" : "scale(1)";
        }
        const glow = dot.querySelector<HTMLElement>(".dot-glow-m");
        if (glow) glow.style.opacity = isActive ? "1" : "0";
      });

      imgRefs.current.forEach((el, i)  => applyXStyle(el, progress, i));
      textRefs.current.forEach((el, i) => applyXStyle(el, progress, i));
    });
  }, [applyXStyle]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  const scrollToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const absTop = window.scrollY + rect.top;
    const totalScrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: absTop + totalScrollable * ((index + 0.5) / TOTAL), behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#0b1219] text-white relative"
      style={{ height: `${TOTAL * 150}vh` }}
    >
      <div className="sticky top-0 h-svh flex flex-col overflow-hidden px-5 pt-8 pb-6">

        {/* ── Title: 1 line, no wrap ── */}
        <div className="flex-shrink-0 mb-4">
          <h2
            className="font-serif font-normal whitespace-nowrap"
            style={{
              fontSize: "clamp(1.15rem, 5.5vw, 1.9rem)",
              background: "linear-gradient(180deg,#61ffe6 15%,#038c75 85%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            The Secret Sauce Is In Targeting
          </h2>
        </div>

        {/* ── Image: no background ── */}
        <div
          className="w-full flex-shrink-0 overflow-hidden"
          style={{ aspectRatio: "16/9", position: "relative" }}
        >
          {steps.map((step, i) => (
            <img
              key={step.id}
              ref={(el) => { imgRefs.current[i] = el; }}
              src={step.image}
              alt={step.title}
              className="w-full h-full object-contain"
              style={{
                position: "absolute", inset: 0,
                willChange: "transform, opacity",
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateX(0%)" : "translateX(100%)",
              }}
            />
          ))}
        </div>

        {/* ── Text: flex-1 so it fills remaining space tightly ── */}
        <div className="flex-1 relative overflow-hidden mt-4" style={{ minHeight: 0 }}>
          {steps.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => { textRefs.current[i] = el; }}
              style={{
                position: "absolute", inset: 0,
                willChange: "transform, opacity",
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateX(0%)" : "translateX(100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <h3
                className="font-serif font-normal mb-2 leading-tight"
                style={{
                  fontSize: "clamp(1.1rem, 5vw, 1.45rem)",
                  background: "linear-gradient(180deg,#61ffe6,#038c75)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.82)",
                  fontSize: "clamp(0.78rem, 3.5vw, 0.9rem)",
                  lineHeight: 1.65,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Stepper: tight to bottom, no excess gap ── */}
        <div className="flex-shrink-0 pt-4">
          <div className="relative w-full h-[2px] bg-[#2a3441] rounded-full">
            {/* Progress fill */}
            <div
              ref={fillRef}
              style={{
                position: "absolute", top: 0, left: 0,
                height: "100%",
                background: "#ffffff",
                borderRadius: 99,
                width: "0%",
                willChange: "width",
              }}
            />
            {/* Dots */}
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              {steps.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  onClick={() => scrollToStep(i)}
                  style={{
                    position: "relative",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 32, height: 32,
                    cursor: "pointer",
                  }}
                >
                  {/* Glow */}
                  <div
                    className="dot-glow-m"
                    style={{
                      position: "absolute",
                      width: 30, height: 30,
                      borderRadius: "50%",
                      background: "rgba(97,255,230,0.15)",
                      opacity: i === 0 ? 1 : 0,
                      transition: "opacity 0.3s",
                    }}
                  />
                  {/* Core */}
                  <div
                    className="dot-core-m"
                    style={{
                      width: 10, height: 10,
                      borderRadius: "50%",
                      background: i === 0 ? "#ffffff" : "#4a5568",
                      transform: i === 0 ? "scale(1.3)" : "scale(1)",
                      transition: "background 0.3s, transform 0.3s",
                      position: "relative", zIndex: 1,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── MAIN EXPORT ────────────────────────────────────────────────────────────
export default function SmoothScrollTargeting() {
  return (
    <>
      <div className="block md:hidden">
        <MobileSection />
      </div>
      <div className="hidden md:block">
        <DesktopSection />
      </div>
    </>
  );
}