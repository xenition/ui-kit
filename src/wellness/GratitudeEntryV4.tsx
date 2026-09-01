import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Textarea } from '../primitives';
import { SLOT_TEXT, SLOT_TINT } from './_tokens';
import { type GratitudeEntryProps } from './GratitudeEntry';

export type GratitudeEntryV4Props = GratitudeEntryProps;

/**
 * GratitudeEntryV4 — the calm redesign of {@link GratitudeEntry}. Same props,
 * defaults, counter, remove control, empty note, and disabled-until-nonempty
 * submit. Only the visuals change: a clean surface card with recorded entries as
 * soft primary-tinted chips.
 */
export const GratitudeEntryV4 = React.forwardRef<HTMLDivElement, GratitudeEntryV4Props>(
  function GratitudeEntryV4(
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
      ...rest
    },
    ref
  ) {
    const trimmed = value.trim();
    const canSubmit = trimmed.length > 0;

    return (
      <div
        ref={ref}
        data-xen-gratitude-entry=""
        className={cn(
          'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5',
          'flex flex-col gap-[var(--xen-space-md)]',
          className
        )}
        {...rest}
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
                className={cn(
                  'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
                  SLOT_TINT.primary
                )}
              >
                <span aria-hidden="true" className={cn('text-sm', SLOT_TEXT.primary)}>
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
  }
);
