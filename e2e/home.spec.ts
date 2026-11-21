import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./a11y";

test.describe("home page", () => {
  test("is Hebrew and right to left by default", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "he");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("מאפיית תמיר");
    await expect(page).toHaveTitle("מאפיית תמיר");
  });

  test("is not indexed while on the temporary URL", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("skip link is the first tab stop and moves focus to the main content", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "keyboard flow is checked on desktop");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "דילוג לתוכן הראשי" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });

  for (const colorScheme of ["light", "dark"] as const) {
    test(`has no WCAG A/AA violations in ${colorScheme} theme`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto("/");
      await expectNoA11yViolations(page);
    });
  }
});
