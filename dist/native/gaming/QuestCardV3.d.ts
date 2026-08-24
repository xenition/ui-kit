import * as React from 'react';
import type { QuestCardProps } from './QuestCard';
/** Drop-in alternate of {@link QuestCardProps} — identical prop contract. */
export type QuestCardV3Props = QuestCardProps;
/**
 * QuestCard — design variant **V3**: a **minimal single line with a status
 * dot**. A small tone dot plus its written status precede the title; the step
 * fraction and reward sit inline, and (when completed) a compact "Claim" text
 * button trails at the end. Where V1/V2 are cards with a progress bar, V3 is a
 * dense checklist row. The dot is always paired with a text label so state is
 * never signalled by color alone; state derives from `progress/goal` when
 * omitted and Claim only fires when `completed`. Same props as
 * {@link QuestCardProps}. Token-only, minimal.
 */
export declare function QuestCardV3({ quest, state, claiming, onClaim, style, }: QuestCardV3Props): React.ReactElement;
//# sourceMappingURL=QuestCardV3.d.ts.map