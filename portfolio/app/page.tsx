"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Target,
  Zap,
  Award,
  ArrowRight,
} from "lucide-react";
import KPICard from "@/components/KPICard";
import CountUp from "@/components/CountUp";
import SkillBar from "@/components/SkillBar";

export default function Home() {
  const skills = [
    { name: "Python", years: 7, color: "#4ade80" },
    { name: "SQL", years: 7, color: "#60a5fa" },
    { name: "Excel", years: 7, color: "#9b5de5" },
    { name: "Statistics & Experimentation", years: 5, color: "#4ade80" },
    { name: "Business Strategy", years: 4, color: "#60a5fa" },
    { name: "Data Storytelling", years: 4, color: "#9b5de5" },
    { name: "Machine Learning", years: 4, color: "#4ade80" },
    { name: "Tableau", years: 3, color: "#60a5fa" },
    { name: "Power BI", years: 1, color: "#9b5de5" },
    { name: "Pricing Analytics", years: 1, color: "#4ade80" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section - Tableau Dashboard Style */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Photo & Headline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="relative w-64 h-64 mx-auto lg:mx-0 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary">
                {/* EDIT_ME: Replace with actual photo */}
                <Image
                  src="/images/EDIT_ME/profile.jpg"
                  alt="Shakyadeep Bhattacharyya"
                  fill
                  sizes="256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
              From <span className="gradient-text">data chaos</span>
              <br />
              to business clarity.
            </h1>

            <p className="text-xl text-foreground/80 mb-8">
              Turning analytics into measurable growth.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/projects"
                className="px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary-dark transition-all hover:scale-105"
              >
                View Projects
              </Link>
              <Link
                href="/experience"
                className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all"
              >
                Experience
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-all"
              >
                About Me
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-all"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>

          {/* Right: KPI Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6 font-mono text-primary">
              Key Performance Indicators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <KPICard
                title="Revenue Impact"
                value={
                  <>
                    $<CountUp end={3.2} decimals={1} />M+
                  </>
                }
                icon={<TrendingUp size={32} />}
                delay={0}
              />
              <KPICard
                title="Projects Delivered"
                value={
                  <>
                    <CountUp end={25} />+
                  </>
                }
                icon={<Target size={32} />}
                delay={0.1}
              />
              <KPICard
                title="Pipelines Automated"
                value={<CountUp end={17} />}
                icon={<Zap size={32} />}
                delay={0.2}
              />
              <KPICard
                title="Stakeholder NPS"
                value={
                  <>
                    <CountUp end={9.4} decimals={1} />
                    /10
                  </>
                }
                icon={<Award size={32} />}
                delay={0.3}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h2 className="text-3xl font-bold mb-2 font-mono">
            Core <span className="text-primary">Competencies</span>
          </h2>
          <p className="text-foreground/60 mb-8">
            Technical and analytical skills honed through real-world impact
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              {skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  skill={skill.name}
                  years={skill.years}
                  color={skill.color}
                />
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all group">
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  Technical Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python (pandas, NumPy, scikit-learn, matplotlib)",
                    "SQL",
                    "Excel",
                    "Tableau",
                    "Power BI",
                    "Snowflake",
                    "Azure Data Factory",
                    "Git",
                    "APIs",
                    "Streamlit",
                    "MLflow",
                    "NLP",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-background text-sm rounded-full border border-primary/30 text-foreground/80 hover:border-primary hover:shadow-[0_0_10px_rgba(74,222,128,0.3)] transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:border-secondary/50 transition-all group">
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  Domain Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Pricing & Revenue Optimization",
                    "Marketing & Customer Analytics",
                    "Financial Forecasting",
                    "Product Experimentation",
                    "Risk Analytics",
                    "Data Engineering",
                    "Business Intelligence",
                    "ETL Pipelines",
                  ].map((domain) => (
                    <span
                      key={domain}
                      className="px-3 py-1 bg-background text-sm rounded-full border border-secondary/30 text-foreground/80 hover:border-secondary hover:shadow-[0_0_10px_rgba(96,165,250,0.3)] transition-all cursor-default"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all group">
                <h3 className="text-xl font-semibold mb-3 text-accent">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Analytical Storytelling",
                    "Stakeholder Communication",
                    "Leadership",
                    "Problem Solving",
                    "Teaching & Mentoring",
                    "Time Management",
                    "Cross-Functional Collaboration",
                  ].map((soft) => (
                    <span
                      key={soft}
                      className="px-3 py-1 bg-background text-sm rounded-full border border-accent/30 text-foreground/80 hover:border-accent hover:shadow-[0_0_10px_rgba(155,93,229,0.3)] transition-all cursor-default"
                    >
                      {soft}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Education */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 font-mono">
            <span className="text-secondary">Education</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-secondary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-background border border-border rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                  <Image
                    src="/images/EDIT_ME/logo-simon.png"
                    alt="Simon Business School"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    M.S. Business Analytics
                  </h3>
                  <p className="text-secondary font-medium mb-2">
                    Simon Business School, University of Rochester
                  </p>
                  <p className="text-foreground/60 text-sm">
                    3.9 GPA • Dean's List
                  </p>
                  <p className="text-foreground/60 text-sm">
                    Advanced Certificate in Pricing
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-background border border-border rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                  <Image
                    src="/images/EDIT_ME/logo-iem.png"
                    alt="IEM Kolkata"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    B.Tech Computer Science
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    Institute of Engineering & Management (IEM), Kolkata
                  </p>
                  <p className="text-foreground/60 text-sm">
                    Computer Science & Engineering
                  </p>
                  <p className="text-foreground/60 text-sm">
                    Director's Award for Outstanding Performance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Summary CTA */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/30 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            I turn messy data into actionable insights that help businesses
            <br />
            <span className="gradient-text">
              cut costs, grow revenue, and make smarter decisions, FAST.
            </span>
          </h2>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background font-semibold rounded-lg hover:bg-primary-dark transition-all hover:scale-105 text-lg"
          >
            Let's Work Together
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
