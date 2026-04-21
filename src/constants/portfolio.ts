// Portfolio constants - All portfolio data in one place

export interface Author {
  _id: string;
  name: string;
  initials: string;
  avatar?: {
    asset?: {
      url?: string;
    };
  };
  description?: any[];
  summary?: any[];
  location?: string;
  skills?: string[];
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    email?: string;
  };
}

export interface WorkExperience {
  _id: string;
  company: string;
  title: string;
  logo?: {
    asset?: {
      url?: string;
    };
  };
  location?: string;
  startDate: string;
  endDate?: string;
  description?: any[];
  url?: string;
}

export interface Education {
  _id: string;
  school: string;
  degree: string;
  logo?: {
    asset?: {
      url?: string;
    };
  };
  startDate: string;
  endDate: string;
  url?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: any[];
  startDate?: string;
  endDate?: string;
  technologies?: string[];
  image?: {
    asset?: {
      url?: string;
    };
  };
  video?: string;
  links?: {
    title: string | null;
    url: string | null;
    type: string | null;
  }[];
}

// Portfolio data
export const AUTHOR: Author = {
  _id: "author-1",
  name: "Md Motahar",
  initials: "HA",
  avatar: {
    asset: {
      url: "/projects/profile.jpg",
    },
  },
  description: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "I build web that builds brands.",
        },
      ],
    },
  ],
  summary: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "I'm a full-stack developer with expertise in React, Next.js, Node.js, Nest.js and MongoDB. I love creating modern, responsive web applications with a focus on user experience and performance. Currently working as a Frontend Developer at SelectSkillSet, I bring experience from my previous role as a Full Stack Developer at Mistry Bhejo.",
        },
      ],
    },
  ],
  location: "India",
  skills: [
    "Frontend: JavaScript, TypeScript, React.js, Next.js, HTML, CSS, Tailwind CSS, Bootstrap, GSAP, Framer Motion, Radix UI, Lucide React, Zustand, Zod\nConcepts: Hooks, Responsive Design, Animation, Performance Optimization, SEO",
    "Backend: Node.js, NestJS, Express.js, Next.js API Routes, REST API\nConcepts: Clean Architecture, Design Patterns, Scalable API Design",
    "System Design & Architecture: Microservices Architecture, Event-Driven Architecture, Caching Strategies (Redis), Message Queues (Kafka & RabbitMQ), Rate Limiting & Load Balancing",
    "Authentication & Security: JWT Authentication, NextAuth.js, Clerk, OAuth\nConcepts: OWASP Top 10, API Security, CSRF, XSS Protection",
    "Databases & Storage: MongoDB, Mongoose, PostgreSQL, Redis (Caching & Pub/Sub), Qdrant (Vector Database)\nConcepts: Query Optimization, Indexing & Performance Tuning, Caching Strategies, Transactions & Data Modeling",
    "AI / LLM Engineering: LangChain, Google Gemini API, Prompt Engineering, RAG (Retrieval-Augmented Generation), AI Agents, Vector Databases",
    "DevOps & Deployment: Docker, GitHub Actions, CI/CD, Vercel\nCloud: AWS (EC2, S3, RDS, Lambda)\nConcepts: Deployment Strategies, Infrastructure Basics",
    "Testing: Unit testing (Jest), Integration testing, E2E (Playwright)",
    "Tools & Version Control: Git, GitHub",
  ],
  social: {
    github: "https://github.com/MOTAHAR124",
    email: "mdmotahar822@gmail.com",
    linkedin :"https://www.linkedin.com/in/md-motahar",
    instagram: "https://www.instagram.com/syedmotahar/",
  },
};

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    _id: "work-1",
    company: "Mistry Bhejo",
    title: "Full Stack Developer",
    location: "Remote",
    startDate: "2024",
    endDate: "Present",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Key contributions included:\n- Executed digital marketing initiatives that improved lead generation and strengthened brand visibility.\n- Maintained and enhanced the company website with responsive UI updates, basic SEO improvements, and cross-browser compatibility fixes.\n- Conducted on-site inspections to ensure service quality, proper execution, and adherence to operational standards.\n- Coordinated effectively between clients and service professionals to improve delivery outcomes and customer satisfaction.",
          },
        ],
      },
    ],
  },
  {
    _id: "work-2",
    company: "Freelance",
    title: "Full Stack Developer",
    location: "Remote",
    startDate: "2023",
    endDate: "2024",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Developed and maintained scalable full-stack web applications across frontend and backend systems, collaborating with cross-functional teams to deliver reliable, high-performance solutions. Applied core skills in React, Next.js, TypeScript, Node.js, Express.js, MongoDB, and Tailwind CSS throughout the development lifecycle.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Key responsibilities included:\n- Built and maintained full-stack applications using React, Next.js, Node.js, Express.js, and MongoDB.\n- Designed and implemented RESTful APIs, integrated third-party services, and supported secure authentication flows.\n- Developed responsive, user-friendly interfaces with Tailwind CSS and optimized frontend performance for better user experience.\n- Contributed to database design, backend architecture, debugging, and overall system optimization using TypeScript and modern development practices.",
          },
        ],
      },
    ],
  },
];

