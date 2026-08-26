import * as React from 'react';
import { cn } from './cn';
import type { BadgeProps, BadgeSize, BadgeTone, BadgeVariant } from './Badge';

export type { BadgeProps as BadgeV4Props, BadgeSize, BadgeTone, BadgeVariant };

/**
 * Per-tone pieces. `fill`/`on` is a compiler-guaranteed pair; `text` is the
 * contrast-safe TEXT form (AA against `surface`); `ring` is the vivid accent,
 * which stays vivid because a border is a UI boundary judged at 3:1, not text.
 */
const TONE: Record<BadgeTone, { fill: string; on: string; text: string; ring: string; mix: string }> = {
  neutral: {
    fill: 'bg-border',
    on: 'text-on-surface',
    text: 'text-on-surface',
    ring: 'border-border',
    mix: 'var(--xen-on-surface)',
  },
  muted: {
    fill: 'bg-neutral-100',
    on: 'text-muted-text',
    text: 'text-muted-text',
    ring: 'border-border',
    mix: 'var(--xen-muted)',
  },
  primary: {
    fill: 'bg-primary',
    on: 'text-on-primary',
    text: 'text-primary-text',
    ring: 'border-primary',
    mix: 'var(--xen-primary)',
  },
  accent: {
    fill: 'bg-accent',
    on: 'text-on-accent',
    text: 'text-accent-text',
    ring: 'border-accent',
    mix: 'var(--xen-accent)',
  },
  success: {
    fill: 'bg-success',
    on: 'text-on-success',
    text: 'text-success-text',
    ring: 'border-success',
    mix: 'var(--xen-success)',
  },
  warn: {
    fill: 'bg-warn',
    on: 'text-on-warn',
    text: 'text-warn-text',
    ring: 'border-warn',
    mix: 'var(--xen-warn)',
  },
  danger: {
    fill: 'bg-danger',
    on: 'text-on-danger',
    text: 'text-danger-text',
    ring: 'border-danger',
    mix: 'var(--xen-danger)',
  },
};

/** Status-dot fill per tone. */
const DOT: Record<BadgeTone, string> = {
  neutral: 'bg-on-surface',
  muted: 'bg-muted',
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

const SIZE: Record<BadgeSize, string> = {
  sm: 'min-h-[calc(var(--xen-space-md)_+_var(--xen-space-xs))] px-sm',
  md: 'min-h-[var(--xen-space-lg)] px-[calc(var(--xen-space-sm)_+_var(--xen-space-xs))]',
};

const PILL_WIDTH: Record<BadgeSize, string> = {
  sm: 'min-w-[calc(var(--xen-space-md)_+_var(--xen-space-xs))]',
  md: 'min-w-[var(--xen-space-lg)]',
};

const DOT_SIZE: Record<BadgeSize, string> = {
  sm: 'h-[calc(var(--xen-space-sm)_*_0.75)] w-[calc(var(--xen-space-sm)_*_0.75)]',
  md: 'h-sm w-sm',
};

/**
 * **V4 badge** — the web twin of the native `BadgeV4`, same props as
 * {@link Badge}, a different design line.
 *
 * The base badge is correct on one ground and only one: the page. `soft` tints
 * with a ramp step, `outline` has no fill at all, and both label themselves
 * with a colour whose contrast was measured against `surface`. Drop either
 * onto a filled card, a glass panel, or artwork and the ground underneath
 * changes the fill, the label, or both — and the guarantee that made it
 * readable was never about that ground.
 *
 * So V4 badges **own their ground**:
 *
 * - `solid` fills with the tone and labels with its guaranteed on-pair. (The
 *   base web badge painted `bg-primary-50 text-primary` here — a soft tint
 *   wearing the solid name, and a different badge from its native twin. V4
 *   makes solid actually solid, and the two twins finally agree.)
 * - `soft` composites the tint into `surface` **opaquely** with `color-mix`,
 *   so it is a real colour rather than a translucent one borrowing whatever is
 *   behind it.
 * - `outline` keeps its ring and paints `surface` behind it, so the label has
 *   the ground its contrast was measured against.
 *
 * Shape follows the seed rather than defaulting to a capsule: a count or a
 * status dot is round by nature and keeps `radius.full`, but a text tag takes
 * `radius.sm` — so a `sharp` brand gets square tags instead of the pills
 * `design.md` §8 lists among the tells of generic AI UI.
 */
export const BadgeV4 = React.forwardRef<HTMLSpanElement, BadgeProps>(function BadgeV4(
  { className, tone = 'neutral', variant = 'solid', size = 'md', dot = false, count, max = 99, children, ...rest },
  ref
) {
  const t = TONE[tone];
  const label = count !== undefined ? (count > max ? `${max}+` : String(count)) : children;

  // A count or a dot is round by nature; a word is a tag, and takes the
  // brand's own corner instead of defaulting to a capsule (§8).
  const pill = dot || count !== undefined;

  const ground =
    variant === 'solid'
      ? cn(t.fill, t.on)
      : variant === 'soft'
        ? // Opaque, not translucent: the badge decides its own colour instead
          // of inheriting one from whatever it happens to be sitting on.
          cn(`bg-[color-mix(in_srgb,${t.mix}_14%,var(--xen-surface))]`, t.text)
        : cn('bg-surface border', t.ring, t.text);

  return (
    <span
      ref={ref}
      data-xen-v4-badge={variant}
      className={cn(
        'inline-flex items-center justify-center gap-xs text-xs font-semibold',
        pill
          ? cn('rounded-[var(--xen-radius-full)]', PILL_WIDTH[size])
          : 'rounded-[var(--xen-radius-sm)]',
        SIZE[size],
        ground,
        className
      )}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden
          className={cn('inline-block shrink-0 rounded-full', DOT_SIZE[size], DOT[tone])}
        />
      )}
      {label}
    </span>
  );
});
