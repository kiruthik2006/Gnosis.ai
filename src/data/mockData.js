// Central mock data for Interview Agent

export const TRACKS = [
  {
    id: 'FRONTEND',
    title: 'FRONTEND',
    subtitle: 'Build interfaces and client-side applications.',
    iconName: 'Layout',
    recommended: false,
    desc: 'Focus on HTML, CSS, JavaScript, React, web performance, and browser APIs.'
  },
  {
    id: 'BACKEND',
    title: 'BACKEND',
    subtitle: 'Build APIs, servers and databases.',
    iconName: 'Server',
    recommended: false,
    desc: 'Focus on Node.js, databases, server logic, API design, and system architecture.'
  },
  {
    id: 'BOTH',
    title: 'BOTH',
    subtitle: 'Prepare for full-stack development.',
    iconName: 'Layers',
    recommended: true,
    recommendationText: 'Recommended path: Frontend → Backend',
    desc: 'Master client-side interfaces and seamless server-side database architecture.'
  }
];

export const FRONTEND_SKILLS = [
  { id: 'html', name: 'HTML', category: 'Markup', desc: 'Semantic tags, DOM structure, accessibility & SEO standards.' },
  { id: 'css', name: 'CSS', category: 'Styling', desc: 'Flexbox, Grid, animations, CSS variables & responsive layouts.' },
  { id: 'javascript', name: 'JavaScript', category: 'Language', desc: 'ES6+, closures, promises, event loop & DOM APIs.' },
  { id: 'react', name: 'React', category: 'Framework', desc: 'Hooks, virtual DOM, component lifecycle & state management.' },
  { id: 'java', name: 'Java', category: 'Language', desc: 'Object-oriented fundamentals & Web framework integration.' },
  { id: 'python', name: 'Python', category: 'Language', desc: 'Data structures, scripting & web server basics.' },
  { id: 'c', name: 'C', category: 'System', desc: 'Memory management, pointers & core algorithms.' },
  { id: 'cpp', name: 'C++', category: 'System', desc: 'Object-oriented C, STL containers & performance optimization.' }
];

export const BACKEND_SKILLS = {
  server: [
    { id: 'nodejs', name: 'Node.js', desc: 'Asynchronous event-driven JavaScript runtime.' },
    { id: 'python_be', name: 'Python', desc: 'Clean syntax for backend API services.' },
    { id: 'java_be', name: 'Java', desc: 'Robust enterprise multithreaded backend applications.' }
  ],
  framework: [
    { id: 'express', name: 'Express.js', desc: 'Minimalist web framework for Node.js.' },
    { id: 'django', name: 'Django', desc: 'High-level Python web framework.' },
    { id: 'springboot', name: 'Spring Boot', desc: 'Stand-alone Java production web framework.' }
  ],
  database: [
    { id: 'mongodb', name: 'MongoDB', desc: 'NoSQL document-oriented database.' },
    { id: 'mysql', name: 'MySQL', desc: 'Relational database management system.' },
    { id: 'postgresql', name: 'PostgreSQL', desc: 'Advanced open-source object-relational DB.' }
  ]
};

export const INITIAL_ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    skill: 'html',
    question: "What does semantic HTML primarily improve?",
    options: [
      { key: 'A', text: "Database query performance" },
      { key: 'B', text: "Accessibility and document structure", correct: true },
      { key: 'C', text: "JavaScript engine execution speed" },
      { key: 'D', text: "Network socket throughput" }
    ],
    explanation: "Semantic HTML uses meaningful tags (<article>, <nav>, <header>) that help screen readers, search engines, and browsers understand content structure."
  },
  {
    id: 2,
    skill: 'css',
    question: "In CSS Flexbox, which property controls the main-axis alignment of flex items?",
    options: [
      { key: 'A', text: "align-items" },
      { key: 'B', text: "justify-content", correct: true },
      { key: 'C', text: "align-content" },
      { key: 'D', text: "place-items" }
    ],
    explanation: "justify-content handles alignment along the main axis, while align-items handles alignment along the cross axis."
  },
  {
    id: 3,
    skill: 'javascript',
    question: "Which queue handles Promise callbacks in JavaScript execution?",
    options: [
      { key: 'A', text: "Callback (Macrotask) Queue" },
      { key: 'B', text: "Microtask Queue", correct: true },
      { key: 'C', text: "Call Stack Memory Buffer" },
      { key: 'D', text: "Render Task Queue" }
    ],
    explanation: "Promises (and process.nextTick / MutationObserver) schedule callbacks into the Microtask queue, which takes priority over the Callback (Macrotask) queue."
  },
  {
    id: 4,
    skill: 'react',
    question: "What is the primary benefit of React's Virtual DOM?",
    options: [
      { key: 'A', text: "Bypasses the browser CSS parser entirely" },
      { key: 'B', text: "Minimizes actual DOM manipulation via diffing", correct: true },
      { key: 'C', text: "Allows direct SQL database connections" },
      { key: 'D', text: "Replaces JavaScript engine compilation" }
    ],
    explanation: "React maintains a virtual representation of the DOM in memory, computes minimal differences (diffing), and updates only the necessary real DOM nodes."
  },
  {
    id: 5,
    skill: 'nodejs',
    question: "What is non-blocking I/O in Node.js?",
    options: [
      { key: 'A', text: "Executing heavy loops on multiple threads synchronously" },
      { key: 'B', text: "Delegating disk/network tasks to kernel/libuv while continuing execution", correct: true },
      { key: 'C', text: "Disabling browser security headers" },
      { key: 'D', text: "Running code without memory allocation" }
    ],
    explanation: "Node.js offloads async I/O requests to the system kernel or libuv thread pool, enabling the single JS thread to process incoming requests without blocking."
  }
];

