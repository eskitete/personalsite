import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, Search, Moon, Sun, ChevronRight, Github, Twitter, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggeredText } from '../components/StaggeredText';
import { Modal } from '../components/Modal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllPosts } from '../lib/postStore';
import type { Post } from '../utils/posts';

export function Blog() {
  const posts = useMemo<Post[]>(() => getAllPosts(), []);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    return window.innerWidth >= 1024;
  });
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    return window.innerWidth >= 1024;
  });
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bubbleStyle, setBubbleStyle] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();

  // Add refs for the buttons
  const allPostsRef = useRef<HTMLButtonElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsDesktop(isLg);
      if (isLg) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update bubble position when category changes
  useEffect(() => {
    const updateBubblePosition = () => {
      const button = selectedCategory === null 
        ? allPostsRef.current 
        : categoryRefs.current[selectedCategory];
      
      if (button) {
        const rect = button.getBoundingClientRect();
        const parentRect = button.parentElement?.getBoundingClientRect();
        if (parentRect) {
          setBubbleStyle({
            width: rect.width,
            height: rect.height,
            left: rect.left - parentRect.left,
            top: rect.top - parentRect.top
          });
        }
      }
    };

    updateBubblePosition();
    window.addEventListener('resize', updateBubblePosition);
    return () => window.removeEventListener('resize', updateBubblePosition);
  }, [selectedCategory]);

  useEffect(() => {
    if (!slug) {
      setIsModalOpen(false);
      setSelectedPost(null);
      return;
    }

    const matchingPost = posts.find(post => post.slug === slug);

    if (matchingPost) {
      setSelectedPost(matchingPost);
      setIsModalOpen(true);
    } else if (posts.length > 0) {
      setIsModalOpen(false);
      setSelectedPost(null);
      navigate('/blog', { replace: true });
    }
  }, [slug, posts, navigate]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return posts.filter(post => {
      const matchesSearch =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.content.toLowerCase().includes(normalizedQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));

      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const uniqueCategories = useMemo(
    () => Array.from(new Set(posts.map(post => post.category))).sort(),
    [posts]
  );

  const openPostModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);

    if (slug !== post.slug) {
      navigate(`/blog/${post.slug}`);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);

    if (slug) {
      navigate('/blog', { replace: true });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white`}>
      <div className="flex flex-col min-h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {!isDesktop && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                  className="fixed inset-0 z-30 bg-black lg:hidden"
                />
              )}
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className={`fixed inset-y-0 left-0 z-40 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-thumb-gray-500 scrollbar-track-transparent ${
                  isDesktop ? 'w-64' : 'w-full max-w-xs'
                }`}
              >
                {!isDesktop && (
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/70 text-gray-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              {/* Back to Home Button */}
              <Link 
                to="/" 
                className="flex items-center px-4 py-2 mb-8 bg-gray-800/50 backdrop-blur-sm rounded-full text-white hover:bg-gray-800/70 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>

              <div className="flex items-center justify-between mb-8">
                <StaggeredText 
                  text="Blog"
                  className="text-xl font-bold gradient-text"
                />
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-full hover:bg-gray-700/50 text-gray-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-full hover:bg-gray-700/50 text-gray-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <button onClick={toggleTheme} 
                        className="p-2 rounded-full hover:bg-gray-700/50 text-gray-300">
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className={`flex-1 ${isDesktop && sidebarOpen ? 'lg:ml-64' : ''}`}>
          <header className="sticky top-0 z-30 backdrop-blur-lg bg-gray-900/30 border-b border-gray-700/30">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-6 py-3">
              <button
                onClick={() => setSidebarOpen(prev => !prev)}
                className="text-gray-200 hover:text-white transition-colors lg:hidden"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <div className="flex-1 flex items-center w-full">
                <div className="relative flex-1 max-w-full sm:max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/40 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <StaggeredText
                text="Blog Posts"
                as="h1"
                className="text-4xl font-bold mb-4 gradient-text"
              />
              <StaggeredText
                text="Insights on Cybersecurity, Development, and Technology"
                as="p"
                className="text-xl text-gray-300 mb-8"
              />
              
              {/* Modern Tab Selector */}
              <div className="relative">
                <div className="flex gap-1 p-1 bg-gray-800/50 rounded-lg">
                  <motion.button
                    ref={allPostsRef}
                    onClick={() => setSelectedCategory(null)}
                    data-testid="category-filter"
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors z-10 ${
                      selectedCategory === null
                        ? 'text-white'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    All Posts
                  </motion.button>
                  {uniqueCategories.map(category => (
                    <motion.button
                      key={category}
                      ref={el => categoryRefs.current[category] = el}
                      onClick={() => setSelectedCategory(category)}
                      data-testid="category-filter"
                      className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors z-10 ${
                        selectedCategory === category
                          ? 'text-white'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
                <motion.div
                  className="absolute bg-blue-500 rounded-md shadow-lg shadow-blue-500/20 z-0"
                  layoutId="category-bubble"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                  style={{
                    ...bubbleStyle,
                    zIndex: 0
                  }}
                />
              </div>
            </div>
          </section>

          <div className="px-6 pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer hover-card"
                    data-testid="blog-post"
                    onClick={() => openPostModal(post)}
                  >
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
                        {post.category}
                      </span>
                    </div>
                    <StaggeredText
                      text={post.title}
                      as="h3"
                      className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors"
                    />
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 4).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.duration} read</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* About Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold gradient-text">About Me</h3>
                <p className="text-gray-400">
                  Cybersecurity expert and full-stack developer passionate about creating secure and efficient solutions.
                </p>
                <div className="flex space-x-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                     className="p-2 rounded-full hover:bg-gray-700/50 text-gray-300 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                     className="p-2 rounded-full hover:bg-gray-700/50 text-gray-300 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold gradient-text">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold gradient-text">Categories</h3>
                <ul className="space-y-2">
                  {uniqueCategories.slice(0, 5).map(category => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold gradient-text">Contact Me</h3>
                <div className="space-y-4">
                  <p className="text-gray-400">
                    Have a question or want to work together?
                  </p>
                  <a 
                    href="mailto:contact@example.com"
                    className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-gray-700/50">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Rafay Syed. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Modal */}
        <Modal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </div>
  );
} 
