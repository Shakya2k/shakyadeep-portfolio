"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface ArticleData {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  url: string;
}

interface ArticleCardProps {
  article: ArticleData;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative h-48 bg-background overflow-hidden">
            {article.imageUrl ? (
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <ExternalLink size={48} className="text-primary/40" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-foreground/70 mb-4 flex-1 line-clamp-3">
              {article.description}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/60">Published on Medium</span>
              <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                Read Article
                <ExternalLink size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
