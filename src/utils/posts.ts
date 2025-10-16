export interface ApiPost {
  title: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  duration: string;
  content: string;
  link: string;
}

export interface Post extends ApiPost {
  slug: string;
}

const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const createSlug = (post: ApiPost) => {
  const linkSegment = post.link?.split('/').pop() ?? '';
  const withoutExtension = linkSegment.replace(/\.[^/.]+$/, '');
  const slugFromLink = normalizeSlug(withoutExtension);

  if (slugFromLink) {
    return slugFromLink;
  }

  return normalizeSlug(post.title);
};

export const attachSlugs = (posts: ApiPost[]): Post[] =>
  posts.map(post => ({
    ...post,
    slug: createSlug(post),
  }));
