import * as React from 'react';
import type { MultipleChoiceProps } from './MultipleChoice';
/** Same public contract as {@link MultipleChoice} — a drop-in alternate design. */
export type MultipleChoiceV3Props = MultipleChoiceProps;
/**
 * MultipleChoice, redesigned (v3): **compact option rows**. A small radio/checkbox
 * marker, glyph and label share a hairline-bordered line with the description
 * folded in — dense for long option lists. The opposite of v2's tiles. Same
 * props, token-only.
 */
export declare const MultipleChoiceV3: React.ForwardRefExoticComponent<MultipleChoiceProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MultipleChoiceV3.d.ts.map