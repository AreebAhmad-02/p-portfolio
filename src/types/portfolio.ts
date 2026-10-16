export interface Meta {
  title: string;
  description: string;
  url: string;
}

export interface Availability {
  available: boolean;
  label: string;
}

export interface Personal {
  name: string;
  firstName: string;
  role: string;
  location: string;
  timezone: string;
  email: string;
  avatar: string;
  availability: Availability;
  resumeUrl: string;
  cvUrl: string;
}

export interface NavItem {
  label: string;
  id: string;
}

export interface Social {
  platform: string;
  label: string;
  url: string;
}

export interface Cta {
  label: string;
  target: string;
}

export interface Hero {
  greeting: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface About extends SectionCopy {
  paragraphs: string[];
  currently: string;
  signature: string;
  stats: Stat[];
}

export interface Skills extends SectionCopy {
  marquee: string[];
}

export interface ProjectLinks {
  live: string;
  github: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  /** Two hex colors used to generate the cover art when no image is set. */
  palette: [string, string];
  image: string;
  links: ProjectLinks;
  featured: boolean;
}

export interface Projects extends SectionCopy {
  moreLabel: string;
  items: Project[];
}

export interface Link {
  label: string;
  url: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: string;
  summary: string;
  result: { value: string; label: string };
  links: Link[];
}

export interface ResearchPosition {
  lab: string;
  institution: string;
  role: string;
  period: string;
  supervisor: string;
  description: string;
}

export interface Research extends SectionCopy {
  interests: string[];
  /** Author name to emphasize in every author list. */
  highlightAuthor: string;
  publications: Publication[];
  position: ResearchPosition;
  scholarLabel: string;
  cvLabel: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  url: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Experience extends SectionCopy {
  items: ExperienceItem[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface Testimonials extends SectionCopy {
  items: Testimonial[];
}

export interface Contact extends SectionCopy {
  ctaLabel: string;
  note: string;
  resumeLabel: string;
  cvLabel: string;
}

export interface Footer {
  note: string;
}

export interface Portfolio {
  meta: Meta;
  personal: Personal;
  nav: NavItem[];
  socials: Social[];
  hero: Hero;
  about: About;
  research: Research;
  skills: Skills;
  projects: Projects;
  experience: Experience;
  testimonials: Testimonials;
  contact: Contact;
  footer: Footer;
}
