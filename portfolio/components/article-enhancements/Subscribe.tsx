"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thanks for subscribing!");
        setEmail("");
      } else {
        const data = await response.json();
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 p-6 bg-card border border-border rounded-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-primary/20 rounded-lg">
          <Mail size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 text-foreground">Stay Updated</h3>
          <p className="text-foreground/70 mb-4">
            Get notified when I publish new articles. No spam, unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary transition-colors"
              disabled={status === "loading" || status === "success"}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="px-6 py-2 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-3 flex items-center gap-2 text-sm ${
                  status === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {status === "success" && <CheckCircle size={16} />}
                <span>{message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
