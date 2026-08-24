import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import type { ServiceMenuItemProps, ServiceCategory } from './ServiceMenuItem';

/** Same public contract as {@link ServiceMenuItem} — a drop-in alternate design. */
export type ServiceMenuItemV3Props = ServiceMenuItemProps;

const GLYPH: Record<ServiceCategory, string> = { hair: '💇', nails: '💅', skin: '✨', massage: '💆', makeup: '💄', brows: '👁️', waxing: '🕯️', spa: '🧖' };

/**
 * ServiceMenuItem, redesigned (v3): a **menu line with a dotted leader**. The glyph
 * + name sit left, a dotted rule bridges to the price on the right, and the
 * duration/description fold into a quiet subtitle — a classic price-list row. The
 * opposite of v2's card. Same props, token-only.
 */
export const ServiceMenuItemV3 = React.forwardRef<HTMLDivElement, ServiceMenuItemV3Props>(
  function ServiceMenuItemV3({ name, priceCents, currency = 'USD', category = 'spa', durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney, onClick, className, ...rest }, ref) {
    const fmt = formatMoney ?? defaultFormat;
    const interactive = typeof onClick === 'function' && !unavailable;
    const sub = [description, typeof durationMin === 'number' ? `${durationMin} min` : null].filter((s): s is string => !!s).join(' · ');

    return (
      <div
        ref={ref}
        data-xen-service-menu-item=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={name}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
        className={cn('border-b border-border py-2.5', unavailable && 'opacity-50', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
        {...rest}
      >
        <div className="flex items-baseline gap-2">
          <span aria-hidden>{GLYPH[category]}</span>
          <span className="whitespace-nowrap text-sm font-semibold text-on-surface">
            {name}
            {popular ? <span className="ml-1 text-accent">★</span> : null}
          </span>
          <span className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-border" aria-hidden />
          <span className="whitespace-nowrap text-sm font-bold text-on-surface">{pricePrefix ? `${pricePrefix} ` : ''}{fmt(priceCents, currency)}</span>
        </div>
        {sub ? <p className="mt-0.5 truncate text-xs text-muted">{sub}</p> : null}
      </div>
    );
  }
);
