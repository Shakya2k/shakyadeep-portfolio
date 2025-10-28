"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Calendar, Briefcase } from "lucide-react";
import experienceData from "@/content/experience.json";

export default function Experience() {
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
            Professional <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            A journey through data-driven impact across consulting, enterprise, and research.
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
        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all group"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-background border border-border rounded-lg overflow-hidden flex items-center justify-center p-4">
                    {/* EDIT_ME: Replace with actual logos */}
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {exp.role}
                      </h2>
                      <p className="text-lg text-primary font-semibold mb-1">
                        {exp.company}
                      </p>
                      <p className="text-sm text-foreground/60 mb-2">
                        {exp.department}
                      </p>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-2">
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <Calendar size={16} />
                        <span>{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/30">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-4">{exp.description}</p>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Briefcase
                          size={16}
                          className="text-primary mt-1 flex-shrink-0"
                        />
                        <span className="text-foreground/70">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
