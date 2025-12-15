import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const likesFilePath = path.join(process.cwd(), "data", "likes.json");

// Ensure data directory and file exist
function ensureLikesFile() {
  const dataDir = path.join(process.cwd(), "data");
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(likesFilePath)) {
    fs.writeFileSync(likesFilePath, JSON.stringify({}), "utf8");
  }
}

function readLikes(): Record<string, number> {
  ensureLikesFile();
  const data = fs.readFileSync(likesFilePath, "utf8");
  return JSON.parse(data);
}

function writeLikes(likes: Record<string, number>) {
  ensureLikesFile();
  fs.writeFileSync(likesFilePath, JSON.stringify(likes, null, 2), "utf8");
}

// GET: Fetch likes count for an article
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const likes = readLikes();
    const count = likes[params.slug] || 0;
    
    return NextResponse.json({ likes: count });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// POST: Increment likes for an article
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const likes = readLikes();
    likes[params.slug] = (likes[params.slug] || 0) + 1;
    writeLikes(likes);
    
    return NextResponse.json({ likes: likes[params.slug] });
  } catch (error) {
    console.error("Error incrementing likes:", error);
    return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
  }
}
