import * as React from 'react';
import { cn } from '../primitives/cn';
import type { FieldCardProps, FieldStatus } from './FieldCard';

/** Same public contract as {@link FieldCard} — a drop-in alternate design. */
export type FieldCardV3Props = FieldCardProps;

const STATUS_DOT: Record<FieldStatus, string> = { planted: 'bg-success', fallow: 'bg-neutral-400', harvested: 'bg-primary', preparing: 'bg-warn' };
const STATUS_LABEL: Record<FieldStatus, string> = { planted: 'Planted', fallow: 'Fallow', harvested: 'Harvested', preparing: 'Preparing' };

/**
 * FieldCard, redesigned (v3): a **dense parcel line**. The glyph leads, the name
 * (+ area) over a status·crop·soil·location subtitle with a status dot — hairline-
 * bordered for a fields list. The opposite of v2's card. Status is dot + word,
 * never color alone. Same props, token-only.
 */
export const FieldCardV3 = React.forwardRef<HTMLDivElement, FieldCardV3Props>(function FieldCardV3(
  { name, area, areaUnit = 'ha', crop, soilType, location, status = 'planted', icon = '🌾', variant, onClick, className, ...rest },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  const sub = [STATUS_LABEL[status], crop, soilType, location].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-field-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={name}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <span className={cn('inline-block h-2.5 w-2.5 shrink-0 rounded-full', STATUS_DOT[status])} aria-hidden />
      <span className="text-lg" aria-hidden>{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">
          {name}
          {area != null ? <span className="ml-1.5 text-xs font-normal text-muted">{area} {areaUnit}</span> : null}
        </p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
      </div>
    </div>
  );
});
