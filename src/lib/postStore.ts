import type { Post, RawPost } from '../utils/posts';
import { attachSlugs } from '../utils/posts';

const markdownModules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

type FrontmatterRecord = Record<string, unknown>;

const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/;

const ensureString = (value: unknown, path: string): string => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  throw new Error(`Invalid value for ${path}. Expected non-empty string.`);
};

const ensureTags = (value: unknown, path: string): string[] => {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid value for ${path}. Expected a string array.`);
  }

  const tags = value.map((tag, index) => {
    if (typeof tag !== 'string' || tag.trim().length === 0) {
      throw new Error(`Invalid tag at ${path}[${index}]. Expected non-empty string.`);
    }
    return tag.trim();
  });

  if (tags.length === 0) {
    throw new Error(`Invalid value for ${path}. Expected at least one tag.`);
  }

  return tags;
};

const parseScalar = (value: string): string => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const parseFrontmatter = (block: string, sourcePath: string): FrontmatterRecord => {
  const result: FrontmatterRecord = {};
  const lines = block.split('\n');
  let currentArrayKey: string | null = null;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }

    if (trimmed.startsWith('- ')) {
      if (!currentArrayKey) {
        throw new Error(
          `Unexpected list item in frontmatter ${sourcePath} (line ${index + 1}).`
        );
      }
      const array = result[currentArrayKey] as unknown[];
      array.push(parseScalar(trimmed.slice(2)));
      return;
    }

    const match = trimmed.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);

    if (!match) {
      throw new Error(
        `Invalid frontmatter line in ${sourcePath} (line ${index + 1}): "${line}".`
      );
    }

    const [, key, rawValue] = match;
    const value = rawValue.trim();

    if (!value) {
      result[key] = [];
      currentArrayKey = key;
      return;
    }

    result[key] = parseScalar(value);
    currentArrayKey = null;
  });

  return result;
};

const extractFrontmatter = (raw: string, sourcePath: string) => {
  const match = raw.match(FRONTMATTER_REGEX);
  if (!match) {
    throw new Error(`Missing or invalid frontmatter in ${sourcePath}.`);
  }

  const [, frontmatterBlock, body] = match;
  return {
    frontmatter: frontmatterBlock,
    content: body.trim(),
  };
};

const parseMarkdownDocument = (sourcePath: string, raw: string) => {
  const { frontmatter, content } = extractFrontmatter(raw, sourcePath);
  const data = parseFrontmatter(frontmatter, sourcePath);

  const tags = ensureTags(data.tags, `${sourcePath} frontmatter tags`);

  const post: RawPost = {
    title: ensureString(data.title, `${sourcePath} frontmatter title`),
    category: ensureString(data.category, `${sourcePath} frontmatter category`),
    tags,
    author: ensureString(data.author, `${sourcePath} frontmatter author`),
    date: ensureString(data.date, `${sourcePath} frontmatter date`),
    duration: ensureString(data.duration, `${sourcePath} frontmatter duration`),
    content,
    slug: typeof data.slug === 'string' ? data.slug : undefined,
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : undefined,
  };

  const fileName = sourcePath.split('/').pop() ?? '';
  const withoutExtension = fileName.replace(/\.md$/, '');
  const fallbackSlug = withoutExtension.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const sortKey = Date.parse(post.date);

  return {
    post,
    fallbackSlug: fallbackSlug || undefined,
    sortKey: Number.isNaN(sortKey) ? 0 : sortKey,
  };
};

const parsedMarkdownPosts = Object.entries(markdownModules).map(([path, raw]) =>
  parseMarkdownDocument(path, raw)
);

parsedMarkdownPosts.sort((a, b) => b.sortKey - a.sortKey);

const rawPosts: RawPost[] = parsedMarkdownPosts.map(entry => entry.post);
const fallbackSlugs = parsedMarkdownPosts.map(entry => entry.fallbackSlug);

let cachedPosts: Post[] | null = null;

const clonePost = (post: Post): Post => ({
  ...post,
  tags: [...post.tags],
});

const loadPosts = (): Post[] => {
  if (cachedPosts) {
    return cachedPosts;
  }

  cachedPosts = attachSlugs(rawPosts, fallbackSlugs);
  return cachedPosts;
};

export const getAllPosts = (): Post[] => loadPosts().map(clonePost);

export const getRecentPosts = (count = 6): Post[] =>
  loadPosts()
    .slice(0, count)
    .map(clonePost);

export const getPostBySlug = (slug: string): Post | undefined => {
  const post = loadPosts().find(candidate => candidate.slug === slug);
  return post ? clonePost(post) : undefined;
};

export const getPostsByCategory = (category: string): Post[] =>
  loadPosts()
    .filter(post => post.category === category)
    .map(clonePost);

export const searchPosts = (query: string): Post[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getAllPosts();
  }

  return loadPosts()
    .filter(post => {
      const haystack = [
        post.title,
        post.category,
        post.author,
        post.content,
        post.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .map(clonePost);
};
