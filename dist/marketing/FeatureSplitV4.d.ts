import * as React from 'react';
import type { FeatureSplitProps } from './FeatureSplit';
/** Drop-in for {@link FeatureSplitProps} — same props, the V4 "showcase" design. */
export type FeatureSplitV4Props = FeatureSplitProps;
/**
 * FeatureSplit — **V4** "showcase" design (web parity of the native V4). A
 * content section, so NOT a gradient surface: a two-column feature row — bold
 * copy on one side, an elevated media slot on the other. Honors every base prop
 * (`eyebrow`/`title`/`description`/`bullets`/`media`/`reverse`/`action`); the
 * headline is extra-bold and tight-tracked, bullets carry a soft-primary check,
 * and `reverse` flips the column order. Same props/behavior as
 * {@link FeatureSplitProps}; token-only colors, no literals.
 */
export declare const FeatureSplitV4: React.ForwardRefExoticComponent<FeatureSplitProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=FeatureSplitV4.d.ts.map