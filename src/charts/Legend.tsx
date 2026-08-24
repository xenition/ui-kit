import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, colorVar, seriesColor } from './internal';

export interface LegendItem {
  label: string;
  /** Theme color token for the swatch; defaults to the cycled series color. */
  color?: ChartColor;
  /** Opacity applied to the swatch color (for single-color series). */
  opacity?: number;
}

export interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {
  items: LegendItem[];
  /** Stack vertically instead of wrapping in a row. */
  vertical?: boolean;
}

/**
 * Chart legend — each entry is a color swatch (a theme color token, optionally
 * at reduced `opacity`, or the cycled series color) beside its `text-on-surface`
 * label. No literal colors. Guards an empty item list.
 */
export const Legend = React.forwardRef<HTMLDivElement, LegendProps>(function Legend(
  { items, vertical = false, className, ...rest },
  ref
) {
  if (items.length === 0) return <ChartEmpty />;

  return (
    <div
      ref={ref}
      className={cn('flex gap-3', vertical ? 'flex-col flex-nowrap' : 'flex-row flex-wrap', className)}
      {...rest}
    >
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color ? colorVar(item.color) : seriesColor(i), opacity: item.opacity ?? 1 }}
          />
          <span className="text-on-surface text-xs">{item.label}</span>
        </span>
      ))}
    </div>
  );
});
