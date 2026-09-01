import * as React from 'react';
import { cn } from '../primitives/cn';

export interface DaySegmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Segment labels, rendered left→right. */
  options: string[];
  /** Index of the currently selected segment. */
  selectedIndex: number;
  /** Fired with the tapped segment index. */
  onSelect: (index: number) => void;
}

/**
 * DaySegment — a segmented pill selector on the page surface (web parity of the
 * native `DaySegment`). An inline pill-shaped, bordered `surface` track holding
 * one `role="tab"` button per option; the selected tab fills with `primary` and
 * flips its text to `on-primary`, the rest read as `on-surface`. Every color
 * comes from `--xen-*` Tailwind classes, no literals.
 */
export const DaySegment = React.forwardRef<HTMLDivElement, DaySegmentProps>(function DaySegment(
  { options, selectedIndex, onSelect, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('inline-flex rounded-full border border-border bg-surface p-1', className)}
      {...rest}
    >
      {options.map((option, index) => {
        const selected = index === selectedIndex;
        return (
          <button
            key={`${option}-${index}`}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect(index)}
            className={cn(
              'rounded-full px-4 py-2 text-sm',
              selected ? 'bg-primary text-on-primary font-bold' : 'text-on-surface font-semibold'
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
});
