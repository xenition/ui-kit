import * as React from 'react';
import { cn } from './cn';

export interface TagInputProps {
  /** Controlled list of tokens. */
  value?: string[];
  /** Fires with the full next token list on add/remove. */
  onChange?: (value: string[]) => void;
  placeholder?: string;
  /** Reject a token that already exists (case-insensitive). Default true. */
  dedupe?: boolean;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible label for the text field. */
  accessibilityLabel?: string;
  className?: string;
}

/**
 * Free-text token input — type and press Enter to add a chip; press a chip's ✕
 * (or Backspace on the empty field) to remove one. Web parity of the native
 * `TagInput`; the wrapper border flips to `danger` when `invalid`. No literal
 * colors (kit lint rule).
 */
export function TagInput({
  value = [],
  onChange,
  placeholder = 'Add a tag…',
  dedupe = true,
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Add a tag',
  className,
}: TagInputProps): React.ReactElement {
  const [draft, setDraft] = React.useState('');

  const add = (): void => {
    const t = draft.trim();
    if (!t) return;
    if (dedupe && value.some((v) => v.toLowerCase() === t.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange?.([...value, t]);
    setDraft('');
  };

  const removeAt = (index: number): void => {
    onChange?.(value.filter((_, i) => i !== index));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add();
    } else if (e.key === 'Backspace' && draft.length === 0 && value.length > 0) {
      removeAt(value.length - 1);
    }
  };

  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center gap-xs bg-surface',
        'border rounded-[var(--xen-radius-sm)] px-md py-sm transition-colors',
        'focus-within:ring-1',
        invalid
          ? 'border-danger focus-within:border-danger focus-within:ring-danger'
          : 'border-border focus-within:border-primary focus-within:ring-primary',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      {value.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="flex items-center gap-xs rounded-[var(--xen-radius-full)] bg-accent px-sm py-0.5 text-xs text-on-accent"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            disabled={disabled}
            onClick={() => removeAt(i)}
            className="text-on-accent hover:opacity-70 focus-visible:outline-none"
          >
            ✕
          </button>
        </span>
      ))}
      <input
        aria-label={accessibilityLabel}
        value={draft}
        disabled={disabled}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
        className="min-w-[80px] flex-grow bg-transparent text-base text-on-surface placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}
