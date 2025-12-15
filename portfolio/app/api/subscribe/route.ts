import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const subscribersFilePath = path.join(process.cwd(), "data", "subscribers.json");

// Ensure data directory and file exist
function ensureSubscribersFile() {
  const dataDir = path.join(process.cwd(), "data");
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(subscribersFilePath)) {
    fs.writeFileSync(subscribersFilePath, JSON.stringify([]), "utf8");
  }
}

function readSubscribers(): Array<{ email: string; subscribedAt: string }> {
  ensureSubscribersFile();
  const data = fs.readFileSync(subscribersFilePath, "utf8");
  return JSON.parse(data);
}

function writeSubscribers(subscribers: Array<{ email: string; subscribedAt: string }>) {
  ensureSubscribersFile();
  fs.writeFileSync(subscribersFilePath, JSON.stringify(subscribers, null, 2), "utf8");
}

// POST: Add a new subscriber
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    
    const subscribers = readSubscribers();
    
    // Check if already subscribed
    if (subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 409 });
    }
    
    // Add new subscriber
    subscribers.push({
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
    });
    
    writeSubscribers(subscribers);
    
    // TODO: Integrate with email service (SendGrid, Mailchimp, etc.)
    // For now, just store in JSON file
    
    return NextResponse.json({ success: true, message: "Successfully subscribed" });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
