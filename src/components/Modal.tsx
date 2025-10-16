import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Post } from '../utils/posts';

interface ModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

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
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white rounded-xl shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 mb-4">
                {post.category}
              </span>

              <h2 className="text-2xl font-bold mb-2 text-white">{post.title}</h2>

              <div className="flex items-center text-sm text-gray-400 mb-6">
                <span>{post.author}</span>
                <span className="mx-2">&bull;</span>
                <span>{post.date}</span>
                <span className="mx-2">&bull;</span>
                <span>{post.duration} read</span>
              </div>

              <div className="prose prose-invert max-w-none mb-6 text-gray-300">
                {post.content}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
