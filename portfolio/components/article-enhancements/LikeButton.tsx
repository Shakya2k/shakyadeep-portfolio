"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface LikeButtonProps {
  articleSlug: string;
}

export default function LikeButton({ articleSlug }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch current likes count
    fetchLikes();
    
    // Check if user has already liked (from localStorage)
    const likedArticles = JSON.parse(localStorage.getItem("likedArticles") || "[]");
    setHasLiked(likedArticles.includes(articleSlug));
  }, [articleSlug]);

  const fetchLikes = async () => {
    try {
      const response = await fetch(`/api/likes/${articleSlug}`);
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes || 0);
      }
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  };

  const handleLike = async () => {
    if (hasLiked || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/likes/${articleSlug}`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        setHasLiked(true);

        // Save to localStorage
        const likedArticles = JSON.parse(localStorage.getItem("likedArticles") || "[]");
        likedArticles.push(articleSlug);
        localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
      }
    } catch (error) {
      console.error("Failed to like article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 max-w-3xl mx-auto mt-8">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleLike}
        disabled={hasLiked || isLoading}
        className={
          `flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            hasLiked
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-card border border-border hover:border-primary/50 hover:bg-primary/10 text-foreground"
          } disabled:opacity-50 disabled:cursor-not-allowed`
        }
      >
        <Heart
          size={20}
          className={hasLiked ? "fill-primary" : ""}
        />
        <span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
      </motion.button>

      {hasLiked && (
        <span className="text-sm text-foreground/60">Thank you for your support!</span>
      )}
    </div>
  );
}
