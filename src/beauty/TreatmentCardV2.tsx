import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { formatMoney as defaultFormat } from '../commerce';
import type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';

/** Same public contract as {@link TreatmentCard} — a drop-in alternate design. */
export type TreatmentCardV2Props = TreatmentCardProps;

const META: Record<TreatmentVariant, { glyph: string; label: string }> = {
  facial: { glyph: '🧖', label: 'Facial' }, massage: { glyph: '💆', label: 'Massage' }, body: { glyph: '🌿', label: 'Body' }, nails: { glyph: '💅', label: 'Nails' }, hair: { glyph: '💇', label: 'Hair' }, wellness: { glyph: '🧘', label: 'Wellness' },
};

/**
 * TreatmentCard, redesigned (v2): a **media-hero treatment card**. A tinted band
 * (or image) with the category glyph tops the name, a category·duration line, a
 * description, and a price + Book row. Elevated, hover-lift. Distinct from v1. Same
 * props, token-only.
 */
export const TreatmentCardV2 = React.forwardRef<HTMLDivElement, TreatmentCardV2Props>(function TreatmentCardV2(
  { name, priceCents, currency = 'USD', variant = 'wellness', durationMin, description, imageUrl, formatMoney, bookLabel = 'Book', onBook, onClick, className, ...rest },
  ref
) {
  const m = META[variant] ?? META.wellness;
  const fmt = formatMoney ?? defaultFormat;
  const interactive = typeof onClick === 'function';

  return (
    <div ref={ref} data-xen-treatment-card="" className={cn('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className)} {...rest}>
      <button type="button" aria-label={interactive ? `Open ${name}` : name} onClick={interactive ? () => onClick?.() : undefined} disabled={!interactive} className="relative flex h-24 items-center justify-center overflow-hidden bg-accent/10 text-4xl">
        {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : <span aria-hidden>{m.glyph}</span>}
      </button>
      <div className="flex flex-col gap-2 p-md">
        <div>
          <p className="text-base font-bold text-on-surface">{name}</p>
          <p className="text-xs text-muted">{m.label}{typeof durationMin === 'number' ? ` · ${durationMin} min` : ''}</p>
        </div>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-on-surface">{fmt(priceCents, currency)}</span>
          {onBook ? <Button size="sm" variant="primary" onClick={onBook}>{bookLabel}</Button> : null}
        </div>
      </div>
    </div>
  );
});
