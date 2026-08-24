import * as React from 'react';
import { cn } from '../primitives/cn';

export type CategoryChipVariant = 'solid' | 'soft' | 'outline';

export interface CategoryChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Category / section label. */
  label: string;
  /**
   * Visual weight:
   * - `solid`  — filled accent chip (default), for a hero/eyebrow.
   * - `soft`   — subtle surface chip with accent text.
   * - `outline`— bordered, transparent fill.
   */
  variant?: CategoryChipVariant;
  /** Makes the chip pressable (e.g. to open a section) — the web mirror of native `onPress`. */
  onClick?: () => void;
  /** Marks the chip as the active filter (adds an accent ring in `soft`/`outline`). */
  active?: boolean;
}

const BASE_CLASSES: Record<CategoryChipVariant, string> = {
  solid: 'bg-accent text-on-accent',
  soft: 'bg-surface text-accent',
  outline: 'border border-border bg-transparent text-accent',
};

/**
 * A small category / section label for news & blog UIs — the "Technology",
 * "Opinion", "Sport" tag above a headline. Web (React DOM) mirror of the native
 * `CategoryChip`. Three token-bound variants (`solid`/`soft`/`outline`); an
 * optional `onClick` turns it into a section filter (rendered with
 * `role="button"` + keyboard activation). All colors from `--xen-*` tokens.
 */
export const CategoryChip = React.forwardRef<HTMLSpanElement, CategoryChipProps>(
  function CategoryChip({ label, variant = 'solid', onClick, active = false, className, ...rest }, ref) {
    const interactive = !!onClick;
    return (
      <span
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Category ${label}` : undefined}
        aria-pressed={interactive ? active : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          'inline-flex select-none self-start rounded-[var(--xen-radius-sm)] px-[var(--xen-space-sm)] py-[3px]',
          'text-xs font-bold uppercase tracking-wide',
          BASE_CLASSES[variant],
          active && variant !== 'solid' && 'border border-accent',
          interactive && 'cursor-pointer',
          className
        )}
        {...rest}
      >
        {label}
      </span>
    );
  }
);
