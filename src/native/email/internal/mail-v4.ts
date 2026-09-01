/**
 * The `email` module's own V4 vocabulary (native) — the twin of
 * `email/internal/mail-v4.ts`.
 *
 * Nothing here is exported from the package.
 */

import type { XenitionNativeTheme } from '../../theme';
import { onPair, skeletonFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import { canSendMail, useThreadExpansion } from '../../../email/thread-state-v4';

export { canSendMail, onPair, skeletonFill, toneInk, useThreadExpansion };
export type { ToneV4 };

/**
 * A mail label is **identity, not status**.
 *
 * `MailLabelTone` handed labels `'success' | 'warn' | 'danger'`, so a
 * Gmail-style "Receipts" chip rendered in the error colour and was
 * indistinguishable from a genuine failure in the same list.
 */
export function labelInk(theme: XenitionNativeTheme, tone: string): string {
  const identity: ToneV4 =
    tone === 'success' || tone === 'warn' || tone === 'danger' ? 'neutral' : (tone as ToneV4);
  return toneInk(theme, identity);
}

/**
 * The selected / pressed row ground.
 *
 * Three components used `colors.border` — a hairline token — as the pressed
 * fill, and web resolved `selected` and `hover` to the *same* ramp step, so a
 * hovered row was indistinguishable from the selected one in a split-view
 * inbox. The theme ships `selected`/`onSelected` for exactly this.
 */
export function rowSelectedGround(theme: XenitionNativeTheme): string {
  return theme.colors.selected;
}

/** Build the one accessible name a mail row should carry. */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}
