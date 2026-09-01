import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import type { BentoGridProps, BentoCardProps } from './Bento';

/** Drop-in for {@link BentoGridProps} — same props, the V4 "showcase" design. */
export type BentoGridV4Props = BentoGridProps;

/** Drop-in for {@link BentoCardProps} — same props, the V4 "showcase" design. */
export type BentoCardV4Props = BentoCardProps;

/**
 * The V4 "showcase" bento is image-forward: cards are clean, elevated rounded
 * surfaces (no brand gradient ground) that keep the base's asymmetric span
 * geometry as custom properties. A `featured` card (declared via `data-featured`,
 * which the base's `wash`/hover-glow slot maps onto) reads as a soft-primary
 * tint + primary ring instead of an energy wash. Spans still travel as custom
 * properties consumed only inside the media queries, so the grid degrades to
 * 1 → 2 → N columns. Token-only.
 */
const BENTO_V4_CSS = `
[data-xen-bento-grid-v4] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--xen-space-lg);
}
[data-xen-bento-card-v4] {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--xen-space-sm);
  padding: var(--xen-space-lg);
  border-radius: var(--xen-radius-lg);
  background-color: var(--xen-surface);
  border: 1px solid var(--xen-border);
  box-shadow: 0 1px 2px 0 color-mix(in srgb, var(--xen-on-surface) 6%, transparent);
  transition: box-shadow 300ms ease;
}
[data-xen-bento-card-v4]:hover {
  box-shadow: 0 8px 24px -12px color-mix(in srgb, var(--xen-on-surface) 22%, transparent);
}
[data-xen-bento-card-v4][data-featured="true"] {
  background-color: color-mix(in srgb, var(--xen-primary) 6%, var(--xen-surface));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--xen-primary) 55%, transparent);
}
[data-xen-bento-media-v4] {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 7rem;
  border-radius: var(--xen-radius-md);
  background-color: color-mix(in srgb, var(--xen-primary) 8%, var(--xen-surface));
  color: var(--xen-primary);
  overflow: hidden;
}
[data-xen-bento-icon-v4] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--xen-radius-md);
  background-color: color-mix(in srgb, var(--xen-primary) 12%, transparent);
  color: var(--xen-primary);
}
[data-xen-bento-metric-v4] {
  border-radius: 9999px;
  background-color: color-mix(in srgb, var(--xen-primary) 12%, transparent);
  color: var(--xen-primary);
}
@media (min-width: 768px) {
  [data-xen-bento-grid-v4] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  [data-xen-bento-grid-v4] { grid-template-columns: repeat(var(--xen-bento-cols, 6), minmax(0, 1fr)); }
  [data-xen-bento-card-v4] {
    grid-column: span var(--xen-bento-span, 2) / span var(--xen-bento-span, 2);
    grid-row: span var(--xen-bento-row, 1) / span var(--xen-bento-row, 1);
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-bento-card-v4] { transition: none; }
}
`;

/**
 * BentoGrid — **V4** "showcase" design (web parity of the native V4). The same
 * asymmetric 6-column bento canvas as the base `BentoGrid` where cards declare
 * their own spans, re-skinned for the image-forward showcase look: cards are
 * clean elevated surfaces on the page ground rather than the base's hover-glow
 * panels. Same props/behavior as {@link BentoGridProps} (`columns` drives the
 * `lg` grid). Token-only colors, no literals.
 */
export const BentoGridV4 = React.forwardRef<HTMLDivElement, BentoGridV4Props>(function BentoGridV4(
  { columns = 6, className, style, children, ...rest },
  ref
) {
  injectStyleOnce('xen-bento-v4-styles', BENTO_V4_CSS);
  return (
    <div
      ref={ref}
      data-xen-bento-grid-v4=""
      className={cn(className)}
      style={{ ['--xen-bento-cols' as string]: columns, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
});

/**
 * BentoCard — **V4** "showcase" design (web parity of the native V4). One bento
 * cell re-skinned as an elevated rounded showcase card: a floating soft-primary
 * media well carrying the `visual` (or an icon glyph placeholder when empty), a
 * soft-primary metric chip, an extra-bold tight-tracked title, muted body copy,
 * and a pinned detail line. The base's hover energy `wash` is repurposed as a
 * "featured" flag: `wash` cards get a soft-primary tint + primary ring (not a
 * full brand gradient). Honors `span`/`rowSpan` (grid geometry), `icon`,
 * `metric`, `title`, `visual`, `detail`. Same props/behavior as
 * {@link BentoCardProps}; token-only colors, no literals.
 */
export const BentoCardV4 = React.forwardRef<HTMLElement, BentoCardV4Props>(function BentoCardV4(
  {
    span = 2,
    rowSpan = 1,
    icon,
    metric,
    title,
    visual,
    detail,
    wash = false,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  injectStyleOnce('xen-bento-v4-styles', BENTO_V4_CSS);
  return (
    <article
      ref={ref as React.Ref<HTMLElement>}
      data-xen-bento-card-v4=""
      data-featured={wash ? 'true' : 'false'}
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
          {icon !== undefined ? <span data-xen-bento-icon-v4="">{icon}</span> : <span />}
          {metric !== undefined ? (
            <span data-xen-bento-metric-v4="" className="px-3 py-1 font-heading text-xs font-bold">
              {metric}
            </span>
          ) : null}
        </div>
      ) : null}
      {/* Floating media well — carries the visual, or a soft-primary glyph placeholder. */}
      <div data-xen-bento-media-v4="" className="mb-[var(--xen-space-xs)]">
        {visual !== undefined ? (
          <div className="h-full w-full">{visual}</div>
        ) : (
          <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        )}
      </div>
      {title !== undefined ? (
        <h3 className="font-heading text-xl font-extrabold leading-tight tracking-tight text-on-surface">
          {title}
        </h3>
      ) : null}
      {children !== undefined ? (
        <div className="max-w-md text-sm leading-relaxed text-muted">{children}</div>
      ) : null}
      {detail !== undefined ? (
        <p className="mt-auto text-xs font-medium text-primary">{detail}</p>
      ) : null}
    </article>
  );
});
