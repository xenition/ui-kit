/**
 * Typing an amount — **pure, and shared by both twins**, the way
 * `calendar/layout-v4.ts` and `booking/schedule-v4.ts` are. The native twin
 * imports it as `../../crypto/amount-v4`.
 *
 * Nothing here is exported from the package.
 */

import * as React from 'react';

/**
 * Sanitise a typed amount to something a person can actually type.
 *
 * Keeps digits and **one** decimal separator, drops everything else, and
 * caps the fraction. Crucially it returns the *text*, because a half-typed
 * amount — `"0"`, `"1."`, `"0.30"` — is not yet a number and must survive
 * until it is.
 */
export function sanitizeAmountText(raw: string, maxDecimals = 18): string {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot === -1) return cleaned;

  const whole = cleaned.slice(0, firstDot);
  const fraction = cleaned.slice(firstDot + 1).replace(/\./g, '').slice(0, maxDecimals);
  return `${whole}.${fraction}`;
}

/** The number a draft stands for. `"1."` and `""` are not yet amounts. */
export function amountValue(text: string): number {
  const parsed = Number.parseFloat(text);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Whether a draft and a committed number are the same amount. */
export function sameAmount(text: string, value: number): boolean {
  if (text === '' || text === '.') return value === 0;
  return amountValue(text) === value;
}

/**
 * A numeric field that can be typed in.
 *
 * ## The bug this replaces
 *
 * `SwapForm` was fully controlled off a **number**:
 *
 * ```tsx
 * value={fromAmount === 0 ? '' : String(fromAmount)}
 * onChange={(e) => emit(parseAmount(e.target.value))}
 * ```
 *
 * `Number.parseFloat('1.')` is `1`, so the instant the user typed the decimal
 * point the parent was handed `1`, the field re-rendered as `"1"`, and the
 * point vanished from under the caret. A leading `0` collapsed to `''` and
 * disappeared outright. **Only whole token units could ever be entered** — on
 * both twins, in the one component whose submit hands a value to a chain
 * transaction. A user swapping 0.25 types `0`, sees nothing, types `.`, sees
 * nothing, types `2`, and submits **2**.
 *
 * The fix is the standard one: hold the draft as text, emit the parsed number,
 * and only overwrite the draft when the parent's value genuinely disagrees
 * with what is on screen — so an external change still wins, and the user's
 * own half-typed decimal does not get stamped on.
 */
export function useAmountField(
  value: number,
  onChange?: (next: number) => void,
  maxDecimals = 18
): { text: string; setText: (raw: string) => void } {
  const [draft, setDraft] = React.useState(() => (value === 0 ? '' : String(value)));

  // Only when the parent moved somewhere the draft does not already mean.
  if (!sameAmount(draft, value)) {
    const incoming = value === 0 ? '' : String(value);
    if (incoming !== draft) setDraft(incoming);
  }

  const setText = React.useCallback(
    (raw: string) => {
      const next = sanitizeAmountText(raw, maxDecimals);
      setDraft(next);
      onChange?.(amountValue(next));
    },
    [maxDecimals, onChange]
  );

  return { text: draft, setText };
}

/**
 * Split a signed change into its three cues, so direction is never colour
 * alone **and** never contradicts itself.
 *
 * The base built its spoken label as
 * `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` `` — and
 * `formatPct` re-applies a sign, so a loss announced as **"down +3.20%"**.
 * `>= 0` also sent a flat `0` down the "up" branch while the glyph drawn
 * beside it was `•` and the tone was muted: the spoken direction contradicted
 * the drawn one.
 */
export interface ChangeParts {
  /** `'up' | 'down' | 'flat'` — never colour alone. */
  direction: 'up' | 'down' | 'flat';
  /** The word for the direction, overridable by the caller. */
  word: string;
  /** ▲ / ▼ / • */
  glyph: string;
  /** `success` / `danger` / `neutral` — the *tone*, resolved to ink by the caller. */
  tone: 'success' | 'danger' | 'neutral';
}

export function changeParts(
  delta: number | undefined,
  words: { up?: string; down?: string; flat?: string } = {}
): ChangeParts {
  const safe = Number.isFinite(delta) ? (delta as number) : 0;
  if (safe > 0) {
    return { direction: 'up', word: words.up ?? 'up', glyph: '▲', tone: 'success' };
  }
  if (safe < 0) {
    return { direction: 'down', word: words.down ?? 'down', glyph: '▼', tone: 'danger' };
  }
  // Flat is not "up". The base called it up and drew it muted.
  return { direction: 'flat', word: words.flat ?? 'unchanged', glyph: '•', tone: 'neutral' };
}
