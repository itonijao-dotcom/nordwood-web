import type { NextConfig } from "next";

// nordwood.site serves this website at the domain root. Older GitHub workflows
// still pass /nordwood-web; override that value before compiling public URLs.
process.env.NEXT_PUBLIC_BASE_PATH = "";

const nextConfig: NextConfig = {
      output: "export",
      basePath: "",
      assetPrefix: "",
      env: { NEXT_PUBLIC_BASE_PATH: "" },
      trailingSlash: true,
      images: { unoptimized: true },
      // The Sites starter includes Cloudflare-only types that are not used by
      // this static website and are unavailable in the GitHub Pages builder.
      typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
