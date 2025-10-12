import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, Terminal, Github, Download, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { Modal } from '../components/Modal';
import { GradientDots } from '../components/GradientDots';

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

const skills = [
  { name: 'Python', level: 'Advanced' },
  { name: 'JavaScript', level: 'Experienced' },
  { name: 'HTML/CSS', level: 'Experienced' },
  { name: 'C/C++', level: 'Experienced' },
  { name: 'React/Node.js', level: 'Experienced' },
  { name: 'SQL', level: 'Experienced' }
];

const technologies = [
  { name: 'Nmap', level: 'Advanced' },
  { name: 'Wireshark', level: 'Advanced' },
  { name: 'Metasploit', level: 'Experienced' },
  { name: 'Burp Suite', level: 'Experienced' },
  { name: 'Git/GitHub', level: 'Advanced' },
  { name: 'Linux/Unix', level: 'Advanced' }
];

const services = [
  {
    title: 'Cybersecurity Assessment',
    description: 'Comprehensive security audits and vulnerability assessments for organizations'
  },
  {
    title: 'Penetration Testing',
    description: 'Ethical hacking and security testing to identify and fix vulnerabilities'
  },
  {
    title: 'Security Consulting',
    description: 'Expert guidance on implementing robust security measures and best practices'
  }
];

const projects = [
  {
    title: 'Personal Portfolio Website',
    description: 'A modern React-based portfolio website showcasing cybersecurity expertise and projects.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/eskitete'
  },
  {
    title: 'Network Security Scanner',
    description: 'Python-based network vulnerability scanner using Nmap and custom scripts.',
    technologies: ['Python', 'Nmap', 'Linux'],
    link: 'https://github.com/eskitete'
  },
  {
    title: 'Security Assessment Tool',
    description: 'Automated security testing tool for web applications and network infrastructure.',
    technologies: ['Python', 'Burp Suite', 'SQL'],
    link: 'https://github.com/eskitete'
  },
  {
    title: 'Cybersecurity Blog',
    description: 'Technical blog covering cybersecurity topics, tutorials, and best practices.',
    technologies: ['Jekyll', 'GitHub Pages', 'Markdown'],
    link: 'https://github.com/eskitete'
  }
];

export function Home() {
  const [selectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-white font-['Ubuntu'] relative">
      <GradientDots 
        backgroundColor="#1B1B1E"
        dotSize={8}
        spacing={80}
        duration={25}
        colorCycleDuration={8}
        className="-z-10"
      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B1B1E]/90 backdrop-blur-md border-b border-gray-700/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl font-bold text-white"
            >
              RAFAY SYED
            </motion.div>
            <div className="flex items-center space-x-4 md:space-x-8">
              <a href="#home" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Home</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">About</a>
              <a href="#experience" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Experience</a>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Services</a>
              <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Portfolio</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Contact</a>
            </div>
          </div>
        </div>
      </nav>

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
                Cybersecurity Professional & Security Consultant
              </h5>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#contact" 
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
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
                I am a dedicated cybersecurity professional with expertise in network security, penetration testing, 
                and vulnerability assessment. My passion lies in helping organizations strengthen their security posture 
                through comprehensive assessments and implementing robust security measures.
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
                <h3 className="text-3xl font-bold text-blue-400 mb-3">Expert</h3>
                <h5 className="text-sm text-white/60 font-medium">Level</h5>
              </div>
              <div className="text-center p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                <h3 className="text-3xl font-bold text-blue-400 mb-3">20+</h3>
                <h5 className="text-sm text-white/60 font-medium">Certificates</h5>
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h5 className="text-sm font-medium text-white/60 mb-4">My Recent Projects</h5>
            <h2 className="text-2xl font-medium text-[#A68F97] mb-12">Portfolio</h2>
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

          <div className="grid md:grid-cols-3 gap-8">
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
              <h5 className="text-sm text-white/60 mb-4">rafay.syed@outlook.com</h5>
              <a 
                href="mailto:rafay.syed@outlook.com" 
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
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Rafay Syed. All rights reserved.
            </p>
          </div>
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