import * as React from 'react';
import type { DonorRowProps } from './DonorRow';
/** Drop-in for {@link DonorRowProps} — same props, the V4 "rally" design. */
export type DonorRowV4Props = DonorRowProps;
/**
 * DonorRow — **V4** "rally" design (web parity of the native V4). An elevated,
 * rounded donor / leaderboard row on a clean surface (no gradient): a leading
 * avatar in a soft-primary well, an optional rank, a bold donor name with a
 * glyph + labelled recognition-tier {@link Badge} (never color alone), an
 * optional gift-count chip, and a trailing bold lifetime-giving total (integer
 * cents → `formatMoney`). Anonymous donors show a generic label + placeholder
 * avatar. When `onClick` is set the whole row is a keyboard-activatable
 * `role="button"`. Identical props/behavior to {@link DonorRowProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
export declare const DonorRowV4: React.ForwardRefExoticComponent<DonorRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DonorRowV4.d.ts.map