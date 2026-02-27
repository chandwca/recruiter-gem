import { motion } from "framer-motion";
import { techStack } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const TechStack = () => {
  return (
    <section id="tech" className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Tech Stack" subtitle="Technologies I work with daily" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {techStack.map((cat) => (
            <motion.div key={cat.category} variants={item}>
              <Card className="h-full bg-card/60 hover:bg-card transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
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

export default TechStack;
