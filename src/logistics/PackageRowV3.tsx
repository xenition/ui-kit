import * as React from 'react';
import { cn } from '../primitives/cn';
import { SHIPMENT_META, formatWeight, TONE_TEXT, pressableProps } from './internal';
import type { PackageRowProps } from './PackageRow';

/** Drop-in for {@link PackageRow}: identical props, a distinct design. */
export type PackageRowV3Props = PackageRowProps;

/**
 * PackageRow, alternate design **V3** — an *ultra-dense single line*. A small
 * inline package glyph, the id, then `contents · weight · dims` collapsed into
 * one muted meta segment, and a trailing status glyph + word — all on one row
 * with no card chrome, tuned for long scannable manifests. Selection shows as a
 * leading token accent bar plus `aria-selected` (never color alone). Same props.
 */
export const PackageRowV3 = React.forwardRef<HTMLDivElement, PackageRowV3Props>(function PackageRowV3(
  {
    packageId,
    contents,
    weight,
    weightUnit = 'kg',
    dimensions,
    status,
    selected = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const meta = status ? SHIPMENT_META[status] : undefined;
  const metaLine = [contents, weight != null ? formatWeight(weight, weightUnit) : null, dimensions]
    .filter(Boolean)
    .join('  ·  ');
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `Package ${packageId}${meta ? `, ${meta.label}` : ''}` : undefined}
      aria-selected={interactive ? selected : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-xs)] py-[var(--xen-space-xs)]',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span className={cn('w-[3px] self-stretch rounded-full', selected ? 'bg-primary' : 'bg-transparent')} />
      <span aria-hidden="true" className="text-sm text-muted">
        📦
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-on-surface">{packageId}</span>
        {metaLine ? <span className="truncate text-xs text-muted">{metaLine}</span> : null}
      </div>
      {meta ? (
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className={cn('text-xs', TONE_TEXT[meta.tone])}>
            {meta.glyph}
          </span>
          <span className={cn('text-xs font-semibold', TONE_TEXT[meta.tone])}>{meta.label}</span>
        </div>
      ) : null}
    </div>
  );
});
