import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Shield, Code, Terminal, Github, Download, MessageCircle, Mail, ExternalLink, FileText, X, ChevronLeft, ChevronRight, BookOpen, Menu } from 'lucide-react';
import GradientPixelField from '../components/ui/gradient-dots';
import { Link } from 'react-router-dom';
import { getRecentPosts } from '../lib/postStore';
import type { Post } from '../utils/posts';

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

const services = [
  {
    title: 'Full-Stack Development',
    description: 'Custom web applications using JavaScript, TypeScript, React, and modern development frameworks'
  },
  {
    title: 'Cloud Solutions',
    description: 'AWS and Azure cloud infrastructure setup, deployment, and management for scalable applications'
  },
  {
    title: 'Cybersecurity Consulting',
    description: 'Security assessments, vulnerability analysis, and implementation of secure development practices'
  }
];

const projects = [
  {
    title: 'Sports Higher or Lower Game',
    description: 'NBA and NFL "Higher or Lower" web game built with TypeScript and React, featuring statistical player comparisons and optimized performance.',
    technologies: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Python'],
    link: 'https://github.com/eskitete'
  },
  {
    title: 'AI-Powered Chatbot & Website Development',
    description: 'Built AI chatbots using n8n and make.com for local service businesses, with custom website integration and CRM handoff capabilities.',
    technologies: ['n8n', 'make.com', 'JavaScript', 'SQL', 'Google Drive API'],
    link: 'https://github.com/eskitete'
  },
  {
    title: 'STEM Research Platform',
    description: 'Custom block coding platform and 3D-printed educational tools for improving STEM engagement among K-12 students.',
    technologies: ['Block Coding', '3D Printing', 'Educational Technology'],
    link: 'https://github.com/eskitete'
  },
  {
    title: 'IT Infrastructure Management',
    description: 'Implemented Windows systems configuration and Azure Active Directory integration for educational institutions.',
    technologies: ['Windows Systems', 'Azure AD', 'Network Infrastructure', 'LAN Management'],
    link: 'https://github.com/eskitete'
  }
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' }
];

export function Home() {
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [allowAnimatedBackground, setAllowAnimatedBackground] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const blogPosts = useMemo<Post[]>(() => getRecentPosts(6), []);

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

  // Carousel navigation functions
  const nextBlogPost = () => {
    if (blogPosts.length === 0) return;
    setCurrentBlogIndex((prev) => (prev + 1) % blogPosts.length);
  };

  const prevBlogPost = () => {
    if (blogPosts.length === 0) return;
    setCurrentBlogIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

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

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <p className="text-gray-300 mb-8 leading-relaxed">
                I am a dedicated Electronic Systems Engineering Technology student at Texas A&M University with a passion for 
                cybersecurity and full-stack development. Currently pursuing my BS degree with a strong academic record, I combine academic 
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

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="text-center p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                <h3 className="text-3xl font-bold text-blue-400 mb-3">Academic Honors</h3>
                <h5 className="text-sm text-white/60 font-medium">Recognition</h5>
              </div>
              <div className="text-center p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                <h3 className="text-3xl font-bold text-blue-400 mb-3">GFACT</h3>
                <h5 className="text-sm text-white/60 font-medium">Certified</h5>
              </div>
              <div className="text-center p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                <h3 className="text-3xl font-bold text-blue-400 mb-3">4+</h3>
                <h5 className="text-sm text-white/60 font-medium">Projects</h5>
              </div>
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

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg font-medium text-[#A68F97] mb-6">Language</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                    <h4 className="text-white font-medium text-lg">{skill.name}</h4>
                    <span className="text-sm text-blue-400 font-medium bg-blue-500/10 px-3 py-1 rounded-full">{skill.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg font-medium text-[#A68F97] mb-6">Technology and Tool</h3>
              <div className="space-y-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                    <h4 className="text-white font-medium text-lg">{tech.name}</h4>
                    <span className="text-sm text-blue-400 font-medium bg-blue-500/10 px-3 py-1 rounded-full">{tech.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h5 className="text-sm font-medium text-white/60 mb-4">What I Offer</h5>
            <h2 className="text-2xl font-medium text-[#A68F97] mb-12">My Services</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
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
            {projects.map((project, index) => (
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
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Project
                </a>
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
              to="/blog/category/projects"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm text-sm font-medium text-blue-200 transition-all duration-300 hover:scale-105"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h5 className="text-sm font-medium text-white/60 mb-4">Latest Articles</h5>
            <h2 className="text-2xl font-medium text-[#A68F97] mb-12">Blog Posts</h2>
          </motion.div>

          {blogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm">
                <div className="flex transition-transform duration-500 ease-in-out" 
                     style={{ transform: `translateX(-${currentBlogIndex * 100}%)` }}>
                  {blogPosts.map((post, index) => (
                    <div key={post.slug} className="w-full flex-shrink-0 p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Blog Post Content */}
                        <div>
                          <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-2xl font-medium text-white mb-4">{post.title}</h3>
                          <p className="text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                            <span>{post.date}</span>
                            <span>{post.duration} read</span>
                          </div>
                            <div className="flex gap-4">
                            <Link 
                              to={`/blog/${post.slug}`} 
                              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:scale-105"
                            >
                              <BookOpen className="w-4 h-4 mr-2" />
                              Read More
                            </Link>
                            {/* removed per-slide "View All Posts" */}
                          </div>
                        </div>
                        
                        {/* Blog Post Visual */}
                        <div className="flex justify-center">
                          <div className="w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-blue-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                 </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevBlogPost}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextBlogPost}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {blogPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBlogIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentBlogIndex ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* View All Posts (moved below carousel) */}
              <div className="mt-6 flex justify-center">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  View All Posts
                </Link>
              </div>
            </motion.div>
          )}
        
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
              <a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
              <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</a>
              <a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a>
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
