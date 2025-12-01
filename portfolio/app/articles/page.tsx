import ArticleCard from "@/components/ArticleCard";
import { fetchMediumRSSFeed, type MediumArticle } from "@/lib/fetchMediumRSS";

// Your Medium username (can be moved to config later)
const MEDIUM_USERNAME = "shakyadeepbhattacharyya";

// Transform MediumArticle to match ArticleData interface
interface ArticleData {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  url: string;
}

async function getArticles(): Promise<ArticleData[]> {
  const articles = await fetchMediumRSSFeed(MEDIUM_USERNAME);
  
  // Transform to ArticleData format with generated IDs
  return articles.map((article, index) => ({
    id: `article-${index}`,
    title: article.title,
    description: article.description,
    imageUrl: article.imageUrl,
    url: article.url,
  }));
}

export default async function Articles() {
  const articles = await getArticles();

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            Deep dives, case studies, and thought pieces I publish on Medium.
          </p>
        </div>

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

