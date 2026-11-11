
export const profile = {
  name: 'Siddharth Sahoo',
  fullName: 'Siddharth Susanta Kumar Sahoo',
  initials: 'SS',
  title: 'Full-Stack Developer',
  headline: 'Developer | Making Things Work', // LinkedIn headline
  titleAccent: 'growing into Cloud & DevOps',
  location: 'Chennai, Tamil Nadu',
  // Drop your photo at public/profile.jpg and set this to './profile.jpg'.
  photo: null as string | null,
  intro:
    'M.Tech CS student at SRM Chennai with a full-stack background. I’ve built production-grade web apps, worked with AWS, and shipped AI-powered systems under pressure — now I’m connecting those dots into scalable, automated systems.',
  quote: 'I care about how software actually runs in the real world, not just how it’s written.',
  resumeFile: './Siddharth_Sahoo_Resume.pdf',
  email: 'sahoosiddharth64@gmail.com',
  links: {
    github: 'https://github.com/sidsahoo1203',
    linkedin: 'https://www.linkedin.com/in/siddharth-sahoo-527b601ba',
    website: 'https://siddharthsahoo.in/',
  },
}

export const heroFacts = [
  { label: 'Currently', value: 'M.Tech CSE · SRM IST' },
  { label: 'Focus', value: 'Full-stack → Cloud & DevOps' },
  { label: 'Latest win', value: '1st place · SRM Techno Hackathon 2026' },
]

export const about = {
  summary:
    'My focus sits at the intersection of robust software development, system design and the practical implementation of new technologies — turning complex problems into efficient, automated solutions.',
  seeking: 'Actively looking for a full-time role.',
  background:
    'M.Tech in Computer Science & Engineering at SRM IST, Chennai (2025 – 2027), after a B.Tech in CSE from Parul University, Vadodara.',
  focus:
    'Full-stack web applications — MERN, Next.js and Spring Boot — and AI-powered systems built with Python, OpenCV and TensorFlow.',
  direction:
    'Cloud infrastructure and how systems scale in production. Looking for a role where I can build, learn, and gradually take ownership of how systems are delivered and run.',
  interests: ['Cloud infrastructure', 'Systems at scale', 'Automation', 'AI for social good'],
  strengths: ['Team Collaboration', 'Communication', 'Leadership', 'Adaptability & Quick Learning', 'Product Planning'],
  languages: [
    { name: 'Odia', level: 'Native' },
    { name: 'Gujarati', level: 'Native' },
    { name: 'Hindi', level: 'Full professional' },
    { name: 'English', level: 'Professional working' },
  ],
}

export type Experience = {
  company: string
  role: string
  start: string
  end: string
  location: string
  points: string[]
  tech: string[]
}

export const experience: Experience[] = [
  {
    company: 'EduSkills Foundation',
    role: 'Cloud Business Application Intern',
    start: '01/2026',
    end: '03/2026',
    location: 'Chennai',
    points: [
      'Completed a 10-week virtual internship in AWS Cloud Business Applications.',
      'Worked with AWS services for business communication and customer engagement — Amazon WorkMail, Amazon SES and Amazon Pinpoint — and Salesforce on AWS.',
      'Studied cloud migration concepts for VMware workloads and for moving SQL Server databases to Amazon Aurora.',
      'Explored Generative AI integration and enterprise generative-AI strategy during internship training.',
      'Gained hands-on exposure to enterprise cloud workflows and business application deployment concepts.',
      'Worked through labs and simulations covering security, monitoring, backup, disaster recovery and cost management.',
    ],
    tech: ['Amazon SES', 'Amazon Pinpoint', 'Amazon WorkMail', 'Salesforce on AWS', 'VMware', 'Amazon Aurora'],
  },
  {
    company: 'Webmyne Systems Pvt. Ltd.',
    role: 'Trainee Web Developer',
    start: '12/2024',
    end: '03/2025',
    location: 'Vadodara',
    points: [
      'Built modular, responsive React.js + Tailwind CSS interfaces for the Clean India Mission platform, presenting initiatives, campaigns and community impact across all devices.',
      'Developed back-end REST APIs with Node.js and Express.js for volunteer registrations, contact inquiries and event management.',
      'Designed MongoDB data models and schemas with Mongoose to store user roles, volunteer records and donation logs securely.',
      'Implemented token-based authentication (JWT) to restrict admin dashboard access to authorized users.',
      'Built and tested MERN stack modules in a team-based Git and GitHub workflow.',
    ],
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Git & GitHub'],
  },
  {
    company: 'byteXL TechEd Pvt Ltd.',
    role: 'Summer Internship',
    start: '05/2024',
    end: '07/2024',
    location: 'Vadodara',
    points: [
      'Learned Python programming fundamentals, Data Structures & Algorithms, and web development concepts.',
      'Strengthened problem-solving and aptitude skills through hands-on assignments and training modules.',
      'Hands-on training in Java, Python, DSA and SQL — applied directly in later full-stack projects and internships.',
    ],
    tech: ['Python', 'Java', 'DSA', 'SQL'],
  },
  {
    company: 'Slash Mark IT Solutions (OPC) Pvt. Ltd',
    role: 'Full Stack Web Development Intern',
    start: '01/2024',
    end: '03/2024',
    location: 'Telangana',
    points: [],
    tech: [],
  },
  {
    company: 'Ministry of Cooperation × AICTE',
    role: 'National Cooperatives Data Repository Intern',
    start: '12/2022',
    end: '02/2023',
    location: 'Vadodara',
    points: [
      'Worked with the District DRCS Nodal Officer on the National Cooperatives Data Repository.',
      'Submitted cooperative society details for official approval and reported progress regularly.',
      'Gained exposure to public-sector data management.',
    ],
    tech: [],
  },
]

