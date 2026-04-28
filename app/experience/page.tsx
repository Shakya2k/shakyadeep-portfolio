"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Download, MapPin, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import experienceData from "@/content/experience-timeline.json";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            A data-driven career path from analytics to leadership
          </p>

          <a
            href="/Shakyadeep_Bhattacharyya_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary-dark transition-all hover:scale-105"
          >
            <Download size={20} />
            Download Resume
          </a>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30 hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-8 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block z-10" />

                {/* Card */}
                <div className="md:ml-20 bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all">
                  {/* Collapsed view */}
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="w-full text-left p-6 hover:bg-card-hover transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-background border border-border rounded-lg overflow-hidden flex items-center justify-center p-2">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {exp.title}
                            </h3>
                            <p className="text-primary font-semibold">
                              {exp.company}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <span className="font-mono">{exp.dates}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/60 mb-3">
                          <span>{exp.department}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <p className="text-foreground/80 italic mb-3">
                          {exp.headline}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary/80">
                            {expandedId === exp.id ? "Show less" : "Show details"}
                          </span>
                          {expandedId === exp.id ? (
                            <ChevronUp size={20} className="text-primary" />
                          ) : (
                            <ChevronDown size={20} className="text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded view */}
                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border"
                      >
                        <div className="p-6 space-y-6">
                          {/* Subroles (for Cognizant) */}
                          {exp.subroles && exp.subroles.length > 0 ? (
                            <div className="space-y-6">
                              {exp.subroles.map((subrole, idx) => (
                                <div key={idx} className="border-l-2 border-primary/30 pl-4">
                                  <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-semibold text-lg text-secondary">
                                      {subrole.role}
                                    </h4>
                                    <span className="text-sm font-mono text-foreground/60">
                                      {subrole.dates}
                                    </span>
                                  </div>
                                  <ul className="space-y-2">
                                    {subrole.bullets.map((bullet, bIdx) => (
                                      <li
                                        key={bIdx}
                                        className="flex items-start gap-3 text-foreground/80"
                                      >
                                        <Briefcase
                                          size={16}
                                          className="text-primary mt-1 flex-shrink-0"
                                        />
                                        <span>{bullet}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* Regular bullets */
                            <ul className="space-y-3">
                              {exp.bullets?.map((bullet, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3 text-foreground/80"
                                >
                                  <Briefcase
                                    size={16}
                                    className="text-primary mt-1 flex-shrink-0"
                                  />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Key Skills */}
                          <div>
                            <h4 className="text-sm font-semibold mb-3 text-foreground/60">
                              Key Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.keySkills.slice(0, 6).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-background text-sm rounded-full border border-primary/30 text-foreground/80 hover:border-primary hover:shadow-[0_0_10px_rgba(74,222,128,0.3)] transition-all"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Key Impact */}
                          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-4">
                            <div className="text-lg font-semibold text-primary">
                              {exp.keyImpact}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
