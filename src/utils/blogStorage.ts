export interface LocalBlog {
  id: number | string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  category: string;
  author?: string;
  authorRole?: string;
  readTime?: string;
  status?: "ACTIVE" | "INACTIVE";
  image?: string;
  created_at: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  ctaHeading?: string;
}

const LOCAL_BLOGS_KEY = "waqt_local_custom_blogs";

export const getLocalBlogs = (): LocalBlog[] => {
  try {
    const raw = localStorage.getItem(LOCAL_BLOGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to parse local blogs from localStorage:", e);
    return [];
  }
};

export const saveLocalBlog = (blogData: Partial<LocalBlog> & { title: string; slug: string; content: string }): LocalBlog => {
  const current = getLocalBlogs();
  const nowStr = new Date().toISOString();

  let targetId = blogData.id;
  if (!targetId) {
    targetId = Date.now();
  }

  const cat = blogData.category || "Personal Loan";
  let defaultCover = "/blog-assets/blog-1-personal-loan-guide.webp";
  if (cat === "Business Loan") defaultCover = "/blog-assets/blog-3-small-business-owner.webp";
  else if (cat === "Payday Loan") defaultCover = "/blog-assets/blog-5-payday-cash-advance.webp";
  else if (cat === "Short Term Loan") defaultCover = "/blog-assets/blog-7-short-term-emergency.webp";

  const newBlog: LocalBlog = {
    id: targetId,
    slug: blogData.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-"),
    title: blogData.title.trim(),
    excerpt: blogData.excerpt || blogData.title.trim(),
    content: blogData.content,
    category: cat,
    author: blogData.author || "Waqt Money Team",
    authorRole: blogData.authorRole || "Financial Analyst & Credit Expert",
    readTime: blogData.readTime || "5 Min Read",
    status: blogData.status || "ACTIVE",
    image: blogData.image || defaultCover,
    created_at: blogData.created_at || nowStr,
    metaTitle: blogData.metaTitle || blogData.title,
    metaDescription: blogData.metaDescription || blogData.excerpt,
    focusKeyword: blogData.focusKeyword || "",
    ctaHeading: blogData.ctaHeading || "Need Quick Funds Today?",
  };

  const existingIdx = current.findIndex(
    (b) => String(b.id) === String(targetId) || b.slug === newBlog.slug
  );

  if (existingIdx !== -1) {
    current[existingIdx] = { ...current[existingIdx], ...newBlog };
  } else {
    current.unshift(newBlog);
  }

  try {
    localStorage.setItem(LOCAL_BLOGS_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn("Failed to write blog to localStorage:", e);
  }

  return newBlog;
};

export const deleteLocalBlog = (id: number | string): boolean => {
  try {
    const current = getLocalBlogs();
    const filtered = current.filter((b) => String(b.id) !== String(id));
    localStorage.setItem(LOCAL_BLOGS_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.warn("Failed to delete local blog:", e);
    return false;
  }
};
