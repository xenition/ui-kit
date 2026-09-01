/**
 * The `chat` module's own V4 vocabulary (web) — the twin of
 * `native/chat/internal/thread-v4.ts`.
 *
 * Nothing here is exported from the package.
 */

import {
  metaLine,
  SKELETON_CLASS,
  TONE_BG,
  TONE_INK,
  TONE_ON,
  type ToneV4,
} from '../../primitives/internal/tone-v4';
import type { Presence } from '../PresenceDot';
import type { ReceiptStatus } from '../ReadReceipt';

export { metaLine, SKELETON_CLASS, TONE_BG, TONE_INK, TONE_ON };
export type { ToneV4 };

/**
 * A named size, which is the shape a design system is for.
 *
 * Four components take a raw pixel `size?: number` — the one prop shape that
 * invites a caller to pick a number off the scale. The raw prop stays for
 * parity; this is the documented path.
 */
export type ChatSize = 'sm' | 'md' | 'lg';

/** The dot/glyph size per named step, as a Tailwind class pair. */
export const CHAT_SIZE: Record<ChatSize, string> = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
};

/**
 * Presence → tone and default word.
 *
 * `away` takes `warn` in the base, which overstates it: stepping away is not
 * a caution. `busy` keeps `danger` because "do not disturb" is a stop signal.
 */
export const PRESENCE_META: Record<Presence, { label: string; tone: ToneV4 }> = {
  online: { label: 'Online', tone: 'success' },
  away: { label: 'Away', tone: 'neutral' },
  busy: { label: 'Busy', tone: 'danger' },
  offline: { label: 'Offline', tone: 'neutral' },
};

/**
 * Receipt → glyph, default word and tone.
 *
 * `failed` is the only state a user must act on, and the base announced it as
 * passively as `sent`.
 */
export const RECEIPT_META: Record<
  ReceiptStatus,
  { glyph: string; label: string; tone: ToneV4 }
> = {
  sending: { glyph: '◌', label: 'Sending', tone: 'neutral' },
  sent: { glyph: '✓', label: 'Sent', tone: 'neutral' },
  delivered: { glyph: '✓✓', label: 'Delivered', tone: 'neutral' },
  read: { glyph: '✓✓', label: 'Read', tone: 'primary' },
  failed: { glyph: '⊗', label: 'Not delivered', tone: 'danger' },
};

/** Seconds as `m:ss`, for a voice note's duration and position. */
export function clock(seconds: number): string {
  const total = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
