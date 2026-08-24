import * as React from 'react';
import { cn } from '../primitives/cn';
import { toneFillClass, type CrmTone } from './internal';

export interface FilterTag {
  /** Stable key (returned by `onToggle`). */
  key: string;
  /** Visible label. */
  label: string;
  /** Optional count shown after the label. */
  count?: number;
}

export interface TagFilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /** Available filter chips. */
  tags: FilterTag[];
  /** Keys currently selected (controlled). */
  selected: string[];
  /** Fired with the toggled key. */
  onToggle: (key: string) => void;
  /** When set, shows a "Clear" chip while any filter is active. */
  onClear?: () => void;
  /** Selected-chip tone (default `primary`). */
  tone?: CrmTone;
  /** Placeholder when there are no tags. */
  emptyLabel?: string;
}

/**
 * Horizontally scrolling filter bar of toggleable chips (segments, tags,
 * sources). Selection state is conveyed by a filled tone **and** the chip's
 * `aria-pressed` state plus a leading ✓ glyph (not color alone). Controlled via
 * `selected` + a per-key `onToggle`; an optional `onClear` chip appears while any
 * filter is active. Guards an empty `tags` array. All colors are `--xen-*` token
 * classes.
 */
export const TagFilterBar = React.forwardRef<HTMLDivElement, TagFilterBarProps>(function TagFilterBar(
  { tags, selected, onToggle, onClear, tone = 'primary', emptyLabel = 'No filters', className, ...rest },
  ref
) {
  const hasActive = selected.length > 0;

  if (tags.length === 0) {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={emptyLabel}
        className={cn('py-[var(--xen-space-sm)] text-sm text-muted', className)}
        {...rest}
      >
        {emptyLabel}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('flex w-full items-center gap-[var(--xen-space-xs)] overflow-x-auto', className)} {...rest}>
      {tags.map((tag) => {
        const isOn = selected.includes(tag.key);
        return (
          <button
            key={tag.key}
            type="button"
            aria-pressed={isOn}
            aria-label={`Filter ${tag.label}${isOn ? ', selected' : ''}`}
            onClick={() => onToggle(tag.key)}
            className={cn(
              'inline-flex shrink-0 items-center gap-1 rounded-full border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isOn ? cn(toneFillClass(tone), 'font-bold') : 'border-border bg-neutral-100 text-on-surface font-medium'
            )}
          >
            {isOn ? (
              <span aria-hidden="true" className="text-xs font-bold">
                ✓
              </span>
            ) : null}
            <span>{tag.label}</span>
            {tag.count != null ? <span className={cn('text-xs font-semibold', isOn ? '' : 'text-muted')}>{tag.count}</span> : null}
          </button>
        );
      })}

      {onClear && hasActive ? (
        <button
          type="button"
          aria-label="Clear filters"
          onClick={onClear}
          className="shrink-0 rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-sm font-semibold text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
});
