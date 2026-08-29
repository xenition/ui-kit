import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { resolveIconGlyph } from './icon-names';
import type { TagProps, TagSize, TagTone, TagVariant } from './Tag';

export type { TagProps as TagV4Props, TagSize, TagTone, TagVariant };

/**
 * Two things live here because neither is a utility class bound to a token: an
 * opaque `color-mix` tint that composites into `surface` rather than into
 * transparency, and a touch target that grows without growing the chip. Every
 * colour is a `--xen-*` custom property.
 */
const TAG_V4_CSS = `
[data-xen-v4-tag-x] { position: relative; line-height: 1; }
/*
  The platform minimum touch target, laid over the glyph rather than around
  it — a 44px chip is not a chip. Not a design token: it is a property of
  fingers, and it does not move when the seed does.
*/
[data-xen-v4-tag-x]::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  transform: translate(-50%, -50%);
}
[data-xen-v4-tag-x]:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: var(--xen-radius-sm);
}
`;

/**
 * Per-tone token references. `solid` fills with the tone and labels with the
 * on-pair the compiler guaranteed FOR THAT FILL; `soft` composites the same
 * accent into `surface`; `outline` paints `surface` behind its ring.
 */
const TONE: Record<TagTone, { solid: string; accent: string; text: string; ring: string }> = {
  neutral: {
    solid: 'bg-border text-on-surface',
    accent: 'var(--xen-on-surface)',
    text: 'text-on-surface',
    ring: 'border-border',
  },
  primary: {
    solid: 'bg-primary text-on-primary',
    accent: 'var(--xen-primary)',
    text: 'text-primary-text',
    ring: 'border-primary',
  },
  success: {
    solid: 'bg-success text-on-success',
    accent: 'var(--xen-success)',
    text: 'text-success-text',
    ring: 'border-success',
  },
  warn: {
    solid: 'bg-warn text-on-warn',
    accent: 'var(--xen-warn)',
    text: 'text-warn-text',
    ring: 'border-warn',
  },
  danger: {
    solid: 'bg-danger text-on-danger',
    accent: 'var(--xen-danger)',
    text: 'text-danger-text',
    ring: 'border-danger',
  },
  accent: {
    solid: 'bg-accent text-on-accent',
    accent: 'var(--xen-accent)',
    text: 'text-accent-text',
    ring: 'border-accent',
  },
};

const DOT: Record<TagTone, string> = {
  neutral: 'bg-on-surface',
  primary: 'bg-primary',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  accent: 'bg-accent',
};

/** The same rhythm as `BadgeV4` — a tag and a badge in one row should line up. */
const SIZE: Record<TagSize, string> = {
  sm: 'min-h-[calc(var(--xen-space-md)_+_var(--xen-space-xs))] px-sm',
  md: 'min-h-[var(--xen-space-lg)] px-[calc(var(--xen-space-sm)_+_var(--xen-space-xs))]',
};

const DOT_SIZE: Record<TagSize, string> = {
  sm: 'h-[calc(var(--xen-space-sm)_*_0.75)] w-[calc(var(--xen-space-sm)_*_0.75)]',
  md: 'h-[var(--xen-space-sm)] w-[var(--xen-space-sm)]',
};

/**
 * **V4 tag** — the web twin of the native `TagV4`, same props as {@link Tag},
 * a different design line.
 *
 * A tag is the badge's interactive sibling — a filter you can drop, a keyword
 * you can take off — and it inherited the badge's ground problem plus one of
 * its own.
 *
 * **The ground.** `variant="solid"` was not solid: `neutral` and `primary`
 * painted `bg-neutral-100` / `bg-primary-50`, a soft tint wearing the solid
 * name and a different tag from its native twin. `soft` mixed three tones onto
 * a neutral chip because "success/warn/danger have no `-50` ramp", so a soft
 * success and a soft neutral were the same colour. `outline` had no fill at
 * all, leaving its label's contrast measured against a page it might not be
 * on. V4 fills `solid` with the tone and its guaranteed on-pair, composites
 * `soft` into `surface` with `color-mix` so the result is an opaque colour the
 * tag owns, and paints `surface` behind `outline`.
 *
 * **The target.** The remove affordance was a bare `×` in a `<button>` with no
 * size at all — roughly 12px square, on a control whose entire purpose is
 * being clicked, and a miss on any touch screen. V4 keeps the glyph exactly as
 * small and lays a 44px target over it with a pseudo-element, so the chip looks
 * identical and stops being a miss. It also gains a visible focus ring, which
 * a keyboard user needs to know the × is reachable at all.
 *
 * The corner stays `radius.sm` — the brand's own. A tag is a word, and §8 lists
 * excessive pill-shaped controls among the tells of generic AI UI. The remove
 * glyph comes from the kit's named icon set (`close`), so it cannot drift from
 * the `×` on the next screen.
 */
export const TagV4 = React.forwardRef<HTMLSpanElement, TagProps>(function TagV4(
  {
    className,
    tone = 'neutral',
    variant = 'solid',
    size = 'md',
    removable = false,
    dot = false,
    onRemove,
    children,
    ...rest
  },
  ref
) {
  injectStyleOnce('xen-v4-tag-styles', TAG_V4_CSS);
  const t = TONE[tone];
  const showRemove = removable || onRemove != null;

  let fill: string;
  if (variant === 'solid') {
    fill = t.solid;
  } else if (variant === 'soft') {
    // Mixed into `surface`, not into `transparent` — so the fill does not
    // change when the tag moves onto a filled card or a glass panel.
    fill = cn(`bg-[color-mix(in_srgb,${t.accent}_14%,var(--xen-surface))]`, t.text);
  } else {
    fill = cn('bg-surface border', t.ring, t.text);
  }

  return (
    <span
      ref={ref}
      data-xen-v4-tag=""
      className={cn(
        'inline-flex items-center gap-xs font-body text-xs font-semibold',
        // A tag is a word, not a capsule (§8).
        'rounded-[var(--xen-radius-sm)]',
        SIZE[size],
        fill,
        className
      )}
      {...rest}
    >
      {dot ? (
        <span
          aria-hidden
          className={cn('inline-block shrink-0 rounded-full', DOT_SIZE[size], DOT[tone])}
        />
      ) : null}
      {children}
      {showRemove ? (
        <button
          type="button"
          data-xen-v4-tag-x=""
          aria-label="Remove"
          onClick={onRemove}
          className="inline-flex shrink-0 items-center justify-center"
        >
          {resolveIconGlyph('close')}
        </button>
      ) : null}
    </span>
  );
});