export type Project = {
  id: string
  name: string
  tagline: string
  summary: string
  context?: string
  details: string[]
  highlights?: string[]
  tech: string[]
  /** kind 'live' = deployed site, 'code' = GitHub repository */
  links?: { kind: 'live' | 'code'; url: string }[]
  image?: string
  /** Hue (0–360) used for the card's glow and generated cover. */
  hue: number
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'disastereye',
    name: 'DisasterEye',
    tagline: 'AI satellite damage assessment',
    summary:
      'Shows relief teams which areas were hit hardest after a disaster — compares before/after satellite photos, maps the damage, ranks zones by urgency and estimates the people affected.',
    context: 'SRM Techno Hackathon 2026 — AI for Social Good',
    details: [
      'Built an AI satellite damage assessment tool using OpenCV, TensorFlow & Streamlit.',
      'Generates damage heatmaps and resource-priority reports so relief can go where it’s needed first.',
    ],
    highlights: ['Won 1st place among 50+ teams in a 24-hour national hackathon'],
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Streamlit'],
    image: './projects/disastereye.webp',
    links: [{ kind: 'code', url: 'https://github.com/sidsahoo1203/DisasterEye' }],
    hue: 22,
    featured: true,
  },
  {
    id: 'linguaverse',
    name: 'LinguaVerse AI',
    tagline: 'Smart government scheme discovery',
    summary:
      'Tells Indian citizens which government benefits they qualify for. Users talk to it in Hindi, English or Hinglish; it matches them to schemes and fills in the forms.',
    context: 'LinguaVerse: Multilingual Generative AI Hackathon, SRM IST',
    details: [
      'Built a full-stack AI platform for scheme discovery via natural language — text or voice in Hindi/English/Hinglish.',
      'Developed SchemeMatch AI (a reverse eligibility engine) and VoiceScheme AI (Web Speech API).',
      'Implemented FormFriend AI for auto-filled PDFs, plus a Recharts dashboard visualising match scores across 8+ schemes (PM-KISAN, Ayushman Bharat and more).',
    ],
    tech: ['Next.js 14', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Web Speech API', 'Recharts'],
    image: './projects/linguaverse.webp',
    links: [{ kind: 'live', url: 'https://lingua-verse-ai-seven.vercel.app/' }, { kind: 'code', url: 'https://github.com/sidsahoo1203/LinguaVerse-AI' }],
    hue: 255,
    featured: true,
  },
  {
    id: 'valence',
    name: 'Valence Chemical Group',
    tagline: 'B2B chemical ordering platform',
    summary:
      'An online store where business buyers order industrial chemicals — with direct Stripe checkout and a request-a-quote flow that staff handle from an admin dashboard.',
    details: [
      'Built two ways to buy, because bulk chemical buyers usually need a custom quote first: direct checkout with Stripe, and a request-a-quote process managed from an admin dashboard.',
      'Protected login and payments against common attacks.',
      'Set up to deploy on Vercel and Render.',
    ],
    highlights: ['90+ automated checks confirm the core features work'],
    tech: ['React 19', 'Vite', 'Node.js', 'Express 5', 'MongoDB Atlas', 'Stripe', 'Cloudinary', 'Vercel', 'Render'],
    image: './projects/valence.webp',
    links: [{ kind: 'code', url: 'https://github.com/sidsahoo1203/Valence-Chemical-Group' }],
    hue: 170,
    featured: true,
  },
  {
    id: 'companyos',
    name: 'CompanyOS',
    tagline: 'Operations platform for digital agencies',
    summary:
      'A shared workspace where agencies keep their documents, procedures and approvals in one place — with several companies on the same system, each one’s data kept strictly private.',
    details: [
      'Enforced tenant data isolation at the database level.',
      'Backed it with automated tests, including end-to-end and accessibility checks.',
      'Deploys to the cloud on Render.',
    ],
    tech: ['Next.js', 'TypeScript', 'Render'],
    image: './projects/companyos.webp',
    links: [{ kind: 'live', url: 'https://companyos-bxk6.onrender.com/' }, { kind: 'code', url: 'https://github.com/sidsahoo1203/CompanyOS' }],
    hue: 150,
    featured: true,
  },
  {
    id: 'bharatassist',
    name: 'BharatAssist AI',
    tagline: 'Safe AI assistant with automated delivery',
    summary:
      'An extension of LinguaVerse AI for a university course: ML models that recognise 12 Indian languages and block or flag unsafe messages before they reach a public chatbot.',
    context: 'University course project',
    details: [
      'Trained machine-learning models that recognise 12 Indian languages and block or flag unsafe messages.',
      'Packaged the app in Docker and set up automated testing and builds with GitHub Actions.',
    ],
    tech: ['Machine Learning', 'Scikit-Learn', 'Docker', 'GitHub Actions'],
    links: [{ kind: 'code', url: 'https://github.com/sidsahoo1203/BharatAssist' }],
    hue: 235,
  },
  {
    id: 'kaam247',
    name: 'Kaam247',
    tagline: 'Service marketplace & workforce management',
    summary: 'A full-stack service marketplace connecting users with local providers.',
    context: 'Co-founder',
    details: [
      'Contributed to frontend and backend using React.js, Node.js, Express.js and MongoDB.',
      'Designed dashboard modules for service listings, booking management and authentication.',
      'Collaborated on product planning and UI/UX improvements.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    links: [{ kind: 'live', url: 'https://kaam247.in/dashboard' }],
    hue: 45,
  },
  {
    id: 'meditrack',
    name: 'MediTrack',
    tagline: 'Hospital management information system',
    summary:
      'Runs a hospital’s daily operations, from appointments to billing — replacing phone bookings and paper records.',
    details: [
      'Built a role-based platform for patients, doctors, staff and admins: registration, doctor scheduling, appointment booking and EMR management.',
      'Patients book online without double bookings; staff manage a live queue across several screens.',
      'Integrated an in-hospital pharmacy store that tracks its own stock, with Razorpay payments and printable receipts.',
      'Dashboards for doctors (appointments, prescriptions) and admins (inventory, billing, reports).',
    ],
    tech: ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay API'],
    image: './projects/meditrack.webp',
    links: [{ kind: 'live', url: 'https://meditrack-site.netlify.app/' }],
    hue: 210,
  },
  {
    id: 'libraro',
    name: 'Libraro',
    tagline: 'Enterprise library management system',
    summary: 'A dual-portal (Admin/Student) platform for running a university library and cutting manual record-keeping.',
    context: 'M.Tech project',
    details: [
      'JWT authentication, real-time inventory tracking and automated overdue alerts.',
      'QR-code student IDs for instant, single-scan book checkout.',
      'AI-powered book recommendations, waitlist automation, and Stripe payments for fines.',
      'Dashboards that show librarians how the collection is being used.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe API', 'JWT'],
    links: [{ kind: 'live', url: 'https://library-management-system-two-delta.vercel.app/' }, { kind: 'code', url: 'https://github.com/sidsahoo1203/Library-Management-System' }],
    hue: 280,
  },
  {
    id: 'student-management',
    name: 'Student Management System',
    tagline: 'Production-ready backend',
    summary:
      'An application for managing students, courses and enrollments — used to practise taking a simple app to production standard.',
    details: [
      'Added secure login, monitoring dashboards and Docker containers.',
      'GitHub Actions pipeline runs tests and security scans, and stops a release if it finds a serious vulnerability.',
      'Load-tested the app to check how it performs.',
    ],
    tech: ['Java', 'Spring Boot', 'Docker', 'GitHub Actions'],
    hue: 195,
  },
  {
    id: 'tomato',
    name: 'Tomato',
    tagline: 'Food delivery application',
    summary: 'A full-stack food ordering app — browse menus, explore food options and place orders.',
    details: ['Built with React and designed to be simple and user-friendly.'],
    tech: ['React.js', 'Tailwind CSS'],
    image: './projects/tomato.webp',
    links: [{ kind: 'code', url: 'https://github.com/sidsahoo1203/Tomato-React-Application' }],
    hue: 8,
  },
]

export type SkillGroup = { id: string; label: string; items: string[] }

export const skills: SkillGroup[] = [
  { id: 'lang', label: 'Languages', items: ['Java', 'JavaScript', 'Python', 'TypeScript'] },
  {
    id: 'fe',
    label: 'Front-End',
    items: ['HTML5', 'CSS', 'React.js', 'Next.js 14', 'Redux', 'Tailwind CSS', 'Thymeleaf'],
  },
  {
    id: 'be',
    label: 'Back-End',
    items: ['Node.js', 'Express.js', 'FastAPI', 'Spring Boot 3.5', 'JWT Authentication', 'OAuth2'],
  },
  { id: 'db', label: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'H2 Database'] },
  {
    id: 'cloud',
    label: 'Cloud & Delivery',
    items: ['AWS (SES, Pinpoint)', 'Docker', 'GitHub Actions', 'Vercel', 'Render', 'Netlify'],
  },
  {
    id: 'ai',
    label: 'AI & Data Visualization',
    items: ['OpenCV', 'TensorFlow', 'Scikit-Learn', 'Streamlit', 'Plotly', 'Pandas', 'Web Speech API'],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    items: ['Git & GitHub', 'Postman', 'MongoDB Compass', 'Stripe API', 'Razorpay API'],
  },
]

