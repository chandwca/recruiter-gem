import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { heroSection, personalInfo, type HeroSocialIcon } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowDown, FileText, Linkedin, Sparkles } from "lucide-react";
import { motionEase } from "@/lib/motion";

/* ─── Floating particle dot ─── */
const Particle = ({
  delay,
  x,
  y,
  size,
  duration,
}: {
  delay: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-primary/30 pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    animate={{ y: [0, -24, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ─── Animated counter ─── */
const Counter = ({ target, suffix = "", shouldReduceMotion }: { target: number; suffix?: string; shouldReduceMotion: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.8,
      ease: motionEase,
      onUpdate: (latest) => setCount(Math.round(latest)),
    });

    return () => controls.stop();
  }, [shouldReduceMotion, target]);

  return <span>{count}{suffix}</span>;
};

/* ─── Typewriter ─── */
const Typewriter = ({ words, className }: { words: string[]; className?: string }) => {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (!deleting && subIndex === words[index].length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setSubIndex((s) => s + (deleting ? -1 : 1)), deleting ? 50 : 80);
    return () => clearTimeout(t);
  }, [deleting, index, shouldReduceMotion, subIndex, words]);

  return (
    <span className={className}>
      {shouldReduceMotion ? words[0] : words[index].substring(0, subIndex)}
      {!shouldReduceMotion && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-primary align-middle ml-1"
        />
      )}
    </span>
  );
};

