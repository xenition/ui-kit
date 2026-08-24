import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import type { ServiceMenuItemProps, ServiceCategory } from './ServiceMenuItem';

/** Same public contract as {@link ServiceMenuItem} — a drop-in alternate design. */
export type ServiceMenuItemV2Props = ServiceMenuItemProps;

const META: Record<ServiceCategory, { glyph: string; label: string; text: string }> = {
  hair: { glyph: '💇', label: 'Hair', text: 'text-primary' }, nails: { glyph: '💅', label: 'Nails', text: 'text-accent' }, skin: { glyph: '✨', label: 'Skin', text: 'text-success' }, massage: { glyph: '💆', label: 'Massage', text: 'text-primary' }, makeup: { glyph: '💄', label: 'Makeup', text: 'text-danger' }, brows: { glyph: '👁️', label: 'Brows', text: 'text-accent' }, waxing: { glyph: '🕯️', label: 'Waxing', text: 'text-warn' }, spa: { glyph: '🧖', label: 'Spa', text: 'text-success' },
};

/**
 * ServiceMenuItem, redesigned (v2): an **elevated service card**. A category glyph
 * tile leads the name, a Popular flag, a description, and a duration; the price
 * (with prefix) sits prominent. Distinct from v1's row. Same props, token-only.
 */
export const ServiceMenuItemV2 = React.forwardRef<HTMLDivElement, ServiceMenuItemV2Props>(
  function ServiceMenuItemV2({ name, priceCents, currency = 'USD', category = 'spa', durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney, onClick, className, ...rest }, ref) {
    const m = META[category] ?? META.spa;
    const fmt = formatMoney ?? defaultFormat;
    const interactive = typeof onClick === 'function' && !unavailable;

    return (
      <div
        ref={ref}
        data-xen-service-menu-item=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={name}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
        className={cn('flex gap-3 rounded-lg bg-surface p-3 shadow-sm', unavailable && 'opacity-50', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
        {...rest}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-xl" aria-hidden>{m.glyph}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-on-surface">{name}</p>
            {popular ? <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent">★ Popular</span> : null}
          </div>
          {description ? <p className="truncate text-xs text-muted">{description}</p> : null}
          <p className={cn('text-xs', m.text)}>{m.label}{typeof durationMin === 'number' ? ` · ${durationMin} min` : ''}</p>
        </div>
        <div className="text-right">
          {pricePrefix ? <p className="text-[10px] text-muted">{pricePrefix}</p> : null}
          <p className="text-base font-bold text-on-surface">{fmt(priceCents, currency)}</p>
        </div>
      </div>
    );
  }
);