export const EDUCATION: Education[] = [
  // {
  //   _id: "education-1",
  //   school: "St. Joseph's & Mary's School",
  //   degree: "Higher Secondary (12th Standard) ",
  //   startDate: "2018",
  //   endDate: "2018",
  // },
  // {
  //   _id: "education-2",
  //   school: "A.J.C. Bose College, University of Calcutta",
  //   degree:
  //     "Bachelor of Science (Physics) (Coursework completed; degree not finished)",
  //   startDate: "2020",
  //   endDate: "2023",
  // },
];

// Only 4 projects with images from portfolio-8
export const PROJECTS: Project[] = [
  {
    _id: "project-1",
    title: "AI-Powered Travel Planner",
    description: [
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Built an AI-powered travel planning platform that generates personalized, end-to-end itineraries in seconds.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Matched user preferences with destination context to deliver optimized daily schedules for faster planning.",
          },
        ],
      },
    ],
    technologies: ["Nest.js", "Responsive", "Tailwind CSS","TypeScript", "Node.js", "Gemini API", "Nest Auth", "LangChain"],
    image: {
      asset: {
        url: "/projects/project-1.webp",
      },
    },
    links: [
      {
        title: "Source Code",
        url: "https://github.com/MOTAHAR124/AI-Trip-Planner",
        type: "code",
      },
      {
        title: "Live Demo",
        url: "https://ai-trip-planner-pi-taupe.vercel.app",
        type: "demo",
      },
    ],
  },
  {
    _id: "project-2",
    title: "Mistry Bhejo",
    description: [
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Developed a marketplace platform connecting users with verified home improvement professionals and material suppliers.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Focused on a reliable, user-friendly experience for smoother residential and commercial project execution.",
          },
        ],
      },
    ],
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Express.js", "REST API", "mySQL"],
    image: {
      asset: {
        url: "/projects/project-2.webp",
      },
    },
    links: [
      {
        title: "Source Code",
        url: "#",
        type: "code",
      },
      {
        title: "Live Demo",
        url: "https://mistrybhejo.com",
        type: "demo",
      },
    ],
  },
  {
    _id: "project-3",
    title: "Gemini Clone",
    description: [
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Developed a full-stack AI assistant platform with real-time Gemini-style chat, authentication, PDF question answering, AI PDF generation, and image analysis.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Built the frontend using Next.js, TypeScript, and Tailwind CSS, with a responsive chat-focused user interface.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Created a modular NestJS backend with JWT authentication, Google OAuth, MongoDB persistence, Gemini API integration, and Qdrant-based vector search.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Implemented PDF RAG using document chunking, embeddings, and semantic retrieval to provide accurate document-based answers.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Added production-focused features including validation, rate limiting, secure headers, CI/CD workflows, and deployment configuration.",
          },
        ],
      },
    ],
    technologies: ["Next js", "Tailwind CSS", "Responsive", "Google Auth","JWT Auth", "Gemini API", "Nest Js", "MongoDB", "Qdrant", "TypeScript"],
    image: {
      asset: {
        url: "/projects/project-3.webp",
      },
    },
    links: [
      {
        title: "Source Code",
        url: "https://github.com/MOTAHAR124/Gemini_Clone",
        type: "code",
      },
      {
        title: "Live Demo",
        url: "https://gemini-clone-frontend-iota.vercel.app/login",
        type: "demo",
      },
    ],
  },
  {
    _id: "project-4",
    title: "OCHI Animated Website",
    description: [
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Engineered an OCHI-inspired animated website using Next.js 16, React, and Tailwind CSS.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Built a multi-page experience (Home, About, Services, Work, Insights, Contact) with reusable section-based components.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Implemented smooth scrolling with Lenis and advanced interactions using Framer Motion and GSAP.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Developed an interactive cursor-follow eye animation across key sections and CTAs.",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            text: "Refined typography, interaction states, and responsive behavior to match the intended visual language.",
          },
        ],
      },
    ],
    technologies: ["Next js", "Tailwind CSS", "GSAP","LENIS", "Locomotive Scroll", "Framer Motion",],
    image: {
      asset: {
        url: "/projects/project-4.webp",
      },
    },
    links: [
      {
        title: "Source Code",
        url: "https://github.com/MOTAHAR124/OCHI-new.git",
        type: "code",
      },
      {
        title: "Live Demo",
        url: "https://ochi-new-sepia.vercel.app",
        type: "demo",
      },
    ],
  },
];
