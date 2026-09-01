import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import type { ImpactStatProps, ImpactStatTone } from './ImpactStat';

/** Drop-in for {@link ImpactStatProps} — same props, the V4 "rally" design. */
export type ImpactStatV4Props = ImpactStatProps;

// Web `Icon` has no `accent` slot → map it to `primary` (kit gotcha).
const ICON_COLOR: Record<ImpactStatTone, IconColor> = {
  primary: 'primary',
  success: 'success',
  accent: 'primary',
};

// Soft-tone tile + glyph well. `success` has no ramp of its own, so it borrows
// the primary tint panel; the tone still reads through the glyph color.
const TINT_BG: Record<ImpactStatTone, string> = {
  primary: 'bg-primary/10',
  success: 'bg-primary/10',
  accent: 'bg-accent/10',
};

/**
 * ImpactStat — **V4** "rally" design (web parity of the native V4). A single
 * mission metric drawn with the warm, elevated "rally" identity: a big legible
 * value numeral, an optional muted unit, a glyph chip in the tone color, a
 * caption label, and a supporting caption. Honors all three `variant`s —
 * `plain` (no surface), `card` (an elevated bordered surface with a soft
 * shadow), and `tile` (a filled soft-tone panel) — and all three `tone`s
 * (`primary | success | accent`), identical props/behavior to
 * {@link ImpactStatProps}. Tone reads through the glyph + value color, never
 * color alone. All colors come from the `--xen-*` token classes — no literals.
 */
export const ImpactStatV4 = React.forwardRef<HTMLDivElement, ImpactStatV4Props>(function ImpactStatV4(
  { value, label, unit, glyph, caption, variant = 'plain', tone = 'primary', className, ...rest },
  ref
) {
  const surfaceClass =
    variant === 'card'
      ? 'rounded-lg border border-border bg-surface p-md shadow-md'
      : variant === 'tile'
        ? cn('rounded-lg p-md', TINT_BG[tone])
        : '';

  return (
    <div
      ref={ref}
      role="group"
      aria-label={`${String(value)}${unit ? ` ${unit}` : ''} ${label}`}
      className={cn('flex flex-col', surfaceClass, className)}
      {...rest}
    >
      <div className="flex items-center gap-sm">
        {glyph ? (
          <span className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full', TINT_BG[tone])}>
            <Icon glyph={glyph} size="base" color={ICON_COLOR[tone]} />
          </span>
        ) : null}
        <span className="flex items-end gap-xs">
          <span className="text-3xl font-extrabold leading-none text-on-surface">{value}</span>
          {unit ? <span className="pb-0.5 text-base text-muted">{unit}</span> : null}
        </span>
      </div>
      <span className="mt-xs text-sm text-muted">{label}</span>
      {caption ? <span className="mt-0.5 text-xs text-muted">{caption}</span> : null}
    </div>
  );
});
