import * as React from 'react';
import type { VaccineRecordProps } from './VaccineRecord';
/** Drop-in for {@link VaccineRecordProps} — same props, the V4 "companion" design. */
export type VaccineRecordV4Props = VaccineRecordProps;
/**
 * VaccineRecord — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on an immunization line item: an elevated rounded card with
 * a soft shadow, the status glyph in a soft-primary tinted well, a bold vaccine
 * name, a labelled status Badge, the given/next-due dates and vet/lot meta shown
 * as small soft-primary chips, and a rounded "Book booster" CTA for anything not
 * current. Same props/behavior as {@link VaccineRecordProps}; every `status`
 * reads via a glyph + labelled Badge (never color alone). All colors from
 * `--xen-*` token classes (no literals).
 */
export declare const VaccineRecordV4: React.ForwardRefExoticComponent<VaccineRecordProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VaccineRecordV4.d.ts.map