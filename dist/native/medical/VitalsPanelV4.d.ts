import * as React from 'react';
import type { VitalsPanelProps } from './VitalsPanel';
/** Drop-in for {@link VitalsPanelProps} — same props, the V4 "clinic" design. */
export type VitalsPanelV4Props = VitalsPanelProps;
/**
 * VitalsPanel — **V4** "clinic" design. The calm, clinical take on a vitals
 * dashboard: an elevated rounded surface with a soft shadow holding a responsive
 * grid of reading tiles (heart rate, blood pressure, SpO₂, temperature, …). Each
 * tile shows a big legible **tabular-nums** value + unit; when a reading is
 * abnormal it is flagged by an ↑/↓ (or ⚠) glyph + a text label + a warn/danger
 * token tone, so severity is never color alone. Renders a loading skeleton and an
 * empty note. Identical props/behavior to {@link VitalsPanelProps}. Token-only
 * colors via `useXenitionTheme()`. Informational UI only — not a medical device.
 */
export declare function VitalsPanelV4({ vitals, title, loading, emptyLabel, style, }: VitalsPanelV4Props): React.ReactElement;
//# sourceMappingURL=VitalsPanelV4.d.ts.map