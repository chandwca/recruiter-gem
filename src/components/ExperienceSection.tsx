import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";
import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading title="Experience" subtitle="My professional journey" />

        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-1 w-3 h-3 rounded-full gradient-bg ring-4 ring-background" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-primary" />
                    <h3 className="text-base font-bold text-foreground">{exp.company}</h3>
                  </div>
                  <span className="text-xs font-mono text-primary">{exp.duration}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-3">{exp.role}</p>

                <ul className="space-y-2">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
