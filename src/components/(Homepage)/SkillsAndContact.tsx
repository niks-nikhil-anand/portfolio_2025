"use client";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Card } from "@/components/ui/card";

const skills = [
  "Next JS",
  "React",
  "TypeScript",
  "Node JS",
  "Express JS",
  "MongoDB",
  "SQL",
  "Prisma",
  "LangChain",
  "AWS",
  "Tailwind CSS",
  "Vercel",
  "Git",
];

const contacts = [
  { label: "GitHub", icon: FaGithub, link: "https://github.com/niks-nikhil-anand" },
  { label: "LinkedIn", icon: FaLinkedin, link: "https://www.linkedin.com/in/nikhilanand86/" },
  { label: "X", icon: FaXTwitter, link: "https://x.com/niks_developer" },
];

const SkillsAndContact = () => {
  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Skills Section */}
      <Card className="p-4 rounded-xl bg-muted">
        <h2 className="text-xl font-bold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((name) => (
            <span
              key={name}
              className="px-3 py-1.5 bg-background text-foreground rounded-lg shadow-sm text-sm font-medium"
            >
              {name}
            </span>
          ))}
        </div>
      </Card>

      {/* Contact Section */}
      <Card className="p-4 rounded-xl bg-muted">
        <h2 className="text-xl font-bold mb-2">Let&apos;s connect</h2>
        {/* Social Icons */}
        <div className="flex space-x-2 mb-4">
          {contacts.map(({ label, icon: Icon, link }) => (
            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Email */}
        <div className="mb-2">
          <h3 className="font-semibold text-foreground">Email</h3>
          <p className="text-muted-foreground text-sm">niks.anand.developer@gmail.com</p>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold text-foreground">Address</h3>
          <p className="text-muted-foreground text-sm">Delhi, India</p>
        </div>
      </Card>
    </div>
  );
};

export default SkillsAndContact;