export type Education = {
  degree: string
  field?: string
  institution: string
  start: string
  end: string
  location: string
  score: string
  board?: string
  description?: string
  activities?: string[]
  major?: boolean
}

export const education: Education[] = [
  {
    degree: 'Master of Technology (M.Tech)',
    field: 'Computer Science & Engineering',
    institution: 'SRM Institute of Science and Technology',
    start: '08/2025',
    end: '07/2027 (expected)',
    location: 'Chennai, Tamil Nadu',
    score: 'CGPA 7.54 / 10',
    description:
      'Combining hands-on work in full-stack development, cloud computing and applied AI with academic research in system performance and optimization. Active in hackathons, collaborative technical projects and applied engineering research.',
    activities: ['AWS Cloud Club', 'IEEE / ACM Student Branch', 'Technical Hackathons', 'Student Mentorship'],
    major: true,
  },
  {
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science & Engineering',
    institution: 'Parul University',
    start: '06/2021',
    end: '05/2025',
    location: 'Vadodara, Gujarat',
    score: 'CGPA 6.72 / 10',
    description:
      'Focused on web development, databases and software engineering. Completed multiple internships (Webmyne Systems, Haronex Technology, Slash Mark IT, byteXL) and built full-stack projects including a hospital management system and the Kaam247 service marketplace.',
    activities: ['Developer Clubs', 'Hackathons', 'Full-Stack Project Teams', 'Technical Research Writing'],
    major: true,
  },
  {
    degree: 'Higher Secondary (HSC) — 12th, PCM',
    institution: 'P. P. Savani School',
    start: '04/2019',
    end: '03/2021',
    location: 'Ankleshwar, Gujarat',
    score: '72%',
    board: 'CBSE',
    description: 'Played indoor games — carrom, chess and badminton.',
  },
  {
    degree: 'Secondary (SSC) — 10th',
    institution: 'Swami Vivekanand Academy',
    start: '04/2009',
    end: '03/2019',
    location: 'Ankleshwar, Gujarat',
    score: '71.16%',
    board: 'CBSE',
    description: 'Took part in sports — football, cricket, kho kho, races and marathons.',
  },
]

