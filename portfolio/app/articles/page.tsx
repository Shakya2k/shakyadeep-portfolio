import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import articlesConfig from "@/data/articles.json";
import {
  fetchMediumMetadata,
  mergeArticleData,
  type ArticleData,
} from "@/lib/fetchMediumMetadata";

async function getArticles(): Promise<ArticleData[]> {
  const articlesPromises = articlesConfig.map(async (config) => {
    const metadata = await fetchMediumMetadata(config.mediumUrl);
    return mergeArticleData(config, metadata);
  });

  return Promise.all(articlesPromises);
}

export default async function Articles() {
  const articles = await getArticles();

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center lg:text-left"
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            Deep dives, case studies, and thought pieces I publish on Medium.
          </p>
        </motion.div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-foreground/60 text-lg">
              No articles available yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
