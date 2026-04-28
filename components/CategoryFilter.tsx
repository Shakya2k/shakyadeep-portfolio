"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onSelectCategory("All")}
          className={
            `px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "All"
                ? "bg-primary text-background shadow-lg scale-105"
                : "bg-card border border-border text-foreground/80 hover:border-primary/50 hover:text-primary"
            }`
          }
        >
          All
        </motion.button>
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 1) * 0.05 }}
            onClick={() => onSelectCategory(category)}
            className={
              `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-background shadow-lg scale-105"
                  : "bg-card border border-border text-foreground/80 hover:border-primary/50 hover:text-primary"
              }`
            }
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