export type Achievement = {
  title: string
  badge: string
  rank?: 'gold' | 'top' | 'part'
  date: string
  venue: string
  points: string[]
  /** e.g. './achievements/srm-techno-hackathon.webp' — file goes in public/achievements/ */
  image?: string
  link?: string
}

export const achievements: Achievement[] = [
  {
    title: 'SRM Techno Hackathon 2026 — AI for Social Good',
    badge: '1st place · Winning team',
    rank: 'gold',
    date: '01/2026',
    image: undefined, // './achievements/srm-techno-hackathon.webp'
    link: undefined,
    venue: 'SRM IST',
    points: [
      'Won first place among 50+ teams in a 24-hour national hackathon on AI for disaster management and social impact.',
      'Built DisasterEye — AI satellite damage assessment with OpenCV, TensorFlow & Streamlit.',
    ],
  },
  {
    title: 'Hack2Health Hackathon',
    badge: '5th position · Top 5 finalist',
    rank: 'top',
    date: '02/2026',
    image: undefined, // './achievements/hack2health.webp'
    link: undefined,
    venue: 'SRM IST',
    points: [
      'Healthcare AI hackathon focused on medical image processing and clinical NLP.',
      'Developed AI-powered backend services for medical image analysis and NLP-based clinical diagnosis support using Python.',
    ],
  },
  {
    title: 'LinguaVerse: Multilingual Generative AI Hackathon',
    badge: 'Finalist',
    rank: 'top',
    date: '03/2026',
    image: undefined, // './achievements/linguaverse-hackathon.webp'
    link: undefined,
    venue: 'SRM IST',
    points: [
      'Built a voice-first platform to bridge the digital divide for non-English-speaking citizens.',
      'Created LinguaVerse AI with Next.js, FastAPI & Web Speech API, supporting Hindi/English/Hinglish.',
    ],
  },
  {
    title: 'AI/ML Healthcare Hackathon 2024 — MedinovAI',
    badge: 'Participant',
    rank: 'part',
    date: '07/2024',
    image: undefined, // './achievements/medinovai-hackathon.webp'
    link: undefined,
    venue: 'Parul University',
    points: [
      'Contributed as front-end developer.',
      'Built Dermtech, an Angular-based diagnostic web platform with user authentication and a skin-disease prediction service.',
    ],
  },
]