/* ─── Main Hero ─── */
const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const resumeHref = personalInfo?.resumeUrl ?? heroSection.resumeCta.fallbackHref;
  const resumeFileName = "Chetna_Chandwani_Resume_2026.pdf";
  const isResumePdf = /\.pdf($|\?)/i.test(resumeHref);

  // Optimized Scroll Logic for "Breathing Room"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // These transforms create the "opening space" effect as you scroll
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityScroll = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleScroll = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);

  /* Subtle mouse-tracking parallax for ambient blobs */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blobX = useSpring(mouseX, { stiffness: 35, damping: 25 });
  const blobY = useSpring(mouseY, { stiffness: 35, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 40);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 30);
  }, [mouseX, mouseY, shouldReduceMotion]);

  const socialIconMap: Record<HeroSocialIcon, typeof Linkedin> = { linkedin: Linkedin };

  const particles = useMemo(
    () =>
      Array.from({ length: heroSection.particles.count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: heroSection.particles.minSize + Math.random() * heroSection.particles.sizeRange,
        delay: Math.random() * heroSection.particles.maxDelay,
        duration: 4 + Math.random() * 3,
      })),
    []
  );

  const container: Variants = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.09, delayChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28, filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)" },
    show: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: shouldReduceMotion ? 0 : 0.65, ease: motionEase },
    },
  };

  const getSnippetLineClass = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return "text-transparent";
    if (trimmed.startsWith("//")) return "text-muted-foreground/70";
    if (trimmed.startsWith("const") || trimmed.startsWith("export")) return "text-primary";
    if (trimmed.startsWith("<") || trimmed.includes("</")) return "text-accent";
    if (trimmed.includes("src=") || trimmed.includes("alt=")) return "text-foreground/85";
    if (trimmed.includes(":")) return "text-foreground/90";
    return "text-muted-foreground";
  };
  const snippetLines = heroSection.snippetLines.filter((line) => line.trim().length > 0);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      // Increased pb-32 for extra "air" at the bottom
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-5 pt-20 md:pt-24 pb-24 md:pb-32"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--primary)/0.18),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Mouse-reactive blobs */}
        <motion.div
          style={{ x: blobX, y: blobY }}
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary blur-[120px]"
        />
        <motion.div
          style={{ x: blobX, y: blobY }}
          animate={shouldReduceMotion ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.04, 0.08, 0.04] }}
          transition={shouldReduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent blur-[120px]"
        />
        {!shouldReduceMotion && particles.map((p) => <Particle key={p.id} {...p} />)}
      </div>

      <motion.div
        style={shouldReduceMotion ? undefined : { 
          y: yParallax, 
          opacity: opacityScroll,
          scale: scaleScroll
        }}
        className="relative z-10 mx-auto w-full px-4 sm:px-8 lg:px-12 xl:px-16"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-10 lg:gap-10">

          {/* ── Left ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full min-w-0 flex-[1.02] text-left"
          >
            {/* Badge */}
            <motion.div variants={item}>
              <motion.span
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05, x: 3 }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-primary border border-primary/30 bg-primary/5 rounded-full px-4 py-1.5 mb-4"
              >
                <Sparkles size={12} />
                {heroSection.availabilityText}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
              </motion.span>
            </motion.div>

            {/* Greeting as comment-style code */}
            <motion.div variants={item} className="mb-2 font-mono text-base tracking-wider">
              <span className="text-accent/90">{heroSection.codeCommentPrefix}</span>{" "}
              <span className="text-muted-foreground">{heroSection.greeting}</span>
            </motion.div>

            <motion.p variants={item} className="text-sm md:text-base font-mono text-muted-foreground/90 mb-1">
              <span className="text-primary">const</span>{" "}
              <span className="text-foreground">{heroSection.codeIdentityVar}</span> ={" "}
              <span className="text-accent/90">"</span>
              <span className="text-muted-foreground">{personalInfo?.title ?? heroSection.roles[0]}</span>
              <span className="text-accent/90">"</span>;
            </motion.p>

            {/* Name — per-word clip reveal */}
            <motion.div variants={item} className="mb-3 overflow-hidden">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-none">
                {(personalInfo?.name ?? heroSection.fallbackName).split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.2em] last:mr-0"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.25 + i * 0.12, ease: motionEase }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Role typewriter */}
            <motion.div variants={item} className="text-lg sm:text-xl md:text-2xl font-medium mb-4 h-8 sm:h-9 flex items-center gap-3">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.9, duration: shouldReduceMotion ? 0 : 0.5, ease: motionEase }}
                className="h-px w-8 bg-primary/60 origin-left shrink-0"
              />
              <Typewriter
                words={heroSection.roles}
                className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={item} className="text-base md:text-lg text-muted-foreground max-w-xl mb-5 sm:mb-6 leading-relaxed">
              {personalInfo?.tagline ?? heroSection.fallbackTagline}
            </motion.p>

            {/* Embedded code snippet */}
            <motion.div variants={item} className="mb-4 max-w-xl overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-lg">
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                </div>
                <span className="font-mono text-xs sm:text-sm text-muted-foreground">{heroSection.snippetWindowTitle}</span>
              </div>
              <pre className="max-h-40 sm:max-h-52 overflow-y-auto overflow-x-auto px-3 sm:px-4 py-2.5 text-xs sm:text-sm md:text-base font-mono leading-5 sm:leading-6 [scrollbar-width:thin] [scrollbar-color:hsl(var(--primary)/0.45)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/35 hover:[&::-webkit-scrollbar-thumb]:bg-primary/55">
                {snippetLines.map((line, index) => (
                  <div key={`${line}-${index}`} className="whitespace-pre">
                    <span className="mr-3 inline-block w-5 text-right text-muted-foreground/60">{index + 1}</span>
                    <span className={getSnippetLineClass(line)}>{line || " "}</span>
                  </div>
                ))}
              </pre>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex w-full max-w-xl flex-wrap items-center gap-2.5 sm:gap-3 mb-2">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                className="relative group"
              >
                <div className="absolute -inset-[1.5px] rounded-[calc(var(--radius)+2px)] bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-300 -z-10" />
                <Button asChild size="lg" className="relative h-11 sm:h-12 overflow-hidden bg-primary text-primary-foreground px-5 sm:px-8">
                  <a href={heroSection.primaryCta.href}>
                    <span className="relative z-10 flex items-center gap-2">
                      {heroSection.primaryCta.label}
                      <motion.span
                        animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
                        transition={shouldReduceMotion ? undefined : { duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowDown size={16} />
                      </motion.span>
                    </span>
                    <motion.span className="absolute inset-0 bg-primary-foreground/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              >
                <Button
                  asChild variant="outline" size="lg"
                  className="h-11 sm:h-12 px-5 sm:px-8 border-border/60 hover:border-primary/60 hover:bg-primary/5 hover:text-foreground transition-all duration-200"
                >
                  <a
                    href={resumeHref}
                    download={isResumePdf ? resumeFileName : undefined}
                    target={isResumePdf ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    <FileText size={16} className="mr-2" />
                    {heroSection.resumeCta.label}
                  </a>
                </Button>
              </motion.div>

              {heroSection.socialLinks.map(({ href, icon, label }) => {
                const Icon = socialIconMap[icon];
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    className="inline-flex h-11 items-center gap-2 px-4 rounded-md border border-border/60 bg-secondary/70 text-base font-medium text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all duration-200"
                  >
                    <Icon size={16} />
                    {label}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Right ── */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40, filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.9, delay: shouldReduceMotion ? 0 : 0.3, ease: motionEase }}
            className="w-full flex-[1.08] flex flex-col items-center gap-4"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[370px] mx-auto">
              <motion.div
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-10 -z-20 bg-[radial-gradient(circle_at_55%_35%,hsl(var(--primary)/0.35),transparent_62%)] blur-3xl"
              />

              <motion.div
                animate={shouldReduceMotion ? undefined : { rotate: [0, 1.2, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-2 -z-10 rounded-[2.8rem] bg-gradient-to-br from-primary/20 to-accent/20 blur-sm"
              />

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 20 }}
                className="relative overflow-hidden rounded-[2.6rem] border border-border/70 bg-card/90 p-2 shadow-[0_30px_80px_-40px_hsl(var(--foreground)/0.55)] backdrop-blur-sm"
              >
                <span className="absolute left-[-4px] top-28 h-14 w-[4px] rounded-r-full bg-border/80" />
                <span className="absolute left-[-4px] top-44 h-10 w-[4px] rounded-r-full bg-border/80" />
                <span className="absolute right-[-4px] top-36 h-16 w-[4px] rounded-l-full bg-border/80" />

                <div className="relative overflow-hidden rounded-[2.2rem] border border-border/60 bg-background">
                  <div className="absolute left-1/2 top-2 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-background/95 border border-border/70" />
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-accent z-10" />
                  <img
                    src={heroSection.profileImage.src}
                    alt={personalInfo?.name ?? heroSection.profileImage.fallbackAlt}
                    className="w-full aspect-[9/16] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded-lg border border-border/60 bg-background/55 px-2 py-1 backdrop-blur-md">
                    <p className="font-mono text-xs sm:text-sm text-muted-foreground">preview mobile</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="inline-flex items-center rounded-xl border border-border/60 bg-background/55 px-3.5 py-2 backdrop-blur-md">
                      <p className="text-sm font-semibold text-foreground">
                        {personalInfo?.name ?? heroSection.fallbackName}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 1, type: "spring", stiffness: 400, damping: 15 }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.06, y: -3 }}
                className="absolute -top-4 -right-3 bg-card/90 text-foreground backdrop-blur-sm border border-border/60 shadow-xl rounded-2xl px-3 py-2 text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                {heroSection.openToRolesText}
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.7, duration: 0.6, ease: motionEase }}
              className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-[300px] sm:max-w-[370px]"
            >
              {heroSection.stats.map(({ label, value, suffix }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.8 + idx * 0.1,
                    duration: shouldReduceMotion ? 0 : 0.5,
                    ease: motionEase,
                  }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.06, y: -3 }}
                  className="relative flex flex-col items-center justify-center gap-1 bg-card/80 border border-border/40 rounded-2xl py-3.5 px-2 text-center cursor-default backdrop-blur-sm overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-xl sm:text-2xl font-extrabold text-foreground">
                    <Counter target={value} suffix={suffix} shouldReduceMotion={shouldReduceMotion} />
                  </span>
                  <span className="relative text-xs sm:text-sm text-muted-foreground font-medium tracking-wide uppercase">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity: opacityScroll }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest font-medium">{heroSection.scrollLabel}</span>
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border/60 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
