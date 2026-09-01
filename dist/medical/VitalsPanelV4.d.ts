import * as React from 'react';
import type { VitalsPanelProps } from './VitalsPanel';
/** Drop-in for {@link VitalsPanelProps} — same props, the V4 "clinic" design. */
export type VitalsPanelV4Props = VitalsPanelProps;
/**
 * VitalsPanel — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a vitals dashboard: an elevated rounded surface with a soft
 * shadow holding a responsive grid of reading tiles (heart rate, blood pressure,
 * SpO₂, temperature, …). Each tile shows a big legible **tabular-nums** value +
 * unit; when a reading is abnormal it is flagged by an ↑/↓ (or ⚠) glyph + a text
 * label + a warn/danger token tone, so severity is never color alone. Renders a
 * loading skeleton and an empty state (`EmptyState`). Identical props/behavior to
 * {@link VitalsPanelProps}. All colors from `--xen-*` token classes (no literals).
 * Informational UI only — not a medical device.
 */
export declare const VitalsPanelV4: React.ForwardRefExoticComponent<VitalsPanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VitalsPanelV4.d.ts.map