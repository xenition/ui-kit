import * as React from 'react';
import { cn } from '../primitives/cn';

export type HashtagChipSize = 'sm' | 'md';

export interface HashtagChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Tag text — a leading `#` is added automatically if missing. */
  tag: string;
  /** Filled/primary appearance when the tag is selected/active. */
  active?: boolean;
  /** Optional post count shown after the tag (e.g. `1.2k`). */
  count?: string | number;
  size?: HashtagChipSize;
  /** Fires with the bare tag (no `#`). */
  onClick?: (tag: string) => void;
}

const SIZE_CLASS: Record<HashtagChipSize, string> = {
  sm: 'px-sm py-0.5 text-xs',
  md: 'px-sm py-xs text-sm',
};

/**
 * A clickable hashtag pill. Idle chips read primary-on-surface with a border;
 * `active` chips fill with the primary color. Composes into topic bars,
 * trending lists, and post footers. Token-only; `aria-pressed` encodes the
 * active state (not color alone).
 */
export const HashtagChip = React.forwardRef<HTMLButtonElement, HashtagChipProps>(function HashtagChip(
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
        'inline-flex select-none items-center gap-xs self-start rounded-full border font-semibold transition-colors',
        'disabled:pointer-events-none',
        SIZE_CLASS[size],
        active ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-primary',
        className
      )}
      {...rest}
    >
      <span>{label}</span>
      {count != null ? (
        <span className={cn('font-normal', active ? 'text-on-primary' : 'text-muted')}>
          {String(count)}
        </span>
      ) : null}
    </button>
  );
});
