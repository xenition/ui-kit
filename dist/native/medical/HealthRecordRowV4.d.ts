import * as React from 'react';
import type { HealthRecordRowProps } from './HealthRecordRow';
/** Drop-in for {@link HealthRecordRowProps} — same props, the V4 "clinic" design. */
export type HealthRecordRowV4Props = HealthRecordRowProps;
/**
 * HealthRecordRow — **V4** "clinic" design. The calm, clinical take on a
 * patient-timeline row: an elevated rounded surface with a soft shadow, the type
 * glyph tucked in a soft-primary well, the record title, a provider · date meta
 * line, a labelled type chip (text label + token tone, never color alone), and an
 * optional unread dot. Tap to open, with a ≥44px tap target. Identical
 * props/behavior to {@link HealthRecordRowProps}. Token-only colors via
 * `useXenitionTheme()`. Informational UI only — not a medical device.
 */
export declare function HealthRecordRowV4({ type, title, date, provider, unread, onPress, style, }: HealthRecordRowV4Props): React.ReactElement;
//# sourceMappingURL=HealthRecordRowV4.d.ts.map