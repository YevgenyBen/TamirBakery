import { configureAxe } from "vitest-axe";

// jsdom has no layout or canvas, so colour contrast is checked in the Playwright
// e2e scans against the real browser instead.
export const axe = configureAxe({
  rules: { "color-contrast": { enabled: false } },
});
