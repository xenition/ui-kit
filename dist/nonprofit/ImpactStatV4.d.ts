import * as React from 'react';
import type { ImpactStatProps } from './ImpactStat';
/** Drop-in for {@link ImpactStatProps} — same props, the V4 "rally" design. */
export type ImpactStatV4Props = ImpactStatProps;
/**
 * ImpactStat — **V4** "rally" design (web parity of the native V4). A single
 * mission metric drawn with the warm, elevated "rally" identity: a big legible
 * value numeral, an optional muted unit, a glyph chip in the tone color, a
 * caption label, and a supporting caption. Honors all three `variant`s —
 * `plain` (no surface), `card` (an elevated bordered surface with a soft
 * shadow), and `tile` (a filled soft-tone panel) — and all three `tone`s
 * (`primary | success | accent`), identical props/behavior to
 * {@link ImpactStatProps}. Tone reads through the glyph + value color, never
 * color alone. All colors come from the `--xen-*` token classes — no literals.
 */
export declare const ImpactStatV4: React.ForwardRefExoticComponent<ImpactStatProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ImpactStatV4.d.ts.map