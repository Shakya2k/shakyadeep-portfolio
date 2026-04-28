import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const likesFilePath = path.join(process.cwd(), "data", "likes.json");
const ipTrackingFilePath = path.join(process.cwd(), "data", "likes-ips.json");

// Ensure data directory and files exist
function ensureLikesFiles() {
  const dataDir = path.join(process.cwd(), "data");
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(likesFilePath)) {
    fs.writeFileSync(likesFilePath, JSON.stringify({}), "utf8");
  }
  
  if (!fs.existsSync(ipTrackingFilePath)) {
    fs.writeFileSync(ipTrackingFilePath, JSON.stringify({}), "utf8");
  }
}

function readLikes(): Record<string, number> {
  ensureLikesFiles();
  const data = fs.readFileSync(likesFilePath, "utf8");
  return JSON.parse(data);
}

function writeLikes(likes: Record<string, number>) {
  ensureLikesFiles();
  fs.writeFileSync(likesFilePath, JSON.stringify(likes, null, 2), "utf8");
}

function readIPTracking(): Record<string, string[]> {
  ensureLikesFiles();
  const data = fs.readFileSync(ipTrackingFilePath, "utf8");
  return JSON.parse(data);
}

function writeIPTracking(tracking: Record<string, string[]>) {
  ensureLikesFiles();
  fs.writeFileSync(ipTrackingFilePath, JSON.stringify(tracking, null, 2), "utf8");
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  // Try multiple headers as different proxies use different ones
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip"); // Cloudflare
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback
  return "unknown";
}

// GET: Fetch likes count and whether current user has liked
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const likes = readLikes();
    const ipTracking = readIPTracking();
    const clientIP = getClientIP(request);
    
    const count = likes[params.slug] || 0;
    const hasLiked = ipTracking[params.slug]?.includes(clientIP) || false;
    
    return NextResponse.json({ 
      likes: count,
      hasLiked: hasLiked 
    });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// POST: Increment likes for an article (if IP hasn't liked before)
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const clientIP = getClientIP(request);
    const likes = readLikes();
    const ipTracking = readIPTracking();
    
    // Initialize if doesn't exist
    if (!ipTracking[params.slug]) {
      ipTracking[params.slug] = [];
    }
    
    // Check if this IP has already liked
    if (ipTracking[params.slug].includes(clientIP)) {
      return NextResponse.json({ 
        error: "Already liked",
        likes: likes[params.slug] || 0,
        hasLiked: true
      }, { status: 409 });
    }
    
    // Add like
    likes[params.slug] = (likes[params.slug] || 0) + 1;
    ipTracking[params.slug].push(clientIP);
    
    writeLikes(likes);
    writeIPTracking(ipTracking);
    
    return NextResponse.json({ 
      likes: likes[params.slug],
      hasLiked: true,
      success: true
    });
  } catch (error) {
    console.error("Error incrementing likes:", error);
    return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
  }
}
