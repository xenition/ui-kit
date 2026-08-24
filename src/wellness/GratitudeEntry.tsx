import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Textarea } from '../primitives';
import { CARD_SHELL } from './_tokens';

export interface GratitudeItem {
  /** Stable id. */
  id: string;
  /** The gratitude text. */
  text: string;
}

export interface GratitudeEntryProps {
  /** Heading prompt. Default "What are you grateful for?". */
  prompt?: string;
  /** Controlled draft text. */
  value?: string;
  /** Placeholder for the input. */
  placeholder?: string;
  /** Already-recorded entries (rendered as a chip list above the input). */
  entries?: GratitudeItem[];
  /** Max characters allowed; shows a live counter when set. */
  maxLength?: number;
  /** Fires as the draft changes. */
  onChangeText?: (text: string) => void;
  /** Fires with the trimmed draft when submitted. */
  onSubmit?: (text: string) => void;
  /** Fires when an existing entry's remove control is tapped. */
  onRemove?: (id: string) => void;
  /** Submit button label. Default "Add". */
  submitLabel?: string;
  /** Empty-list note. Default "No entries yet — add your first.". */
  emptyLabel?: string;
  className?: string;
}

/**
 * A gratitude journal entry block (web parity of the native block): a prompt,
 * any existing entries as removable chips (or an empty note), a multi-line input
 * with an optional character counter, and a submit action disabled until the
 * draft is non-empty. `onSubmit` receives the trimmed text. Token-only colors.
 */
export const GratitudeEntry = React.forwardRef<HTMLDivElement, GratitudeEntryProps>(function GratitudeEntry(
  {
    prompt = 'What are you grateful for?',
    value = '',
    placeholder = 'I’m grateful for…',
    entries = [],
    maxLength,
    onChangeText,
    onSubmit,
    onRemove,
    submitLabel = 'Add',
    emptyLabel = 'No entries yet — add your first.',
    className,
  },
  ref
) {
  const trimmed = value.trim();
  const canSubmit = trimmed.length > 0;

  return (
    <div
      ref={ref}
      data-xen-gratitude-entry=""
      className={cn(CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span aria-hidden="true" className="text-lg">
          🙏
        </span>
        <p className="flex-1 text-lg font-bold text-on-surface">{prompt}</p>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-muted">{emptyLabel}</p>
      ) : (
        <ul className="flex list-none flex-col gap-[var(--xen-space-xs)]">
          {entries.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]"
            >
              <span aria-hidden="true" className="text-sm text-primary">
                ✦
              </span>
              <span className="flex-1 text-sm text-on-surface">{item.text}</span>
              {onRemove ? (
                <button
                  type="button"
                  aria-label={`Remove: ${item.text}`}
                  onClick={() => onRemove(item.id)}
                  className="text-base text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                >
                  ✕
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <Textarea
        rows={3}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChangeText?.(e.target.value)}
        placeholder={placeholder}
        aria-label="Gratitude entry"
      />

      <div className="flex items-center justify-between">
        {maxLength != null ? (
          <span className="text-xs text-muted">
            {value.length}/{maxLength}
          </span>
        ) : (
          <span />
        )}
        {onSubmit ? (
          <Button variant="primary" disabled={!canSubmit} onClick={() => canSubmit && onSubmit(trimmed)}>
            {submitLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
