"use client";

import { useSyncExternalStore } from "react";

/** sessionStorage key holding the visit's source. */
const KEY = "siza_src";
/** Allowed `src` values: lowercase letters, digits, dashes; max 60 chars. */
const VALID = /^[a-z0-9-]{1,60}$/;
/** In-memory copy; also the fallback when sessionStorage throws (private mode). */
let memory: string | null = null;

/** Reads `?src=` once, persists it for the session, falls back to "direct". */
export function getSrc(): string {
  if (memory) return memory;
  let value: string | null = null;
  try {
    const param = new URLSearchParams(window.location.search).get("src");
    if (param && VALID.test(param)) value = param;
  } catch {}
  try {
    if (value) sessionStorage.setItem(KEY, value);
    else {
      const stored = sessionStorage.getItem(KEY);
      if (stored && VALID.test(stored)) value = stored;
    }
  } catch {}
  memory = value ?? "direct";
  return memory;
}

/** `src` never changes after load, so there is nothing to subscribe to. */
const noop = () => () => {};

/** Client-only src; renders "direct" on the server, real value after hydration. */
export const useSrc = () => useSyncExternalStore(noop, getSrc, () => "direct");