export const ROADMAP_STEPS = [
  {
    id: 1,
    topic: 'JavaScript Fundamentals',
    time: '2 weeks',
    difficulty: 'Beginner',
    status: 'completed',
    courseName: 'JavaScript Essentials & ES6',
    progress: 100
  },
  {
    id: 2,
    topic: 'Advanced JavaScript & Event Loop',
    time: '3 weeks',
    difficulty: 'Intermediate',
    status: 'active',
    courseName: 'Deep Dive: Asynchronous JS & Engine Mechanics',
    progress: 60
  },
  {
    id: 3,
    topic: 'React Fundamentals & Component Architecture',
    time: '2 weeks',
    difficulty: 'Intermediate',
    status: 'locked',
    courseName: 'Modern React 19: Hooks & Context',
    progress: 0
  },
  {
    id: 4,
    topic: 'React Full-Stack Projects & State',
    time: '3 weeks',
    difficulty: 'Advanced',
    status: 'locked',
    courseName: 'Building Production Web Apps',
    progress: 0
  },
  {
    id: 5,
    topic: 'Frontend Interview Preparation',
    time: '1 week',
    difficulty: 'Advanced',
    status: 'locked',
    courseName: 'Mock Interviews & Algorithm Deep Dives',
    progress: 0
  },
  {
    id: 6,
    topic: 'FULL STACK INTERVIEW',
    time: 'Final Milestone',
    difficulty: 'Expert',
    status: 'locked',
    courseName: 'Live Adaptive AI Evaluation',
    progress: 0
  }
];

export const COURSES = [
  {
    id: 'c1',
    title: 'JavaScript Fundamentals',
    skills: ['JavaScript', 'ES6', 'DOM APIs'],
    difficulty: 'Beginner',
    duration: '8 hours',
    progress: 100,
    status: 'Completed',
    desc: 'Master core concepts including scope, closures, objects, and DOM manipulation.'
  },
  {
    id: 'c2',
    title: 'Advanced JavaScript & Event Loop',
    skills: ['Promises', 'Async/Await', 'Event Loop', 'Microtasks'],
    difficulty: 'Intermediate',
    duration: '12 hours',
    progress: 68,
    status: 'In Progress',
    desc: 'Unpack V8 memory, garbage collection, call stack execution, and event loop microtask queues.'
  },
  {
    id: 'c3',
    title: 'React Fundamentals',
    skills: ['React', 'Hooks', 'Virtual DOM'],
    difficulty: 'Intermediate',
    duration: '10 hours',
    progress: 0,
    status: 'Available',
    desc: 'Build modular UI components with useState, useEffect, custom hooks, and state management.'
  },
  {
    id: 'c4',
    title: 'Express.js & REST API Design',
    skills: ['Node.js', 'Express', 'Middleware', 'REST'],
    difficulty: 'Intermediate',
    duration: '14 hours',
    progress: 0,
    status: 'Locked',
    desc: 'Architect secure, scalable backend HTTP web APIs with routing and custom middleware.'
  },
  {
    id: 'c5',
    title: 'MongoDB & Database Architecture',
    skills: ['MongoDB', 'NoSQL', 'Indexing', 'Mongoose'],
    difficulty: 'Advanced',
    duration: '11 hours',
    progress: 0,
    status: 'Locked',
    desc: 'Design document schemas, aggregation pipelines, indexes, and database optimizations.'
  }
];

export const MOCK_INTERVIEW_SCRIPT = [
  {
    role: 'ai',
    text: "Welcome Alex! You recently completed Advanced JavaScript. Can you explain how the event loop handles asynchronous operations in JavaScript?",
    timestamp: "12:00 PM"
  },
  {
    role: 'user',
    text: "The event loop continuously monitors the Call Stack and the Task Queues. When the Call Stack is empty, it moves pending callbacks from the queue to the stack to be executed.",
    timestamp: "12:01 PM"
  },
  {
    role: 'ai',
    isAdaptiveFollowUp: true,
    text: "Good start. You mentioned task queues. Can you elaborate on the specific difference between the Microtask queue and the Callback (Macrotask) queue in terms of execution priority?",
    timestamp: "12:01 PM"
  }
];

export const EVALUATION_DATA = {
  score: 82,
  metrics: [
    { label: 'Technical Knowledge', val: 82 },
    { label: 'Problem Solving', val: 76 },
    { label: 'Communication', val: 88 },
    { label: 'Depth of Understanding', val: 79 }
  ],
  strengths: [
    "Strong JavaScript fundamentals and accurate understanding of single-threaded runtime principles",
    "Good explanation of asynchronous concepts including Promise microtask prioritization",
    "Articulate technical communication style with clear domain terminology"
  ],
  improvements: [
    "Event loop internal timer phases in Node.js (uv_run phase breakdown)",
    "System design considerations for high-concurrency event-driven architectures",
    "Database aggregation pipeline optimization strategies"
  ]
};
