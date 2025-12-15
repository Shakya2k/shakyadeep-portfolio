"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { Article } from "@/lib/articles";

interface RelatedArticlesProps {
  articles: Article[];
  currentSlug: string;
}

export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  // Filter out current article
  const related = articles.filter(a => a.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-16">
      <h3 className="text-2xl font-bold mb-6 text-foreground">More Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={article.isExternal ? article.externalUrl! : article.url}
              target={article.isExternal ? "_blank" : undefined}
              rel={article.isExternal ? "noopener noreferrer" : undefined}
              className="block h-full"
            >
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-40 bg-background overflow-hidden">
                  {article.heroImage ? (
                    <Image
                      src={article.heroImage}
                      alt={article.heroImageAlt || article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <div className="text-primary/40 text-3xl font-bold">
                        {article.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/90 text-background backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  
                  <p className="text-sm text-foreground/70 mb-3 flex-1 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>
                        {new Date(article.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    {article.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{article.readTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
