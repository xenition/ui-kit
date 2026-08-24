import * as React from 'react';
import { cn } from '../primitives/cn';

export interface SearchHeaderProps {
  /** Current query text (controlled). */
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** Fires on submit / Enter key. */
  onSubmit?: () => void;
  /** Trailing action slot (e.g. a filter button). */
  actions?: React.ReactNode;
  /** Show a clear (×) button when there is text. */
  clearable?: boolean;
  className?: string;
}

/**
 * A search bar header: a token-bound search field with a leading glyph, an
 * optional clear button, and a trailing action slot. Token-only.
 */
export const SearchHeader = React.forwardRef<HTMLInputElement, SearchHeaderProps>(
  function SearchHeader(
    { value, onChangeText, placeholder = 'Search', onSubmit, actions, clearable = true, className },
    ref
  ) {
    return (
      <div className={cn('flex items-center gap-sm', className)}>
        <div className="flex flex-1 items-center gap-sm rounded-full border border-border bg-surface px-md">
          <span aria-hidden className="text-base text-muted">
            ⌕
          </span>
          <input
            ref={ref}
            type="search"
            aria-label={placeholder}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChangeText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSubmit?.();
            }}
            className="flex-1 bg-transparent py-sm text-base text-on-surface outline-none placeholder:text-muted"
          />
          {clearable && value.length > 0 ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onChangeText('')}
              className="text-base text-muted hover:text-on-surface"
            >
              ✕
            </button>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    );
  }
);
