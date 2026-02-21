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
    "TypeScript",
    "Next.js 16",
    "React Js",
    "TailwindCSS",
    "JavaScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "GSAP",
    "Framer Motion",
    "Radix UI",
    "Lucide React",
    "Node.js",
    "Nest.js",
    "Next.js API Routes",
    "Python",
    "REST API",
    "NextAuth (Google OAuth)",
    "Clerk",
    "LangChain",
    "Google Gemini API",
    "MongoDB",
    "Express.js",
    "Git",
    "GitHub",
    "NumPy",
    "Responsive Design",
    "Debugging",
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
            text: "Worked across marketing, web development, and site inspection functions by executing digital marketing initiatives to generate leads and improve brand visibility, maintaining and enhancing the company website with responsive UI, basic SEO, and cross-browser compatibility, and conducting on-site inspections to ensure quality standards, proper execution, and customer satisfaction through effective coordination between clients and service professionals.",
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
            text: "Developed and maintained full-stack web applications by working across both frontend and backend systems. Collaborated with cross-functional teams to design and deliver scalable software solutions.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Key responsibilities included:\n• Building and maintaining full-stack applications using React, Node.js, and MongoDB\n• Designing and implementing RESTful APIs and integrating third-party services\n• Developing responsive, user-friendly interfaces and optimizing application performance\n• Contributing to database design, backend architecture, and system optimization",
          },
        ],
      },
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    _id: "education-1",
    school: "St. Joseph's & Mary's School",
    degree: "Higher Secondary (12th Standard) ",
    startDate: "2018",
    endDate: "2018",
  },
  {
    _id: "education-2",
    school: "A.J.C. Bose College, University of Calcutta",
    degree:
      "Bachelor of Science (Physics) (Coursework completed; degree not finished)",
    startDate: "2020",
    endDate: "2023",
  },
];

// Only 4 projects with images from portfolio-8
export const PROJECTS: Project[] = [
  {
    _id: "project-1",
    title: "AI-Powered Travel Planner",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "AI Trip Planner creates personalized, end-to-end itineraries in seconds. By matching your preferences with your destination, it delivers optimized daily schedules for a seamless and hassle-free planning experience.",
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
        children: [
          {
            _type: "span",
            text: "Mistry Bhejo is a Kolkata-based marketplace connecting users with verified home improvement professionals and material suppliers for seamless residential and commercial projects.",
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
        children: [
          {
            _type: "span",
            text: "Gemini-Clone is a functional web application designed to replicate the core experience of Google’s Gemini AI. Built with Next.js 16, it integrates the Google Gemini API to provide real-time, conversational AI responses.",
          },
        ],
      },
    ],
    technologies: ["Next js", "Tailwind CSS", "Responsive", "Clerk Auth", "Gemini API", "Nest Js"],
    image: {
      asset: {
        url: "/projects/project-3.webp",
      },
    },
    links: [
      {
        title: "Source Code",
        url: "https://github.com/MOTAHAR124/Gemini-Clone2",
        type: "code",
      },
      {
        title: "Live Demo",
        url: "https://gemini-clone2-three.vercel.app",
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
        children: [
          {
            _type: "span",
            text: "Replicated the OCHI-inspired animated website using Next.js 16, and Tailwind CSS.\n• Built a multi-page experience with Home, About, Services, Work, Insights, and Contact routes using reusable section-based components.\n• Implemented smooth scrolling with Lenis and motion effects with Framer Motion and GSAP for a high-fidelity interactive feel.\n• Created an interactive eye animation that follows the cursor across multiple sections and call-to-action blocks.",
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
