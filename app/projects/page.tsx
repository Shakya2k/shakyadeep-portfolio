"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import projectsData from "@/content/projects.json";

const PROBLEM_AREAS = [
  "All",
  "Production Decision Analytics",
  "Applied ML / Experimentation",
  "AI Systems",
] as const;

type Project = (typeof projectsData)[number] & {
  problemArea?: string;
  evidenceLabel?: string;
};

export default function Projects() {
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const projects = projectsData as Project[];

  const filteredProjects = useMemo(
    () =>
      selectedArea === "All"
        ? projects
        : projects.filter((p) => p.problemArea === selectedArea),
    [projects, selectedArea]
  );

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            Technical <span className="gradient-text">Proof</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-3 max-w-3xl">
            Selected work across production decision analytics, applied ML and
            experimentation, and governed AI systems — organized by the problems
            being solved rather than by résumé category.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {PROBLEM_AREAS.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                selectedArea === area
                  ? "bg-primary text-background"
                  : "bg-card text-foreground/80 border border-border hover:border-primary/50"
              }`}
            >
              {area}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group h-full flex flex-col">
                  <div className="relative h-48 bg-background overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} thumbnail`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 justify-between">
                      <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-primary text-xs font-medium rounded border border-primary/30">
                        {project.problemArea || project.category}
                      </span>
                      {project.evidenceLabel && (
                        <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground/80 text-xs font-medium rounded border border-border">
                          {project.evidenceLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-3">
                      {project.organization}
                      <span className="mx-2">·</span>
                      <span className="text-foreground/45">{project.category}</span>
                    </p>
                    <p className="text-foreground/70 mb-4 flex-1">
                      {project.shortDescription}
                    </p>

                    <div className="flex items-center text-primary font-medium text-sm">
                      View Details
                      <ArrowRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
