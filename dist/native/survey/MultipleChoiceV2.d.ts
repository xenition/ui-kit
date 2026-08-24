import * as React from 'react';
import type { MultipleChoiceProps } from './MultipleChoice';
/** Same Props as {@link MultipleChoice} — a drop-in alternate design. */
export type MultipleChoiceV2Props = MultipleChoiceProps;
/**
 * MultipleChoice, design V2 — **option cards led by letter badges**. Each choice
 * is a padded, rounded card with an A/B/C… badge (filled primary when selected),
 * the label and optional description, and a trailing check/dot on selection —
 * the selected card also gains a primary border, a soft tint and a lift. Reads
 * like a quiz / poll card deck rather than the original's plain rows.
 * `single` = `radiogroup`+`radio`, `multiple` = `list`+`checkbox`, state
 * announced (never color-alone). Empty options render a muted state. Token-pure.
 */
export declare function MultipleChoiceV2({ options, value, onChange, selection, accessibilityLabel, disabled, style, }: MultipleChoiceV2Props): React.ReactElement;
//# sourceMappingURL=MultipleChoiceV2.d.ts.map