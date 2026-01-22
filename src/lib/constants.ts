import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

// =============================================================================
// SOCIAL LINKS CONFIGURATION
// =============================================================================
// To add a new social link:
// 1. Import the icon from react-icons
// 2. Add a new entry to SOCIAL_LINKS array below
// 3. Set brand colors for consistent styling
//
// To remove a link: Simply delete or comment out the entry
// =============================================================================

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  brandColor: string; // Primary brand color for hover state
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/alexisprovost",
    icon: FaGithub,
    brandColor: "#333333",
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
    brandColor: "instagram", // Special case for gradient
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@alexis.provost",
    icon: FaTiktok,
    brandColor: "#000000",
  },
  {
    name: "X",
    url: "https://twitter.com/alexi_provo",
    icon: FaXTwitter,
    brandColor: "#000000",
  },
];

// =============================================================================
// FEATURED LINKS (Navigation cards on homepage)
// =============================================================================

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

// =============================================================================
// API & PROFILE CONFIG
// =============================================================================

export const API_URLS = {
  projects: "https://api.alexisprovost.com/",
  fallback: "https://ap.m19.workers.dev/",
  contact: "https://api.alexisprovost.com/discord",
};

export const PROFILE = {
  name: "Alexis Provost",
  taglineKey: "app.header.jumbotron.slogan",
  email: "alexis@provost.cloud",
  instagram: "alexis.provost", // Used for profile pic
  gravatar: "alexis@provost.cloud", // Fallback for profile pic
};
