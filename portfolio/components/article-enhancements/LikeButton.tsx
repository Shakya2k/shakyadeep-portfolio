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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLikes();
  }, [articleSlug]);

  const fetchLikes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/likes/${articleSlug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes || 0);
        setHasLiked(data.hasLiked || false);
      } else {
        console.error("Failed to fetch likes:", response.status);
        setError("Could not load likes");
      }
    } catch (error) {
      console.error("Failed to fetch likes:", error);
      setError("Could not load likes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (hasLiked || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log(`[LikeButton] Attempting to like: ${articleSlug}`);
      
      const response = await fetch(`/api/likes/${articleSlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`[LikeButton] Response status: ${response.status}`);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        console.error(`[LikeButton] API error:`, data);
        
        if (response.status === 409) {
          // Already liked - this is actually success
          console.log(`[LikeButton] Already liked (409)`);
          setHasLiked(true);
          setLikes(data.likes || likes);
          return;
        }
        
        // Other errors
        setError(`Error: ${data.error || response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log(`[LikeButton] Success:`, data);
      
      setLikes(data.likes);
      setHasLiked(true);
      
    } catch (error) {
      console.error("[LikeButton] Network error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 max-w-3xl mx-auto mt-8">
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
        <span>
          {isLoading && !hasLiked ? "Loading..." : `${likes} ${likes === 1 ? "Like" : "Likes"}`}
        </span>
      </motion.button>

      {hasLiked && (
        <span className="text-sm text-foreground/60">Thank you for your support!</span>
      )}
      
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}
