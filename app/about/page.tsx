"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  ThumbsDown,
  Sparkles,
  Coffee,
  Mountain,
  Code2,
} from "lucide-react";
import { FEATURES } from "@/config/site";

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

  // Video Introduction - IntersectionObserver for autoplay
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoInView, setIsVideoInView] = useState(false);

  useEffect(() => {
    if (!FEATURES.introVideoEnabled || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVideoInView(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            // Play video when in view
            videoRef.current?.play().catch((err) => {
              // Silently fail if autoplay is blocked by browser
              console.log("Autoplay prevented:", err);
            });
          } else {
            // Pause when out of view
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

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
            I&apos;m a Data Scientist focused on the layer between predictive
            models and real operational decisions — Decision Science &amp;
            Production ML.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            My work combines Python, SQL, machine learning, forecasting,
            experimentation, and production data systems to turn complex
            operational data into measurable actions. AI systems are a supporting
            edge, not the whole identity.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Outside work I love cooking fusion food, exploring mountain towns,
            and tinkering with tools — approaching both recipes and models with
            curiosity and precision.
          </p>
        </motion.div>

        {/* Video Introduction Section - Feature Flagged */}
        {/* 
          TO ENABLE THIS VIDEO SECTION:
          1. Add your video file to: public/videos/intro.mp4
          2. Go to config/site.ts and set: introVideoEnabled = true
          3. Redeploy the site
          
          The video will autoplay when scrolled into view (if browser allows).
          Browser autoplay policies may block sound - this is expected behavior.
        */}
        {FEATURES.introVideoEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="intro-video"
            className="mb-12"
          >
            <div className="text-center lg:text-left mb-6">
              <h2 className="text-3xl font-bold mb-2 font-mono">
                Video <span className="text-primary">Introduction</span>
              </h2>
              <p className="text-foreground/60">
                Get to know me in a quick video walkthrough of my background, work, and how I think about data and business.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition-all shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]">
              <video
                ref={videoRef}
                src="/videos/intro.mp4"
                controls
                loop
                playsInline
                className="w-full rounded-2xl"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        )}

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
