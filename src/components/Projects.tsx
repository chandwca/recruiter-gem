import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { ExternalLink, TrendingUp } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "./SectionHeading";
import { motionEase } from "@/lib/motion";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 24, mass: 0.7 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const compute = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 = section top at viewport bottom, 1 = section top at viewport top
      const progress = 1 - rect.top / vh;
      const clamped = Math.max(0, Math.min(1, progress));
      // Slide from 300px right → 0 as progress goes 0 → 0.35
      rawX.set(clamped < 0.35 ? 300 * (1 - clamped / 0.35) : 0);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [shouldReduceMotion, rawX]);

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden py-20 md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_0%,hsl(var(--primary)/0.08),transparent_72%)]" />
      </div>

      {/* Heading row */}
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            title="Projects"
            subtitle="Selected case studies with measurable outcomes"
          />
          <p className="mb-1 hidden shrink-0 text-sm text-muted-foreground sm:block">
            {projects.length} projects &nbsp;→
          </p>
        </div>
      </div>

      {/* Card row — translates right as you scroll up, glides back on scroll down */}
      <motion.div
        className="relative mt-10 sm:mt-12"
        style={{ x }}
      >
        {/* Right-edge fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-background to-transparent"
          aria-hidden="true"
        />

        <div className="overflow-x-auto scrollbar-thin-primary px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex w-max gap-5 pb-5 xl:gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
            <div className="w-20 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  shouldReduceMotion,
}: {
  project: Project;
  index: number;
  shouldReduceMotion: boolean | null;
}) => {
  const isEven = index % 2 === 0;
  const cardNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: motionEase, delay: Math.min(index * 0.07, 0.21) }
      }
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      className="relative flex h-[66vh] min-h-[36rem] max-h-[600px] w-[min(84vw,29rem)] shrink-0 lg:w-[32rem]"
    >
      <Card className="group relative flex h-full w-full flex-col overflow-hidden border-border/60 bg-card/90 shadow-[0_20px_60px_-30px_hsl(var(--foreground)/0.5)] backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_24px_70px_-28px_hsl(var(--primary)/0.25)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--foreground)/0.05),hsl(var(--foreground)/0.01)_50%,transparent)]" />
        <div
          style={{
            backgroundImage: isEven
              ? "radial-gradient(ellipse at 0% 0%, hsl(var(--primary)/0.22), transparent 55%)"
              : "radial-gradient(ellipse at 100% 0%, hsl(var(--primary)/0.22), transparent 55%)",
          }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <CardContent className="relative flex h-full flex-col overflow-y-auto p-6 scrollbar-thin-primary">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-primary/55">
              {cardNumber}
            </span>
            <div className="flex items-center gap-2">
              {project.github && (
                <motion.a
                  whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.08 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} GitHub`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/8 hover:text-primary"
                >
                  <GitHubIcon className="h-4 w-4" />
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.08 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} live demo`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/8 hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              )}
            </div>
          </div>

          <div className="mt-4 h-px bg-border/50" />

          {/* Title + description */}
          <div className="mt-5">
            <h3 className="text-[1.25rem] font-bold leading-snug tracking-tight text-foreground lg:text-[1.4rem]">
              {project.name}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.map((stack) => (
              <Badge
                key={stack}
                variant="secondary"
                className="border border-border/50 bg-secondary/40 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
              >
                {stack}
              </Badge>
            ))}
          </div>

          {/* Impact highlights */}
          <div className="mt-5 flex-1 rounded-xl border border-border/50 bg-background/30 p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
              Impact Highlights
            </p>
            <ul className="space-y-2.5">
              {project.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted-foreground"
                >
                  <span className="mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/12">
                    <TrendingUp className="h-2 w-2 text-primary/80" />
                  </span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
};

export default Projects;
