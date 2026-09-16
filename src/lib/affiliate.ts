/**
 * Amazon Affiliate helper utility for the forum.
 * Manages random selection of user-provided Associate IDs and transforms
 * product recommendation links into clean, short Amazon associate URLs.
 */

export const PRIMARY_AMAZON_AFFILIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || "photographyforum-20";

const GENERIC_BRANDS = [
  "sony",
  "canon",
  "nikon",
  "fujifilm",
  "fuji",
  "sigma",
  "tamron",
  "panasonic",
  "olympus",
  "leica",
  "ricoh",
  "peak design",
];

/**
 * Returns the canonical Amazon Associate Tag for the forum.
 */
export function getRandomAffiliateTag(): string {
  return PRIMARY_AMAZON_AFFILIATE_TAG;
}

/**
 * Builds a clean, short, 100% working Amazon Search URL for a given product query.
 * Format: https://amazon.com/s?k=EXACT_PRODUCT_NAME&tag=RANDOM_TAG
 */
export function buildAmazonSearchUrl(query: string, tag?: string): string {
  const selectedTag = tag || getRandomAffiliateTag();
  const cleanQuery = query
    .replace(/[*_#`[\]()]/g, "")
    .replace(/^(🛒|Check Price on Amazon|Buy on Amazon|Check on Amazon|Amazon)/gi, "")
    .trim();
  const searchKeywords = cleanQuery || "camera gear";
  return `https://amazon.com/s?k=${encodeURIComponent(searchKeywords)}&tag=${selectedTag}`;
}

/**
 * Processes text (e.g., AI persona forum replies or posts) to:
 * 1. Remove artificial/unnatural standalone "🛒 Check Price on Amazon" buttons.
 * 2. Only hyperlink SPECIFIC product models (e.g., "Sony a6700", "Fujifilm X-S20").
 * 3. Ignore generic single brand names like "Sony", "Canon" (do NOT link brand names).
 * 4. Remove em-dash characters (— or --) to enforce clean text presentation.
 */
export function processAmazonAffiliateLinks(text: string): string {
  if (!text) return text;

  let result = text;

  // Remove em-dashes (— or --) and replace with standard punctuation
  result = result.replace(/—|--/g, " - ");

  // 1. Strip out standalone "Check Price on Amazon" button lines
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

      // Only link if query is a specific product (not just single brand word like "Sony")
      if (!GENERIC_BRANDS.includes(cleanQuery.toLowerCase())) {
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
  }

  // 2. Format remaining markdown links: DO NOT link single generic brand names
  result = result.replace(
    /\[([^\]]+)\]\((https?:\/\/(?:www\.)?amazon\.com\/[^\s)]+)\)/gi,
    (matchStr, anchorText, url) => {
      let cleanAnchor = anchorText.replace(/^🛒\s*/, "").trim();

      // If anchorText is just a brand name e.g. "Sony" or "Canon", remove the link!
      if (GENERIC_BRANDS.includes(cleanAnchor.toLowerCase())) {
        return cleanAnchor;
      }

      if (
        cleanAnchor.toLowerCase().includes("check price") ||
        cleanAnchor.toLowerCase().includes("buy on amazon")
      ) {
        return cleanAnchor;
      }

      const randomTag = getRandomAffiliateTag();

      try {
        const urlObj = new URL(url);
        if (urlObj.pathname.startsWith("/s")) {
          const searchParam = urlObj.searchParams.get("k");
          if (searchParam && !GENERIC_BRANDS.includes(searchParam.toLowerCase())) {
            return `[${cleanAnchor}](https://amazon.com/s?k=${encodeURIComponent(searchParam)}&tag=${randomTag})`;
          }
        }

        const searchQuery = cleanAnchor;
        return `[${cleanAnchor}](${buildAmazonSearchUrl(searchQuery, randomTag)})`;
      } catch {
        return cleanAnchor;
      }
    }
  );

  // 3. Guarantee randomized tag assignment across all Amazon URLs
  result = result.replace(/tag=[a-zA-Z0-9_-]+/g, () => `tag=${getRandomAffiliateTag()}`);

  return result;
}
