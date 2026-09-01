import * as React from 'react';
import type { ProcessStepsProps } from './ProcessSteps';
/** Drop-in for {@link ProcessStepsProps} — same props, the V4 "showcase" design. */
export type ProcessStepsV4Props = ProcessStepsProps;
/**
 * ProcessSteps — **V4** "showcase" design (native mirror of the web V4). A
 * refined numbered "how it works" flow: each step opens with a big soft-primary
 * numbered token (a `withAlpha(colors.primary, 0.1)` circle carrying the bold
 * step number, or the step's `icon`), connected to the next by a hairline rule.
 * Bold step `title` and muted `description`. As on the native base, phones are
 * narrow so this is a vertical list (the web desktop-horizontal layout is
 * dropped). NOT a gradient surface. Honors every `step` (`title`,
 * `description`, `icon`). Same props/behavior as {@link ProcessStepsProps};
 * token-only colors, no literals.
 */
export declare function ProcessStepsV4({ steps, style }: ProcessStepsV4Props): React.ReactElement;
//# sourceMappingURL=ProcessStepsV4.d.ts.map