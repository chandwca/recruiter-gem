import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
}

const SectionHeading = ({ title, subtitle }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
    <p className="text-muted-foreground mt-2 text-sm md:text-base">{subtitle}</p>
    <div className="w-12 h-1 gradient-bg rounded-full mx-auto mt-4" />
  </motion.div>
);

export default SectionHeading;
