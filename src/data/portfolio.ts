export const personalInfo = {
  name: "Chetna Chandwani",
  title: "Full Stack Software Engineer",
  tagline: "I build scalable, production-grade applications with clean architecture and measurable impact.",
  email: "chandwca@gmail.com",
  phone: "+1 513-807-1077",
  location: "Newark, CA",
  linkedin: "https://linkedin.com/in/chetna-chandwani",
  github: "https://github.com/chetnachandwani",
  resumeUrl: "/Chetna_Chandwani_Resume.pdf",
};

export const aboutMe = {
  summary:
    "Software Engineer with 4+ years of experience building production-grade web and mobile applications. I specialize in React, Spring Boot (Kotlin), and scalable full-stack architectures that deliver measurable business outcomes.",
  strengths: [
    "Modular, reusable architecture design",
    "Performance-first frontend engineering",
    "Full-stack delivery with Spring Boot & React",
    "Cross-functional team collaboration",
  ],
  differentiators:
    "I combine deep frontend expertise with strong backend skills, enabling me to own features end-to-end — from database schema to pixel-perfect UI — while consistently improving delivery timelines and reducing defects.",
};

export interface TechCategory {
  category: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  { category: "Languages", items: ["Kotlin", "Java", "TypeScript", "JavaScript", "Python", "PHP"] },
  { category: "Frontend", items: ["React", "React Native", "Vue.js", "AngularJS", "Redux", "Zustand", "GraphQL"] },
  { category: "Backend", items: ["Spring Boot", "FastAPI", "Node.js", "Laravel"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { category: "DevOps & Tools", items: ["Git", "GitHub", "Cypress", "Figma", "VS Code"] },
  { category: "Cloud & Certs", items: ["Azure AI Fundamentals (AI-900)", "Azure Data Fundamentals (DP-900)"] },
];

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  achievements: string[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    name: "Caritra — Sports Marketplace",
    description:
      "A web application connecting tennis enthusiasts with nearby coaching centers. Enables providers to list offerings, schedule classes, and manage bookings on a unified platform.",
    techStack: ["React.js", "Zustand", "Spring Boot (Kotlin)", "MongoDB", "Flowable BPMN", "Drools"],
    achievements: [
      "Improved feature delivery timelines by ~15–20% through modular architecture",
      "Enhanced app responsiveness and maintainability by 30% with Zustand state management",
      "Built custom reusable form system, reducing code redundancy by 70%",
    ],
  },
  {
    name: "ACTS — Compliance Testing Platform",
    description:
      "An automated compliance testing platform that streamlines test execution, validation, and reporting to improve accuracy and reduce manual effort.",
    techStack: ["React.js", "Redux", "FastAPI", "PostgreSQL"],
    achievements: [
      "Improved test efficiency and UX by 40%",
      "Integrated multi-cloud file uploads (GCP, AWS, Azure), enhancing flexibility by 50%",
      "Increased validation accuracy by 35% through automation",
    ],
  },
  {
    name: "YOORZ — Background Verification",
    description:
      "A mobile and web application performing secure background checks by validating identities, documents, and addresses through automated verification workflows.",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    achievements: [
      "Improved usability and verification speed by 40%",
      "Increased verification accuracy by 30% with multi-point validation logic",
      "Reduced manual review by 25% through automated workflows",
    ],
  },
  {
    name: "Configurable Rule Engine with BPMN",
    description:
      "A full-stack configurable rule engine integrating Drools with Flowable BPMN for dynamic decision-making inside workflow processes.",
    techStack: ["Spring Boot", "React.js", "React Flow", "Drools", "Flowable BPMN"],
    achievements: [
      "Built drag-and-drop BPMN designer using React Flow",
      "Developed rule management UI supporting grouped rules and live runtime updates",
      "Enabled dynamic rule execution against incoming data within BPMN workflows",
    ],
  },
];

export interface Experience {
  company: string;
  role: string;
  duration: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    company: "Adroitts",
    role: "Software Engineer",
    duration: "Aug 2023 – Present",
    achievements: [
      "Architected and delivered 3 production-grade applications using React / React Native with Spring Boot and FastAPI backends",
      "Reduced initial page load time by ~20–25% through structured state management and code-splitting",
      "Optimized frontend with 20+ reusable shadcn/ui components, lowering UI defects by ~15–20%",
      "Led sprint demos and grooming for a 5-engineer team, maintaining ~85–90% sprint reliability",
    ],
  },
  {
    company: "University of Cincinnati — ITSC",
    role: "Part-Time Developer",
    duration: "Jan 2022 – Apr 2023",
    achievements: [
      "Built virtual event platform with React and GraphQL supporting 200+ participants",
      "Implemented end-to-end UI testing with Cypress, reducing regression defects",
      "Engineered data validation workflows improving admin processing efficiency",
    ],
  },
  {
    company: "JMAN Group",
    role: "Software Engineer",
    duration: "Dec 2020 – Dec 2021",
    achievements: [
      "Developed education management platform with Laravel, Vue.js, and PostgreSQL",
      "Built employee management system for 100+ employees using AngularJS and Node.js",
      "Resolved cross-time-zone datetime issues across UK and India deployments",
      "Automated monthly survey distribution, reducing manual effort by ~30–40%",
    ],
  },
];

export const skills = [
  { name: "System Architecture", description: "Modular, scalable application design" },
  { name: "State Management", description: "Redux, Zustand, context-based patterns" },
  { name: "Performance Optimization", description: "Code-splitting, lazy loading, caching" },
  { name: "Scalable Backends", description: "Spring Boot, FastAPI, microservices" },
  { name: "Testing & Quality", description: "Cypress, unit/integration tests, CI/CD" },
  { name: "Workflow Automation", description: "BPMN orchestration, Drools rule engines" },
];

export const education = [
  { degree: "M.S. in Information Technology", school: "University of Cincinnati", year: "April 2023" },
  { degree: "B.E. in Electrical & Electronics Engineering", school: "Anna University", year: "September 2020" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
