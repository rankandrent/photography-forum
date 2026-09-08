import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // sharp and the Prisma client are native/CJS and must not be bundled.
  serverExternalPackages: ["sharp", "@prisma/client", "@aws-sdk/client-s3"],

  images: {
    // Avatars from Google sign-in; uploads are served from our own origin/CDN.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Uploads are user-supplied files; never let a browser run one.
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
      {
        // Derivative filenames contain a UUID, so they are safe to cache forever.
        source: "/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
