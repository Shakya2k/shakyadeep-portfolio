"use client";

import { motion } from "framer-motion";
import {
  Heart,
  ThumbsDown,
  Sparkles,
  Coffee,
  Mountain,
  Code2,
} from "lucide-react";

export default function About() {
  const likes = [
    { icon: <Coffee />, text: "Cooking fusion food" },
    { icon: <Mountain />, text: "Exploring mountain towns" },
    { icon: <Code2 />, text: "Tinkering with AI tools" },
    { icon: <Heart />, text: "Data storytelling" },
  ];

  const dislikes = [
    { text: "Repetitive manual tasks" },
    { text: "Analysis paralysis" },
    { text: "Unnecessary meetings" },
    { text: "Data without context" },
  ];

  const funFacts = [
    "I once optimized a recipe using A/B testing to perfect my fusion curry.",
    "My code has probably saved hundreds of hours of manual Excel work.",
    "I believe every dataset has a story — you just need to ask the right questions.",
    "I've automated my personal finance tracking using Python and it's oddly satisfying.",
  ];

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
            About <span className="gradient-text">Me</span>
          </h1>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-lg p-8 mb-12"
        >
          <p className="text-2xl text-foreground/90 leading-relaxed mb-6">
            I'm a data scientist and pricing strategist who finds order in chaos
            and patterns in numbers.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            Outside work I love cooking fusion food, exploring mountain towns,
            and tinkering with AI tools. Whether it's optimizing a pricing model
            or perfecting a recipe, I approach challenges with curiosity and
            precision.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            I believe analytics should drive clarity, not complexity — that's how
            I turn data into decisions that actually move the needle.
          </p>
        </motion.div>

        {/* Likes & Dislikes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Likes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-primary/50 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="text-primary" size={28} />
              Things I Love
            </h2>
            <ul className="space-y-4">
              {likes.map((like, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-foreground/80"
                >
                  <span className="text-primary">{like.icon}</span>
                  <span>{like.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Dislikes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-secondary/50 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ThumbsDown className="text-secondary" size={28} />
              Things I Avoid
            </h2>
            <ul className="space-y-4">
              {dislikes.map((dislike, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-foreground/80"
                >
                  <span className="text-secondary mt-1">•</span>
                  <span>{dislike.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/50 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="text-accent" size={28} />
            Fun Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {funFacts.map((fact, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-4"
              >
                <p className="text-foreground/80">{fact}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
