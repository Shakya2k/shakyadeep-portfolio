"use client";

import { useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import UnifiedArticleCard from "@/components/UnifiedArticleCard";
import type { Article } from "@/lib/articles";

interface ArticlesClientProps {
  articles: Article[];
  categories: string[];
}

export default function ArticlesClient({ articles, categories }: ArticlesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <>
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <UnifiedArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-foreground/60 text-lg">
            No articles found in this category.
          </p>
        </div>
      )}
    </>
  );
}
