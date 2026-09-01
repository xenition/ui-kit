import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export interface WeatherDetailItem {
  /** Metric name (e.g. `'Humidity'`). */
  label: string;
  /** The metric value; a string, number, or node. */
  value: React.ReactNode;
  /** Optional unit suffix beside the value (e.g. `'%'`, `'km/h'`). */
  unit?: string;
  /** Optional leading glyph beside the label. */
  glyph?: string;
  /** Optional line beneath the label. */
  caption?: string;
}

export interface WeatherDetailGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The metric rows to render. */
  items: WeatherDetailItem[];
  /** Rows grouped per card. Default `3` (so 6 items → 2 cards). */
  perCard?: number;
}

/**
 * WeatherDetailGrid — weather detail metrics grouped into elevated cards (web
 * parity of the native `WeatherDetailGrid`). Items are chunked `perCard` at a
 * time (default 3) into clean list cards: each row is a gradient glyph badge +
 * label/caption on the left and a big value + unit on the right, separated by
 * hairline dividers. Every color comes from `--xen-*` Tailwind classes
 * (`surface`/`on-surface`/`muted`/`border`), so it adapts to light AND dark. No
 * literal colors.
 */
export const WeatherDetailGrid = React.forwardRef<HTMLDivElement, WeatherDetailGridProps>(
  function WeatherDetailGrid({ items, perCard = 3, className, ...rest }, ref) {
    const size = Math.max(1, perCard);
    const groups: WeatherDetailItem[][] = [];
    for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));

    return (
      <div ref={ref} className={cn('flex flex-col gap-3', className)} {...rest}>
        {groups.map((group, gi) => (
          <div key={gi} className="rounded-[var(--xen-radius-lg)] border border-border bg-surface px-4 shadow-md">
            {group.map((item, ri) => {
              const hasValue = item.value != null;
              return (
                <div
                  key={`${item.label}-${ri}`}
                  role="group"
                  aria-label={`${item.label}, ${hasValue ? `${item.value}${item.unit ? ' ' + item.unit : ''}` : 'no data'}`}
                  className={cn(
                    'flex flex-row items-center justify-between gap-3 py-3',
                    ri > 0 && 'border-t border-border'
                  )}
                >
                  <div className="flex min-w-0 flex-1 flex-row items-center gap-3">
                    {item.glyph ? (
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary-400 to-primary-700">
                        <Icon glyph={item.glyph} size="sm" aria-hidden color="onPrimary" />
                      </span>
                    ) : null}
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-on-surface">{item.label}</p>
                      {item.caption ? <p className="truncate text-xs text-muted">{item.caption}</p> : null}
                    </div>
                  </div>
                  <p className="flex shrink-0 flex-row items-baseline gap-1">
                    <span className="text-xl font-extrabold text-on-surface">{hasValue ? item.value : '—'}</span>
                    {item.unit && hasValue ? <span className="text-sm text-muted">{item.unit}</span> : null}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);
