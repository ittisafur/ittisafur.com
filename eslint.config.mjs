import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Load the Next.js configs using FlatCompat
const nextEslintConfigs = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

// Add a custom config to disable the rule
const customConfig = {
  rules: {
    '@next/next/no-html-link-for-pages': 'off'
  }
};

// Combine the configs
const eslintConfig = [
  ...nextEslintConfigs,
  customConfig
];

export default eslintConfig;
