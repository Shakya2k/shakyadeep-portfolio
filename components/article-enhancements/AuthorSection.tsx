"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

interface AuthorSectionProps {
  name?: string;
  tagline?: string;
  avatar?: string;
  linkedin?: string;
  email?: string;
}

export default function AuthorSection({
  name = "Shakyadeep Bhattacharyya",
  tagline = "Data Scientist | Turning analytics into measurable growth",
  avatar = "/images/EDIT_ME/profile.jpg",
  linkedin = "https://linkedin.com/in/shakyadeep",
  email = "/contact",
}: AuthorSectionProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12 p-6 bg-card border border-border rounded-lg">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h4 className="text-xl font-bold mb-1 text-foreground">{name}</h4>
          <p className="text-foreground/70 mb-4">{tagline}</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            {email && (
              <Link
                href={email}
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Contact"
              >
                <Mail size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
