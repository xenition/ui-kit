import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import type { BadgeTone } from '../primitives';
import type { FieldCardProps, FieldStatus } from './FieldCard';

/** Same public contract as {@link FieldCard} — a drop-in alternate design. */
export type FieldCardV2Props = FieldCardProps;

const STATUS: Record<FieldStatus, { label: string; tone: BadgeTone }> = {
  planted: { label: 'Planted', tone: 'success' }, fallow: { label: 'Fallow', tone: 'neutral' }, harvested: { label: 'Harvested', tone: 'primary' }, preparing: { label: 'Preparing', tone: 'warn' },
};

/**
 * FieldCard, redesigned (v2): an **elevated parcel card**. A big field glyph tile
 * leads the name and area; crop·soil·location render as tinted stat chips with a
 * status badge on the header. Distinct from v1. Same props, token-only.
 */
export const FieldCardV2 = React.forwardRef<HTMLDivElement, FieldCardV2Props>(function FieldCardV2(
  { name, area, areaUnit = 'ha', crop, soilType, location, status = 'planted', icon = '🌾', variant, onClick, className, ...rest },
  ref
) {
  void variant;
  const st = STATUS[status];
  const interactive = typeof onClick === 'function';
  const chips = [crop, soilType, location].filter((s): s is string => !!s);

  return (
    <div
      ref={ref}
      data-xen-field-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={name}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-success/10 text-2xl" aria-hidden>{icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-on-surface">{name}</p>
          {area != null ? <p className="text-xs text-muted">{area} {areaUnit}</p> : null}
        </div>
        <Badge tone={st.tone}>{st.label}</Badge>
      </div>
      {chips.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {chips.map((c, i) => <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{c}</span>)}
        </div>
      ) : null}
    </div>
  );
});
