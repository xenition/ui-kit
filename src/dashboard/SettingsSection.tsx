import * as React from 'react';
import { cn } from '../primitives/cn';

export interface SettingsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional group heading rendered above the grouped rows. */
  title?: string;
  /** Optional footnote rendered under the group. */
  footnote?: string;
  /** {@link SettingsRow}s (or any rows) — hairline dividers are drawn between. */
  children: React.ReactNode;
}

/**
 * Groups {@link SettingsRow}s into a titled, bordered card with hairline
 * dividers between rows — the grouped-list section. Token-only.
 */
export const SettingsSection = React.forwardRef<HTMLDivElement, SettingsSectionProps>(
  function SettingsSection({ title, footnote, children, className, ...rest }, ref) {
    const rows = React.Children.toArray(children).filter(Boolean);
    return (
      <div ref={ref} className={cn('flex flex-col gap-xs', className)} {...rest}>
        {title ? (
          <span className="px-sm text-xs font-semibold uppercase text-muted">{title}</span>
        ) : null}
        <div className="overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface">
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <div className="h-px bg-border" /> : null}
              {row}
            </React.Fragment>
          ))}
        </div>
        {footnote ? <span className="px-sm text-xs text-muted">{footnote}</span> : null}
      </div>
    );
  }
);
