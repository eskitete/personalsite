import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Terminal, Github, Download, MessageCircle, Mail, ExternalLink, FileText, X, Menu, Briefcase, Calendar, Building2 } from 'lucide-react';
import GradientPixelField from '../components/ui/gradient-dots';

const skills = [
  { name: 'JavaScript/TypeScript', level: 'Advanced' },
  { name: 'Python', level: 'Advanced' },
  { name: 'Java', level: 'Experienced' },
  { name: 'C#', level: 'Experienced' },
  { name: 'HTML/CSS', level: 'Advanced' },
  { name: 'C/C++', level: 'Experienced' }
];

const technologies = [
  { name: 'AWS (EC2, S3)', level: 'Experienced' },
  { name: 'Azure', level: 'Experienced' },
  { name: 'Docker', level: 'Experienced' },
  { name: 'Git/GitHub', level: 'Advanced' },
  { name: 'Linux', level: 'Advanced' },
  { name: 'Wireshark', level: 'Advanced' },
  { name: 'Ghidra', level: 'Experienced' },
  { name: 'SQL/DynamoDB', level: 'Advanced' }
];

const workExperiences = [
  {
    title: 'STEM + C Research Assistant',
    company: 'Texas A&M University',
    date: 'Sep 2024 - Sep 2025',
    bullets: [
      'Researched the role of block coding and 3D printing in improving STEM engagement among K-12 students, supporting curriculum development and learning assessment.',
      'Helped design a custom block coding platform and created 3D-printed educational tools, contributing to both classroom instruction and research data collection.'
    ]
  },
  {
    title: 'Information Technology Intern',
    company: 'Harmony School of Excellence',
    date: 'Jun 2021 - Aug 2022',
    bullets: [
      'Implemented and configured Windows systems for faculty and students, linking them to Azure Active Directory for streamlined device and user management.',
      'Provided comprehensive technical support services, including repairs of computers and electronic appliances.',
      'Maintained LAN infrastructure through cabling, switch configuration, and network troubleshooting, improving uptime and ensuring a stable school-wide connection.'
    ]
  },
  {
    title: 'Manager',
    company: 'Houston Parks and Recreation',
    date: 'Jun 2022 - Aug 2022',
    bullets: [
      'Successfully directed the operations of the Freed Community Center, overseeing daily activities and ensuring the smooth running of the facility.'
    ]
  }
];

