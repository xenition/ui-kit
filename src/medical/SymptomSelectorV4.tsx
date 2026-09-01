import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { SymptomSelectorProps, SymptomOption } from './SymptomSelector';

/** Drop-in for {@link SymptomSelectorProps} — same props, the V4 "clinic" design. */
export type SymptomSelectorV4Props = SymptomSelectorProps;

/**
 * SymptomSelector — **V4** "clinic" design (web parity of the native V4). A
 * multi-select symptom chip grid for intake / triage flows, presented inside a
 * calm, elevated rounded card with a soft shadow. Tap a pill to toggle a
 * symptom; fully controlled via `value` + `onChange`. A selected chip reads
 * with a soft-primary → primary fill **and** a ✓ marker, so selection never
 * relies on color alone. Each chip is a `role="checkbox"` button (keyboard +
 * `aria-checked`, ≥44px tap target). Renders an empty note when there are no
 * options. Identical props/behavior to {@link SymptomSelectorProps}. All colors
 * from `--xen-*` token classes (no literals). Informational UI only — not a
 * medical device.
 */
export const SymptomSelectorV4 = React.forwardRef<HTMLDivElement, SymptomSelectorV4Props>(
  function SymptomSelectorV4(
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

    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

    return (
      <div
        ref={ref}
        data-xen-symptom-selector=""
        className={cn(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', className)}
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
                    'inline-flex min-h-[44px] items-center gap-[var(--xen-space-xs)] rounded-full border px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                    on
                      ? 'border-primary bg-primary font-bold text-on-primary'
                      : 'border-border bg-primary/10 font-medium text-on-surface hover:bg-primary/20'
                  )}
                >
                  {on ? (
                    <Icon glyph="✓" size="xs" className="font-bold text-on-primary" />
                  ) : opt.glyph ? (
                    <Icon glyph={opt.glyph} size="sm" />
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
