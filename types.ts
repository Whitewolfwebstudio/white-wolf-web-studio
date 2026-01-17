export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  process: { step: string; description: string }[];
  tools: string[];
  icon: string;
  path: string;
  image: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  contact: string;
  image: string;
  specialization: string;
}