import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import type { ServiceCardProps, ServiceCategory, ServiceChannel } from './ServiceCard';

/** Same public contract as {@link ServiceCard} — a drop-in alternate design. */
export type ServiceCardV2Props = ServiceCardProps;

const CATEGORY: Record<ServiceCategory, { glyph: string; label: string }> = {
  license: { glyph: '🪪', label: 'Licensing' }, permit: { glyph: '📋', label: 'Permits' }, tax: { glyph: '🧾', label: 'Tax' }, records: { glyph: '🗂️', label: 'Records' }, benefit: { glyph: '🤝', label: 'Benefits' }, health: { glyph: '⚕️', label: 'Public health' }, utility: { glyph: '💧', label: 'Utilities' }, other: { glyph: '🏛️', label: 'Service' },
};
const CHANNEL: Record<ServiceChannel, { label: string; tone: BadgeTone }> = {
  online: { label: '🌐 Online', tone: 'success' }, 'in-person': { label: '🏢 In person', tone: 'primary' }, phone: { label: '📞 Phone', tone: 'accent' }, unavailable: { label: 'Unavailable', tone: 'neutral' },
};

/**
 * ServiceCard, redesigned (v2): an **elevated service card**. A tinted category
 * glyph tile leads the title and description; a channel badge and estimated time
 * follow, with a full-width Start CTA. Distinct from v1. Same props, token-only.
 */
export const ServiceCardV2 = React.forwardRef<HTMLDivElement, ServiceCardV2Props>(function ServiceCardV2(
  { category, title, description, channel, estimatedTime, actionLabel = 'Start', onStart, onClick, className, ...rest },
  ref
) {
  const c = CATEGORY[category] ?? CATEGORY.other;
  const ch = channel ? CHANNEL[channel] : undefined;
  const interactive = typeof onClick === 'function';

  return (
    <div
      ref={ref}
      data-xen-service-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-2xl" aria-hidden>{c.glyph}</span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-on-surface">{title}</p>
          <p className="text-xs text-muted">{c.label}{estimatedTime ? ` · ${estimatedTime}` : ''}</p>
          {description ? <p className="mt-0.5 text-sm text-muted">{description}</p> : null}
        </div>
        {ch ? <Badge tone={ch.tone}>{ch.label}</Badge> : null}
      </div>
      {onStart ? <Button size="md" variant="primary" className="w-full" disabled={channel === 'unavailable'} onClick={(e) => { e.stopPropagation(); onStart(); }}>{actionLabel}</Button> : null}
    </div>
  );
});
