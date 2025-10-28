"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import projectsData from "@/content/projects.json";

const categories = ["All", "Academic", "Professional", "Consulting", "Freelance", "Personal"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            Impact <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            From experimentation to ML deployment, see how I transform data into business outcomes.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-background"
                  : "bg-card text-foreground/80 border border-border hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-background overflow-hidden">
                    {/* EDIT_ME: Replace with actual thumbnails */}
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-primary text-xs font-medium rounded-full border border-primary/30">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-3">
                      {project.organization}
                    </p>
                    <p className="text-foreground/70 mb-4 flex-1">
                      {project.shortDescription}
                    </p>

                    <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
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
