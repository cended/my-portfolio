// src/data/webProjects.ts
// Static web development project showcase — separate data shape from
// automation case studies (no business problem/solution/workflow,
// just traditional portfolio project info + a photo gallery).
//
// IMAGES NEEDED — drop files into public/images/webprojects/ using
// these exact names. Until they exist, each slot shows a placeholder.

export interface WebProject {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  liveUrl?: string;
}

export const WEB_PROJECTS: WebProject[] = [
  {
    slug: "campus-elect",
    title: "Campus Elect",
    description:
      "Campus Elect is a web-based election system designed for high schools that ensures secure and efficient voting through biometric verification using face recognition and fingerprint scanning. The system digitalizes the entire election process — from voter authentication to vote casting and result generation — making school elections faster, more organized, and more transparent.\n\nCampus Elect helps solve common problems in traditional school elections such as voter impersonation, multiple voting, long voting lines, manual counting errors, and slow result processing. By using biometric verification, the system ensures that only registered students can vote and that each voter can vote only once, increasing the security, accuracy, and credibility of the election process.",
    techStack: ["PHP", "MySQL", "Tailwind CSS", "JS"],
    images: [
      "/images/webprojects/campus-elect-1.png",
      "/images/webprojects/campus-elect-2.png",
      "/images/webprojects/campus-elect-3.png",
    ],
    // NOTE: swapped from what was given — this domain name matches this
    // project, verify against your actual deployment before shipping.
    liveUrl: "https://campuselectph.42web.io/",
  },
  {
    slug: "lnsc-inventory",
    title: "LNSC Centralized Inventory and Branch Management System",
    description:
      "The LNSC Centralized Inventory and Branch Management System is a web-based system designed to streamline and centralize the management of inventory, sales, and branch operations of LNSC Laptops.\n\nThe system allows administrators and staff to efficiently manage product inventories, monitor stock levels across multiple branches, process sales through a Point of Sale (POS) module, and track stock transfers between branches. It also provides tools for managing customers, suppliers, and employees, ensuring accurate and real-time data management.\n\nBy digitizing manual processes and consolidating data into a centralized database, the system improves operational efficiency, reduces inventory errors, and enables better decision-making for the business.",
    techStack: ["PHP", "Tailwind CSS", "MySQL", "JS"],
    images: [
      "/images/webprojects/lnsc-inventory-1.png",
      "/images/webprojects/lnsc-inventory-2.png",
      "/images/webprojects/lnsc-inventory-3.png",
      "/images/webprojects/lnsc-inventory-4.png",
    ],
    // NOTE: swapped from what was given — this domain name matches this
    // project (LNSC Laptops), verify against your actual deployment.
    liveUrl: "https://lnsclaptops.com",
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    description:
      "This portfolio itself is a full-stack Next.js application, redesigned from the ground up to reposition as an AI Automation Specialist with a strong web development foundation. Beyond the front-end design system, it was originally built with a complete self-serve backend — a PostgreSQL database via Supabase, Prisma ORM, and a NextAuth-secured admin dashboard for managing content through full CRUD operations rather than a hardcoded static site.\n\nThe build follows the same practices used across client work: typed data models, protected API routes, environment-based configuration, and a component-driven design system — deployed on Vercel with continuous deployment from GitHub, so every update ships automatically on push.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth", "Tailwind CSS", "React", "Vercel", "Supabase"],
    images: ["/images/webprojects/personal-portfolio-1.png"],
    liveUrl: "https://my-portfolio-mu-blue-32.vercel.app/",
  },
  {
    slug: "records-archives-system",
    title: "Records and Archives System — WMSU Records Office",
    description:
      "The Records and Archives System is a web-based platform built for WMSU's Records Office to manage the university's institutional records — from active inventory tracking through to permanent archival storage. As backend developer, I built the core system logic in PHP and MySQL, including role-based authentication across four distinct user types and a dashboard giving staff a live overview of their holdings (total records, temporary vs. permanent, pending disposal, and trash).\n\nThe system automates document numbering, handles file uploads with transactional rollback safeguards to prevent partial or corrupted saves, and enforces an automated retention-based soft-delete policy so records age out on schedule instead of being tracked by hand. A dedicated reporting module generates chart-based analytics with Excel and PDF export, giving the office visibility into their records at a glance.",
    techStack: ["PHP", "MySQL"],
    images: [
      "/images/webprojects/records-archives-1.png",
      "/images/webprojects/records-archives-2.png",
      "/images/webprojects/records-archives-3.png",
    ],
    // No liveUrl — internal WMSU system, not publicly deployed. Card and
    // modal both handle this gracefully (no dead "View Live Site" button).
  },
];