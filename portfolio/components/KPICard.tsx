"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  delay?: number;
}

export default function KPICard({ title, value, icon, delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card border border-border rounded-lg p-6 hover:bg-card-hover hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-primary/60 group-hover:text-primary transition-colors">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold font-mono mb-2 gradient-text">
        {value}
      </div>
      <div className="text-sm text-foreground/60">{title}</div>
    </motion.div>
  );
}
