import * as React from 'react';
import type { MultipleChoiceProps } from './MultipleChoice';
/** Same Props as {@link MultipleChoice} — a drop-in alternate design. */
export type MultipleChoiceV3Props = MultipleChoiceProps;
/**
 * MultipleChoice, design V3 — **stacked minimal rows**. No cards or per-row
 * borders: the options share one hairline-divided list, each row a leading
 * indicator (a hollow circle for `single`, a hollow square for `multiple`) that
 * fills primary and shows a check when picked, with the label going bold and a
 * slim primary accent bar sliding in on the left. Airy and text-forward, unlike
 * the original's bordered rows. `single` = `radiogroup`+`radio`, `multiple` =
 * `list`+`checkbox`, state announced (never color-alone). Empty renders a muted
 * state. Token-pure.
 */
export declare function MultipleChoiceV3({ options, value, onChange, selection, accessibilityLabel, disabled, style, }: MultipleChoiceV3Props): React.ReactElement;
//# sourceMappingURL=MultipleChoiceV3.d.ts.map