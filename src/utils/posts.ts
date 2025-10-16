export interface RawPost {
  title: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  duration: string;
  content: string;
  slug?: string;
  excerpt?: string;
}

export interface Post extends RawPost {
  slug: string;
  excerpt: string;
}

const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, ' ').replace(/\s([.,!?;:])/g, '$1').trim();

const EXCERPT_LENGTH = 220;

const stripMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/^#+\s+/gm, '')
    .replace(/^\s*[-+*]\s+/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/-{3,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const createSlug = (post: RawPost, fallback?: string) => {
  if (post.slug && post.slug.trim().length > 0) {
    return normalizeSlug(post.slug);
  }

  if (fallback && fallback.trim().length > 0) {
    return normalizeSlug(fallback);
  }

  return normalizeSlug(post.title);
};

export const createExcerpt = (content: string, length = EXCERPT_LENGTH) => {
  const plain = stripMarkdown(content);
  const normalized = normalizeWhitespace(plain);

  if (normalized.length <= length) {
    return normalized;
  }

  const truncated = normalized.slice(0, length);
  const lastSpace = truncated.lastIndexOf(' ');
  const boundary = lastSpace > 0 ? lastSpace : length;

  return `${truncated.slice(0, boundary).trim()}…`;
};

export const buildPost = (post: RawPost, fallbackSlug?: string): Post => {
  const slug = createSlug(post, fallbackSlug);
  const excerpt = post.excerpt?.trim() || createExcerpt(post.content);

  return {
    ...post,
    tags: [...post.tags],
    slug,
    excerpt,
  };
};

export const attachSlugs = (
  posts: RawPost[],
  fallbackSlugs: Array<string | undefined> = []
): Post[] =>
  posts.map((post, index) => buildPost(post, fallbackSlugs[index]));
