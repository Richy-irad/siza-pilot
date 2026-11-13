import { expect, test, type Page } from "@playwright/test";

/** Sample source from the QR scheme in PLAN.md. */
const SRC = "board-iga-laval";

/** Stubs Umami + Tally, blocks real third-party scripts, and keeps tel:/sms:/wa links from navigating. */
async function instrument(page: Page) {
  await page.route(/tally\.so|umami\.is/, (r) => r.abort());
  await page.addInitScript(() => {
    const w = window as unknown as Record<string, unknown>;
    w.__events = [];
    w.__popups = [];
    w.umami = {
      track: (n: string, d: unknown) => (w.__events as unknown[]).push([n, d]),
    };
    w.Tally = {
      openPopup: (id: string, o: unknown) =>
        (w.__popups as unknown[]).push([id, o]),
    };
    window.addEventListener("click", (e) => e.preventDefault());
  });
}
/** Analytics events recorded by the Umami stub, in order. */
const events = (page: Page) =>
  page.evaluate(
    () =>
      (window as unknown as { __events: [string, Record<string, string>][] })
        .__events,
  );

test("both locales load with correct lang and h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr-CA");
  await expect(page.locator("h1")).toHaveText(
    "Coincé? On vous trouve de l'aide — vite.",
  );
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-CA");
  await expect(page.locator("h1")).toHaveText(
    "Stuck? We'll find you help — fast.",
  );
});

test("primary CTA above the fold at 390x844", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const box = await page
    .locator("#hero")
    .getByRole("link", { name: /Dites-nous/ })
    .boundingBox();
  expect(box!.y + box!.height).toBeLessThan(844);
});

test("contact hrefs carry src, and src survives language switch", async ({
  page,
}) => {
  await page.goto(`/?src=${SRC}`);
  const hero = page.locator("#hero");
  await expect(hero.getByRole("link", { name: "Appeler" })).toHaveAttribute(
    "href",
    /^tel:\+1/,
  );
  await expect(hero.getByRole("link", { name: "Texto" })).toHaveAttribute(
    "href",
    new RegExp(
      `^sms:\\+1.*\\?&body=.*${encodeURIComponent(`(Ref: ${SRC})`).replace(/[()]/g, "\\$&")}`,
    ),
  );
  await expect(hero.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
    "href",
    /^https:\/\/wa\.me\/\d*\?text=.*Ref%3A%20board-iga-laval/,
  );
  await expect(hero.getByRole("link", { name: /Dites-nous/ })).toHaveAttribute(
    "href",
    /tally\.so\/r\/.+\?src=board-iga-laval&lang=fr/,
  );

  await page.getByRole("link", { name: "English version" }).click();
  await expect(page).toHaveURL(`/en?src=${SRC}`);
  await expect(
    page.locator("#hero").getByRole("link", { name: "Text" }),
  ).toHaveAttribute("href", /Ref%3A%20board-iga-laval/);

  // src persists via sessionStorage even without the query string
  await page.goto("/");
  await expect(
    page.locator("#hero").getByRole("link", { name: "Texto" }),
  ).toHaveAttribute("href", /Ref%3A%20board-iga-laval/);
});

test("invalid src falls back to direct", async ({ page }) => {
  await page.goto("/?src=Bad%20Value!");
  await expect(
    page.locator("#hero").getByRole("link", { name: "Texto" }),
  ).toHaveAttribute("href", /Ref%3A%20direct/);
});

test("form opens Tally popup with hidden fields; events fire once with src; no cookies", async ({
  page,
  context,
}) => {
  await instrument(page);
  await page.goto(`/en?src=${SRC}`);
  const hero = page.locator("#hero");

  await hero.getByRole("link", { name: /Tell us/ }).click();
  const popups = await page.evaluate(
    () => (window as unknown as { __popups: unknown[] }).__popups,
  );
  expect(popups).toEqual([
    [
      "REPLACE_EN_FORM_ID",
      { layout: "modal", hiddenFields: { src: SRC, lang: "en" } },
    ],
  ]);

  await hero.getByRole("link", { name: "Call" }).click();
  await hero.getByRole("link", { name: "Text" }).click();
  await hero.getByRole("link", { name: "WhatsApp" }).click();
  await hero.getByRole("link", { name: /Save our number/ }).click();
  await page.getByRole("link", { name: "Notify me" }).first().click();
  await page.getByRole("link", { name: "Version française" }).click();

  const base = { src: SRC, lang: "en", placement: "hero" };
  expect(await events(page)).toEqual([
    ["form_open", base],
    ["call_click", base],
    ["sms_click", base],
    ["whatsapp_click", base],
    ["save_contact", base],
    ["notify_click", { src: SRC, lang: "en", category: "heating" }],
    ["lang_switch", { from: "en", to: "fr" }],
  ]);
  expect(await context.cookies()).toEqual([]);
});

test("sticky bar appears after hero scrolls away", async ({ page }) => {
  await page.goto("/");
  const bar = page.locator("div[inert], div.fixed.bottom-0").first();
  await expect(bar).toHaveCSS("opacity", "0");
  await page.locator("#final-h").scrollIntoViewIfNeeded();
  await expect(bar).toHaveCSS("opacity", "1");
  await expect(bar.getByRole("link", { name: "Formulaire" })).toBeVisible();
});

test("only live categories get a request button", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Disponible", { exact: true })).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "Demander de l'aide" }),
  ).toHaveCount(1);
  await expect(page.getByRole("link", { name: "M'aviser" })).toHaveCount(4);
});

test("vCard served as text/vcard", async ({ request }) => {
  const res = await request.get("/siza.vcf");
  expect(res.headers()["content-type"]).toContain("text/vcard");
  expect(await res.text()).toContain("BEGIN:VCARD");
});
