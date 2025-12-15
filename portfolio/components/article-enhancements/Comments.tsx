"use client";

// Giscus-based comments component
// Requires GitHub Discussions to be enabled on your repo

import { useEffect, useRef } from "react";

interface CommentsProps {
  repo: string; // e.g., "username/repo-name"
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: "pathname" | "url" | "title" | "og:title" | "specific" | "number";
  theme?: "light" | "dark" | "preferred_color_scheme";
}

export default function Comments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = "pathname",
  theme = "dark",
}: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    // Clear existing comments
    commentsRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    commentsRef.current.appendChild(script);
  }, [repo, repoId, category, categoryId, mapping, theme]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Comments</h3>
      <div ref={commentsRef} />
    </div>
  );
}
