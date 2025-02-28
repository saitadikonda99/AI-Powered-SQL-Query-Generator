import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable the 'any' rule
      "no-var": "off", // Disable the 'no-var' rule
      "prefer-const": "off", // Disable the 'prefer-const' rule
      "@typescript-eslint/no-unused-vars": "off" // Disable the 'unused-vars' rule
    }
  }
];


export default eslintConfig;