/**
 * Images: drop files into public/achievements/ and set `image: './achievements/<file>'`.
 * `link` is optional (e.g. a Devfolio page, certificate or news post).
 */
export const publications: { title: string; image?: string; link?: string }[] = [
  { title: 'A Comprehensive Study on the Initiatives and Impact of the Clean India Mission', image: undefined, link: undefined },
]

export type Certification = {
  id: string
  name: string
  issuer: string
  /** "Mon YYYY" */
  issued?: string
  expires?: string
  credentialId?: string
  /** The LinkedIn "Show credential" URL */
  credentialUrl?: string
  skills: string[]
  /** e.g. './certificates/aws-ai-practitioner.webp' — file goes in public/certificates/ */
  image?: string
  /** Optional per-certificate logo/badge — overrides the issuer logo below */
  logo?: string
}

/**
 * Issuer logos shown on certification cards. Save files in public/logos/ (PNG or SVG,
 * square, transparent background works best) and replace `undefined` with the path.
 * Until a logo is set, the card shows a short text mark instead.
 */
export const issuerLogos: Record<string, string | undefined> = {
  'Amazon Web Services (AWS)': undefined, // './logos/aws.png'
  Fortinet: undefined, // './logos/fortinet.png'
  'Indian Institute of Remote Sensing (IIRS), ISRO': undefined, // './logos/iirs-isro.png'
  freeCodeCamp: undefined, // './logos/freecodecamp.png'
  'HP LIFE': undefined, // './logos/hp-life.png'
  'Parul University': undefined, // './logos/parul-university.png'
  Cisco: undefined, // './logos/cisco.png'
  'Google · Coursera': undefined, // './logos/google.png'
}

/**
 * Order = display order. Fill in credentialId / credentialUrl / image as you collect them;
 * anything left undefined is simply not shown.
 */
