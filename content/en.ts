import type { Dictionary } from "./types";

/** English copy (translation of `fr`). */
export const en: Dictionary = {
  lang: "en",
  htmlLang: "en-CA",
  home: "/en",
  privacyHref: "/en/privacy",
  meta: {
    title: "Siza — We find you help, fast | Montreal & Laval",
    description:
      "Car won't start, locked out, no heat? A real person finds an available vetted provider and confirms the price before they come. No Siza fee.",
    privacyTitle: "Privacy notice | Siza",
  },
  langSwitch: { navLabel: "Language", ariaLabel: "FR — Version française" },
  header: { call: "Call", homeLabel: "Siza, home" },
  hero: {
    badge: "Pilot project · {area} · {hours}",
    headline: "Stuck? We'll find you help — fast.",
    sub: "A real person calls vetted providers for you and comes back with a name, an arrival time and a price — before anyone comes out.",
    cta: "Tell us what's happening →",
    underCta: "90-second form · reply in {responseWindow} during our hours",
    save: "Save our number — so it's there the day you need it",
    trust: ["Vetted local providers", "You pay the provider directly", "No Siza fee"],
  },
  contact: {
    call: "Call",
    text: "Text",
    whatsapp: "WhatsApp",
    smsPrefill: "Hi Siza, I need help with: ",
  },
  safety:
    "Someone in danger, smell of gas, or an accident with injuries? **Call 911 first.** Siza is not an emergency service.",
  services: {
    heading: "What we cover right now",
    available: "Available",
    soon: "Coming soon",
    getHelp: "Get help",
    notify: "Notify me",
    items: {
      roadside: {
        title: "Roadside help",
        desc: "Tow, battery boost, flat tire, keys locked in the car.",
      },
      heating: { title: "Heating / AC", desc: "Furnace down, no heat, heat pump trouble." },
      locksmith: { title: "Locksmith", desc: "Locked out of home or car, lost keys." },
      plumbing: { title: "Plumbing leak", desc: "Leaking or burst pipe." },
      flooding: { title: "Flooded basement", desc: "Water in the basement, pumping." },
    },
    roadsideTowing: {
      title: "Towing",
      desc: "Broken-down or damaged car, to the garage you choose.",
    },
  },
  how: {
    heading: "How it works",
    steps: [
      { title: "Tell us what's happening.", body: "90-second form, call or text." },
      {
        title: "We call around for you.",
        body: "We reach vetted providers near you and get back to you with a name, an arrival time and an estimated price — even if we haven't found anyone yet, so you're never left wondering.",
      },
      {
        title: "You decide.",
        body: "You accept the price, the provider comes, you pay them directly. We follow up afterwards.",
      },
    ],
  },
  why: {
    heading: "Why Siza",
    items: [
      { title: "We make the calls.", body: "No more dialing five numbers that don't pick up." },
      {
        title: "Price confirmed up front.",
        body: "You know the price before anyone comes out. If anything changes on site, the provider talks to you first.",
      },
      {
        title: "Vetted providers.",
        body: "Local businesses whose licence, insurance and reviews we've checked.",
      },
      {
        title: "Someone's accountable.",
        body: "We follow up after every job. If something goes wrong, we deal with it.",
      },
    ],
  },
  insurance: {
    title: "Have roadside assistance included?",
    body: "We'll remind you: your insurer or CAA is often your free option. If you'd rather choose your garage or avoid a claim, we'll handle the rest.",
  },
  founder: {
    heading: "Why Siza exists",
    quote:
      "“Recently, on my way to the garage, my exhaust pipe came loose. I waited an hour and a half for a tow truck and paid $350, without knowing the price until it arrived. Siza is what I wish I'd had that day: someone who makes the calls, finds who's available, and confirms the price up front.”",
    name: "Richard, founder · Vaudreuil-Dorion",
  },
  faq: {
    heading: "FAQ",
    items: [
      {
        q: "How much does it cost?",
        a: "Siza charges you nothing during the pilot. You only pay the provider, at the price confirmed before they come.",
      },
      {
        q: "Is this an app?",
        a: "Not yet. For now, a real person coordinates every request, from the first call to the follow-up.",
      },
      {
        q: "Who are the providers?",
        a: "Independent local businesses (tow operators, locksmiths, technicians) that we've vetted. We give you their name so you can look them up.",
      },
      {
        q: "What areas do you cover?",
        a: "{area} to start. The West Island and Vaudreuil-Soulanges are coming soon.",
      },
      {
        q: "What are your hours?",
        a: "{hours}. Outside those hours, leave a message or fill in the form and we'll get back to you when we open. If anyone is in danger, call 911.",
      },
      {
        q: "How do I pay?",
        a: "Directly to the provider, using their payment methods (Interac e-Transfer, cash or card). Siza never handles your money.",
      },
      {
        q: "What if no one is available?",
        a: "We tell you straight away rather than keep you waiting on a “maybe,” and point you to your best option (insurer, CAA, landlord).",
      },
      {
        q: "What do you do with my information?",
        a: "We only use it to handle your request and follow up. See our [privacy notice](/en/privacy).",
      },
    ],
  },
  final: {
    heading: "The best time to save our number is before you need it.",
    save: "Save our number",
    cta: "Tell us what's happening",
  },
  provider: {
    lead: "Are you a tow operator, locksmith or heating technician in the area?",
    strong: "Join our provider bench — no fees during the pilot.",
    call: "Call",
    or: "or",
    email: "email",
  },
  footer: {
    privacy: "Privacy notice",
    copyright: "© 2026 Siza",
    disclaimer:
      "Siza is a referral service. Work is performed and billed by independent providers.",
  },
  sticky: { call: "Call", text: "Text", form: "Form" },
  privacy: {
    title: "Privacy notice",
    back: "← Back to home",
    items: [
      {
        label: "Person responsible for personal information",
        body: "Richard Dushime Iradukunda, [{email}](mailto:{email}).",
      },
      {
        label: "What we collect",
        body: "Name, phone number, address or location of the job, description of the situation, how you heard about us.",
      },
      {
        label: "Why",
        body: "To handle your request, pass it to the provider who accepts the job, follow up, and improve the pilot project.",
      },
      {
        label: "Who we share it with",
        body: "Only the provider who takes your request (name, phone, address, description). Never sold.",
      },
      {
        label: "Where it is stored",
        body: "Forms are hosted by Tally (Belgium). Visit statistics are anonymous and cookie-free.",
      },
      {
        label: "How long",
        body: "At most 12 months after the end of the pilot project, then deleted.",
      },
      {
        label: "Your rights",
        body: "Access, correction, withdrawal of consent or deletion — write to [{email}](mailto:{email}).",
      },
    ],
  },
};
