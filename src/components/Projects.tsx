import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, TrendingUp } from "lucide-react";
import SectionHeading from "./SectionHeading";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Projects" subtitle="Production applications I've built and shipped" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mt-12"
        >
          {projects.map((project) => (
            <motion.div key={project.name} variants={item}>
              <Card className="h-full group hover:border-primary/30 transition-all duration-300 bg-card/60 hover:bg-card">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Github size={16} />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((t) => (
                      <Badge key={t} variant="secondary" className="text-[10px] font-mono">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto space-y-2">
                    {project.achievements.map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <TrendingUp size={12} className="mt-0.5 text-primary shrink-0" />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