export const certifications: Certification[] = [
  {
    id: 'aws-ai-practitioner',
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Sep 2026',
    expires: 'Sep 2029',
    credentialId: undefined,
    credentialUrl: undefined,
    skills: ['Amazon Web Services (AWS)', 'Generative AI'],
    image: undefined, // './certificates/aws-ai-practitioner.webp'
  },
  {
    id: 'fortinet-nse3',
    name: 'Fortinet NSE 3 Certified in Cybersecurity',
    issuer: 'Fortinet',
    issued: 'Apr 2026',
    expires: 'Apr 2028',
    credentialId: undefined,
    credentialUrl: undefined,
    skills: ['Cybersecurity Architecture', 'Identity and Access Management (IAM)'],
    image: undefined, // './certificates/fortinet-nse3.webp'
  },
  {
    id: 'fortinet-fundamentals',
    name: 'Fortinet Certified Fundamentals Cybersecurity',
    issuer: 'Fortinet',
    issued: 'Mar 2026',
    expires: 'Apr 2028',
    credentialId: undefined,
    credentialUrl: undefined,
    skills: ['Cybersecurity Fundamentals', 'Threat Landscape Analysis'],
    image: undefined, // './certificates/fortinet-fundamentals.webp'
  },
  {
    id: 'fortinet-associate',
    name: 'Fortinet Certified Associate Cybersecurity',
    issuer: 'Fortinet',
    issued: 'Apr 2026',
    expires: 'Apr 2028',
    credentialId: undefined,
    credentialUrl: undefined,
    skills: ['Virtual Private Networks (VPN)', 'Firewall Management'],
    image: undefined, // './certificates/fortinet-associate.webp'
  },
  {
    id: 'isro-scientific-observations',
    name: 'Scientific Observations from Space',
    issuer: 'Indian Institute of Remote Sensing (IIRS), ISRO',
    issued: 'May 2026',
    skills: [],
    image: undefined, // './certificates/isro-scientific-observations.webp'
  },
  {
    id: 'isro-geodata-python-ml',
    name: 'Geodata Processing using Python and Machine Learning',
    issuer: 'Indian Institute of Remote Sensing (IIRS), ISRO',
    issued: 'May 2026',
    skills: [],
    image: undefined, // './certificates/isro-geodata-python-ml.webp'
  },
  {
    id: 'fcc-responsive-web-design',
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    issued: 'May 2025',
    credentialId: undefined,
    credentialUrl: undefined,
    skills: ['HTML5', 'Cascading Style Sheets (CSS)'],
    image: undefined, // './certificates/fcc-responsive-web-design.webp'
  },
  {
    id: 'hp-ai-for-beginners',
    name: 'AI for Beginners',
    issuer: 'HP LIFE',
    issued: 'Apr 2025',
    credentialUrl: undefined,
    skills: ['Artificial Intelligence (AI)'],
    image: undefined, // './certificates/hp-ai-for-beginners.webp'
  },
  {
    id: 'parul-operation-research',
    name: 'Operation Research and its Applications',
    issuer: 'Parul University',
    skills: [],
    image: undefined, // './certificates/parul-operation-research.webp'
  },
  {
    id: 'cisco-endpoint-security',
    name: 'Endpoint Security',
    issuer: 'Cisco',
    issued: 'Jun 2024',
    credentialUrl: undefined,
    skills: [],
    image: undefined, // './certificates/cisco-endpoint-security.webp'
  },
  {
    id: 'cisco-cybersecurity-essentials',
    name: 'Cybersecurity Essentials',
    issuer: 'Cisco',
    issued: 'Jun 2024',
    credentialUrl: undefined,
    skills: [],
    image: undefined, // './certificates/cisco-cybersecurity-essentials.webp'
  },
  {
    id: 'google-cybersecurity',
    name: 'Google Cybersecurity Certificate',
    issuer: 'Google · Coursera',
    issued: 'Jun 2024',
    credentialUrl: undefined,
    skills: [],
    image: undefined, // './certificates/google-cybersecurity.webp'
  },
  {
    id: 'cisco-intro-cybersecurity',
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    issued: 'Feb 2024',
    credentialUrl: undefined,
    skills: [],
    image: undefined, // './certificates/cisco-intro-cybersecurity.webp'
  },
]

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
