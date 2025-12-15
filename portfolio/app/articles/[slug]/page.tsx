import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import ArticleContent from "./ArticleContent";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  
  // Only generate pages for internal articles
  return articles
    .filter(article => !article.isExternal)
    .map(article => ({
      slug: article.slug,
    }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const result = await getArticleBySlug(params.slug);

  if (!result) {
    notFound();
  }

  const { article, content } = result;

  return <ArticleContent article={article} content={content} />;
}
