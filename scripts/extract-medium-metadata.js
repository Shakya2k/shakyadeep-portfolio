#!/usr/bin/env node

/**
 * Medium Article Metadata Extractor
 * 
 * This script helps you manually extract metadata from Medium articles
 * when automatic scraping fails due to bot protection.
 * 
 * Usage:
 *   node scripts/extract-medium-metadata.js <medium-url>
 * 
 * Example:
 *   node scripts/extract-medium-metadata.js https://medium.com/@yourhandle/article-slug
 * 
 * The script will output the metadata in JSON format that you can copy
 * directly into data/articles.json
 */

const https = require('https');
const http = require('http');

const url = process.argv[2];

if (!url) {
  console.error('❌ Error: Please provide a Medium article URL');
  console.log('\nUsage:');
  console.log('  node scripts/extract-medium-metadata.js <medium-url>');
  console.log('\nExample:');
  console.log('  node scripts/extract-medium-metadata.js https://medium.com/@user/article-title');
  process.exit(1);
}

console.log('🔍 Fetching metadata from:', url);
console.log('');

const protocol = url.startsWith('https') ? https : http;

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
  }
};

protocol.get(url, options, (res) => {
  let html = '';

  res.on('data', (chunk) => {
    html += chunk;
  });

  res.on('end', () => {
    const title = extractMeta(html, 'og:title') || extractMeta(html, 'twitter:title') || 'Article Title';
    const description = extractMeta(html, 'og:description') || extractMeta(html, 'twitter:description') || 'Article description';
    const image = extractMeta(html, 'og:image') || extractMeta(html, 'twitter:image') || null;

    console.log('✅ Metadata extracted successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 Title:', title);
    console.log('📄 Description:', description.substring(0, 100) + (description.length > 100 ? '...' : ''));
    console.log('🖼️  Image:', image || '(no image found)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const articleId = url.split('/').pop().split('?')[0] || 'article-id';
    
    console.log('📋 Copy this into data/articles.json:\n');
    console.log(JSON.stringify({
      id: articleId,
      mediumUrl: url,
      overrideTitle: title !== 'Article Title' ? null : title,
      overrideDescription: description !== 'Article description' ? null : description,
      overrideImage: image
    }, null, 2));
    console.log('\n');
  });
}).on('error', (err) => {
  console.error('❌ Error fetching URL:', err.message);
  console.log('\n💡 Manual extraction instructions:');
  console.log('   1. Open the Medium article in your browser');
  console.log('   2. Right-click → View Page Source');
  console.log('   3. Search for "og:title", "og:description", and "og:image"');
  console.log('   4. Copy the content values');
  console.log('   5. Add them to data/articles.json manually\n');
});

function extractMeta(html, property) {
  const patterns = [
    new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, 'i'),
    new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1]
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .trim();
    }
  }
  return null;
}
