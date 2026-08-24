import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import type { ServiceCardProps, ServiceCategory } from './ServiceCard';

/** Same public contract as {@link ServiceCard} — a drop-in alternate design. */
export type ServiceCardV3Props = ServiceCardProps;

const GLYPH: Record<ServiceCategory, string> = { license: '🪪', permit: '📋', tax: '🧾', records: '🗂️', benefit: '🤝', health: '⚕️', utility: '💧', other: '🏛️' };
const CHANNEL_LABEL = { online: 'Online', 'in-person': 'In person', phone: 'Phone', unavailable: 'Unavailable' } as const;

/**
 * ServiceCard, redesigned (v3): a **dense directory line**. A category glyph, the
 * title over a category·channel·time subtitle, and a compact Start — hairline-
 * bordered for a services list. The opposite of v2's card. Same props, token-only.
 */
export const ServiceCardV3 = React.forwardRef<HTMLDivElement, ServiceCardV3Props>(function ServiceCardV3(
  { category, title, description, channel, estimatedTime, actionLabel = 'Start', onStart, onClick, className, ...rest },
  ref
) {
  void description;
  const interactive = typeof onClick === 'function';
  const sub = [channel ? CHANNEL_LABEL[channel] : null, estimatedTime].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-service-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <span className="text-lg" aria-hidden>{GLYPH[category] ?? '🏛️'}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
      </div>
      {onStart ? <Button size="sm" variant="ghost" disabled={channel === 'unavailable'} onClick={(e) => { e.stopPropagation(); onStart(); }}>{actionLabel}</Button> : null}
    </div>
  );
});
