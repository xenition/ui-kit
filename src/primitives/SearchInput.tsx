import * as React from 'react';
import { cn } from './cn';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** Controlled query text. */
  value?: string;
  /** Fires with the new query text. */
  onChangeText?: (text: string) => void;
  /** Fires when the clear (✕) affordance is pressed. */
  onClear?: () => void;
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible label for the input. */
  accessibilityLabel?: string;
  /** Wrapper className override. */
  className?: string;
}

/**
 * Search field — a token-bound `<input>` with a leading search glyph and a
 * trailing clear (✕) button that appears once there is text. Web parity of the
 * native `SearchInput`; `invalid` swaps the border to `danger`. No literal
 * colors (kit lint rule).
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      value = '',
      onChangeText,
      onClear,
      placeholder = 'Search…',
      invalid = false,
      disabled = false,
      accessibilityLabel = 'Search',
      className,
      ...rest
    },
    ref
  ) {
    const clear = (): void => {
      onChangeText?.('');
      onClear?.();
    };

    return (
      <div
        className={cn(
          'flex w-full items-center gap-sm bg-surface',
          'border rounded-[var(--xen-radius-full)] px-md py-sm transition-colors',
          'focus-within:ring-1',
          invalid
            ? 'border-danger focus-within:border-danger focus-within:ring-danger'
            : 'border-border focus-within:border-primary focus-within:ring-primary',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
      >
        <span aria-hidden className="text-muted text-base">
          ⌕
        </span>
        <input
          ref={ref}
          type="search"
          aria-label={accessibilityLabel}
          aria-invalid={invalid || undefined}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChangeText?.(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
          {...rest}
        />
        {value.length > 0 ? (
          <button
            type="button"
            aria-label="Clear search"
            disabled={disabled}
            onClick={clear}
            className="text-muted text-base hover:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            ✕
          </button>
        ) : null}
      </div>
    );
  }
);
