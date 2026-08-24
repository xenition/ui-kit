import * as React from 'react';
import type { PrescriptionRowProps } from './PrescriptionRow';
/** Same public contract as {@link PrescriptionRow} — a drop-in alternate design. */
export type PrescriptionRowV2Props = PrescriptionRowProps;
/**
 * PrescriptionRow, redesigned (v2): an **elevated med card**. A rounded, primary-
 * tinted pill-glyph tile anchors the left; the drug name sits large with dose /
 * directions / refills beneath it and a glyph + label status line. When a refill
 * is due, a full-width "Refill" CTA spans the foot. Lifted with a shadow and a
 * fade-in mount — distinct at a glance from v1's flat list row. Same props,
 * token-pure.
 */
export declare function PrescriptionRowV2({ name, dose, frequency, refillsLeft, status, onRefill, onPress, style, }: PrescriptionRowV2Props): React.ReactElement;
//# sourceMappingURL=PrescriptionRowV2.d.ts.map