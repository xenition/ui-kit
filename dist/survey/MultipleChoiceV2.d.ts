import * as React from 'react';
import type { MultipleChoiceProps } from './MultipleChoice';
/** Same public contract as {@link MultipleChoice} — a drop-in alternate design. */
export type MultipleChoiceV2Props = MultipleChoiceProps;
/**
 * MultipleChoice, redesigned (v2): **big option cards**. Each choice is a bordered
 * tile with a radio/checkbox marker, optional glyph, label and description; a
 * selected tile fills primary-tinted with a ring. Bolder than v1's list. Same
 * props, token-only.
 */
export declare const MultipleChoiceV2: React.ForwardRefExoticComponent<MultipleChoiceProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MultipleChoiceV2.d.ts.map