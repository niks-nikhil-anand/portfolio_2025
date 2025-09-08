import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    githubLink: {
      type: String,
      trim: true,
    },
    liveLink: {
      type: String,
      trim: true,
    },
    description: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    subDescription: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: [
        "Personal Project",
        "Freelance Project",
        "Client Project",
        "Open Source Project",
        "SaaS Application",
        "Mobile App",
        "Web App",
        "E-commerce",
        "Portfolio Website",
        "Product MVP",
        "Internal Tool",
        "Full-stack Project",
        "Frontend Only",
        "Backend API",
        "AI/ML Project",
        "Startup Product",
        "Hackathon Project",
        "Experimental",
        "Case Study",
        "Technical Showcase",
        "Other",
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

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
