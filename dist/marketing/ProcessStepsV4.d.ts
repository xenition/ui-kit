import * as React from 'react';
import type { ProcessStepsProps } from './ProcessSteps';
/** Drop-in for {@link ProcessStepsProps} — same props, the V4 "showcase" design. */
export type ProcessStepsV4Props = ProcessStepsProps;
/**
 * ProcessSteps — **V4** "showcase" design (web parity of the native V4). A
 * refined numbered "how it works" flow: each step opens with a big soft-primary
 * numbered token (a `bg-primary/10` circle carrying the bold step number, or
 * the step's `icon`), connected to the next by a hairline rule (a column line
 * on desktop, a vertical line on mobile). Bold step `title` and muted
 * `description`. Horizontal on desktop / vertical on mobile, as the base. A
 * content section, so NOT a gradient surface. Every `step` (`title`,
 * `description`, `icon`) honored. Same props/behavior as
 * {@link ProcessStepsProps}; token-only colors, no literals.
 */
export declare const ProcessStepsV4: React.ForwardRefExoticComponent<ProcessStepsProps & React.RefAttributes<HTMLOListElement>>;
//# sourceMappingURL=ProcessStepsV4.d.ts.map