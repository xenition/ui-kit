import * as React from 'react';
import { cn } from '../primitives/cn';
import type { HashtagChipProps } from './HashtagChip';

/** Drop-in for {@link HashtagChipProps} — same props, the V4 "feed" design. */
export type HashtagChipV4Props = HashtagChipProps;

const SIZE_CLASS = {
  sm: 'px-sm py-1 text-xs',
  md: 'px-md py-xs text-sm',
} as const;

/**
 * HashtagChip — **V4** "feed" design (web parity of the native V4). A rounded
 * soft-primary chip: `#tag` rendered in primary on a `bg-primary/10` tint,
 * tappable. When `active` it fills with the primary color. Same props/behavior
 * as {@link HashtagChipProps}; all colors from `--xen-*` token classes (no
 * literals). `aria-pressed` encodes the active state (not color alone).
 */
export const HashtagChipV4 = React.forwardRef<HTMLButtonElement, HashtagChipV4Props>(
  function HashtagChipV4(
    { tag, active = false, count, size = 'md', onClick, className, disabled, ...rest },
    ref
  ) {
    const bare = tag.replace(/^#/, '');
    const label = `#${bare}`;
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        aria-pressed={active}
        disabled={disabled ?? !onClick}
        onClick={onClick ? () => onClick(bare) : undefined}
        className={cn(
          'inline-flex min-h-[44px] select-none items-center gap-xs self-start rounded-full font-semibold transition-colors',
          'disabled:pointer-events-none',
          SIZE_CLASS[size],
          active ? 'bg-primary text-on-primary' : 'bg-primary/10 text-primary hover:bg-primary/20',
          className
        )}
        {...rest}
      >
        <span>{label}</span>
        {count != null ? (
          <span className={cn('font-normal', active ? 'text-on-primary' : 'text-primary/70')}>
            {String(count)}
          </span>
        ) : null}
      </button>
    );
  }
);
