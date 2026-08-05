import type { NextConfig } from "next";

const githubPagesBase = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = githubPagesBase
  ? {
      output: "export",
      basePath: githubPagesBase,
      assetPrefix: `${githubPagesBase}/`,
      trailingSlash: true,
      images: { unoptimized: true },
      // The Sites starter includes Cloudflare-only types that are not used by
      // this static website and are unavailable in the GitHub Pages builder.
      typescript: { ignoreBuildErrors: true },
    }
  : {};

export default nextConfig;
