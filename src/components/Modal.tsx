import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import type { Post } from '../utils/posts';

interface ModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const markdownComponents: Components = {
  h1: props => <h1 className="text-3xl font-semibold text-white mt-8 mb-4 first:mt-0" {...props} />,
  h2: props => <h2 className="text-2xl font-semibold text-white mt-8 mb-4 first:mt-0" {...props} />,
  h3: props => <h3 className="text-xl font-semibold text-white mt-6 mb-3 first:mt-0" {...props} />,
  p: props => <p className="text-gray-300 leading-relaxed mb-4 last:mb-0" {...props} />,
  ul: props => <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4" {...props} />,
  ol: props => <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-4" {...props} />,
  li: props => <li className="leading-relaxed" {...props} />,
  blockquote: props => (
    <blockquote
      className="border-l-4 border-blue-500/60 pl-4 italic text-blue-100/90 mb-4"
      {...props}
    />
  ),
  a: props => (
    <a
      className="text-blue-400 hover:text-blue-300 underline decoration-transparent hover:decoration-blue-300 transition"
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    />
  ),
  code: ({ inline, className, children, ...props }) =>
    inline ? (
      <code
        className={`px-1.5 py-0.5 rounded bg-gray-800/70 text-blue-300 text-sm ${className ?? ''}`}
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className={`block w-full overflow-x-auto rounded-lg bg-gray-900/80 px-4 py-3 text-blue-200 text-sm ${className ?? ''}`}
        {...props}
      >
        {children}
      </code>
    ),
  pre: props => (
    <pre className="mb-4 rounded-lg bg-gray-900/80 px-4 py-3 overflow-x-auto" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-700/60" />,
};

export function Modal({ post, isOpen, onClose }: ModalProps) {
  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white rounded-xl shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 mb-4">
                {post.category}
              </span>

              <h2 className="text-3xl font-bold mb-3 text-white">{post.title}</h2>

              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-6">
                <span>{post.author}</span>
                <span className="mx-2 hidden md:inline">&bull;</span>
                <span>{post.date}</span>
                <span className="mx-2 hidden md:inline">&bull;</span>
                <span>{post.duration} read</span>
              </div>

              <div className="space-y-4">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
