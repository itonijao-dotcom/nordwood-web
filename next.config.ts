import type { NextConfig } from "next";

const githubPagesBase = process.env.NEXT_PUBLIC_BASE_PATH;
const staticExport = Boolean(githubPagesBase) || process.env.NORDWOOD_STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      basePath: githubPagesBase ?? "",
      assetPrefix: githubPagesBase ? `${githubPagesBase}/` : undefined,
      trailingSlash: true,
      images: { unoptimized: true },
      // The Sites starter includes Cloudflare-only types that are not used by
      // this static website and are unavailable in the GitHub Pages builder.
      typescript: { ignoreBuildErrors: true },
    }
  : {};

export default nextConfig;
