"use client";

import { useSyncExternalStore } from "react";

const KEY = "siza_src";
const VALID = /^[a-z0-9-]{1,60}$/;
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

const noop = () => () => {};

/** Client-only src; renders "direct" on the server, real value after hydration. */
export const useSrc = () => useSyncExternalStore(noop, getSrc, () => "direct");
