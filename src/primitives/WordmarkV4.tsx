import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import type { WordmarkProps, WordmarkSize } from './Wordmark';

export type { WordmarkProps as WordmarkV4Props, WordmarkSize };

/**
 * The touch target and the focus ring both need selectors a utility class
 * cannot express. `44px` is the platform minimum — a property of fingers, not
 * of the seed — and every colour here is a `--xen-*` custom property.
 */
const WORDMARK_V4_CSS = `
[data-xen-v4-wordmark] { position: relative; }
a[data-xen-v4-wordmark]::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 44px;
  transform: translateY(-50%);
}
a[data-xen-v4-wordmark]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 4px;
  border-radius: var(--xen-radius-sm);
}
`;

/** The same steps the native twin reads out of `typography.scale`. */
const NAME: Record<WordmarkSize, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
};

/** From the spacing scale, not from Tailwind's `h-4` / `h-5` / `h-7`. */
const MARK: Record<WordmarkSize, string> = {
  sm: 'h-md w-md',
  md: 'h-[calc(var(--xen-space-md)_+_var(--xen-space-xs))] w-[calc(var(--xen-space-md)_+_var(--xen-space-xs))]',
  lg: 'h-[calc(var(--xen-space-lg)_+_var(--xen-space-xs))] w-[calc(var(--xen-space-lg)_+_var(--xen-space-xs))]',
};

const MONOGRAM: Record<WordmarkSize, string> = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm',
};

const GAP: Record<WordmarkSize, string> = {
  sm: 'gap-xs',
  md: 'gap-sm',
  lg: 'gap-sm',
};

/**
 * **V4 wordmark** — the web twin of the native `WordmarkV4`, same props as
 * {@link Wordmark}, a different design line.
 *
 * The wordmark is the one string in a product that has to be recognised rather
 * than read, which makes it the place where a kit's restraint shows first.
 *
 * 1. **The mark is a monogram, not a blank swatch.** The base drew a solid
 *    `bg-primary` rounded square — "an icon inside a coloured rounded square"
 *    is the fourth entry on §8's list of generic-AI-UI tells, and this one did
 *    not even have the icon. V4 sets the brand's own initial in it, in the
 *    heading face on the guaranteed `on-primary` pair, so the placeholder
 *    reads as a logo instead of as a missing one. A caller with real artwork
 *    still passes `mark`; `mark={null}` still renders the name alone.
 * 2. **The scales own the sizes.** `h-4 / h-5 / h-7` is Tailwind's rhythm, not
 *    the seed's; the mark now comes from `spacing`, so a seed with a different
 *    rhythm moves the wordmark with it — and the two twins cannot drift apart,
 *    because they are reading the same numbers.
 * 3. **A linked wordmark is a real target.** `as="a"` produced a hit area as
 *    tall as the type — about 20px at `sm`. The header brand is a navigation
 *    control: it gets the 44px a finger needs, laid over the row rather than
 *    inflating the mark, plus the focus ring a keyboard user needs to see that
 *    it is reachable at all.
 *
 * No gradient and no shadow. The brand mark is exactly where a lazy kit puts a
 * sweep, and §35.11 keeps those for the hero and the one primary action — a
 * logo that shimmers is a logo competing with the page it sits on.
 */
export const WordmarkV4 = React.forwardRef<HTMLElement, WordmarkProps>(function WordmarkV4(
  { name, mark, size = 'md', as: Tag = 'span', href, className, ...rest },
  ref
) {
  injectStyleOnce('xen-v4-wordmark-styles', WORDMARK_V4_CSS);
  const initial = name.trim().charAt(0).toUpperCase();

  const defaultMark = (
    <span
      aria-hidden="true"
      data-xen-v4-wordmark-mark=""
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)]',
        'bg-primary font-heading font-bold text-on-primary',
        MARK[size],
        MONOGRAM[size]
      )}
    >
      {initial}
    </span>
  );

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-xen-v4-wordmark=""
      href={Tag === 'a' ? href : undefined}
      className={cn(
        'inline-flex items-center font-heading font-bold leading-none text-on-surface',
        'focus-visible:outline-none',
        NAME[size],
        GAP[size],
        className
      )}
      {...rest}
    >
      {mark === undefined ? defaultMark : mark}
      <span data-xen-v4-wordmark-name="">{name}</span>
    </Tag>
  );
});
