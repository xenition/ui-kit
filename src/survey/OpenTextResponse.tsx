import * as React from 'react';
import { cn } from '../primitives/cn';
import { Textarea } from '../primitives';

export interface OpenTextResponseProps {
  /** Controlled text value. */
  value: string;
  /** Fires with the next text on every edit. */
  onChange: (value: string) => void;
  /** Placeholder shown when empty. */
  placeholder?: string;
  /** Optional field label above the input. */
  label?: string;
  /** Visible line count → min height (mirrors the primitive `rows`). Default 4. */
  rows?: number;
  /** Max characters; when set a live `n / max` counter is shown. */
  maxLength?: number;
  /** Force the danger border + announce the error line. */
  error?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * A free-text answer field — wraps the token `Textarea` primitive and adds a
 * survey-friendly live character counter (when `maxLength` is set) that turns to
 * the danger tone as the limit is reached, plus an optional error line. Fully
 * controlled (`value`/`onChange`). No literal colors.
 */
export const OpenTextResponse = React.forwardRef<HTMLDivElement, OpenTextResponseProps>(
  function OpenTextResponse(
    { value, onChange, placeholder, label, rows = 4, maxLength, error, disabled = false, className },
    ref
  ) {
    const atLimit = maxLength != null && value.length >= maxLength;

    return (
      <div ref={ref} className={cn('flex flex-col gap-xs', className)}>
        {label ? <label className="text-sm font-semibold text-on-surface">{label}</label> : null}
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          invalid={error != null}
          aria-label={label ?? placeholder ?? 'Your answer'}
        />

        <div className="flex items-center justify-between">
          {error ? (
            <span className="flex-1 text-sm font-semibold text-danger">{error}</span>
          ) : (
            <span className="flex-1" />
          )}
          {maxLength != null ? (
            <span className={cn('text-xs', atLimit ? 'font-bold text-danger' : 'font-normal text-muted')}>
              {value.length} / {maxLength}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);
