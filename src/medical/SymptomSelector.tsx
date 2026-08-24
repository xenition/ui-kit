import * as React from 'react';
import { cn } from '../primitives/cn';

export interface SymptomOption {
  /** Stable identifier returned through `onChange`. */
  id: string;
  /** Human-readable symptom name. */
  label: string;
  /** Optional leading glyph/emoji. */
  glyph?: string;
}

export interface SymptomSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The selectable symptoms. */
  options: SymptomOption[];
  /** Currently selected symptom ids (controlled). */
  value: string[];
  /** Fires with the next full selection when a chip is toggled. */
  onChange: (next: string[]) => void;
  /** Optional heading above the chips. */
  title?: string;
  /** Message shown when `options` is empty. */
  emptyLabel?: string;
}

/**
 * A multi-select symptom chip grid for intake / triage flows — the web mirror
 * of the native `SymptomSelector`. Tap a chip to toggle a symptom on/off. Fully
 * controlled: `value` is the list of selected ids and `onChange` receives the
 * next list. Selected chips are marked with a check glyph as well as a filled
 * tone, so selection never relies on color alone. Each chip is a
 * `role="checkbox"` button (keyboard + `aria-checked`). Renders an empty note
 * when there are no options. Token-only colors. Informational UI only — not a
 * medical device.
 */
export const SymptomSelector = React.forwardRef<HTMLDivElement, SymptomSelectorProps>(
  function SymptomSelector(
    { options, value, onChange, title, emptyLabel = 'No symptoms to choose from', className, ...rest },
    ref
  ) {
    const selected = new Set(value);

    const toggle = (id: string): void => {
      const next = new Set(selected);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onChange(options.filter((o) => next.has(o.id)).map((o) => o.id));
    };

    return (
      <div
        ref={ref}
        data-xen-symptom-selector=""
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        {title ? <span className="text-sm font-bold text-on-surface">{title}</span> : null}

        {options.length === 0 ? (
          <span data-xen-symptom-empty="" className="text-sm text-muted">
            {emptyLabel}
          </span>
        ) : (
          <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
            {options.map((opt) => {
              const on = selected.has(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  aria-label={opt.label}
                  data-xen-symptom-chip=""
                  onClick={() => toggle(opt.id)}
                  className={cn(
                    'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                    on
                      ? 'border-primary bg-primary font-bold text-on-primary'
                      : 'border-border bg-surface font-medium text-on-surface hover:bg-neutral-100'
                  )}
                >
                  {on ? (
                    <span aria-hidden="true" className="text-xs font-bold">
                      ✓
                    </span>
                  ) : opt.glyph ? (
                    <span aria-hidden="true" className="text-sm">
                      {opt.glyph}
                    </span>
                  ) : null}
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
