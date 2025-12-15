"use client";

"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { motion } from "framer-motion";
import type { Article } from "@/lib/articles";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleContentProps {
  article: Article;
  content: string;
}

// Custom MDX components for styling
const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-6 mb-3 text-foreground" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mt-4 mb-2 text-foreground" {...props} />,
  p: (props: any) => <p className="text-lg leading-relaxed mb-4 text-foreground/90" {...props} />,
  a: (props: any) => (
    <a
      className="text-primary hover:underline font-medium"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-foreground/90" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground/90" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-foreground/80" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-background/50 px-2 py-1 rounded text-sm font-mono text-primary" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto mb-4 border border-border" {...props} />
  ),
  img: (props: any) => (
    <span className="block my-6">
      <Image
        src={props.src}
        alt={props.alt || ''}
        width={800}
        height={400}
        className="rounded-lg w-full"
        unoptimized
      />
    </span>
  ),
};

export default function ArticleContent({ article, content }: ArticleContentProps) {
  return (
    <div className="pt-20 min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-6 py-6">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 pb-12"
      >
        {/* Hero Image */}
        {article.heroImage && (
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Article Header */}
        <div className="max-w-3xl mx-auto">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-foreground/70 mb-6">
            {article.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 mb-6 pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {new Date(article.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag size={16} className="text-foreground/60" />
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-background border border-border text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-6 pb-20"
      >
        <div className="max-w-3xl mx-auto prose prose-lg prose-invert">
          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                ],
              },
            }}
          />
        </div>
      </motion.article>

      {/* Optional: Comments, Likes, Subscribe sections go here */}
      {/* We'll add these as modular components in the next step */}
    </div>
  );
}
