import { test, expect } from "@playwright/test";

test("display day orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("20", { exact: true }).nth(1)).toBeVisible();
  await expect(page.getByText("-5% em relação a ontem")).toBeVisible();
});

test("display month orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("20", { exact: true }).first()).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Pedidos \(mês\)20-5% em relação ao mês passado$/ })
      .getByRole("paragraph"),
  ).toBeVisible();
});

test("display month canceled orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("20", { exact: true }).nth(2)).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({
        hasText: /^Cancelados \(mês\)20-5% em relação ao mês passado$/,
      })
      .getByRole("paragraph"),
  ).toBeVisible();
});

test("display month revenue metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("R$ 20,30")).toBeVisible();
  await expect(page.getByText("+20% em relação ao mês passado")).toBeVisible();
});
