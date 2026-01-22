import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  brandColor: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/alexisprovost",
    icon: FaGithub,
    brandColor: "#6e5494", // GitHub purple
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/alexisprovost/",
    icon: FaLinkedin,
    brandColor: "#0A66C2",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/alexis.provost/",
    icon: FaInstagram,
    brandColor: "#E1306C", // Instagram pink
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@provost.alexis",
    icon: FaTiktok,
    brandColor: "#fe2c55", // TikTok red/pink
  },
  {
    name: "X",
    url: "https://twitter.com/alexi_provo",
    icon: FaXTwitter,
    brandColor: "#1DA1F2", // Twitter blue (more visible)
  },
];

export interface FeaturedLink {
  id: string;
  labelKey: string;
  to: string;
  external?: boolean;
}

export const FEATURED_LINKS: FeaturedLink[] = [
  {
    id: "projects",
    labelKey: "app.home.featured.projects",
    to: "/projects",
  },
  {
    id: "contact",
    labelKey: "app.home.featured.contact",
    to: "/contact",
  },
];

export const API_URLS = {
  projects: "https://api.alexisprovost.com/",
  fallback: "https://ap.m19.workers.dev/",
  contact: "https://api.alexisprovost.com/discord",
};

export const PROFILE = {
  name: "Alexis Provost",
  taglineKey: "app.header.jumbotron.slogan",
  email: "alexis@provost.cloud",
  avatar: "/images/profile.jpg",
  instagram: "alexis.provost",
  gravatar: "alexis@provost.cloud",
};
