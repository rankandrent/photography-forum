/**
 * Amazon Affiliate helper utility for ApertureTalk forum.
 * Manages random selection of user-provided Associate IDs and transforms
 * product recommendation links into working Amazon search links to prevent 404 errors.
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
 * 1. Replace placeholder/fixed affiliate tags with a random tag from the pool.
 * 2. Convert corrupt/dead `/dp/ASIN` links into 100% working Amazon Search URLs.
 */
export function processAmazonAffiliateLinks(text: string): string {
  if (!text) return text;

  // 1. Process markdown links matching Amazon URLs: [Anchor Text](http...amazon.com...)
  let processed = text.replace(
    /\[([^\]]+)\]\((https?:\/\/(?:www\.)?amazon\.com\/[^\s)]+)\)/gi,
    (match, anchorText, url) => {
      const randomTag = getRandomAffiliateTag();

      try {
        const urlObj = new URL(url);

        // If it's already an Amazon search URL: /s?k=...
        if (urlObj.pathname.startsWith("/s")) {
          const searchParam = urlObj.searchParams.get("k");
          if (searchParam) {
            return `[${anchorText}](https://www.amazon.com/s?k=${encodeURIComponent(searchParam)}&tag=${randomTag})`;
          }
        }

        // Try extracting product name from context/anchor or URL
        let productName = anchorText
          .replace(/🛒|Check Price on Amazon|Buy on Amazon|Check on Amazon/gi, "")
          .trim();

        if (!productName || productName.toLowerCase() === "amazon") {
          productName = "photography camera lens gear";
        }

        const workingSearchUrl = buildAmazonSearchUrl(productName, randomTag);
        return `[${anchorText}](${workingSearchUrl})`;
      } catch {
        const workingSearchUrl = buildAmazonSearchUrl("camera lens", randomTag);
        return `[${anchorText}](${workingSearchUrl})`;
      }
    }
  );

  // 2. Also handle any remaining `photoforum-20` or fixed tag instances
  processed = processed.replace(/tag=[a-zA-Z0-9_-]+/g, () => `tag=${getRandomAffiliateTag()}`);

  return processed;
}
