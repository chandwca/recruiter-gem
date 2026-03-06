import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_4slhqxc",     // from EmailJS
        "template_q1qa0bg",    // from EmailJS
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "zvglad1vGoRd1p1zw"   // from EmailJS
      );

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon."
      });

      setForm({ name: "", email: "", message: "" });

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong."
      });
    }
  };

  const links = [
    { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedin },
    // { icon: Github, label: "GitHub", href: personalInfo.github },
    { icon: MapPin, label: personalInfo.location, href: "#" },
  ];

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="mx-auto w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeading title="Get In Touch" subtitle="Let's build something great together" />

        <div className="mt-8 grid items-start gap-8 md:mt-10 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="space-y-4 pt-1 md:pt-6">
              {links.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    <Icon size={16} />
                  </div>
                  <span className="min-w-0 break-words">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <Card className="bg-card/60">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Your message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                  <Button type="submit" className="w-full gradient-bg text-primary-foreground hover:opacity-90">
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
