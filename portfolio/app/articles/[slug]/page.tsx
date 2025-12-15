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

  // Get related articles (same category)
  const allArticles = await getAllArticles();
  const relatedArticles = allArticles.filter(a => 
    a.category === article.category && a.slug !== article.slug
  ).slice(0, 3);

  return <ArticleContent article={article} content={content} relatedArticles={relatedArticles} />;
}
