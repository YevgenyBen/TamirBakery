import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

// IS 5568 follows WCAG 2.0 AA; we test to 2.2 AA (PLAN.md "Accessibility").
export const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"];

export async function expectNoA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
}
