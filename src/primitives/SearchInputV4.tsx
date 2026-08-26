import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from './internal/v4-state';
import { cn } from './cn';
import type { SearchInputProps } from './SearchInput';
import { FIELD_CLASS, PICKER_V4_CSS } from './internal/picker-v4';

export type { SearchInputProps as SearchInputV4Props };

/**
 * **V4 search field** — the web twin of `SearchInputV4`, the same props as
 * {@link SearchInput}, a different design line.
 *
 * ## It looks like the other fields, and that is the point
 *
 * The base is a pill: `rounded-[var(--xen-radius-full)]`, `py-sm`. A pill is a
 * perfectly good search affordance on a toolbar — but a search field is most
 * often a field in a form, sitting under a label and above two `InputV4`s, and
 * there it reads as a foreign object. §16 asks for forms that are minimal, and
 * a form built from three different field shapes is not minimal however few
 * questions it asks.
 *
 * So V4 takes `InputV4`'s treatment exactly: the same `--xen-space-2xl` minimum
 * height, the same `md` radius, and the same `box-shadow` halo — armed here on
 * `:focus-within`, since the ring belongs to the row and the caret is in the
 * `<input>` inside it. The leading ⌕ is what says "search"; the shape does not
 * have to.
 *
 * ## The clear button is the fix nobody sees
 *
 * The base's ✕ is a bare glyph with no padding at all — a ~16px target inside a
 * field, next to the text you are trying to select. Miss it and you put the
 * caret somewhere instead. Here it keeps its drawn size (a 48px ✕ inside a 48px
 * field would be absurd) and gains an invisible `--xen-space-2xl` target
 * through `data-xen-v4-hit`, a centred pseudo-element that is out of flow and
 * costs no layout. It is the web's `hitSlop`.
 *
 * It is announced as "Clear search" and only exists when there is something to
 * clear, so the row never carries a dead affordance.
 */
export const SearchInputV4 = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInputV4(
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
    injectStyleOnce('xen-v4-picker-styles', PICKER_V4_CSS);
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const clear = (): void => {
      onChangeText?.('');
      onClear?.();
    };

    return (
      <div
        data-xen-v4-field={invalid ? 'invalid' : ''}
        className={cn(FIELD_CLASS, disabled && 'pointer-events-none opacity-[0.38]', className)}
        style={
          {
            '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
          } as React.CSSProperties
        }
      >
        <span aria-hidden="true" className="text-base text-muted-text">
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
          className={cn(
            'min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted-text',
            'focus:outline-none [&::-webkit-search-cancel-button]:appearance-none'
          )}
          {...rest}
        />
        {value.length > 0 ? (
          <button
            type="button"
            aria-label="Clear search"
            disabled={disabled}
            onClick={clear}
            data-xen-v4-hit=""
            data-xen-v4-state=""
            className="shrink-0 rounded-[var(--xen-radius-full)] text-base text-muted-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ✕
          </button>
        ) : null}
      </div>
    );
  }
);
