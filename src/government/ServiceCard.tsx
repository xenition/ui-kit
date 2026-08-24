import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { pressableProps } from './internal/pressable';

/** Category of a public / civic service — drives the leading glyph + label. */
export type ServiceCategory =
  | 'license'
  | 'permit'
  | 'tax'
  | 'records'
  | 'benefit'
  | 'health'
  | 'utility'
  | 'other';

interface CategoryDescriptor {
  label: string;
  glyph: string;
}

const CATEGORY: Record<ServiceCategory, CategoryDescriptor> = {
  license: { label: 'Licensing', glyph: '🪪' },
  permit: { label: 'Permits', glyph: '📋' },
  tax: { label: 'Tax', glyph: '🧾' },
  records: { label: 'Records', glyph: '🗂️' },
  benefit: { label: 'Benefits', glyph: '🤝' },
  health: { label: 'Public health', glyph: '⚕️' },
  utility: { label: 'Utilities', glyph: '💧' },
  other: { label: 'Service', glyph: '🏛️' },
};

/** How the service is delivered — a non-color-alone availability hint. */
export type ServiceChannel = 'online' | 'in-person' | 'phone' | 'unavailable';

const CHANNEL: Record<ServiceChannel, { label: string; glyph: string; tone: BadgeTone }> = {
  online: { label: 'Online', glyph: '🌐', tone: 'success' },
  'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
  phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
  unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};

export interface ServiceCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Service category — picks the tinted leading glyph + category label. */
  category: ServiceCategory;
  /** Service title (e.g. "Renew driver license"). */
  title: string;
  /** Optional one-line description of what the service does. */
  description?: string;
  /** Delivery channel — rendered as a text+glyph availability badge. */
  channel?: ServiceChannel;
  /** Typical processing / turnaround time (already localized). */
  estimatedTime?: string;
  /** Label for the primary action button (only shown with `onStart`). */
  actionLabel?: string;
  /** Fires when the action button is pressed (e.g. begin the service). */
  onStart?: () => void;
  /** Fires when the whole card is clicked; card is a button only when set. */
  onClick?: () => void;
}

/**
 * A single public-service tile for a civic app home / directory. The `category`
 * selects a tinted leading glyph disc; a `channel` badge conveys availability by
 * **text + glyph + color** (never color alone). An optional primary `Button`
 * fires `onStart` (a real `<button>` that stops propagation so it never triggers
 * the card), and the whole card becomes a keyboard-operable button only when
 * `onClick` is supplied. Token-bound throughout — no literal colors. Web parity
 * of the native `ServiceCard`.
 */
export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(function ServiceCard(
  {
    category,
    title,
    description,
    channel,
    estimatedTime,
    actionLabel = 'Start',
    onStart,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const cat = CATEGORY[category] ?? CATEGORY.other;
  const ch = channel ? CHANNEL[channel] : undefined;
  const interactive = pressableProps(onClick);

  return (
    <Card
      ref={ref}
      aria-label={interactive ? `${title}, ${cat.label}` : undefined}
      className={cn(
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50">
          <Icon glyph={cat.glyph} size="xl" color="primary" aria-label={cat.label} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold text-on-surface">{title}</p>
          <p className="text-xs text-muted">{cat.label}</p>
        </div>
        {ch != null ? (
          <Badge tone={ch.tone}>
            <span aria-hidden="true">{ch.glyph}</span> {ch.label}
          </Badge>
        ) : null}
      </div>

      {description != null ? (
        <p className="mt-[var(--xen-space-sm)] text-sm text-on-surface">{description}</p>
      ) : null}

      {estimatedTime != null || onStart != null ? (
        <div className="mt-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-sm)]">
          {estimatedTime != null ? (
            <span className="text-xs text-muted">
              <span aria-hidden="true">⏱</span> {estimatedTime}
            </span>
          ) : (
            <span />
          )}
          {onStart != null ? (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onStart();
              }}
            >
              {actionLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
});
