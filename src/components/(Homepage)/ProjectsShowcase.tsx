"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsGithub, 
  BsEye, 
  BsPerson,
  BsBriefcase,
  BsBox
} from 'react-icons/bs';

// Types
interface BaseProject {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  technologies: string[];
}

interface PersonalProject extends BaseProject {
  type: 'personal';
  github: string;
  demo: string;
}

interface FreelanceProject extends BaseProject {
  type: 'freelance';
  client: string;
  duration: string;
  github?: string;
  demo?: string;
}

interface Product extends BaseProject {
  type: 'product';
  price: string;
  users: string;
  github?: string;
  demo?: string;
}

type Project = PersonalProject | FreelanceProject | Product;

type TabType = 'personal' | 'freelance' | 'products';

// Constants
const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    id: 1,
    type: 'personal',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    title: 'AI Task Manager',
    subtitle: 'Smart productivity app with AI-powered task prioritization and intelligent scheduling',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 2,
    type: 'personal',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    title: 'Data Visualization Tool',
    subtitle: 'Interactive dashboard for complex data analysis with real-time charts',
    technologies: ['D3.js', 'Python', 'Flask', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 3,
    type: 'personal',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
    title: 'Crypto Portfolio Tracker',
    subtitle: 'Real-time cryptocurrency portfolio management with advanced analytics',
    technologies: ['Vue.js', 'Express', 'WebSocket', 'Redis'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
];

const FREELANCE_PROJECTS: FreelanceProject[] = [
  {
    id: 4,
    type: 'freelance',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    title: 'E-commerce Platform',
    subtitle: 'Full-stack online store for fashion brand with payment integration',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    client: 'Fashion Forward Co.',
    duration: '3 months',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 5,
    type: 'freelance',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
    title: 'Restaurant Management',
    subtitle: 'Complete POS system with inventory tracking and staff management',
    technologies: ['React Native', 'Firebase', 'Square API', 'TypeScript'],
    client: 'Bistro Central',
    duration: '2 months',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 6,
    type: 'freelance',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
    title: 'Real Estate CRM',
    subtitle: 'Customer relationship management for property sales and lead tracking',
    technologies: ['Angular', 'Spring Boot', 'MySQL', 'Docker'],
    client: 'Prime Properties',
    duration: '4 months',
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
];

const PRODUCTS: Product[] = [
  {
    id: 7,
    type: 'product',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    title: 'CodeSnap Pro',
    subtitle: 'Professional code screenshot tool for developers with syntax highlighting',
    technologies: ['Electron', 'React', 'Node.js', 'Sharp'],
    price: '$29.99',
    users: '5k+',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 8,
    type: 'product',
    image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=250&fit=crop',
    title: 'Design System Kit',
    subtitle: 'Complete UI component library for modern apps with documentation',
    technologies: ['Figma', 'React', 'Storybook', 'TypeScript'],
    price: '$49.99',
    users: '2k+',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 9,
    type: 'product',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=250&fit=crop',
    title: 'API Monitor',
    subtitle: 'Real-time API health monitoring dashboard with alerting system',
    technologies: ['Go', 'PostgreSQL', 'Docker', 'Grafana'],
    price: '$19.99/mo',
    users: '1k+',
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
];

const TABS = [
  { id: 'personal' as TabType, label: 'Personal Projects', icon: BsPerson },
  { id: 'freelance' as TabType, label: 'Freelance Work', icon: BsBriefcase },
  { id: 'products' as TabType, label: 'Products', icon: BsBox }
];

// Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderProjectInfo = () => {
    switch (project.type) {
      case 'freelance':
        return (
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-muted-foreground">Client</p>
              <p className="font-medium text-foreground">{project.client}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium text-foreground">{project.duration}</p>
            </div>
          </div>
        );
      case 'product':
        return (
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-muted-foreground">Price</p>
              <p className="font-bold text-green-600 dark:text-green-400">{project.price}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Users</p>
              <p className="font-medium text-blue-600 dark:text-blue-400">{project.users}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      transition={{ delay: index * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Image with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            {(project.github || project.type === 'personal') && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/90 hover:bg-white rounded-full text-gray-900 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View on GitHub"
              >
                <BsGithub className="w-5 h-5" />
              </motion.a>
            )}
            {(project.demo || project.type === 'personal') && (
              <motion.a
                href={project.demo || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/90 hover:bg-white rounded-full text-gray-900 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View Demo"
              >
                <BsEye className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {project.subtitle}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project-specific Info */}
        {renderProjectInfo()}
      </div>
    </motion.div>
  );
};

// Main Component
const ProjectsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const getCurrentProjects = (): Project[] => {
    switch (activeTab) {
      case 'personal':
        return PERSONAL_PROJECTS;
      case 'freelance':
        return FREELANCE_PROJECTS;
      case 'products':
        return PRODUCTS;
      default:
        return PERSONAL_PROJECTS;
    }
  };

  const tabVariants = {
    inactive: { scale: 1, opacity: 0.7 },
    active: { scale: 1.05, opacity: 1 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className=" bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            My Work
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore my personal projects, freelance work, and products
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-muted/50 backdrop-blur-sm rounded-xl p-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              variants={tabVariants}
              animate={activeTab === id ? 'active' : 'inactive'}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === id 
                  ? 'bg-background text-foreground shadow-lg border border-border' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getCurrentProjects().map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsShowcase;