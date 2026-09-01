import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_BG, TONE_INK, type ToneV4 } from '../primitives/internal/tone-v4';
import type { NetworkBadgeProps, NetworkStatus } from './NetworkBadge';

/**
 * The identity accents a network badge takes, on **both** twins.
 *
 * The base could not express one badge in two places: web's `tone` was
 * `IconColor` and native's was `keyof SemanticColors`, which admits `border`
 * and `input` — a hairline and a field outline offered as a chain's colour.
 * Ten members, declared here rather than imported, because the native twin
 * cannot reach `IconColor` without pulling a web module into the React Native
 * graph. Spelled identically on both sides; `tone="accent"` deliberately stops
 * compiling.
 */
export type NetworkBadgeV4Tone =
  | 'onSurface'
  | 'onPrimary'
  | 'primary'
  | 'muted'
  | 'success'
  | 'onSuccess'
  | 'warn'
  | 'onWarn'
  | 'danger'
  | 'onDanger';

export interface NetworkBadgeV4Props extends Omit<NetworkBadgeProps, 'tone'> {
  /** Identity accent for the chain dot. Default `'primary'`. */
  tone?: NetworkBadgeV4Tone;
  /** Override the health words. Defaults `'Connected'`, `'Congested'`, `'Offline'`. */
  statusLabels?: Partial<Record<NetworkStatus, string>>;
}

/**
 * A tone's fill and its ink, as a pair.
 *
 * The five `on*` spellings resolve to the **fill they are paired with**, not to
 * themselves: `on-primary` is the ink the compiler guarantees *against*
 * `primary` and has no promise at all against the card this badge sits on, so
 * a dot painted `bg-on-primary` and a glyph inked `text-on-primary` were both
 * asking a slot to do the one job it was never measured for.
 */
const TONE_PAIR: Record<NetworkBadgeV4Tone, { fill: string; ink: string }> = {
  onSurface: { fill: 'bg-on-surface', ink: 'text-on-surface' },
  onPrimary: { fill: 'bg-primary', ink: 'text-primary-text' },
  primary: { fill: 'bg-primary', ink: 'text-primary-text' },
  muted: { fill: 'bg-muted', ink: 'text-muted-text' },
  success: { fill: 'bg-success', ink: 'text-success-text' },
  onSuccess: { fill: 'bg-success', ink: 'text-success-text' },
  warn: { fill: 'bg-warn', ink: 'text-warn-text' },
  onWarn: { fill: 'bg-warn', ink: 'text-warn-text' },
  danger: { fill: 'bg-danger', ink: 'text-danger-text' },
  onDanger: { fill: 'bg-danger', ink: 'text-danger-text' },
};

const STATUS_TONE: Record<NetworkStatus, ToneV4> = {
  connected: 'success',
  congested: 'warn',
  disconnected: 'danger',
};

const STATUS_LABEL: Record<NetworkStatus, string> = {
  connected: 'Connected',
  congested: 'Congested',
  disconnected: 'Offline',
};

/**
 * **V4 network badge** — the web twin of the native `NetworkBadgeV4`, same
 * props as {@link NetworkBadge} plus `statusLabels`, with `tone` narrowed to
 * the shared tone union.
 *
 * ## Four changes
 *
 * 1. **The status word carries its tone on both twins.** Native drew it
 *    `muted`, so the health signal — the entire reason `status` exists —
 *    lived in a 6px dot on the phone and in text only on the web.
 * 2. **The ink is ink.** `text-success` / `text-warn` / `text-danger` are fill
 *    slots; the word now takes the contrast-corrected `*Text` form, and the
 *    dots take the fills.
 * 3. **The pill is on the scale.** `px-2`, `py-0.5`, `gap-1`, `h-2 w-2` and
 *    `h-1.5 w-1.5` are five raw numbers, none of them a spacing token, so the
 *    badge did not resize with a denser or roomier seed.
 * 4. **The badge's own text is its name.** The base put `aria-label` on a
 *    plain `<span>` with no role, where support is inconsistent, and it
 *    duplicated the visible text word for word. Removing it lets the text
 *    speak and the decorative dots stay hidden.
 */
export const NetworkBadgeV4 = React.forwardRef<HTMLSpanElement, NetworkBadgeV4Props>(
  function NetworkBadgeV4(
    { name, status, tone = 'primary', glyph, size = 'md', statusLabels, className, ...rest },
    ref
  ) {
    if (!name) return null;

    const small = size === 'sm';
    const textSize = small ? 'text-xs' : 'text-sm';
    const dot = small ? 'h-xs w-xs' : 'h-sm w-sm';
    const statusWord = status ? (statusLabels?.[status] ?? STATUS_LABEL[status]) : undefined;

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-xs self-start rounded-[var(--xen-radius-full)]',
          'border border-border bg-card px-sm py-xs',
          className
        )}
        {...rest}
      >
        {glyph != null ? (
          <span aria-hidden="true" className={cn(textSize, TONE_PAIR[tone].ink)}>
            {glyph}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              'inline-block rounded-[var(--xen-radius-full)]',
              dot,
              TONE_PAIR[tone].fill
            )}
          />
        )}
        <span className={cn('truncate font-semibold text-on-card', textSize)}>{name}</span>
        {status != null ? (
          <span className="inline-flex items-center gap-xs">
            <span
              aria-hidden="true"
              className={cn(
                'inline-block rounded-[var(--xen-radius-full)]',
                dot,
                TONE_BG[STATUS_TONE[status]]
              )}
            />
            <span className={cn('text-xs font-semibold', TONE_INK[STATUS_TONE[status]])}>
              {statusWord}
            </span>
          </span>
        ) : null}
      </span>
    );
  }
);
