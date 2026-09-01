import * as React from 'react';
import type { UsageMeterProps } from './UsageMeter';
/** Drop-in for {@link UsageMeterProps} — same props, a different design. */
export type UsageMeterV4Props = UsageMeterProps;
/**
 * UsageMeter — **V4** design. The clean, trust-first consumption gauge: an
 * elevated rounded surface, the utility-kind glyph in a small brand-gradient disc
 * (the signature V4 touch), and the token-bound `Progress` bar below. The fill
 * tone still escalates by threshold (under `warnAt` → primary, over → warn,
 * at/over cap → danger) and the same escalation is echoed in a text percentage,
 * so status is never color-alone. Quantities run through `formatUsage`/`formatPct`
 * and a zero/absent allowance is guarded. Same props and loading behavior as
 * {@link UsageMeterProps}; token-only colors.
 */
export declare function UsageMeterV4({ kind, used, allowance, unit, decimals, period, warnAt, loading, style, }: UsageMeterV4Props): React.ReactElement;
//# sourceMappingURL=UsageMeterV4.d.ts.map