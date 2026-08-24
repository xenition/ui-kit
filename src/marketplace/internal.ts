/**
 * Internal helpers shared across the web marketplace components. Not part of the
 * public surface — the barrel does not re-export these. Mirrors the native
 * `internal.ts`, minus `withAlpha` (web tints come from `--xen-*` token classes,
 * never a computed literal).
 */
import type * as React from 'react';

/** Marketplace item condition grades. */
export type Condition = 'new' | 'like-new' | 'used' | 'refurb';

/**
 * Keyboard activation for a `role="button"` div. On Enter / Space it prevents
 * the default scroll/submit and dispatches a real `click` on the element, so the
 * div's own `onClick` fires exactly as a pointer press would — no separate
 * handler wiring, no synthetic-event casts.
 */
export function activateOnKey(event: React.KeyboardEvent<HTMLElement>): void {
  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
    event.currentTarget.click();
  }
}
