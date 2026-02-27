import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import SectionHeading from "./SectionHeading";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Skills & Strengths" subtitle="Core competencies I bring to every team" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={item}>
              <Card className="bg-card/60 hover:bg-card hover:border-primary/20 transition-all">
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <Zap size={14} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{skill.description}</p>
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

export default Skills;
