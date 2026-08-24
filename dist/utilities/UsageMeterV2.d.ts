import * as React from 'react';
import type { UsageMeterProps } from './UsageMeter';
/** Same public contract as {@link UsageMeter} — a drop-in alternate design. */
export type UsageMeterV2Props = UsageMeterProps;
/**
 * UsageMeter, redesigned (v2): a **big gauge ring**. A large `ProgressRing`
 * centers the period's usage as a percent of allowance, escalating its arc color
 * by threshold (under `warnAt` → primary, over → accent, at/over cap → danger);
 * the utility line and the used / allowance figures stack centered beneath it,
 * with a redundant escalation caption so status is never color-alone. A zero /
 * absent allowance is guarded (no divide-by-zero) and shows the raw usage in the
 * ring instead. Distinct at a glance from v1's inline bar and v3's slim bar. Same
 * props, `formatUsage` quantities, token-pure.
 */
export declare const UsageMeterV2: React.ForwardRefExoticComponent<UsageMeterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UsageMeterV2.d.ts.map