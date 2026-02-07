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
  // All skills from portfolio-8: Frontend (5) + Backend (3) + Tools (4) = 12 skills
  skills: [
    "Next.js 15",
    "React",
    "TailwindCSS",
    "JavaScript",
    "Framer Motion",
    "Node.js",
    "Nest.js",
    "MongoDB",
    "Express.js",
    "VS Code",
    "Postman",
    "Photoshop",
    "Git",
  ],
  social: {
    github: "https://github.com/MOTAHAR124",
    email: "mdmotahar822@gmail.com",
    linkedin :"https://www.linkedin.com/in/md-motahar",
  },
};

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    _id: "work-1",
    company: "SelectSkillSet",
    title: "Frontend Developer",
    location: "Remote",
    startDate: "2024",
    endDate: "Present",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Developing modern, responsive frontend applications with focus on user experience and performance. Working with cutting-edge technologies to build scalable web solutions.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Key responsibilities include building responsive and interactive user interfaces using React and Next.js, implementing modern UI/UX designs with TailwindCSS and Framer Motion, optimizing application performance and ensuring cross-browser compatibility, and collaborating with design and backend teams to deliver high-quality features.",
          },
        ],
      },
    ],
  },
  {
    _id: "work-2",
    company: "Tekisky",
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
            text: "Developed and maintained full-stack web applications, working on both frontend and backend systems. Collaborated with cross-functional teams to deliver robust software solutions.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Key responsibilities included developing and maintaining full-stack web applications using React, Node.js, and MongoDB, implementing RESTful APIs and integrating third-party services, building responsive user interfaces and optimizing application performance, and working on database design and backend architecture.",
          },
        ],
      },
    ],
  },
];

export const EDUCATION: Education[] = [
  // Add your education details here if needed
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
            text: "A comprehensive cloud management platform for monitoring, managing, and optimizing multi-cloud infrastructure. Features real-time metrics, cost analysis, automated scaling, and security compliance monitoring across AWS, Azure, and GCP.",
          },
        ],
      },
    ],
    technologies: ["React js", "Tailwind CSS", "Locomotive Scroll", "Framer Motion",],
    image: {
      asset: {
        url: "/projects/project-4.webp",
      },
    },
    links: [
      {
        title: "Source Code",
        url: "https://github.com/MOTAHAR124/OCHI.git",
        type: "code",
      },
      {
        title: "Live Demo",
        url: "https://ochi-phi-flax.vercel.app",
        type: "demo",
      },
    ],
  },
];

