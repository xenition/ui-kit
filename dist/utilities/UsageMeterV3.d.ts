import * as React from 'react';
import type { UsageMeterProps } from './UsageMeter';
/** Same public contract as {@link UsageMeter} — a drop-in alternate design. */
export type UsageMeterV3Props = UsageMeterProps;
/**
 * UsageMeter, redesigned (v3): a **slim inline bar**. A one-line header pairs the
 * utility glyph + label on the left with a right-aligned percent, then a single
 * thin `Progress` track carries the fill; a tiny used / allowance caption sits
 * under it. No card, no ring — the most compact of the three, for stacking many
 * meters in a list. The fill tone escalates by threshold and is echoed in the
 * percent text so status is never color-alone; a zero / absent allowance is
 * guarded. Same props, `formatUsage` quantities, token-pure.
 */
export declare const UsageMeterV3: React.ForwardRefExoticComponent<UsageMeterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UsageMeterV3.d.ts.map