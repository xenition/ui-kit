import * as React from 'react';
import type { MultipleChoiceProps } from './MultipleChoice';
/** Drop-in for {@link MultipleChoiceProps} — same props, the V4 "focus" design. */
export type MultipleChoiceV4Props = MultipleChoiceProps;
/**
 * MultipleChoice — **V4** "clean form / focus" design. Calm, legible answer rows
 * rendered as big tappable cards (min height 44, generous 8-pt padding). Each row
 * carries a leading radio (`single`) or check (`multiple`) indicator, an optional
 * icon, a label and optional description. The selected row lifts to a soft primary
 * tint with a `primary` edge and a solid **primary** indicator with on-primary
 * glyph; unselected rows sit on `surface` + `border`. One accent throughout. Same
 * props/behavior as {@link MultipleChoiceProps} — the `radiogroup`/`radio` vs.
 * `checkbox` roles, `accessibilityState`, single/multiple selection and the empty
 * state are all preserved; token-only colors via `useXenitionTheme()` (no literal
 * colors).
 */
export declare function MultipleChoiceV4({ options, value, onChange, selection, accessibilityLabel, disabled, style, }: MultipleChoiceV4Props): React.ReactElement;
//# sourceMappingURL=MultipleChoiceV4.d.ts.map