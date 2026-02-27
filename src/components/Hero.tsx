import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileText, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-32">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-[0.07] blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-mono text-primary mb-4 tracking-wider uppercase"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-4"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl font-medium gradient-text mb-6"
        >
          {personalInfo.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="gradient-bg text-primary-foreground hover:opacity-90 px-8">
            <a href="#projects">
              View Projects
              <ArrowDown size={16} className="ml-1" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
              <FileText size={16} className="mr-1" />
              Resume
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="px-8">
            <a href="#contact">
              <Mail size={16} className="mr-1" />
              Contact Me
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
