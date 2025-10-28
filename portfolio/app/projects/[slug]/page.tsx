"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Briefcase, Lightbulb, Target, Code, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";
import projectsData from "@/content/projects.json";
import { use } from "react";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const project = projectsData.find((p) => p.id === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/30">
              {project.category}
            </span>
            <span className="text-foreground/60">{project.organization}</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl text-foreground/80 mb-8">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-card text-sm rounded-full border border-border text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-96 rounded-lg overflow-hidden mb-12 border border-border"
        >
          {/* EDIT_ME: Replace with actual project images */}
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* STAR Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Situation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase size={24} className="text-primary" />
              <h2 className="text-2xl font-bold">Situation</h2>
            </div>
            <p className="text-foreground/80">{project.situation}</p>
          </motion.div>

          {/* Task */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target size={24} className="text-secondary" />
              <h2 className="text-2xl font-bold">Task</h2>
            </div>
            <p className="text-foreground/80">{project.task}</p>
          </motion.div>
        </div>

        {/* Action - Split into Non-Tech & Tech */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">
            <Lightbulb className="inline mr-2 text-accent" size={28} />
            Action
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Non-Technical */}
            <div className="bg-card border border-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-accent">
                Business & Strategy
              </h3>
              <p className="text-foreground/80">{project.actionNonTech}</p>
            </div>

            {/* Technical */}
            <div className="bg-card border border-primary/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                <Code className="inline mr-2" size={20} />
                Technical Implementation
              </h3>
              <p className="text-foreground/80">{project.actionTech}</p>
            </div>
          </div>
        </motion.div>

        {/* Result - Split into Business & Tech */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            <TrendingUp className="inline mr-2 text-primary" size={28} />
            Results
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Impact */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Business Impact
              </h3>
              <p className="text-foreground/90 font-medium">
                {project.resultBusiness}
              </p>
            </div>

            {/* Technical Achievement */}
            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-secondary">
                Technical Achievement
              </h3>
              <p className="text-foreground/90 font-medium">
                {project.resultTech}
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
