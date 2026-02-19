"use client";
import { Card } from "@/components/ui/card";

const experiences = [
    {
        role: "Software Developer L1",
        company: "ALUCOR",
        type: "Full-time",
        date: "Oct 2025 - Present",
        location: "Bengaluru, Karnataka, India · On-site",
        description: "Excited to share that I’ve joined Alucor as a Software Developer L1, working onsite in Bengaluru. Looking forward to contributing to impactful projects, learning from a talented team, and continuing to grow in my software development journey. 🚀",
    },
    {
        role: "Front-End Developer Intern",
        company: "Umbrella Room Ventures",
        type: "Internship",
        date: "May 2025 - Present",
        location: "New Delhi",
        description: "Contributing to scalable front-end features using React.js, Next.js, and Tailwind CSS, collaborating with cross-functional teams to deliver responsive, user-centric web interfaces in an agile environment.",
    }
];

const Experience = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">Experience</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {experiences.map((exp, index) => (
                    <Card key={index} className="flex flex-col p-6 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                                <div className="text-lg font-medium text-primary mt-1">
                                    {exp.company} <span className="text-muted-foreground text-sm font-normal">· {exp.type}</span>
                                </div>
                            </div>
                            <div className="mt-2 md:mt-0 text-left md:text-right">
                                <div className="text-sm font-medium text-foreground">{exp.date}</div>
                                <div className="text-sm text-muted-foreground mt-1">{exp.location}</div>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                            {exp.description}
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Experience;
