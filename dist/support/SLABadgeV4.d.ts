import * as React from 'react';
import type { SLABadgeProps } from './SLABadge';
/** Drop-in for {@link SLABadgeProps} — same props, the V4 "calm console" design. */
export type SLABadgeV4Props = SLABadgeProps;
/**
 * SLABadge — **V4** "calm console" design (drop-in for {@link SLABadgeProps}). An
 * SLA status badge rendered as a soft-tint pill (`bg-<slot>/10 text-<slot>`)
 * carrying a glyph + state label and, when supplied, a big legible remaining-time
 * `hint` set in `tabular-nums`. Encodes `on-track` → success, `at-risk` → warn,
 * `breached` → danger with a distinct glyph **and** color, so the state reads
 * without relying on color (colorblind-safe / screen-reader announced). Same
 * props/behavior as the base; colors only from `--xen-*` token classes (no
 * literal hex). Presentational.
 */
export declare const SLABadgeV4: React.ForwardRefExoticComponent<SLABadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=SLABadgeV4.d.ts.map