import * as React from 'react';
import type { MultipleChoiceProps } from './MultipleChoice';
/** Drop-in for {@link MultipleChoiceProps} — same props, the V4 "focus" design. */
export type MultipleChoiceV4Props = MultipleChoiceProps;
/**
 * MultipleChoice — **V4** "clean form / focus" design. Calm, legible answer
 * rows rendered as big tappable cards (min height 44px, generous 8-pt padding).
 * Each row carries a leading radio (`single`) or check (`multiple`) indicator,
 * an optional icon, a label and optional description. The selected row lifts to
 * a soft `bg-primary/10` tint with a `border-primary` edge and a solid
 * **primary** indicator with on-primary glyph; unselected rows sit on
 * `bg-surface` + `border-border`. One accent throughout. Same props/behavior as
 * {@link MultipleChoiceProps} — `radiogroup`/`radio` vs. `checkbox` roles,
 * `aria-checked`, single/multiple selection and the empty state are all
 * preserved; all colors come from `--xen-*` token classes (no literal colors).
 */
export declare const MultipleChoiceV4: React.ForwardRefExoticComponent<MultipleChoiceProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MultipleChoiceV4.d.ts.map