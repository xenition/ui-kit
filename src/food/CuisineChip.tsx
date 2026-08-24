import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export type CuisineChipSize = 'sm' | 'md';

export interface CuisineChipProps {
  /** Cuisine / category label (e.g. "Thai", "Desserts"). */
  label: string;
  /** Optional leading glyph/emoji. */
  glyph?: string;
  /** Selected state — fills with the `primary` token pair. */
  selected?: boolean;
  /** Activation handler. When provided the chip is a filter toggle (native `onPress`). */
  onClick?: () => void;
  /** Disable the chip. */
  disabled?: boolean;
  /** Size (default `md`). */
  size?: CuisineChipSize;
  /** Extra classes. */
  className?: string;
}

/**
 * A pill chip for a cuisine / category filter. When `onClick` is given it is a
 * real `<button>` filter toggle whose selected state is carried in
 * `aria-pressed` (never signalled by color alone); without `onClick` it is a
 * static label. Selected chips use the `primary`/`on-primary` token pair. Web
 * parity of the native `CuisineChip`; token-only.
 */
export const CuisineChip = React.forwardRef<HTMLButtonElement | HTMLSpanElement, CuisineChipProps>(
  function CuisineChip({ label, glyph, selected = false, onClick, disabled = false, size = 'md', className }, ref) {
    const sizeClass = size === 'sm' ? 'px-[var(--xen-space-sm)] py-1 text-xs' : 'px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm';
    const chipClass = cn(
      'inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full border font-semibold',
      sizeClass,
      selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface',
      disabled && 'opacity-50',
      className
    );

    const inner = (
      <>
        {glyph ? <Icon glyph={glyph} size="xs" /> : null}
        <span>{label}</span>
      </>
    );

    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          aria-pressed={selected}
          disabled={disabled}
          onClick={onClick}
          className={cn(
            chipClass,
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            !selected && !disabled && 'hover:bg-neutral-100',
            disabled && 'pointer-events-none'
          )}
        >
          {inner}
        </button>
      );
    }

    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} className={chipClass}>
        {inner}
      </span>
    );
  }
);
