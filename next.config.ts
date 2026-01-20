import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION || "false",
  },
};

export default nextConfig;
