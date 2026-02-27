import { personalInfo } from "@/data/portfolio";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with React, TypeScript & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
