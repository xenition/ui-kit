import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';

export type GlassIntensity = 'soft' | 'regular' | 'strong';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * How opaque the panel reads: `soft` (45% surface) melts into backgrounds,
   * `regular` (65%, default) is the workhorse card, `strong` (82%) sits over
   * busy art like particle fields or auroras.
   */
  intensity?: GlassIntensity;
  /** Draw the translucent token border (default true). */
  bordered?: boolean;
}

/**
 * The glass recipe is `color-mix` over the semantic `surface`/`border` slots
 * — not a fixed neutral step — so the same panel is frosted-white in light
 * mode and smoked-charcoal in dark mode with zero configuration.
 */
const GLASS_CSS = `
[data-xen-glass] {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
[data-xen-glass="soft"] { background-color: color-mix(in srgb, var(--xen-surface) 45%, transparent); }
[data-xen-glass="regular"] { background-color: color-mix(in srgb, var(--xen-surface) 65%, transparent); }
[data-xen-glass="strong"] { background-color: color-mix(in srgb, var(--xen-surface) 82%, transparent); }
[data-xen-glass][data-bordered="true"] { border: 1px solid color-mix(in srgb, var(--xen-border) 60%, transparent); }
`;

/**
 * Translucent blurred surface — the "glass card/panel" treatment the SaaS
 * template hand-rolled. Token-pure (`color-mix` over `surface` + `border`),
 * theme-agnostic, and static (no motion to reduce). Compose it under
 * `ProductMock`, over `AuroraBackground`, or as a floating chrome bar.
 */
export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(function GlassPanel(
  { intensity = 'regular', bordered = true, className, children, ...rest },
  ref
) {
  injectStyleOnce('xen-glass-styles', GLASS_CSS);
  return (
    <div
      ref={ref}
      data-xen-glass={intensity}
      data-bordered={bordered ? 'true' : 'false'}
      className={cn('rounded-lg', className)}
      {...rest}
    >
      {children}
    </div>
  );
});
