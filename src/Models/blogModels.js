import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    featuredImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Tech Blogs",
        "Personal Project Diaries",
        "Freelance Project Diaries",
        "Build Journey",
        "Development Challenges",
        "Project Overviews",
        "Debugging Logs",
        "Case Studies",
        "Learning Logs",
        "Career Reflections",
        "Open Source Contributions",
        "Side Projects",
        "Product Launches",
        "Dev Tools & Stack Reviews",
        "Startup Journey",
        "Others",
      ],
    },
     views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
