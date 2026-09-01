import * as React from 'react';
import type { HealthRecordRowProps } from './HealthRecordRow';
/** Drop-in for {@link HealthRecordRowProps} — same props, the V4 "clinic" design. */
export type HealthRecordRowV4Props = HealthRecordRowProps;
/**
 * HealthRecordRow — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a patient-timeline row: an elevated rounded surface with
 * a soft shadow, the type glyph tucked in a soft-primary well, the record title,
 * a provider · date meta line, a labelled type chip (text label + token tone,
 * never color alone), and an optional unread dot. When `onClick` is set the row
 * is a keyboard-activatable `role="button"` with a ≥44px tap target. Identical
 * props/behavior to {@link HealthRecordRowProps}. All colors from `--xen-*` token
 * classes (no literals). Informational UI only — not a medical device.
 */
export declare const HealthRecordRowV4: React.ForwardRefExoticComponent<HealthRecordRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HealthRecordRowV4.d.ts.map