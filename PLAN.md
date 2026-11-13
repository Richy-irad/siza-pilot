# Siza — Wizard-of-Oz Landing Page: Build Plan for Claude Code

> **How to use this file.** Copy it into the root of the new, empty project folder as `PLAN.md`, then start Claude Code there with:
>
> _"Read PLAN.md. Build the Siza landing page phase by phase as described. Use the exact copy in section 8. Before each phase, tell me what you're about to do; after each phase, run the acceptance checks for it. Ask me before adding any dependency or page not listed here."_
>
> Written Nov 9, 2026 for the Siza concierge pilot. Towing opens **Fri, Nov 20, 2026**. Target: build over the **weekend of Nov 14–15**, deploy by **Nov 19**.

---

## 1. What this is (context for Claude Code)

Siza connects people in the Montreal area who have an urgent problem (car broken down, locked out, no heat) with a vetted local provider. **Right now there is no app.** A real person, Richard, takes each request by phone, text, WhatsApp or a Tally.so form, calls providers, confirms a price, and follows up. This is called a **"Wizard of Oz" MVP**: the page looks like a product, and a human does the work behind it.

The landing page has **one job**: turn a visitor (from a flyer QR code, a Facebook post, a partner's card, Kijiji) into one of these actions:

1. **Opens the request form** (Tally popup), which is the primary action
2. **Calls** or **texts** the Siza number
3. **Messages on WhatsApp**
4. **Saves Siza to their phone contacts** (downloads a vCard), the "before the emergency" action

Every one of these actions must be **attributable to a traffic source** (`?src=` in the URL), because the pilot is judged on which outreach channels work.

## 2. Hard constraints

- **Mobile-first.** Most visitors arrive from a QR code or Facebook on a phone, often stressed. Desktop only needs to look tidy.
- **French first.** French is the default language at `/`. English is at `/en`. French must be at least as prominent as English everywhere (Quebec's Charter of the French language).
- **Fast.** Static pages, no client-side data fetching, Lighthouse mobile performance at least 95, LCP under 1.5 s on 4G.
- **No backend, no database, no accounts, no payments, no maps.** Tally stores form submissions. Phone, text and WhatsApp are links.
- **No cookies.** Use cookieless analytics only, so no consent banner is needed.
- **All operational facts live in one config file** (`site.config.ts`): number, hours, live categories, form IDs, notices. Richard must be able to open or close a category, or change hours, by editing that one file.
- **Honesty rules** (these are business rules, not style):
  - Only categories marked `live` get a "request" call to action. Others show "Coming soon — get notified."
  - Always show real hours, the service area, and that Siza is **not an emergency service** (911 for danger).
  - Never imply 24/7 or instant service.

## 3. Non-goals (do not build)

Booking engine, provider portal, live tracking, price calculator, login, blog, CMS, chat widget, cookie banner, newsletter signup, testimonials (there are none yet; never invent any), "as seen in" logos, stock photos of people.

## 4. Tech stack

| Concern   | Choice                                                                                                                                                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework | Current stable **Next.js** with the App Router, **TypeScript**, `create-next-app` defaults                                                                                                                                   |
| Styling   | **Tailwind CSS** (the version `create-next-app` installs), design tokens from section 6                                                                                                                                      |
| i18n      | Route-based: `/` = French, `/en` = English. Plain typed dictionaries (`content/fr.ts`, `content/en.ts`), no i18n library                                                                                                     |
| Icons     | `lucide-react` (Truck, KeyRound, Flame, Snowflake, Droplets, Wrench, ShieldCheck, Phone, MessageSquare, UserPlus, ArrowRight)                                                                                                |
| Font      | `next/font` with **Inter** (or Plus Jakarta Sans), Latin + Latin-ext subsets for French accents                                                                                                                              |
| Form      | **Tally.so popup** via the official embed script, with hidden fields (section 7.2)                                                                                                                                           |
| Analytics | One cookieless tool with custom events, e.g. **Umami** or **Plausible** (check current free tier), or **Vercel Web Analytics** for page views only. Richard picks; keep it behind a tiny `track()` wrapper so it's swappable |
| Hosting   | **Vercel**, custom domain                                                                                                                                                                                                    |
| Testing   | Playwright smoke test (section 10)                                                                                                                                                                                           |

## 5. File structure

```
/app
  /layout.tsx              root layout, font, analytics script, <html lang> per route
  /page.tsx                French landing page (default)
  /en/page.tsx             English landing page
  /confidentialite/page.tsx  French privacy notice
  /en/privacy/page.tsx     English privacy notice
  /opengraph-image.png     static OG image (1200×630), see 9.3
/components
  Header.tsx  Hero.tsx  SafetyStrip.tsx  Services.tsx  HowItWorks.tsx
  Promises.tsx  InsuranceNote.tsx  FounderStory.tsx  Faq.tsx  FinalCta.tsx
  ProviderStrip.tsx  Footer.tsx  StickyActionBar.tsx  NoticeBanner.tsx
  ContactActions.tsx       call / text / WhatsApp / save-contact buttons (reused)
  RequestButton.tsx        opens the Tally popup with hidden fields
/content
  fr.ts  en.ts             all copy (section 8), typed with a shared `Dictionary` type
/lib
  src.ts                   read and persist the ?src= value
  track.ts                 analytics wrapper
  links.ts                 builds tel:, sms:, wa.me links from config + src
/public
  siza.vcf                 contact card (section 7.4)
  favicon / icons          shield-check logo
site.config.ts
```

## 6. Design

Match the existing Siza flyer and form cover (white cards on a pale blue background, a navy shield logo tile, one strong blue button). From the design brief: **calm, reassuring, trustworthy, emergency-response, not a marketplace.** One primary call to action per screen, large tap targets, high contrast.

**Colour tokens** (sampled from the existing poster and form cover image):

| Token           | Hex       | Use                                          |
| --------------- | --------- | -------------------------------------------- |
| `ink`           | `#051029` | headlines, body text                         |
| `ink-muted`     | `#4A5568` | secondary text (check AA contrast on `bg`)   |
| `primary`       | `#004B7F` | primary button, links                        |
| `primary-hover` | `#0C4568` | hover/active, logo tile                      |
| `accent`        | `#0075A9` | icons, highlights                            |
| `bg`            | `#EAF4FE` | page background (soft gradient to `#F2F6FF`) |
| `surface`       | `#FFFFFF` | cards                                        |
| `border`        | `#DDEDFD` | card borders                                 |
| `danger`        | `#B42318` | 911 safety strip text/icon only              |
| `success`       | `#067647` | "Live" badge                                 |

**Type:** headline `text-4xl sm:text-5xl font-bold tracking-tight`, body `text-base sm:text-lg`. Lines under about 65 characters.

**Shapes:** cards `rounded-2xl` with a soft shadow and white background. Buttons `rounded-xl`, **minimum 48 px tall**, full-width on mobile.

**Logo:** a rounded square tile in `primary-hover` with a white `ShieldCheck` icon, followed by "Siza" in bold `ink`.

**Mobile sticky action bar** (bottom, under 640 px wide only): three equal buttons, **Appeler / Texto / Formulaire** (EN: Call / Text / Form). It appears after the hero scrolls out of view.

## 7. Behaviour and integrations

### 7.1 `site.config.ts` (single source of truth)

```ts
export const site = {
  name: "Siza",
  domain: "https://REPLACE.ca", // decide BEFORE flyers are printed
  phoneE164: "+1REPLACE", // calls + texts
  phoneDisplay: "(514) REPLACE",
  whatsappE164: "+1REPLACE", // can be the same number (WhatsApp Business)
  email: "REPLACE@REPLACE", // privacy contact + providers
  tally: { fr: "REPLACE_FR_FORM_ID", en: "REPLACE_EN_FORM_ID" },
  hours: { fr: "lun.–sam., 8 h à 21 h", en: "Mon–Sat, 8 a.m.–9 p.m." },
  responseWindow: { fr: "moins de 30 minutes", en: "under 30 minutes" },
  area: { fr: "Île de Montréal et Laval", en: "Montreal island and Laval" },
  // status: "live" | "soon"
  categories: [
    { id: "roadside", status: "live" }, // "Roadside" or "Towing" wording decided by Nov 16 (see content)
    { id: "heating", status: "soon" },
    { id: "locksmith", status: "soon" },
    { id: "plumbing", status: "soon" },
    { id: "flooding", status: "soon" },
  ],
  roadsideIncludesBoost: true, // false → show "Towing" copy variant only
  notice: null as null | { fr: string; en: string; until: string }, // e.g. holiday hours
} as const;
```

### 7.2 Request form (Tally popup)

- Load `https://tally.so/widgets/embed.js` with `next/script`, strategy `lazyOnload`.
- `RequestButton` calls `Tally.openPopup(formId, { layout: "modal", hiddenFields: { src, lang } })`, using the French or English form ID depending on the route. **Check the current Tally popup API docs**; if the option names have changed, adapt.
- **Fallback** if the script fails or JavaScript is off: the button is a real `<a href="https://tally.so/r/{formId}?src={src}&lang={lang}" target="_blank">` that the script enhances.
- Richard must add hidden fields named **`src`** and **`lang`** in both Tally forms (section 12).

### 7.3 Source tracking (`lib/src.ts`)

- On first load, read `?src=` (allow `[a-z0-9-]`, max 60 characters; otherwise `"direct"`). Store it in `sessionStorage` inside try/catch (it can throw in private mode). Fall back to an in-memory value.
- Pass `src` to: the Tally hidden field, the WhatsApp prefilled message (`Ref: {src}`), the SMS body (`Ref: {src}`), and every analytics event.
- The language toggle must **preserve the query string**.

### 7.4 Contact links and "save our number"

- **Call:** `tel:{phoneE164}`.
- **Text:** `sms:{phoneE164}?&body={encoded}`. The `?&body=` form works on both iOS and Android. Body (FR): "Bonjour Siza, j'ai besoin d'aide pour : " / (EN): "Hi Siza, I need help with: ", then ` (Ref: {src})`.
- **WhatsApp:** `https://wa.me/{digits only}?text={encoded}`, same prefill.
- **Save contact:** link to `/siza.vcf` (`Content-Type: text/vcard`), with this content:

```
BEGIN:VCARD
VERSION:3.0
N:;Siza — Aide urgente;;;
FN:Siza — Aide urgente / Urgent help
ORG:Siza
TEL;TYPE=CELL,VOICE:+1REPLACE
URL:https://REPLACE.ca
NOTE:Dépannage routier, remorquage, survoltage, serrurerie, chauffage. lun.–sam. 8 h–21 h. Danger : 911.
END:VCARD
```

Set the header in `next.config` for `/siza.vcf`. Test on iPhone Safari (shows the "Add contact" sheet) and Android Chrome (downloads and opens Contacts).

### 7.5 Analytics events (`track(name, props)`)

| Event            | When                           | Props                                                         |
| ---------------- | ------------------------------ | ------------------------------------------------------------- |
| `form_open`      | request button clicked         | `src`, `lang`, `placement` (hero / services / final / sticky) |
| `call_click`     | tel link clicked               | `src`, `lang`, `placement`                                    |
| `sms_click`      | sms link clicked               | same                                                          |
| `whatsapp_click` | wa link clicked                | same                                                          |
| `save_contact`   | vCard clicked                  | same                                                          |
| `notify_click`   | "notify me" on a soon category | `src`, `lang`, `category`                                     |
| `lang_switch`    | toggle clicked                 | `from`, `to`                                                  |

`track()` must never throw and must no-op if analytics isn't loaded.

### 7.6 Notice banner

If `site.notice` is set and `until` hasn't passed, show a slim banner at the top (e.g. holiday hours). Otherwise render nothing.

## 8. Page content (use verbatim; FR is the source, EN the translation)

> Placeholders in `{braces}` come from `site.config.ts`. Category copy marked **[variant]** depends on `roadsideIncludesBoost`.

### 8.1 Metadata

|             | FR                                                                                                                                                                         | EN                                                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `<title>`   | Siza — On vous trouve de l'aide, vite \| Montréal et Laval                                                                                                                 | Siza — We find you help, fast \| Montreal & Laval                                                                                            |
| description | Panne d'auto, porte verrouillée, plus de chauffage? Un vrai humain trouve un fournisseur vérifié disponible et vous confirme le prix avant son arrivée. Aucuns frais Siza. | Car won't start, locked out, no heat? A real person finds an available vetted provider and confirms the price before they come. No Siza fee. |

Add `hreflang` alternates (fr-CA ↔ en-CA) and a canonical URL.

### 8.2 Header

- Logo + "Siza"
- Language toggle: **FR | EN**
- Small button: **Appeler** / **Call** (tel link)

### 8.3 Hero

| Element       | FR                                                                                                                                                       | EN                                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Pilot badge   | Projet pilote · {area} · {hours}                                                                                                                         | Pilot project · {area} · {hours}                                                                                                |
| Headline      | Coincé? On vous trouve de l'aide — vite.                                                                                                                 | Stuck? We'll find you help — fast.                                                                                              |
| Subheadline   | Un vrai humain appelle des fournisseurs vérifiés pour vous et vous revient avec un nom, une heure d'arrivée et un prix — avant que quiconque se déplace. | A real person calls vetted providers for you and comes back with a name, an arrival time and a price — before anyone comes out. |
| Primary CTA   | Dites-nous ce qui se passe →                                                                                                                             | Tell us what's happening →                                                                                                      |
| Under CTA     | Formulaire de 90 secondes · réponse en {responseWindow} pendant nos heures                                                                               | 90-second form · reply in {responseWindow} during our hours                                                                     |
| Secondary row | Appeler · Texto · WhatsApp                                                                                                                               | Call · Text · WhatsApp                                                                                                          |
| Save contact  | Enregistrer notre numéro — pour l'avoir le jour où ça arrive                                                                                             | Save our number — so it's there the day you need it                                                                             |
| Trust line    | Fournisseurs locaux vérifiés · Vous payez le fournisseur directement · Aucuns frais Siza                                                                 | Vetted local providers · You pay the provider directly · No Siza fee                                                            |

### 8.4 Safety strip (directly under the hero; `danger` icon, calm tone)

- **FR:** Quelqu'un est en danger, odeur de gaz, ou accident avec blessés? **Composez le 911 d'abord.** Siza n'est pas un service d'urgence.
- **EN:** Someone in danger, smell of gas, or an accident with injuries? **Call 911 first.** Siza is not an emergency service.

### 8.5 Services — "Ce qu'on couvre en ce moment" / "What we cover right now"

Render from `site.categories`. A **live** card has a green "Disponible" / "Available" badge and the button "Demander de l'aide" / "Get help" (opens the form). A **soon** card has a grey "Bientôt" / "Coming soon" badge and the button "M'aviser" / "Notify me" (also opens the form, whose Q1 routes to the notify branch; track `notify_click`).

| id                                    | Icon              | FR title — description                                                               | EN title — description                                                     |
| ------------------------------------- | ----------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| roadside **[variant: boost = true]**  | Truck             | **Dépannage routier** — Remorquage, survoltage, crevaison, clés barrées dans l'auto. | **Roadside help** — Tow, battery boost, flat tire, keys locked in the car. |
| roadside **[variant: boost = false]** | Truck             | **Remorquage** — Voiture en panne ou accidentée, vers le garage de votre choix.      | **Towing** — Broken-down or damaged car, to the garage you choose.         |
| heating                               | Flame + Snowflake | **Chauffage / climatisation** — Fournaise en panne, plus de chauffage, thermopompe.  | **Heating / AC** — Furnace down, no heat, heat pump trouble.               |
| locksmith                             | KeyRound          | **Serrurerie** — Porte de maison ou d'auto verrouillée, clés perdues.                | **Locksmith** — Locked out of home or car, lost keys.                      |
| plumbing                              | Wrench            | **Fuite de plomberie** — Tuyau qui fuit ou qui a éclaté.                             | **Plumbing leak** — Leaking or burst pipe.                                 |
| flooding                              | Droplets          | **Sous-sol inondé** — Eau au sous-sol, pompage.                                      | **Flooded basement** — Water in the basement, pumping.                     |

Order: live categories first.

### 8.6 How it works — "Comment ça marche" / "How it works"

1. **FR:** **Dites-nous ce qui se passe.** Formulaire de 90 secondes, appel ou texto.
   **EN:** **Tell us what's happening.** 90-second form, call or text.
2. **FR:** **On appelle pour vous.** On joint des fournisseurs vérifiés près de vous et on vous revient avec un nom, une heure d'arrivée et un prix estimé — même si on n'a encore trouvé personne, pour que vous ne restiez jamais sans nouvelles.
   **EN:** **We call around for you.** We reach vetted providers near you and get back to you with a name, an arrival time and an estimated price — even if we haven't found anyone yet, so you're never left wondering.
3. **FR:** **Vous décidez.** Vous acceptez le prix, le fournisseur se déplace, vous le payez directement. On fait un suivi après.
   **EN:** **You decide.** You accept the price, the provider comes, you pay them directly. We follow up afterwards.

### 8.7 Why Siza — "Pourquoi Siza" / "Why Siza"

Four cards:

| FR                                                                                                                                                           | EN                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **On appelle pour vous.** Fini d'appeler cinq numéros qui ne répondent pas.                                                                                  | **We make the calls.** No more dialing five numbers that don't pick up.                                                                 |
| **Prix confirmé d'avance.** Vous connaissez le prix avant que quelqu'un se déplace. Si quelque chose change sur place, le fournisseur vous en parle d'abord. | **Price confirmed up front.** You know the price before anyone comes out. If anything changes on site, the provider talks to you first. |
| **Fournisseurs vérifiés.** Des entreprises locales dont on a vérifié la licence, les assurances et les avis.                                                 | **Vetted providers.** Local businesses whose licence, insurance and reviews we've checked.                                              |
| **Quelqu'un en répond.** On fait un suivi après chaque intervention. Si ça se passe mal, on s'en occupe.                                                     | **Someone's accountable.** We follow up after every job. If something goes wrong, we deal with it.                                      |

### 8.8 Insurance note (small, honest card)

- **FR:** **Vous avez de l'assistance routière incluse?** On vous le rappellera : votre assureur ou CAA-Québec est souvent votre option gratuite. Si vous préférez choisir votre garage ou éviter une réclamation, on s'occupe du reste.
- **EN:** **Have roadside assistance included?** We'll remind you: your insurer or CAA is often your free option. If you'd rather choose your garage or avoid a claim, we'll handle the rest.

### 8.9 Founder story — "Pourquoi Siza existe" / "Why Siza exists"

- **FR:** « Récemment, en route vers le garage, mon tuyau d'échappement s'est détaché. J'ai attendu une dépanneuse une heure et demie et payé 350 $, sans connaître le prix avant son arrivée. Siza, c'est ce que j'aurais voulu ce jour-là : quelqu'un qui appelle pour moi, trouve qui est disponible et me confirme le prix d'avance. » — **Richard, fondateur · Vaudreuil-Dorion**
- **EN:** "Recently, on my way to the garage, my exhaust pipe came loose. I waited an hour and a half for a tow truck and paid $350, without knowing the price until it arrived. Siza is what I wish I'd had that day: someone who makes the calls, finds who's available, and confirms the price up front." — **Richard, founder · Vaudreuil-Dorion**

### 8.10 FAQ (accordion, `<details>` elements, no JavaScript needed)

| FR question — answer                                                                                                                                                                                | EN question — answer                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Combien ça coûte?** — Siza ne vous facture rien pendant le projet pilote. Vous payez seulement le fournisseur, au prix confirmé avant son déplacement.                                            | **How much does it cost?** — Siza charges you nothing during the pilot. You only pay the provider, at the price confirmed before they come.                            |
| **C'est une application?** — Pas encore. Pour l'instant, une vraie personne coordonne chaque demande, du premier appel au suivi.                                                                    | **Is this an app?** — Not yet. For now, a real person coordinates every request, from the first call to the follow-up.                                                 |
| **Qui sont les fournisseurs?** — Des entreprises locales indépendantes (remorqueurs, serruriers, techniciens) que nous avons vérifiées. On vous donne leur nom pour que vous puissiez les chercher. | **Who are the providers?** — Independent local businesses (tow operators, locksmiths, technicians) that we've vetted. We give you their name so you can look them up.  |
| **Quelles zones couvrez-vous?** — {area} pour commencer. L'ouest de l'île et Vaudreuil-Soulanges arrivent bientôt.                                                                                  | **What areas do you cover?** — {area} to start. The West Island and Vaudreuil-Soulanges are coming soon.                                                               |
| **Quelles sont vos heures?** — {hours}. En dehors de ces heures, laissez un message ou remplissez le formulaire : on vous revient dès l'ouverture. En cas de danger, composez le 911.               | **What are your hours?** — {hours}. Outside those hours, leave a message or fill in the form and we'll get back to you when we open. If anyone is in danger, call 911. |
| **Comment je paie?** — Directement au fournisseur, selon ses modes de paiement (virement Interac, comptant ou carte). Siza ne touche jamais à votre argent.                                         | **How do I pay?** — Directly to the provider, using their payment methods (Interac e-Transfer, cash or card). Siza never handles your money.                           |
| **Et si personne n'est disponible?** — On vous le dit franchement, sans vous faire attendre pour un « peut-être », et on vous indique la meilleure option (assureur, CAA-Québec, propriétaire).     | **What if no one is available?** — We tell you straight away rather than keep you waiting on a "maybe," and point you to your best option (insurer, CAA, landlord).    |
| **Que faites-vous de mes renseignements?** — On les utilise seulement pour traiter votre demande et en faire le suivi. Voir notre politique de confidentialité.                                     | **What do you do with my information?** — We only use it to handle your request and follow up. See our privacy notice.                                                 |

### 8.11 Final call to action

- **FR heading:** Le meilleur moment pour enregistrer notre numéro, c'est avant d'en avoir besoin.
- **EN heading:** The best time to save our number is before you need it.
- Buttons: **Enregistrer notre numéro** / **Save our number** (primary here), then **Dites-nous ce qui se passe** / **Tell us what's happening**, then Call · Text · WhatsApp.

### 8.12 Provider strip (small, above the footer)

- **FR:** Vous êtes remorqueur, serrurier ou technicien en chauffage dans la région? **Joignez notre banc de fournisseurs — aucuns frais pendant le pilote.** → Appeler ou écrire.
- **EN:** Are you a tow operator, locksmith or heating technician in the area? **Join our provider bench — no fees during the pilot.** → Call or email.

### 8.13 Footer

- **FR:** Siza · {area} · {hours} · {phoneDisplay} · Politique de confidentialité · © 2026 Siza
  Siza est un service de mise en relation. Les travaux sont réalisés et facturés par des fournisseurs indépendants.
- **EN:** Siza · {area} · {hours} · {phoneDisplay} · Privacy notice · © 2026 Siza
  Siza is a referral service. Work is performed and billed by independent providers.

### 8.14 Privacy notice page (`/confidentialite`, `/en/privacy`)

A short, plain-language page. Quebec's Law 25 expects a published privacy policy that names a person responsible for personal information. **Richard should have this reviewed; it is a starting draft, not legal advice.**

FR content (translate to EN):

- **Responsable de la protection des renseignements personnels :** Richard Dushime Iradukunda, {email}.
- **Ce que nous recueillons :** nom, numéro de téléphone, adresse ou lieu de l'intervention, description de la situation, comment vous avez entendu parler de nous.
- **Pourquoi :** traiter votre demande, la transmettre au fournisseur qui accepte l'intervention, faire un suivi, et améliorer le projet pilote.
- **Avec qui nous les partageons :** uniquement avec le fournisseur qui prend votre demande (nom, téléphone, adresse, description). Jamais vendus.
- **Où ils sont conservés :** les formulaires sont hébergés par Tally (Belgique). Les statistiques de visite sont anonymes et sans témoins (cookies).
- **Combien de temps :** au plus 12 mois après la fin du projet pilote, puis supprimés.
- **Vos droits :** accès, rectification, retrait du consentement ou suppression — écrivez à {email}.

## 9. SEO, accessibility, sharing

1. **Semantic HTML:** one `h1` per page, sections with `h2`, `lang="fr-CA"` / `lang="en-CA"`.
2. **Accessibility:** WCAG AA contrast, visible focus rings, tap targets at least 48 px, all icons `aria-hidden` with text labels, the sticky bar doesn't cover content (bottom padding), reduced-motion respected (no animation beyond subtle fades).
3. **Open Graph image:** 1200×630, pale blue background, logo, the FR headline, and the "Projet pilote · {area}" badge. A static PNG is fine.
4. **`robots.txt` + `sitemap.xml`:** indexable.
5. **JSON-LD:** skip it. Siza isn't a local business with a storefront, so don't add `LocalBusiness` schema.

## 10. Build phases and acceptance checks

**Phase 1 — Scaffold (about 1 hour)**

- `create-next-app` (TypeScript, Tailwind, App Router, ESLint). Add `lucide-react`.
- `site.config.ts`, `content/fr.ts` + `content/en.ts` with a shared type. Design tokens in the Tailwind theme.
- ✅ `npm run build` passes. `/` and `/en` render the hero with the correct language and `lang` attribute.

**Phase 2 — Sections (3–4 hours)**

- All components in section 5 with the copy from section 8. Services render from config (live vs. soon). FAQ uses `<details>`.
- ✅ Changing one category to `"live"` in config changes its badge and button with no other edit. ✅ No hard-coded copy outside `content/`. ✅ It looks right at 360 px, 390 px, 768 px and 1280 px.

**Phase 3 — Integrations (2–3 hours)**

- Tally popup with hidden fields and the `<a>` fallback. `src` capture and persistence. tel / sms / wa links with prefills. vCard served with the correct header. Sticky action bar. Notice banner.
- ✅ Visiting `/?src=board-iga-laval`, then switching language, keeps the `src`. ✅ The Tally submission shows `src` and `lang` in its hidden fields. ✅ The WhatsApp and SMS prefills include `Ref: board-iga-laval`. ✅ The vCard opens the contact sheet on iOS.

**Phase 4 — Analytics (30 min)**

- `track()` wrapper and all events in 7.5.
- ✅ Each event fires once per click with `src`. ✅ No cookies are set (check in DevTools → Application).

**Phase 5 — Polish and deploy (1–2 hours)**

- Privacy pages, metadata, OG image, favicon, robots/sitemap. Playwright smoke test: both locales load, the primary CTA is visible above the fold on a 390×844 viewport, tel/sms/wa hrefs are correct, `src` persists.
- Deploy to Vercel and attach the domain.
- ✅ Lighthouse mobile: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- ✅ Real-device test on an iPhone and an Android phone: call, text, WhatsApp, form popup, save contact.

## 11. Definition of done

The page is live on the final domain by **Thu, Nov 19**. Every action is tracked by `src`. Only Roadside/Towing is shown as live. Hours, area and the 911 line are visible. Richard can open Heating/AC or Locksmith by changing one line in `site.config.ts` and redeploying.

## 12. What Richard must provide or do (blockers, not for Claude Code)

| #   | Item                                                                                                                                                                                                                                              | Needed by  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1   | **Domain** (e.g. check `siza.ca`, `sizaaide.ca`, `siza-montreal.ca`). The flyer QR codes point to it, so decide it **before the print order (about Nov 12–13)**, even if the page isn't built yet. QR format: `https://{domain}/?src={placement}` | **Nov 12** |
| 2   | **Phone number** for calls, texts and WhatsApp Business. A dedicated number (second SIM/eSIM or a VoIP line) keeps Siza calls separate and lets you set a Siza voicemail.                                                                         | Nov 14     |
| 3   | **Tally form IDs** (FR and EN), and add hidden fields `src` and `lang` to both forms. Update Q8 options per the outreach plan.                                                                                                                    | Nov 14     |
| 4   | **"Roadside" vs. "Towing"** decision → `roadsideIncludesBoost`                                                                                                                                                                                    | Nov 16     |
| 5   | **Confirm the hours**: the poster says lun.–sam. 8 h–21 h.                                                                                                                                                                                        | Nov 14     |
| 6   | **Email** for the privacy contact and providers                                                                                                                                                                                                   | Nov 14     |
| 7   | **Analytics tool** choice and account                                                                                                                                                                                                             | Nov 14     |
| 8   | **Only say "vérifiés / vetted"** once Barakat and zk.remorquage have passed vetting, as the execution plan requires                                                                                                                               | Nov 19     |
| 9   | **Review the privacy notice** draft                                                                                                                                                                                                               | Nov 19     |

## 13. After launch (not part of this build)

- Weekly: read analytics by `src` next to the results log (Thursday check-in).
- When a category opens: set it to `"live"` in config, redeploy, and update the Tally Q1 logic the same day.
- Holidays: set `notice` with the reduced hours before Dec 24.
- If the pilot hits its thresholds, this page becomes the waitlist / launch page for the real app. Keep `content/` clean so it's reusable.

---

**Related Siza docs (in Richard's Siza folder, not in this repo):** concierge-mvp-strategy.md ("Why concierge before the app"), concierge-mvp-execution-plan.md (Phase 0 front end, Phase 2 week 0), pilot-customer-acquisition-plan.md (QR `src` scheme, messaging), concierge-intake-form-spec.md (the Tally forms), customer-request-call-script.md (what happens after someone taps Call).
