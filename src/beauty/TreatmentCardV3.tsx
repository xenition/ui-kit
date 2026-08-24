import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { formatMoney as defaultFormat } from '../commerce';
import type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';

/** Same public contract as {@link TreatmentCard} — a drop-in alternate design. */
export type TreatmentCardV3Props = TreatmentCardProps;

const GLYPH: Record<TreatmentVariant, string> = { facial: '🧖', massage: '💆', body: '🌿', nails: '💅', hair: '💇', wellness: '🧘' };

/**
 * TreatmentCard, redesigned (v3): a **dense treatment row**. A category glyph tile,
 * the name over a category·duration·description line, the price, and a compact Book
 * — hairline-bordered for a menu list. The opposite of v2's media hero. Same props,
 * token-only.
 */
export const TreatmentCardV3 = React.forwardRef<HTMLDivElement, TreatmentCardV3Props>(function TreatmentCardV3(
  { name, priceCents, currency = 'USD', variant = 'wellness', durationMin, description, imageUrl, formatMoney, bookLabel = 'Book', onBook, onClick, className, ...rest },
  ref
) {
  void imageUrl;
  const fmt = formatMoney ?? defaultFormat;
  const interactive = typeof onClick === 'function';
  const sub = [typeof durationMin === 'number' ? `${durationMin} min` : null, description].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-treatment-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={name}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-lg" aria-hidden>{GLYPH[variant]}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
      </div>
      <span className="text-sm font-bold text-on-surface">{fmt(priceCents, currency)}</span>
      {onBook ? <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onBook(); }}>{bookLabel}</Button> : null}
    </div>
  );
});
