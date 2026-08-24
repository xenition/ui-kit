import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

export interface AutoCompleteOption {
  label: string;
  value: string;
}

export interface AutoCompleteProps {
  /** Suggestions to filter against the typed text. */
  options: AutoCompleteOption[];
  /** Controlled input text. */
  value?: string;
  /** Fires with the new input text on every keystroke. */
  onChange?: (text: string) => void;
  /** Fires with the chosen option when a suggestion is picked. */
  onSelect?: (option: AutoCompleteOption) => void;
  placeholder?: string;
  /** Max suggestions to render (default 6). */
  maxResults?: number;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible label for the input. */
  accessibilityLabel?: string;
  className?: string;
}

/**
 * Inline autocomplete — a token-bound `<input>` with a filtered suggestion list
 * that drops in beneath it as you type. Filters `options` by label substring,
 * caps at `maxResults`, and reports text via `onChange` and the chosen row via
 * `onSelect`. Web parity of the native `AutoComplete`. No literal colors (kit
 * lint rule).
 */
export function AutoComplete({
  options,
  value = '',
  onChange,
  onSelect,
  placeholder = 'Type to search…',
  maxResults = 6,
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Autocomplete',
  className,
}: AutoCompleteProps): React.ReactElement {
  const [focused, setFocused] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(focused, () => setFocused(false));

  const matches = React.useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, maxResults);
  }, [options, value, maxResults]);

  const showList = focused && matches.length > 0;

  const choose = (opt: AutoCompleteOption): void => {
    onChange?.(opt.label);
    onSelect?.(opt);
    setFocused(false);
  };

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <input
        aria-label={accessibilityLabel}
        aria-expanded={showList}
        aria-invalid={invalid || undefined}
        role="combobox"
        aria-autocomplete="list"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        className={cn(
          'w-full bg-surface text-on-surface placeholder:text-muted',
          'border rounded-[var(--xen-radius-sm)] px-md py-sm text-base transition-colors',
          'focus:outline-none focus:ring-1',
          invalid
            ? 'border-danger focus:border-danger focus:ring-danger'
            : 'border-border focus:border-primary focus:ring-primary',
          'disabled:pointer-events-none disabled:opacity-50'
        )}
      />
      {showList ? (
        <div
          role="listbox"
          aria-label="Suggestions"
          className="absolute z-50 mt-1 max-h-[220px] w-full overflow-auto rounded-[var(--xen-radius-md)] border border-border bg-surface py-1 shadow-lg"
        >
          {matches.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.label === value}
              // Use mousedown so the input's blur doesn't close the list first.
              onMouseDown={(e) => {
                e.preventDefault();
                choose(opt);
              }}
              className="block w-full px-md py-sm text-left text-base text-on-surface transition-colors hover:bg-neutral-100"
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
