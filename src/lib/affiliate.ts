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

  // 4. Link gear the model named in prose but never marked up. Previously a
  //    product only became a link when the model happened to emit Amazon
  //    markdown itself, so most mentions earned nothing.
  result = autoLinkProducts(result);

  return result;
}

// ---------------------------------------------------------------------------
// Automatic product detection
// ---------------------------------------------------------------------------

/**
 * Brands whose gear gets discussed here. A brand on its own is never linked:
 * "I shoot Canon" is a sentence about a system, not a product recommendation,
 * and linking it reads as keyword stuffing to both readers and Google. A brand
 * only becomes a link when a model designation follows it.
 */
const PRODUCT_BRANDS = [
  "Sony", "Canon", "Nikon", "Fujifilm", "Fuji", "Panasonic", "Lumix", "Olympus",
  "OM System", "OM-System", "Sigma", "Tamron", "Leica", "Ricoh", "Pentax",
  "Peak Design", "Manfrotto", "Godox", "DJI", "Viltrox", "Samyang", "Rokinon",
  "Zeiss", "Laowa", "Benro", "Gitzo", "SmallRig", "Lowepro", "Think Tank",
  "WANDRD", "K&F Concept", "Hoya", "NiSi", "Profoto", "Elinchrom", "Neewer",
  "SanDisk", "Lexar", "Tokina", "Irix", "Haida",
];

/**
 * Products whose names the generic pattern below cannot reach, because the
 * model designation carries no digit ("Nikon Z fc") or reads as ordinary words
 * ("Peak Design Everyday Backpack"). Listed longest-first so "Sony a7R V"
 * matches before "Sony a7R".
 */
const KNOWN_PRODUCTS = [
  "Peak Design Everyday Backpack", "Peak Design Travel Tripod",
  "Nikon Z fc", "Fujifilm X-Pro", "Fujifilm X100VI", "Fujifilm X100V",
  "Canon EOS R", "Leica Q", "Ricoh GR",
];

/**
 * At most this many affiliate links per post. A forum reply carrying six
 * monetised links stops reading as advice and starts reading as an ad, which is
 * exactly the "thin affiliate" pattern Google's quality guidelines name.
 */
export const MAX_AFFILIATE_LINKS_PER_POST = 3;

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** A token carrying a digit: a6700, X-S20, R10, 18-50mm, f/2.8, OM-1, 20L. */
const NUM_TOKEN = String.raw`(?=[A-Za-z0-9][A-Za-z0-9./-]*\d)[A-Za-z0-9][A-Za-z0-9./-]*`;

/** Model-line words that carry no digit but are part of the product name. */
const ALPHA_TOKEN = String.raw`(?:Mark|EOS|GFX|GH|OM|Lumix|Pro|Max|Plus|Air|Mini|II|III|IV|VI|VII|IX|XI|[IVX]{1,4}(?![A-Za-z]))`;

/**
 * Brand, then one to four model tokens, at least one of which carries a digit.
 * The lookahead enforces that digit so "Canon camera bags" cannot match.
 */
const PRODUCT_RE = new RegExp(
  String.raw`\b(${PRODUCT_BRANDS.map(escapeRe).join("|")})` +
    String.raw`((?=(?:\s+(?:${NUM_TOKEN}|${ALPHA_TOKEN})){1,4})(?:\s+(?:${NUM_TOKEN}|${ALPHA_TOKEN})){1,4})`,
  "gi"
);

const KNOWN_RE = new RegExp(
  String.raw`\b(${[...KNOWN_PRODUCTS].sort((a, b) => b.length - a.length).map(escapeRe).join("|")})` +
    // Without this, "Canon EOS R" would match inside "Canon EOS R10" and split
    // the model in half. The generic pattern handles the longer form instead.
    String.raw`(?![A-Za-z0-9-])` +
    String.raw`((?:\s+(?:${NUM_TOKEN}|${ALPHA_TOKEN})){0,3})`,
  "gi"
);

/** Split into markdown links, code spans and prose, so we never nest a link. */
function segments(text: string): { text: string; linked: boolean }[] {
  const out: { text: string; linked: boolean }[] = [];
  const re = /```[\s\S]*?```|\[[^\]]*\]\([^)]*\)|`[^`]*`/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) out.push({ text: text.slice(last, m.index), linked: false });
    out.push({ text: m[0], linked: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), linked: false });
  return out;
}

/**
 * Finds specific gear models in prose and links the FIRST mention of each to an
 * Amazon search for that exact model, carrying the Associate tag.
 *
 * Only the first mention: repeating the link every time the same body is named
 * inflates the link count without helping a reader who already saw it.
 *
 * The rendered anchor picks up rel="ugc nofollow sponsored" in lib/markdown.ts,
 * which is what both Amazon's operating agreement and Google's affiliate
 * guidance require. Do not remove that.
 */
export function autoLinkProducts(text: string, tag?: string): string {
  if (!text) return text;

  const seen = new Set<string>();
  const keyOf = (s: string) => s.toLowerCase().replace(/\s+/g, " ").replace(/[.,;:!?]+$/, "");

  // Anything already hyperlinked is off-limits and counts against the budget.
  for (const seg of segments(text)) {
    if (!seg.linked) continue;
    for (const re of [KNOWN_RE, PRODUCT_RE]) {
      re.lastIndex = 0;
      for (const m of seg.text.matchAll(re)) seen.add(keyOf(m[1] + m[2]));
    }
  }

  let budget = MAX_AFFILIATE_LINKS_PER_POST - seen.size;

  const linkUp = (whole: string, head: string, tailTokens: string) => {
    const product = `${head}${tailTokens}`.replace(/\s+/g, " ").trim();
    const key = keyOf(product);
    if (budget <= 0 || seen.has(key)) return whole;
    seen.add(key);
    budget--;
    // Sentence punctuation swept up by the token pattern stays outside the link.
    const trimmed = product.replace(/[.,;:!?]+$/, "");
    const tail = product.slice(trimmed.length);
    return `[${trimmed}](${buildAmazonSearchUrl(trimmed, tag)})${tail}`;
  };

  // Two passes, each re-segmented: the first inserts markdown links that the
  // second must treat as off-limits, or it nests a link inside a link.
  const pass = (input: string, re: RegExp) =>
    segments(input)
      .map((seg) => (seg.linked ? seg.text : seg.text.replace(re, (w, h: string, t: string) => linkUp(w, h, t))))
      .join("");

  // Known names first, so their longer forms win over the generic pattern.
  return pass(pass(text, KNOWN_RE), PRODUCT_RE);
}
