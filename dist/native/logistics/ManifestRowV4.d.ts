import * as React from 'react';
import type { ManifestRowProps } from './ManifestRow';
/** V4 layout choices for the "dispatch" design. */
export type ManifestRowLayout = 'full' | 'compact';
/** Drop-in for {@link ManifestRowProps} — same props, the V4 "dispatch" design. */
export interface ManifestRowV4Props extends ManifestRowProps {
    /** V4 layout: `full` (default) or `compact` (denser single line). */
    variant?: ManifestRowLayout;
}
/**
 * ManifestRow — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a load-verification line: an elevated
 * rounded row with a soft shadow, a large check control (`role="checkbox"`,
 * ≥44px tap target) whose meaning is carried by a glyph + `accessibilityState`,
 * the item + SKU, a labelled state word (never color alone), and a
 * `scanned / quantity` counter that greens on completion and warns when short.
 * Pressing the control cycles pending → checked and fires `onToggle`. Honors the
 * V4 `variant` — `full` (default) and `compact` (a denser single line). Token-only
 * colors via `useXenitionTheme()`.
 */
export declare function ManifestRowV4({ item, sku, quantity, scanned, state, variant, onToggle, testID, style, }: ManifestRowV4Props): React.ReactElement;
//# sourceMappingURL=ManifestRowV4.d.ts.map