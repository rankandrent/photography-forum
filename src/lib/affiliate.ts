/**
 * Amazon Affiliate helper utility for ApertureTalk forum.
 * Manages random selection of user-provided Associate IDs and transforms
 * product recommendation links into 100% natural, inline search links.
 */

export const AMAZON_AFFILIATE_TAGS = [
  "asde3t-20",
  "trsese34-20",
  "klel4i4-20",
  "io34erjwk-20",
  "uiw4urhf-20",
  "47398384-20",
  "93485748-20",
  "8uherfhjkd-20",
];

/**
 * Returns a randomly selected Amazon Associate Tag from the configured pool.
 */
export function getRandomAffiliateTag(): string {
  const index = Math.floor(Math.random() * AMAZON_AFFILIATE_TAGS.length);
  return AMAZON_AFFILIATE_TAGS[index];
}

/**
 * Builds a 100% reliable Amazon Search URL for a given product query.
 * Search URLs never return 404 "Page Not Found" errors on Amazon.
 */
export function buildAmazonSearchUrl(query: string, tag?: string): string {
  const selectedTag = tag || getRandomAffiliateTag();
  const cleanQuery = query
    .replace(/[*_#`[\]()]/g, "")
    .replace(/^(🛒|Check Price on Amazon|Buy on Amazon|Check on Amazon|Amazon)/gi, "")
    .trim();
  const searchKeywords = cleanQuery || "camera photography gear";
  return `https://www.amazon.com/s?k=${encodeURIComponent(searchKeywords)}&tag=${selectedTag}`;
}

/**
 * Processes text (e.g., AI persona forum replies or posts) to:
 * 1. Remove artificial/unnatural standalone "🛒 Check Price on Amazon" buttons.
 * 2. Convert gear product mentions into natural, inline hyperlinked text.
 * 3. Assign a random Amazon Associate Tag to every link.
 */
export function processAmazonAffiliateLinks(text: string): string {
  if (!text) return text;

  let result = text;

  // 1. Strip out standalone "Check Price on Amazon" button lines and embed link onto gear name in text
  const buttonRegex = /\n*\[(?:🛒\s*)?(?:Check Price on Amazon|Buy on Amazon|Check on Amazon)\]\((https?:\/\/(?:www\.)?amazon\.com\/[^\s)]+)\)/gi;

  let match = buttonRegex.exec(result);
  if (match) {
    const rawUrl = match[1];
    let query = "";
    try {
      const u = new URL(rawUrl);
      query = u.searchParams.get("k") || "";
    } catch {}

    // Remove the standalone line
    result = result.replace(buttonRegex, "").trim();

    if (query) {
      const cleanQuery = query.trim();
      const escapedQuery = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Check if product is mentioned in bold e.g. **Sony a6700**
      const boldRegex = new RegExp(`\\*\\*(${escapedQuery})\\*\\*`, "i");
      if (boldRegex.test(result)) {
        result = result.replace(boldRegex, `**[$1](${buildAmazonSearchUrl(cleanQuery)})**`);
      } else {
        // Find general word mention
        const wordRegex = new RegExp(`\\b(${escapedQuery})\\b`, "i");
        if (wordRegex.test(result)) {
          result = result.replace(wordRegex, `[$1](${buildAmazonSearchUrl(cleanQuery)})`);
        }
      }
    }
  }

  // 2. Format remaining markdown links so anchor text is natural gear name with random tag
  result = result.replace(
    /\[([^\]]+)\]\((https?:\/\/(?:www\.)?amazon\.com\/[^\s)]+)\)/gi,
    (matchStr, anchorText, url) => {
      let cleanAnchor = anchorText.replace(/^🛒\s*/, "").trim();
      if (
        cleanAnchor.toLowerCase().includes("check price") ||
        cleanAnchor.toLowerCase().includes("buy on amazon")
      ) {
        cleanAnchor = "Amazon";
      }

      const randomTag = getRandomAffiliateTag();

      try {
        const urlObj = new URL(url);
        if (urlObj.pathname.startsWith("/s")) {
          const searchParam = urlObj.searchParams.get("k");
          if (searchParam) {
            return `[${cleanAnchor}](https://www.amazon.com/s?k=${encodeURIComponent(searchParam)}&tag=${randomTag})`;
          }
        }

        const searchQuery = cleanAnchor !== "Amazon" ? cleanAnchor : "photography camera gear";
        return `[${cleanAnchor}](${buildAmazonSearchUrl(searchQuery, randomTag)})`;
      } catch {
        return `[${cleanAnchor}](${buildAmazonSearchUrl("camera gear", randomTag)})`;
      }
    }
  );

  // 3. Guarantee randomized tag assignment across all Amazon URLs
  result = result.replace(/tag=[a-zA-Z0-9_-]+/g, () => `tag=${getRandomAffiliateTag()}`);

  return result;
}
