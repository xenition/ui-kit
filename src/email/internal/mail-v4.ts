/**
 * The `email` module's own V4 vocabulary (web) — the twin of
 * `native/email/internal/mail-v4.ts`.
 *
 * Nothing here is exported from the package.
 */

import { SKELETON_CLASS, TONE_INK, TONE_ON, type ToneV4 } from '../../primitives/internal/tone-v4';
import { canSendMail, useThreadExpansion } from '../thread-state-v4';

export { canSendMail, SKELETON_CLASS, TONE_INK, TONE_ON, useThreadExpansion };
export type { ToneV4 };

/**
 * A mail label is **identity, not status**.
 *
 * `MailLabelTone` handed labels `'success' | 'warn' | 'danger'`, so a
 * Gmail-style "Receipts" chip rendered in the error colour and was
 * indistinguishable from a genuine failure in the same list.
 */
export function labelInkClass(tone: string): string {
  return TONE_INK[(tone === 'success' || tone === 'warn' || tone === 'danger'
    ? 'neutral'
    : tone) as ToneV4] ?? TONE_INK.neutral;
}

/** The selected/hovered row ground — `selected`, never `border` and never a ramp step. */
export const ROW_SELECTED_CLASS = 'bg-selected text-on-selected';
export const ROW_HOVER_CLASS = 'hover:bg-selected/60';

/** The ground behind a skeleton row — never `border`. */
export const PLACEHOLDER_CLASS = SKELETON_CLASS;

/**
 * Build the one accessible name a mail row should carry.
 *
 * `role="button"` makes its children **presentational**, so the preview, the
 * thread count and every label chip were removed from the accessibility tree
 * outright — the row's six-item `aria-label` was all a reader ever got.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}