const projects = [
  {
    title: 'IRL Streaming Platform',
    description: 'End-to-end IRL streaming ecosystem: edge capture device, Go-based NAS backend, and React web portals for creators and editors. Features RBAC, fault-tolerant media segmentation, and auto-sync on reconnect.',
    technologies: ['Go', 'React', 'SQLite', 'TypeScript', 'RBAC'],
    link: 'https://github.com/eskitete',
    github: 'https://github.com/eskitete'
  },
  {
    title: 'Hardware-Backed 2FA Security Key',
    description: 'Custom 2FA firmware on the ESP8266 (fido-lite) that signs cryptographic challenges via USB-Serial. Uses Flash as an emulated Secure Element to store Ed25519 keypairs with brute-force and side-channel mitigations.',
    technologies: ['C++', 'ESP8266', 'Ed25519', 'Embedded', 'Cryptography'],
    link: 'https://github.com/eskitete',
    github: 'https://github.com/eskitete'
  },
  {
    title: 'CAN-Bus Anomaly Detector',
    description: 'Python-based tool for detecting anomalies in CAN bus traffic — the communication backbone of modern vehicles. Designed for automotive cybersecurity research and intrusion detection.',
    technologies: ['Python', 'CAN Bus', 'Anomaly Detection', 'Cybersecurity'],
    link: 'https://github.com/eskitete',
    github: 'https://github.com/eskitete'
  },
  {
    title: 'Adversary Emulation Pack',
    description: 'PowerShell-based adversary emulation toolkit for red team exercises. Simulates real-world attack TTPs to test detection and response capabilities against active directory and Windows environments.',
    technologies: ['PowerShell', 'Red Team', 'Active Directory', 'MITRE ATT&CK'],
    link: 'https://github.com/eskitete',
    github: 'https://github.com/eskitete'
  },
  {
    title: 'AI Stock Predictor',
    description: 'Machine learning pipeline for stock price prediction. Ingests historical market data, engineers features, and trains models to forecast near-term price movements.',
    technologies: ['Python', 'Machine Learning', 'Finance', 'Data Science'],
    link: 'https://github.com/eskitete',
    github: 'https://github.com/eskitete'
  },
  {
    title: 'Embedded Linux Bringup',
    description: 'Low-level C project for bringing up an embedded Linux system from scratch — including bootloader configuration, device tree setup, and driver initialization.',
    technologies: ['C', 'Linux', 'Embedded Systems', 'Device Trees'],
    link: 'https://github.com/eskitete',
    github: 'https://github.com/eskitete'
  },
  {
    title: 'Sports "Higher or Lower" Game',
    description: 'NBA and NFL Higher or Lower web game built with React. Players guess which athlete leads in a stat. Python pipeline pre-fetches and normalizes player data into JSON.',
    technologies: ['JavaScript', 'React', 'Python', 'Vite'],
    link: 'https://github.com/eskitete/HigherLower',
    github: 'https://github.com/eskitete/HigherLower'
  },
  {
    title: 'Robot Hand',
    description: 'Python-controlled robotic hand using computer vision for gesture recognition and servo actuation. Maps hand pose landmarks to physical finger movements in real time.',
    technologies: ['Python', 'OpenCV', 'Servo Control', 'Computer Vision'],
    link: 'https://github.com/eskitete/robot_hand',
    github: 'https://github.com/eskitete/robot_hand'
  },
  {
    title: 'Robot Head (Eye/Jaw Control)',
    description: 'Animatronic robot head that tracks faces in real time using OpenCV, driving servo-controlled eyes and jaw to follow the target and react to motion.',
    technologies: ['Python', 'OpenCV', 'Raspberry Pi', 'Servo Control'],
    link: 'https://github.com/eskitete/Robot-Head',
    github: 'https://github.com/eskitete/Robot-Head'
  },
  {
    title: 'FTC Robot (2022–2023)',
    description: 'FIRST Tech Challenge competition robot with full tele-op and autonomous modes. Implemented encoder-based motion, sensor fusion, and modular subsystem architecture.',
    technologies: ['Java', 'FTC SDK', 'Robotics', 'Autonomous Control'],
    link: 'https://github.com/eskitete/FTC-2022-2023',
    github: 'https://github.com/eskitete/FTC-2022-2023'
  },
  {
    title: 'STEM + C Research Platform',
    description: 'Custom block coding platform and 3D-printed educational kits for improving STEM engagement among K-12 students at Texas A&M, supporting curriculum development and learning assessment.',
    technologies: ['Block Coding', '3D Printing', 'Education', 'Research'],
    link: 'https://titil.tamu.edu/stemc-lessonplans/',
    github: null
  }
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export function Home() {
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [allowAnimatedBackground, setAllowAnimatedBackground] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setAllowAnimatedBackground(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen text-white font-['Ubuntu'] relative">
      {/* Main background */}
      <div className="absolute inset-0 bg-[#1B1B1E] z-0"></div>
      
      {/* Gradient Pixel Field */}
      {!prefersReducedMotion && allowAnimatedBackground && (
        <GradientPixelField
          className="absolute inset-0 z-10"
          pixelSize={0.75}
          spacing={5}
          colorCycleDuration={6}
          cursorRadius={50}
          warpStrength={25}
          backgroundColor="transparent"
        />
      )}
      
      {/* Content wrapper */}
      <div className="relative z-20">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B1B1E]/30 backdrop-blur-lg border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg sm:text-xl font-bold tracking-wide text-white"
            >
              RAFAY SYED
            </motion.div>
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen(prev => !prev)}
              className="lg:hidden text-gray-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileNavOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileNavOpen(false)}
                className="fixed inset-0 z-40 bg-black"
              />
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed top-[64px] left-4 right-4 z-50 rounded-2xl bg-[#1B1B1E]/90 backdrop-blur-xl border border-white/10 shadow-xl p-6 space-y-4 lg:hidden"
              >
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="block text-base font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

      {/* Hero Section */}
      <header id="home" className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center lg:text-left"
              >
                <h5 className="text-sm font-medium text-white/60 mb-4">Hello I'm</h5>
                <h1 className="text-4xl lg:text-5xl font-medium text-white mb-4">
                  Rafay Syed
                </h1>
                <h5 className="text-sm font-medium text-white/60 mb-8">
                  Electronic Systems Engineering Technology Student & Cybersecurity Expert
                </h5>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:scale-105"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    View CV
                  </a>
                  <a 
                    href="#contact"
                    className="inline-flex items-center px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Let's Talk
                  </a>
                </div>

                <div className="flex justify-center lg:justify-start mt-8 space-x-4">
                  <a href="https://github.com/eskitete" target="_blank" rel="noopener noreferrer" 
                     className="p-3 rounded-full hover:bg-gray-700/50 text-gray-300 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/rafay-syed-463b83203/" target="_blank" rel="noopener noreferrer"
                     className="p-3 rounded-full hover:bg-gray-700/50 text-gray-300 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative w-72 h-72 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full"></div>
                  <div className="absolute inset-8 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full flex items-center justify-center">
                    <Shield className="w-16 h-16 lg:w-20 lg:h-20 text-blue-400" />
                  </div>
                </div>
              </motion.div>
            </div>
      
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h5 className="text-sm font-medium text-white/60 mb-4">Get To Know</h5>
            <h2 className="text-2xl font-medium text-[#A68F97] mb-12">About Me</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                I am a dedicated Electronic Systems Engineering Technology student at Texas A&M University with a passion for 
                cybersecurity and full-stack development. Currently pursuing my BS degree with a 3.8 GPA, I combine academic 
                excellence with hands-on experience in research, IT systems, and software development. As a National Cyber Scholar 
                with Honors and GFACT certified professional, I specialize in creating secure, efficient solutions that bridge 
                the gap between hardware and software systems.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:scale-105"
              >
                Let's Talk
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h5 className="text-sm font-medium text-white/60 mb-4">My Technical Skills</h5>
            <h2 className="text-2xl font-medium text-[#A68F97] mb-12">Experience & Expertise</h2>
          </motion.div>

          <div className="flex flex-col gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-medium text-[#A68F97] mb-6 text-center">Languages</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 rounded-full hover:bg-gray-800/80 hover:-translate-y-1 transition-all duration-300 border border-white/5 shadow-lg">
                    <h4 className="text-white font-medium whitespace-nowrap">{skill.name}</h4>
                    <span className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">{skill.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-medium text-[#A68F97] mb-6 text-center">Technologies and Tools</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 rounded-full hover:bg-gray-800/80 hover:-translate-y-1 transition-all duration-300 border border-white/5 shadow-lg">
                    <h4 className="text-white font-medium whitespace-nowrap">{tech.name}</h4>
                    <span className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">{tech.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <h3 className="text-xl font-medium text-[#A68F97] mb-8 text-center">Work Experience</h3>
              <div className="space-y-8">
                {workExperiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 md:pl-0">
                    <div className="md:grid md:grid-cols-12 gap-8">
                      {/* Timeline dot and line for mobile */}
                      <div className="absolute left-0 top-0 h-full w-px bg-white/10 md:hidden"></div>
                      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-blue-400 md:hidden"></div>
                      
                      {/* Left Column: Date & Company (Desktop) */}
                      <div className="md:col-span-3 mb-4 md:mb-0 md:text-right">
                        <div className="flex items-center md:justify-end gap-2 text-blue-400 font-medium mb-1">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span>{exp.date}</span>
                        </div>
                        <div className="flex items-center md:justify-end gap-2 text-gray-400 text-sm">
                          <Building2 className="w-4 h-4 shrink-0" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      
                      {/* Center Column: Timeline connecting visual (Desktop) */}
                      <div className="hidden md:flex flex-col items-center col-span-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500/20 border-2 border-blue-400 z-10 mt-1 shrink-0"></div>
                        <div className="w-px h-full bg-white/10 -mt-2"></div>
                      </div>
                      
                      {/* Right Column: Title & Bullets */}
                      <div className="md:col-span-8 pb-8">
                        <h4 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-blue-400 shrink-0" />
                          {exp.title}
                        </h4>
                        <ul className="space-y-3">
                          {exp.bullets.map((bullet, bIndex) => (
                            <li key={bIndex} className="text-gray-300 text-sm leading-relaxed flex items-start">
                              <span className="text-blue-400 mr-2 mt-1.5 shrink-0">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h5 className="text-sm font-medium text-white/60 mb-4">My Recent Projects</h5>
            <h2 className="text-2xl font-medium text-[#A68F97] mb-12">Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Terminal className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium text-sm"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {project.github ? 'View Live' : 'Learn More'}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex justify-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm text-sm font-medium text-blue-200 transition-all duration-300 hover:scale-105"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h5 className="text-sm font-medium text-white/60 mb-4">Get In Touch</h5>
            <h2 className="text-2xl font-medium text-[#A68F97] mb-12">Contact Me</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-white font-medium text-lg mb-2">Email</h4>
              <h5 className="text-sm text-white/60 mb-4">rafaysyed2100@gmail.com</h5>
              <a 
                href="mailto:rafaysyed2100@gmail.com" 
                className="inline-block text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Send a message
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-white font-medium text-lg mb-2">Messenger</h4>
              <h5 className="text-sm text-white/60 mb-4">Rafay Syed</h5>
              <a 
                href="#" 
                className="inline-block text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Send a message
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-white font-medium text-lg mb-2">LinkedIn</h4>
              <h5 className="text-sm text-white/60 mb-4">Rafay Syed</h5>
              <a 
                href="https://linkedin.com/in/rafay-syed-463b83203/" 
                className="inline-block text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Send a message
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-white font-medium text-lg mb-2">Resume</h4>
              <h5 className="text-sm text-white/60 mb-4">View CV</h5>
              <button 
                onClick={() => setIsResumeViewerOpen(true)}
                className="inline-block text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                View Resume
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-medium text-white mb-4">RAFAY SYED</h3>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a>
              <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Rafay Syed. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Resume Viewer Modal */}
      {isResumeViewerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl h-[90vh] bg-gray-900 rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Rafay Syed - Resume</h3>
              <button
                onClick={() => setIsResumeViewerOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="h-full p-4">
              <iframe
                src="/Resume.pdf"
                className="w-full h-full border-0 rounded"
                title="Resume PDF"
              />
            </div>
          </motion.div>
        </div>
      )}
      </div>
    </div>
  );
}
