import * as React from 'react';
import { cn } from '../primitives/cn';
import { SHIPMENT_META, formatWeight, TONE_TEXT, TONE_SOFT_BG, TONE_SOFT_STRONG_BG, pressableProps } from './internal';
import type { PackageRowProps } from './PackageRow';

/** Drop-in for {@link PackageRow}: identical props, a distinct design. */
export type PackageRowV2Props = PackageRowProps;

/**
 * PackageRow, alternate design **V2** — an *elevated package card*. Where the
 * classic is a flat dense row, V2 is a shadowed card: a large rounded package
 * glyph tile on the left, the id + contents stacked beside it, and the
 * weight/dimensions promoted into labelled metric pills on their own row. The
 * status is a glyph + word pill in the header corner. Selection is a full
 * primary ring plus `aria-selected`, never color alone. Same props. No literal
 * colors.
 */
export const PackageRowV2 = React.forwardRef<HTMLDivElement, PackageRowV2Props>(function PackageRowV2(
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
  const tint = meta ? TONE_SOFT_BG[meta.tone] : 'bg-neutral-100';
  const glyphText = meta ? TONE_TEXT[meta.tone] : 'text-muted';
  const hasMetrics = weight != null || dimensions;
  const interactive = pressableProps(onClick);

  const Metric = ({ label, value }: { label: string; value: string }): React.ReactElement => (
    <div className="flex flex-1 flex-col rounded-[var(--xen-radius-md)] bg-neutral-100 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
      <span className="text-xs text-muted">{label}</span>
      <span className="truncate text-sm font-bold text-on-surface">{value}</span>
    </div>
  );

  return (
    <div
      ref={ref}
      aria-label={interactive ? `Package ${packageId}${meta ? `, ${meta.label}` : ''}` : undefined}
      aria-selected={interactive ? selected : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-sm',
        selected && 'ring-2 ring-primary',
        interactive &&
          'cursor-pointer transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span
          aria-hidden="true"
          className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-lg', tint, glyphText)}
        >
          📦
        </span>

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-base font-bold text-on-surface">{packageId}</span>
          {contents ? <span className="truncate text-xs text-muted">{contents}</span> : null}
        </div>

        {meta ? (
          <span
            className={cn(
              'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold',
              TONE_SOFT_STRONG_BG[meta.tone],
              TONE_TEXT[meta.tone]
            )}
          >
            <span aria-hidden="true">{meta.glyph}</span>
            {meta.label}
          </span>
        ) : null}
      </div>

      {hasMetrics ? (
        <div className="flex gap-[var(--xen-space-sm)]">
          {weight != null ? <Metric label="Weight" value={formatWeight(weight, weightUnit)} /> : null}
          {dimensions ? <Metric label="Dimensions" value={dimensions} /> : null}
        </div>
      ) : null}
    </div>
  );
});
