"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const proofSignals = [
  {
    label: "Operational projects in production systems",
    value: "1,679",
    note: "Rock Emergency Services",
  },
  {
    label: "Estimated revenue represented",
    value: "~$22M",
    note: "Across those operational projects",
  },
  {
    label: "Reconciliation-effort reduction",
    value: "50%+",
    note: "With key signal latency under 5 minutes",
  },
];

const skillGroups = [
  {
    title: "Data Science Core",
    items: [
      "Data Science",
      "Python",
      "SQL",
      "Machine Learning",
      "Statistical Modeling",
      "Predictive Modeling",
      "Experimentation",
      "Forecasting",
      "scikit-learn",
      "XGBoost",
      "Data Analysis",
      "Tableau",
      "Power BI",
    ],
  },
  {
    title: "Systems & Applied AI",
    items: [
      "AWS",
      "Azure",
      "Data Engineering",
      "FastAPI",
      "MLflow",
      "LLM Systems",
      "Agent Workflows",
      "Java",
      "React",
    ],
  },
];

export default function Home() {
  return (
    <div className="pt-20">
      <section className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center lg:text-left"
          >
            <div className="relative w-56 h-56 mx-auto lg:mx-0 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/20 rounded-full blur-2xl opacity-40" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/80">
                <Image
                  src="/images/EDIT_ME/profile.jpg"
                  alt="Shakya Bhattacharyya, Data Scientist"
                  fill
                  sizes="224px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <p className="text-sm font-mono uppercase tracking-widest text-primary mb-3">
              Data Scientist · Decision Science & Production ML
            </p>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 leading-tight">
              Data Scientist building systems that turn{" "}
              <span className="gradient-text">predictions into decisions.</span>
            </h1>

            <p className="text-lg lg:text-xl text-foreground/80 mb-4 max-w-xl mx-auto lg:mx-0">
              I work across decision science, production ML, forecasting,
              experimentation, anomaly detection, and governed AI systems —
              connecting Python/SQL models to real operational actions.
            </p>

            <p className="text-sm text-foreground/60 mb-8 font-mono">
              Experimentation · Forecasting · Applied ML · Operational Decision
              Systems · Applied AI
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                href="/projects"
                className="px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary-dark transition-all"
              >
                View Projects
              </Link>
              <Link
                href="/experience"
                className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all"
              >
                Experience
              </Link>
              <a
                href="/Shakyadeep_Bhattacharyya_Resume.pdf"
                download
                className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-all"
              >
                Download Resume
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-all"
              >
                Contact
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-mono text-primary mb-2">
              Production scope &amp; impact
            </h2>
            <p className="text-sm text-foreground/60 mb-4">
              Selected metrics from production decision-intelligence work at Rock
              Emergency Services.
            </p>
            {proofSignals.map((signal) => (
              <div
                key={signal.label}
                className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors"
              >
                <div className="text-3xl font-bold font-mono text-primary mb-1">
                  {signal.value}
                </div>
                <div className="font-medium text-foreground">{signal.label}</div>
                <div className="text-sm text-foreground/60 mt-1">{signal.note}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-3xl font-bold mb-2 font-mono">
            Career <span className="text-primary">arc</span>
          </h2>
          <p className="text-foreground/70 mb-8 max-w-3xl">
            My path combines a computer-science foundation, enterprise analytics
            and machine learning at Cognizant, graduate decision science at Simon
            Business School, and current production Data Science work at Rock
            Emergency Services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                t: "CS foundation",
                d: "B.Tech CSE · MAKAUT (IEM)",
              },
              {
                t: "Enterprise analytics / ML",
                d: "Cognizant progression into Jr. Software Engineer | Data Analytics & ML",
              },
              {
                t: "Decision science",
                d: "M.S. Business Analytics · Simon · GPA 3.9",
              },
              {
                t: "Production DS",
                d: "Rock · Decision Intelligence systems",
              },
            ].map((step) => (
              <div
                key={step.t}
                className="border border-border rounded-lg p-4 bg-card"
              >
                <h3 className="font-semibold text-primary mb-2">{step.t}</h3>
                <p className="text-sm text-foreground/70">{step.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-3xl font-bold mb-2 font-mono">
            Technical <span className="text-secondary">toolkit</span>
          </h2>
          <p className="text-foreground/60 mb-8">
            Core data-science methods, production systems, and applied AI
            capabilities used across modeling, experimentation, forecasting, and
            operational decision workflows.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-background text-sm rounded border border-border text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-3xl font-bold mb-8 font-mono">
            <span className="text-secondary">Education</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-background border border-border rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                  <Image
                    src="/images/EDIT_ME/logo-simon.png"
                    alt="Simon Business School logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    M.S. Business Analytics (STEM)
                  </h3>
                  <p className="text-secondary font-medium mb-2">
                    University of Rochester · Simon Business School
                  </p>
                  <p className="text-foreground/60 text-sm">Jul 2024 – Dec 2025</p>
                  <p className="text-foreground/60 text-sm">
                    GPA 3.9 / 4.0 · Dean&apos;s List · Merit Scholarship
                  </p>
                  <p className="text-foreground/60 text-sm">
                    Advanced Certificate in Pricing Analytics
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-background border border-border rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                  <Image
                    src="/images/EDIT_ME/logo-iem.png"
                    alt="MAKAUT / IEM logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    B.Tech Computer Science & Engineering
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    Maulana Abul Kalam Azad University of Technology (MAKAUT)
                  </p>
                  <p className="text-foreground/60 text-sm">
                    College: Institute of Engineering & Management (IEM), Kolkata
                  </p>
                  <p className="text-foreground/60 text-sm">Aug 2018 – Jun 2022</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/30 rounded-2xl p-10 text-center"
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Inspectable technical proof in{" "}
            <span className="gradient-text">Decision Science & Production ML</span>
          </h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Browse professional, consulting, and academic projects organized by
            problem area — with simulated and projected outcomes labeled.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background font-semibold rounded-lg hover:bg-primary-dark transition-all text-lg"
          >
            View Projects
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
