import path from "path";
import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/proyecto-final-lenguajes4",
        images: { unoptimized: true },
      }
    : {}),
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
