"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Download, MapPin, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import experienceData from "@/content/experience-timeline.json";

type Subrole = {
  role: string;
  displayTitle?: string;
  officialLevel?: string;
  stage?: string;
  dates: string;
  titleNote?: string;
  bullets: string[];
};

type ExperienceItem = {
  id: string;
  company: string;
  logo: string;
  title: string;
  department: string;
  location: string;
  dates: string;
  headline: string;
  progressionNote?: string;
  bullets?: string[];
  subroles?: Subrole[];
  keySkills: string[];
  keyImpact: string;
};

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("cognizant");
  const items = experienceData as ExperienceItem[];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-4 max-w-3xl mx-auto">
            From Computer Science foundations through Cognizant enterprise
            analytics/ML progression and Simon decision science, into production
            Data Scientist work.
          </p>
          <p className="text-sm text-foreground/60 mb-8 max-w-2xl mx-auto">
            Titles reflect verified roles and functional public-facing descriptors.
            Seniority is not inflated. Cognizant middle-stage wording is a
            functional descriptor of the work — not a fabricated HR title.
          </p>

          <a
            href="/Shakyadeep_Bhattacharyya_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary-dark transition-all"
          >
            <Download size={20} />
            Download Resume
          </a>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30 hidden md:block" />

          <div className="space-y-8">
            {items.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="relative"
              >
                <div className="absolute left-8 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block z-10" />

                <div className="md:ml-20 bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all">
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="w-full text-left p-6 hover:bg-card-hover transition-all"
                    aria-expanded={expandedId === exp.id}
                  >
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
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

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
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

                        {exp.subroles && exp.subroles.length > 0 && (
                          <p className="text-sm text-secondary mb-3">
                            Progression:{" "}
                            {exp.subroles
                              .slice()
                              .reverse()
                              .map((s) => s.displayTitle || s.role)
                              .join(" → ")}
                          </p>
                        )}

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

                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-border"
                      >
                        <div className="p-6 space-y-6">
                          {exp.progressionNote && (
                            <p className="text-sm text-foreground/60 border border-border rounded-lg p-3 bg-background">
                              {exp.progressionNote}
                            </p>
                          )}

                          {exp.subroles && exp.subroles.length > 0 ? (
                            <div className="space-y-6">
                              {exp.subroles.map((subrole, idx) => (
                                <div
                                  key={idx}
                                  className="border-l-2 border-primary/30 pl-4"
                                >
                                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                                    <div>
                                      <h4 className="font-semibold text-lg text-secondary">
                                        {subrole.displayTitle || subrole.role}
                                      </h4>
                                      {subrole.stage && (
                                        <span className="text-xs font-mono text-foreground/50">
                                          {subrole.stage}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-sm font-mono text-foreground/60">
                                      {subrole.dates}
                                    </span>
                                  </div>
                                  {subrole.titleNote && (
                                    <p className="text-xs text-foreground/50 mb-3 italic">
                                      {subrole.titleNote}
                                    </p>
                                  )}
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

                          <div>
                            <h4 className="text-sm font-semibold mb-3 text-foreground/60">
                              Key Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.keySkills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-background text-sm rounded border border-primary/30 text-foreground/80"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-4">
                            <div className="text-base font-semibold text-primary">
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
