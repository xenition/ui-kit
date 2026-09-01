import * as React from 'react';
import type { SLABadgeProps } from './SLABadge';
/** Drop-in for {@link SLABadgeProps} — same props, the V4 "calm console" design. */
export type SLABadgeV4Props = SLABadgeProps;
/**
 * SLABadge — **V4** "calm console" design (native twin, drop-in for
 * {@link SLABadgeProps}). An SLA status badge rendered as a soft-tint pill
 * (`withAlpha(color, 0.12)`) carrying a glyph + state label and, when supplied, a
 * big legible remaining-time `hint` in `tabular-nums`. Encodes `on-track` →
 * success, `at-risk` → warn, `breached` → danger with a distinct glyph **and**
 * color, so the state reads without relying on color (colorblind-safe /
 * screen-reader announced). Same props/behavior as the base; token-only colors
 * via `useXenitionTheme()` — no literal hex. Presentational.
 */
export declare function SLABadgeV4({ state, hint, size, label, style, }: SLABadgeV4Props): React.ReactElement;
//# sourceMappingURL=SLABadgeV4.d.ts.map