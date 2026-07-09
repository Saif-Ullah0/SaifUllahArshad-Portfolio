export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  metrics: Record<string, string>;
  github: string;
  demo: string | null;
  featured: boolean;
  thumbnail: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  type: "internship" | "part-time" | "full-time";
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string[];
  stack: string[];
  logo: string;
};

export type Skill = {
  name: string;
  icon: string;
  category: "ml" | "web" | "tools";
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string | null;
  logo: string;
};

export type Social = {
  name: string;
  url: string;
  icon: string;
};

export type Profile = {
  name: string;
  tagline: string;
  university: string;
  cgpa: string;
  graduationYear: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
};