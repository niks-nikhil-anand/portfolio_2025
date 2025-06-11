"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsCalendarEvent,
  BsClock,
  BsEye,
  BsHeart,
  BsShare,
  BsCode,
  BsPalette,
  BsLightbulb,
  BsPerson,
} from "react-icons/bs";
import Image from "next/image";

// Types
interface BaseBlogPost {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  views: string;
  likes: string;
  tags: string[];
}

interface TechPost extends BaseBlogPost {
  type: "tech";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface DesignPost extends BaseBlogPost {
  type: "design";
  category: "UI/UX" | "Branding" | "Typography" | "Color Theory";
}

interface TutorialPost extends BaseBlogPost {
  type: "tutorial";
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface PersonalPost extends BaseBlogPost {
  type: "personal";
  mood: "Reflective" | "Motivational" | "Story" | "Opinion";
}

type BlogPost = TechPost | DesignPost | TutorialPost | PersonalPost;

type TabType = "tech" | "design" | "tutorial" | "personal";

// Constants
const TECH_POSTS: TechPost[] = [
  {
    id: 1,
    type: "tech",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    title: "Building Scalable React Applications",
    excerpt:
      "Learn advanced patterns and techniques for creating maintainable React apps that can grow with your team and user base.",
    date: "2024-05-15",
    readTime: "8 min read",
    views: "2.4k",
    likes: "156",
    tags: ["React", "Architecture", "Best Practices"],
    difficulty: "Advanced",
  },
  {
    id: 2,
    type: "tech",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    title: "TypeScript Tips for Better Code",
    excerpt:
      "Discover lesser-known TypeScript features that can make your code more type-safe and developer-friendly.",
    date: "2024-05-10",
    readTime: "6 min read",
    views: "1.8k",
    likes: "92",
    tags: ["TypeScript", "JavaScript", "Development"],
    difficulty: "Intermediate",
  },
  {
    id: 3,
    type: "tech",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    title: "Getting Started with Next.js 14",
    excerpt:
      "A comprehensive guide to building modern web applications with the latest features in Next.js 14.",
    date: "2024-05-05",
    readTime: "12 min read",
    views: "3.1k",
    likes: "203",
    tags: ["Next.js", "React", "Web Development"],
    difficulty: "Beginner",
  },
];

const DESIGN_POSTS: DesignPost[] = [
  {
    id: 4,
    type: "design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    title: "The Psychology of Color in UI Design",
    excerpt:
      "Understanding how colors affect user behavior and emotions to create more effective user interfaces.",
    date: "2024-05-12",
    readTime: "7 min read",
    views: "1.9k",
    likes: "134",
    tags: ["Color Theory", "Psychology", "UI Design"],
    category: "Color Theory",
  },
  {
    id: 5,
    type: "design",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop",
    title: "Mastering Typography Hierarchy",
    excerpt:
      "Learn how to create clear visual hierarchy using typography to guide users through your content effectively.",
    date: "2024-05-08",
    readTime: "9 min read",
    views: "2.2k",
    likes: "167",
    tags: ["Typography", "Hierarchy", "Design"],
    category: "Typography",
  },
  {
    id: 6,
    type: "design",
    image:
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=250&fit=crop",
    title: "Building Consistent Design Systems",
    excerpt:
      "A step-by-step approach to creating and maintaining design systems that scale across teams and products.",
    date: "2024-05-03",
    readTime: "11 min read",
    views: "2.7k",
    likes: "198",
    tags: ["Design Systems", "Consistency", "Branding"],
    category: "UI/UX",
  },
];

const TUTORIAL_POSTS: TutorialPost[] = [
  {
    id: 7,
    type: "tutorial",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    title: "Build a Real-time Chat App with Socket.io",
    excerpt:
      "Step-by-step tutorial to create a fully functional real-time chat application using Node.js and Socket.io.",
    date: "2024-05-14",
    readTime: "25 min read",
    views: "4.2k",
    likes: "312",
    tags: ["Socket.io", "Node.js", "Real-time"],
    duration: "2 hours",
    level: "Intermediate",
  },
  {
    id: 8,
    type: "tutorial",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    title: "Creating Animations with Framer Motion",
    excerpt:
      "Learn to add smooth, professional animations to your React components using Framer Motion library.",
    date: "2024-05-09",
    readTime: "15 min read",
    views: "3.5k",
    likes: "267",
    tags: ["Framer Motion", "Animation", "React"],
    duration: "1.5 hours",
    level: "Beginner",
  },
  {
    id: 9,
    type: "tutorial",
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=250&fit=crop",
    title: "Deploy React Apps with Docker",
    excerpt:
      "Complete guide to containerizing and deploying React applications using Docker and Docker Compose.",
    date: "2024-05-01",
    readTime: "20 min read",
    views: "2.8k",
    likes: "189",
    tags: ["Docker", "Deployment", "DevOps"],
    duration: "3 hours",
    level: "Advanced",
  },
];

const PERSONAL_POSTS: PersonalPost[] = [
  {
    id: 10,
    type: "personal",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    title: "My Journey from Designer to Developer",
    excerpt:
      "Reflecting on the transition from design to development and the lessons learned along the way.",
    date: "2024-05-13",
    readTime: "10 min read",
    views: "1.6k",
    likes: "89",
    tags: ["Career", "Journey", "Growth"],
    mood: "Reflective",
  },
  {
    id: 11,
    type: "personal",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
    title: "Why I Love Open Source",
    excerpt:
      "Exploring the benefits of contributing to open source projects and how it has shaped my career.",
    date: "2024-05-07",
    readTime: "6 min read",
    views: "1.3k",
    likes: "74",
    tags: ["Open Source", "Community", "Development"],
    mood: "Motivational",
  },
  {
    id: 12,
    type: "personal",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    title: "Lessons from My First Startup Failure",
    excerpt:
      "What I learned from building and failing my first startup, and how it made me a better entrepreneur.",
    date: "2024-05-02",
    readTime: "14 min read",
    views: "2.1k",
    likes: "156",
    tags: ["Startup", "Failure", "Lessons"],
    mood: "Story",
  },
];

const TABS = [
  { id: "tech" as TabType, label: "Tech Articles", icon: BsCode },
  { id: "design" as TabType, label: "Design", icon: BsPalette },
  { id: "tutorial" as TabType, label: "Tutorials", icon: BsLightbulb },
  { id: "personal" as TabType, label: "Personal", icon: BsPerson },
];

// Blog Card Component
interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderPostInfo = () => {
    switch (post.type) {
      case "tech":
        return (
          <div className="flex items-center justify-between text-xs">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                post.difficulty === "Beginner"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : post.difficulty === "Intermediate"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {post.difficulty}
            </span>
          </div>
        );
      case "design":
        return (
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>
        );
      case "tutorial":
        return (
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-medium">
              {post.duration}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                post.level === "Beginner"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : post.level === "Intermediate"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {post.level}
            </span>
          </div>
        );
      case "personal":
        return (
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 rounded-full text-xs font-medium">
              {post.mood}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      transition={{ delay: index * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={192}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <div className="flex space-x-2">
            <motion.button
              className="p-2 bg-white/90 hover:bg-white rounded-full text-gray-900 transition-colors opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Share post"
            >
              <BsShare className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <BsCalendarEvent className="w-3 h-3" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BsClock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Title & Excerpt */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors cursor-pointer">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Post-specific Info */}
        {renderPostInfo()}

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <BsEye className="w-3 h-3" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BsHeart className="w-3 h-3" />
              <span>{post.likes}</span>
            </div>
          </div>
          <motion.button
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            whileHover={{ x: 2 }}
          >
            Read more →
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

// Main Component
const BlogShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("tech");

  const getCurrentPosts = (): BlogPost[] => {
    switch (activeTab) {
      case "tech":
        return TECH_POSTS;
      case "design":
        return DESIGN_POSTS;
      case "tutorial":
        return TUTORIAL_POSTS;
      case "personal":
        return PERSONAL_POSTS;
      default:
        return TECH_POSTS;
    }
  };

  const tabVariants = {
    inactive: { scale: 1, opacity: 0.7 },
    active: { scale: 1.05, opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const getTotalPosts = () => {
    return (
      TECH_POSTS.length +
      DESIGN_POSTS.length +
      TUTORIAL_POSTS.length +
      PERSONAL_POSTS.length
    );
  };

  return (
    <div className="bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, tutorials, and insights from my journey •{" "}
            {getTotalPosts()} articles
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 mb-8 bg-muted/50 backdrop-blur-sm rounded-xl p-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              variants={tabVariants}
              animate={activeTab === id ? "active" : "inactive"}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === id
                  ? "bg-background text-foreground shadow-lg border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getCurrentPosts().map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogShowcase;
