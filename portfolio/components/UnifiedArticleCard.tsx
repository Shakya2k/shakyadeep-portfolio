"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import type { Article } from "@/lib/articles";

interface UnifiedArticleCardProps {
  article: Article;
  index: number;
}

export default function UnifiedArticleCard({ article, index }: UnifiedArticleCardProps) {
  const CardContent = (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group h-full flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-48 bg-background overflow-hidden">
        {article.heroImage ? (
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            {article.isExternal ? (
              <ExternalLink size={48} className="text-primary/40" />
            ) : (
              <div className="text-primary/40 text-5xl font-bold">
                {article.title.charAt(0)}
              </div>
            )}
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/90 text-background backdrop-blur-sm">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-foreground/70 mb-4 flex-1 line-clamp-3">
          {article.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-foreground/60 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {article.readTime && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{article.readTime}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground/60">
            {article.isExternal ? "Published on Medium" : "Read on site"}
          </span>
          <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
            Read Article
            {article.isExternal && <ExternalLink size={16} className="ml-1" />}
          </div>
        </div>
      </div>
    </div>
  );

  const cardMotion = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      {article.isExternal ? (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {CardContent}
        </a>
      ) : (
        <Link href={article.url} className="block h-full">
          {CardContent}
        </Link>
      )}
    </motion.div>
  );

  return cardMotion;
}
