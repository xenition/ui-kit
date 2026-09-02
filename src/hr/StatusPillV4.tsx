import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  toneGround,
  toneInkClass,
  toneOnClass,
  toneFillClass,
} from './internal/tone-v4';
import type { StatusPillProps } from './StatusPill';

export interface StatusPillV4Props extends StatusPillProps {
  /**
   * Announced instead of the pill's own word. Default: `meta.label`.
   *
   * Deliberately **not** an `aria-label` on the pill — a `<span>` with no role
   * is `generic`, ARIA forbids naming a generic element, and that dropped
   * label is change 1 below. The override is drawn as visually-hidden text and
   * the visible word is hidden from the reader, so what is announced is real
   * content on both paths.
   */
  accessibilityLabel?: string;
  /**
   * Hide the pill from the screen reader.
   *
   * For the common case where the pill sits inside a row whose accessible name
   * already carries the status — announcing "Denied" twice in a row is worse
   * than announcing it once. Default `false`.
   */
  decorative?: boolean;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * The pill's inset, per size, off the spacing scale.
 *
 * The base wrote `px-2 py-0.5` / `px-2.5 py-0.5` — Tailwind's default rem
 * ramp, which does not move when a seed retunes its rhythm, so the pill kept
 * its old padding inside rows that had tightened around it.
 */
const PAD: Record<'sm' | 'md', string> = {
  sm: 'px-xs py-[calc(var(--xen-space-xs)_/_2)]',
  md: 'px-sm py-[calc(var(--xen-space-xs)_/_2)]',
};

/**
 * **V4 status pill** — the web twin of the native `StatusPillV4`, same props as
 * {@link StatusPill} plus `accessibilityLabel`, `decorative` and `testID`.
 *
 * ## Four changes
 *
 * 1. **The word is read, not the label.** The pill put `aria-label` on a bare
 *    `<span>`. A `<span>` with no role is `generic`, and ARIA forbids naming a
 *    generic element — every browser drops the label. So the pill announced
 *    whatever its text happened to be, and the label the author wrote was
 *    never spoken by anything. The glyph is now `aria-hidden` and the word is
 *    real text, which is what the reader gets either way and is now what the
 *    author is looking at.
 * 2. **The word is inked with an ink slot.** `soft` and `inline` drew the
 *    label with `TONE_TEXT_CLASS` — `text-success`, `text-danger`,
 *    `text-muted`. Those are fill tokens; `muted` in particular is a
 *    decorative ramp step with no contrast promise, and "Cancelled",
 *    "Draft" and "Offline" were all drawn in it. Every tone now resolves to
 *    its `*-text` slot.
 * 3. **`soft` is a tint of its own tone, not `bg-neutral-100`.** A ramp step
 *    mirrors under `[data-theme="dark"]`, so the chip was a pale plate punched
 *    into a dark page. It is now the tone mixed 10% into the card — the same
 *    ground the native twin mixes, so a pending pill is one colour on two
 *    platforms.
 * 4. **The glyph scales with the word.** Native froze the glyph with
 *    `allowFontScaling={false}`, so at 200% Dynamic Type "Approved" grew to
 *    24pt beside a 12pt "✓" that no longer looked attached to it. Neither twin
 *    pins the glyph now: both halves take the pill's own text size.
 */
export const StatusPillV4 = React.forwardRef<HTMLSpanElement, StatusPillV4Props>(
  function StatusPillV4(
    {
      meta,
      variant = 'soft',
      size = 'md',
      accessibilityLabel,
      decorative = false,
      testID,
      className,
      style,
      'aria-hidden': ariaHidden,
      ...rest
    },
    ref
  ) {
    if (meta == null) return null;

    const solid = variant === 'solid';
    const inline = variant === 'inline';

    return (
      <span
        ref={ref}
        // Pulled out of `rest` and merged rather than left to the spread: a
        // caller that already passes `aria-hidden` keeps it, and `decorative`
        // cannot be undone by a spread of `aria-hidden={undefined}`.
        aria-hidden={decorative || ariaHidden}
        data-testid={testID}
        data-xen-status-pill={variant}
        className={cn(
          'inline-flex items-center gap-xs font-semibold',
          size === 'sm' ? 'text-xs' : 'text-sm',
          inline
            ? toneInkClass(meta.tone)
            : cn(
                'rounded-[var(--xen-radius-full)]',
                PAD[size],
                solid
                  ? cn(toneFillClass(meta.tone), toneOnClass(meta.tone))
                  : toneInkClass(meta.tone)
              ),
          className
        )}
        // The soft ground is a `color-mix()` over two custom properties, which
        // no utility class bound to a token can say — and being inline it
        // follows `[data-theme]` without a dark rule of its own.
        style={!solid && !inline ? { background: toneGround(meta.tone), ...style } : style}
        {...rest}
      >
        <span aria-hidden="true">{meta.glyph}</span>
        {accessibilityLabel == null ? (
          <span>{meta.label}</span>
        ) : (
          <>
            <span aria-hidden="true">{meta.label}</span>
            <span className="sr-only">{accessibilityLabel}</span>
          </>
        )}
      </span>
    );
  }
);
