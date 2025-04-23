import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Code, Lock, Terminal, Github, Twitter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { TypewriterText } from '../components/TypewriterText';
import gridPattern from '/grid.svg';

interface Post {
  title: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  duration: string;
  content: string;
  link: string;
}

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Cybersecurity Expert",
    description: "Specialized in protecting digital assets and systems from cyber threats"
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Full-Stack Developer",
    description: "Building robust and secure applications with modern technologies"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Security Consultant",
    description: "Providing expert guidance on security best practices and implementations"
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "System Architect",
    description: "Designing scalable and secure system architectures"
  }
];

export function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    fetch('/posts.json')
      .then(res => res.json())
      .then(data => setPosts(data));

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openPostModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: scrollY > 200 ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/90 backdrop-blur-md border-b border-blue-500/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl font-bold font-['Inter'] text-white"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: scrollY > 200 ? 1 : 0,
                  scale: scrollY > 200 ? 1 : 0.8,
                  y: scrollY > 200 ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
              >
                Rafay Syed
              </motion.span>
            </motion.div>
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors font-medium">
                Home
              </Link>
              <Link to="/blog" className="text-gray-400 hover:text-white transition-colors font-medium">
                Blog
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#112240] via-[#0A192F] to-[#0A192F]"
          style={{
            y: scrollY * 0.5,
            scale: 1 + scrollY * 0.0001
          }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: `url(${gridPattern})`, backgroundPosition: 'center', maskImage: 'linear-gradient(180deg,white,rgba(255,255,255,0))' }} />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <motion.div
              animate={{ 
                opacity: scrollY > 100 ? 0 : 1,
                scale: scrollY > 100 ? 0.8 : 1,
                y: scrollY > 100 ? -20 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <TypewriterText
                text="Rafay Syed"
                className="text-7xl md:text-9xl font-bold mb-8 font-['Inter'] text-white leading-[1.1]"
                speed={100}
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-2xl md:text-3xl text-gray-400 mb-12 font-['Inter'] font-light leading-relaxed"
            >
              Securing the Digital Future
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-full text-lg font-medium font-['Inter'] transition-all duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Read My Blog
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm rounded-full text-lg font-medium font-['Inter'] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 animate-bounce text-gray-400" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Inter'] text-white mb-4">
              My Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Specialized in creating secure and efficient solutions for modern digital challenges
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative bg-blue-500/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="relative">
                  <div className="text-white mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white font-['Inter']">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-32 px-6 relative bg-blue-500/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between mb-20"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-['Inter'] text-white mb-4">
                Latest Blog Posts
              </h2>
              <p className="text-xl text-gray-400">
                Insights on cybersecurity, development, and technology
              </p>
            </div>
            <Link 
              to="/blog" 
              className="flex items-center px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm rounded-full text-lg font-medium font-['Inter'] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
            >
              See All Posts
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <AnimatePresence>
                {posts.slice(0, 6).map((post, index) => (
                  <motion.article
                    key={post.title}
                    initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    className="flex-none w-[350px] group relative bg-blue-500/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-blue-500/10 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
                    onClick={() => openPostModal(post)}
                  >
                    <div className="relative">
                      <div className="mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white font-['Inter']">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-6 line-clamp-3">
                        {post.content}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.duration} read</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>

              {/* See All Posts Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                <Link 
                  to="/blog"
                  className="flex-none w-[350px] group relative bg-blue-500/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-blue-500/10 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white font-['Inter']">
                      View All Posts
                    </h3>
                    <p className="text-gray-400">
                      Explore more articles on cybersecurity, development, and technology
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Inter'] text-white mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-full text-lg font-medium font-['Inter'] transition-all duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-blue-500/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold font-['Inter'] text-white">
                About Me
              </h3>
              <p className="text-gray-400">
                Cybersecurity expert and full-stack developer passionate about creating secure and efficient solutions.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-full hover:bg-blue-500/10 text-gray-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-full hover:bg-blue-500/10 text-gray-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold font-['Inter'] text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold font-['Inter'] text-white">
                Categories
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Cybersecurity
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Development
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Technology
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold font-['Inter'] text-white">
                Contact Me
              </h3>
              <div className="space-y-6">
                <p className="text-gray-400">
                  Have a question or want to work together?
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm rounded-full text-lg font-medium font-['Inter'] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-16 pt-8 border-t border-blue-500/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Rafay Syed. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Modal */}
      <Modal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} 