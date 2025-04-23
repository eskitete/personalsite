import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Moon, Sun, ChevronRight, Github, Twitter, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggeredText } from '../components/StaggeredText';
import { Modal } from '../components/Modal';
import { Link } from 'react-router-dom';

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

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bubbleStyle, setBubbleStyle] = useState({ width: 0, height: 0, left: 0, top: 0 });

  // Add refs for the buttons
  const allPostsRef = useRef<HTMLButtonElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

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
    // Fetch posts and ensure links are properly formatted
    fetch('/posts.json')
      .then(res => res.json())
      .then(data => {
        // Transform the data to ensure links are properly formatted
        const transformedData = data.map((post: Post) => ({
          ...post,
          link: new URL(post.link, window.location.origin).toString()
        }));
        setPosts(transformedData);
      })
      .catch(error => {
        console.error('Error loading posts:', error);
        setPosts([]); // Set empty array on error
      });
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesTags = selectedTags.size === 0 || 
                       Array.from(selectedTags).every(tag => post.tags.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });

  const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
  const uniqueTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const openPostModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white`}>
      <div className="flex flex-col min-h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 z-40 w-64 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-thumb-gray-500 scrollbar-track-transparent"
            >
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

              <div className="space-y-8">
                <div>
                  <StaggeredText 
                    text="Popular Tags"
                    className="text-sm font-semibold mb-4 text-gray-400"
                  />
                  <div className="flex flex-wrap gap-2">
                    {uniqueTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          const newTags = new Set(selectedTags);
                          if (newTags.has(tag)) {
                            newTags.delete(tag);
                          } else {
                            newTags.add(tag);
                          }
                          setSelectedTags(newTags);
                        }}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedTags.has(tag)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-gray-700/50">
                  <div className="flex items-center space-x-4">
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
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
          <header className="sticky top-0 z-30 backdrop-blur-sm bg-gray-900/50 border-b border-gray-700/50">
            <div className="flex items-center px-6 h-16">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`mr-4 lg:hidden ${sidebarOpen ? 'hidden' : ''}`}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex-1 flex items-center">
                <div className="relative flex-1 max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    key={post.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer hover-card"
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
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.content}
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
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
} 