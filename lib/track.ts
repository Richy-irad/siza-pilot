/** Event properties sent to Umami. */
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    /** Umami tracker, present once its script has loaded. */
    umami?: { track: (name: string, data?: Props) => void };
  }
}

/** Analytics events from PLAN.md §7.5. */
export type EventName =
  | "form_open"
  | "call_click"
  | "sms_click"
  | "whatsapp_click"
  | "save_contact"
  | "notify_click"
  | "lang_switch";

/** Analytics wrapper: never throws, no-ops when Umami isn't loaded. */
export function track(name: EventName, props: Props = {}) {
  try {
    window.umami?.track(name, props);
  } catch {}
}
