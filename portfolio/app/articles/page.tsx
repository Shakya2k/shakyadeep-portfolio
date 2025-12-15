import { getAllArticles, getAllCategories } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";

export default async function Articles() {
  const [articles, categories] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
  ]);

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            Deep dives, case studies, and thought pieces.
          </p>
        </div>

        <ArticlesClient articles={articles} categories={categories} />
      </section>
    </div>
  );
}

