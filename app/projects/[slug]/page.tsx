"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Lightbulb,
  Target,
  Code,
  TrendingUp,
} from "lucide-react";
import { useParams } from "next/navigation";
import projectsData from "@/content/projects.json";

type Project = (typeof projectsData)[number] & {
  problemArea?: string;
  evidenceLabel?: string;
  resultLabel?: string;
};

export default function ProjectDetail() {
  const params = useParams();
  const project = (projectsData as Project[]).find((p) => p.id === params.slug);

  if (!project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-primary hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded border border-primary/30">
              {project.problemArea || project.category}
            </span>
            {project.evidenceLabel && (
              <span className="px-4 py-1 bg-card text-foreground/80 text-sm font-medium rounded border border-border">
                {project.evidenceLabel}
              </span>
            )}
            <span className="text-foreground/60">{project.organization}</span>
            <span className="text-foreground/40 text-sm">{project.category}</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl text-foreground/80 mb-8">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-card text-sm rounded border border-border text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="relative h-96 rounded-lg overflow-hidden mb-12 border border-border"
        >
          <Image
            src={project.thumbnail}
            alt={`${project.title} visual`}
            fill
            className="object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase size={24} className="text-primary" />
              <h2 className="text-2xl font-bold">Problem</h2>
            </div>
            <p className="text-foreground/80">{project.situation}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target size={24} className="text-secondary" />
              <h2 className="text-2xl font-bold">Task</h2>
            </div>
            <p className="text-foreground/80">{project.task}</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            <Lightbulb className="inline mr-2 text-accent" size={28} />
            Approach
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-accent">
                Decision & Context
              </h3>
              <p className="text-foreground/80">{project.actionNonTech}</p>
            </div>

            <div className="bg-card border border-primary/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                <Code className="inline mr-2" size={20} />
                Technical Implementation
              </h3>
              <p className="text-foreground/80">{project.actionTech}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">
            <TrendingUp className="inline mr-2 text-primary" size={28} />
            {project.resultLabel || "Results"}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {project.resultLabel || "Outcome"}
              </h3>
              <p className="text-foreground/90 font-medium">
                {project.resultBusiness}
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-secondary">
                Technical Notes
              </h3>
              <p className="text-foreground/90 font-medium">
                {project.resultTech}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
