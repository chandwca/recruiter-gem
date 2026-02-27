import { motion } from "framer-motion";
import { aboutMe, education } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="About Me" subtitle="Who I am and what drives me" />

        <div className="grid md:grid-cols-5 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 space-y-6"
          >
            <p className="text-base text-muted-foreground leading-relaxed">{aboutMe.summary}</p>
            <p className="text-base text-muted-foreground leading-relaxed">{aboutMe.differentiators}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {aboutMe.strengths.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
                >
                  <Sparkles size={12} />
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <GraduationCap size={16} />
              Education
            </h3>
            {education.map((edu) => (
              <Card key={edu.degree} className="bg-card/50">
                <CardContent className="p-4">
                  <p className="font-semibold text-sm text-foreground">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground">{edu.school}</p>
                  <p className="text-xs text-primary font-mono mt-1">{edu.year}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
