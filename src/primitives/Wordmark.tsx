import * as React from 'react';
import { cn } from './cn';

export type WordmarkSize = 'sm' | 'md' | 'lg';

export interface WordmarkProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand name rendered in the heading font. */
  name: string;
  /**
   * Leading logomark slot. Omit for the default themed token square; pass an
   * icon/SVG to override, or `null` to render the name alone.
   */
  mark?: React.ReactNode;
  /** Type + mark scale (default `md`). */
  size?: WordmarkSize;
  /** Rendered element (default `span`; `a` for a linked header brand). */
  as?: 'span' | 'a';
  /** Destination when `as="a"`. */
  href?: string;
}

const SIZE_CLASSES: Record<WordmarkSize, string> = {
  sm: 'text-base gap-[var(--xen-space-xs)]',
  md: 'text-lg gap-[var(--xen-space-sm)]',
  lg: 'text-2xl gap-[var(--xen-space-sm)]',
};

const MARK_CLASSES: Record<WordmarkSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
};

/** Themed brand wordmark — a token logomark plus the name in the heading font. */
export const Wordmark = React.forwardRef<HTMLElement, WordmarkProps>(function Wordmark(
  { name, mark, size = 'md', as: Tag = 'span', href, className, ...rest },
  ref
) {
  const defaultMark = (
    <span
      aria-hidden="true"
      data-xen-wordmark-mark=""
      className={cn(
        'inline-block shrink-0 rounded-[var(--xen-radius-sm)] bg-primary',
        MARK_CLASSES[size]
      )}
    />
  );

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-xen-wordmark=""
      href={Tag === 'a' ? href : undefined}
      className={cn(
        'inline-flex items-center font-heading font-bold leading-none text-on-surface',
        SIZE_CLASSES[size],
        className
      )}
      {...rest}
    >
      {mark === undefined ? defaultMark : mark}
      <span data-xen-wordmark-name="">{name}</span>
    </Tag>
  );
});
