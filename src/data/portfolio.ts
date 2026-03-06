
export const personalInfo = {
  name: "Chetna Chandwani",
  title: "Full Stack Platform Engineer",
  tagline: "Scalable Systems • Clean Architecture • Measurable Impact",
  email: "chandwca@gmail.com",
  phone: "+1 513-807-1077",
  location: "Newark, CA",
  linkedin: "https://linkedin.com/in/chetna-chandwani",
  github: "https://github.com/chetnachandwani",
  resumeUrl: "/Chetna_Chandwani_Resume.pdf",
};

export const aboutMe = {
  summary:
    "Full Stack Platform Engineer with over 5 years of experience architecting high-scale web and mobile ecosystems. Specialized in React, TypeScript, and Node.js, I bridge the gap between complex system design and intuitive UI. I don't just write code — I build the clean, type-safe foundations and resilient APIs that allow production systems to scale with measurable business impact.",
  strengths: [
    "Modular, reusable architecture design",
    "Performance-first frontend engineering",
    "End-to-end full-stack feature delivery",
    "Robust testing and reliability practices",
    "Research-driven prototyping and continuous R&D"
  ],
  differentiators:
    "I approach engineering with a systems mindset, bridging frontend performance, backend architecture, and product experience. This allows me to own features end-to-end while building scalable, maintainable systems that improve delivery speed and long-term reliability."
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
    name: "Caritra — Sports Marketplace & Management Platform",
    description:
      "A web application connecting tennis enthusiasts with nearby coaching centers. Enables providers to list offerings, schedule classes, and manage bookings on a unified platform.",
    techStack: [
      "React",
      "TypeScript",
      "Zustand",
      "shadcn/ui",
      "Spring Boot (Kotlin)",
      "PostgreSQL"
    ],
    achievements: [
      "Engineered a high-abstraction 'FormFieldHandler' system using React and TypeScript, unifying over 15+ input types (OTP, Timezones, Multi-select) into a single controller that reduced UI boilerplate by 70%.",
      "Architected and implemented the core security layer - Privileges, Roles, and Responsibilities",
      "Led the PostgreSQL data modeling and backend development for the 'Staff Ecosystem,",
      "Spearheaded R&D for Flowable (BPMN) and Drools to decouple business rules from code, and enforced system reliability through exhaustive unit testing in the Spring Boot (Kotlin) environment.",
    ],
  },
  {
    name: "ACTS — Adroitts Compliance Testing Platform",
    description:
      "An automated compliance testing platform that streamlines test execution, validation, and reporting to improve accuracy and reduce manual effort.",
    techStack: ["React.js", "Redux", "FastAPI", "PostgreSQL"],
    achievements: [
      "Engineered a state-driven Manual Test Case builder, allowing users to define custom validation steps and execution parameters within a unified UI",
      "Architected a flexible file-processing system supporting local uploads and cloud-native ingestion from AWS S3, Azure Blob, and GCP Storage",
      "Developed the core backend logic in FastAPI to compare Actual vs. Expected result sets, automating metadata validation and reducing manual auditing effort",
      "Utilized Redux to manage complex, multi-step testing workflows, ensuring predictable state transitions and real-time status reporting"
    ],
  },
  {
    name: "YOORZ — Background Verification",
    description:
      "An automated background check and identity verification system designed to establish user trust. Engineered the secure document processing pipeline and multi-factor cross-referencing logic to ensure high-integrity authentication and reliable background screening.",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    achievements: [
      "Architected and implemented a secure document management system for the upload and validation of identification documents, streamlining the verification pipeline and enhancing processing speed.",
      "Developed integrated verification mechanisms for Social IDs and address validation, establishing a more reliable foundation for automated background checks and system trust.",
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
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export type HeroSocialIcon = "linkedin";

export interface HeroStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface HeroSocialLink {
  href: string;
  label: string;
  icon: HeroSocialIcon;
}

export interface HeroSection {
  availabilityText: string;
  greeting: string;
  codeCommentPrefix: string;
  codeIdentityVar: string;
  fallbackName: string;
  fallbackTagline: string;
  roles: string[];
  snippetWindowTitle: string;
  snippetLines: string[];
  primaryCta: {
    label: string;
    href: string;
  };
  resumeCta: {
    label: string;
    fallbackHref: string;
  };
  connectLabel: string;
  socialLinks: HeroSocialLink[];
  profileImage: {
    src: string;
    fallbackAlt: string;
  };
  openToRolesText: string;
  stats: HeroStat[];
  scrollLabel: string;
  particles: {
    count: number;
    minSize: number;
    sizeRange: number;
    maxDelay: number;
  };
}

export const heroSection: HeroSection = {
  availabilityText: "Available for Work",
  greeting: "Hello, I'm",
  codeCommentPrefix: "//",
  codeIdentityVar: "developer",
  fallbackName: "Your Name",
  fallbackTagline: "Building elegant, performant digital experiences that leave a lasting impression.",
  roles: [personalInfo.title, "UI/UX Enthusiast", "Problem Solver"],
  snippetWindowTitle: "HeroPhonePreview.tsx",
  snippetLines: [
    "const profile = {",
    "  name: \"Chetna Chandwani\",",
    "  role: \"Full Stack Platform Engineer\",",
    "  location: \"Newark, CA\",",
    "  status: \"Seeking New Challenges \",",
    "};",
    "",
    "const HeroPhonePreview = () => (",
    "  <PhoneFrame>",
    "    <img src=\"/profile.jpg\" alt={profile.name} />",
    "    <Badge>{profile.status}</Badge>",
    "  </PhoneFrame>",
    ");",
    "",
    "export default HeroPhonePreview;",
  ],
  primaryCta: {
    label: "View Projects",
    href: "#projects",
  },
  resumeCta: {
    label: "Resume",
    fallbackHref: "#",
  },
  connectLabel: "Connect",
  socialLinks: [
    {
      href: personalInfo.linkedin,
      label: "LinkedIn",
      icon: "linkedin",
    },
  ],
  profileImage: {
    src: "image.jpeg",
    fallbackAlt: "Profile",
  },
  openToRolesText: "Seeking New Challenges",
  stats: [
    { label: "Experience", value: 5, suffix: " yrs" },
    { label: "Projects", value: 6, suffix: "+" },
    { label: "Clients", value: 5, suffix: "+" },
  ],
  scrollLabel: "Scroll",
  particles: {
    count: 18,
    minSize: 3,
    sizeRange: 5,
    maxDelay: 4,
  },
};

export interface AboutTechPill {
  name: string;
  icon: string;
}

export interface AboutSection {
  title: string;
  subtitle: string;
  educationHeading: string;
  marqueeDuration: number;
  marqueeCopies: number;
  techPills: AboutTechPill[];
}

export const aboutSection: AboutSection = {
  title: "About Me",
  subtitle: "Who I am and what drives me",
  educationHeading: "Education",
  marqueeDuration: 90,
  marqueeCopies: 4,
  techPills: [
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "AWS", icon: "https://cdn.simpleicons.org/amazonaws/FF9900" },
    { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/E10098" },
    { name: "Postgres", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  ],
};
