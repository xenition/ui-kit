import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column count at the `lg` breakpoint (default 6 — spans of 2/4 make the classic bento). */
  columns?: number;
}

export interface BentoCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Column span at `lg` (default 2). Mix 4s and 2s for asymmetry. */
  span?: number;
  /** Row span at `lg` (default 1). */
  rowSpan?: number;
  /** Icon slot, rendered in a ramp-gradient tile. */
  icon?: React.ReactNode;
  /** Small stat chip in the top-right corner (e.g. "38ms p99"). */
  metric?: React.ReactNode;
  /** Card title. */
  title?: React.ReactNode;
  /**
   * Micro-visual slot below the body — a mini `ProductMock` chart, a
   * `ParticleField`, an equalizer… whatever sells the card.
   */
  visual?: React.ReactNode;
  /** Small emphasized footer line pinned to the bottom. */
  detail?: React.ReactNode;
  /** Radial "energy wash" that fades in from the top corner on hover (default true). */
  wash?: boolean;
}

/**
 * Card surface, borders, hover glow, and the energy wash are all `color-mix`
 * over tokens. Spans travel as custom properties consumed only inside the
 * media queries, so the grid degrades to 1 → 2 → N columns.
 */
const BENTO_CSS = `
[data-xen-bento-grid] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--xen-space-md);
}
[data-xen-bento-card] {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--xen-space-sm);
  padding: var(--xen-space-lg);
  border-radius: var(--xen-radius-lg);
  background-color: color-mix(in srgb, var(--xen-surface) 94%, var(--xen-on-surface) 6%);
  border: 1px solid color-mix(in srgb, var(--xen-border) 60%, transparent);
  transition: box-shadow 500ms ease;
}
[data-xen-bento-card]:hover {
  box-shadow: 0 0 90px -30px color-mix(in srgb, var(--xen-primary-600) 45%, transparent);
}
[data-xen-bento-card][data-wash="true"]::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 500ms ease;
  background-image: radial-gradient(420px circle at 20% 0%, color-mix(in srgb, var(--xen-primary-500) 14%, transparent), transparent 70%);
}
[data-xen-bento-card][data-wash="true"]:hover::after { opacity: 1; }
[data-xen-bento-icon] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--xen-radius-md);
  background-image: linear-gradient(135deg, var(--xen-primary-600), var(--xen-accent-600));
  color: var(--xen-on-primary);
}
[data-xen-bento-metric] {
  border: 1px solid color-mix(in srgb, var(--xen-accent) 35%, transparent);
  background-color: color-mix(in srgb, var(--xen-accent) 10%, transparent);
  color: var(--xen-accent);
  border-radius: 9999px;
}
@media (min-width: 768px) {
  [data-xen-bento-grid] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  [data-xen-bento-grid] { grid-template-columns: repeat(var(--xen-bento-cols, 6), minmax(0, 1fr)); }
  [data-xen-bento-card] {
    grid-column: span var(--xen-bento-span, 2) / span var(--xen-bento-span, 2);
    grid-row: span var(--xen-bento-row, 1) / span var(--xen-bento-row, 1);
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-bento-card], [data-xen-bento-card]::after { transition: none; }
}
`;

/**
 * Asymmetric bento feature grid generalized from the SaaS template: a
 * 6-column canvas where cards declare their own spans (4/2 over 2/4 is the
 * signature rhythm). Pure composition — wrap cards in `Reveal`/`Stagger`
 * for the cascade.
 */
export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(function BentoGrid(
  { columns = 6, className, style, children, ...rest },
  ref
) {
  injectStyleOnce('xen-bento-styles', BENTO_CSS);
  return (
    <div
      ref={ref}
      data-xen-bento-grid=""
      className={cn(className)}
      style={{ ['--xen-bento-cols' as string]: columns, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
});

/**
 * One bento cell: icon tile + metric chip header, title, body (children), an
 * optional micro-visual slot, and a pinned detail line — with a token-mixed
 * hover energy wash. All slots optional; an empty card is a styled panel.
 */
export const BentoCard = React.forwardRef<HTMLElement, BentoCardProps>(function BentoCard(
  {
    span = 2,
    rowSpan = 1,
    icon,
    metric,
    title,
    visual,
    detail,
    wash = true,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  injectStyleOnce('xen-bento-styles', BENTO_CSS);
  return (
    <article
      ref={ref as React.Ref<HTMLElement>}
      data-xen-bento-card=""
      data-wash={wash ? 'true' : 'false'}
      className={cn('group', className)}
      style={{
        ['--xen-bento-span' as string]: span,
        ['--xen-bento-row' as string]: rowSpan,
        ...style,
      }}
      {...rest}
    >
      {icon !== undefined || metric !== undefined ? (
        <div className="flex items-center justify-between">
          {icon !== undefined ? <span data-xen-bento-icon="">{icon}</span> : <span />}
          {metric !== undefined ? (
            <span
              data-xen-bento-metric=""
              className="px-3 py-1 font-heading text-xs font-bold"
            >
              {metric}
            </span>
          ) : null}
        </div>
      ) : null}
      {title !== undefined ? (
        <h3 className="font-heading text-xl font-bold tracking-tight text-on-surface">
          {title}
        </h3>
      ) : null}
      {children !== undefined ? (
        <div className="max-w-md text-sm leading-relaxed text-muted">{children}</div>
      ) : null}
      {visual !== undefined ? <div data-xen-bento-visual="">{visual}</div> : null}
      {detail !== undefined ? (
        <p className="mt-auto text-xs font-medium text-primary">{detail}</p>
      ) : null}
    </article>
  );
});
