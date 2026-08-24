import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconSize } from '../primitives';

export interface StarButtonProps {
  /** Controlled starred state. */
  starred?: boolean;
  /** Fires with the next starred value when clicked. */
  onToggle?: (starred: boolean) => void;
  /** Glyph size (typography scale key or raw px). Default `'lg'`. */
  size?: IconSize | number;
  /** Block interaction and dim. */
  disabled?: boolean;
  className?: string;
}

/**
 * A star / flag toggle for a mail item. Filled (warn accent) when `starred`,
 * hollow + muted otherwise. Renders a real `<button>` whose accessible label
 * announces the state in words ("Starred" / "Not starred") — plus `aria-pressed`
 * — so the toggle is never conveyed by color alone. Controlled via
 * `starred` / `onToggle`. Token classes only — no literal colors.
 */
export const StarButton = React.forwardRef<HTMLButtonElement, StarButtonProps>(
  function StarButton({ starred = false, onToggle, size = 'lg', disabled = false, className }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={starred ? 'Starred' : 'Not starred'}
        aria-pressed={starred}
        disabled={disabled}
        onClick={() => onToggle?.(!starred)}
        className={cn(
          'inline-flex items-center justify-center rounded-[var(--xen-radius-sm)] p-[var(--xen-space-xs)] transition-opacity',
          'hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
      >
        <Icon glyph={starred ? '★' : '☆'} size={size} color={starred ? 'warn' : 'muted'} />
      </button>
    );
  }
);
