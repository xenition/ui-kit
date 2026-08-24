import * as React from 'react';
import type { QuestCardProps } from './QuestCard';
/** Drop-in alternate of {@link QuestCardProps} — identical prop contract. */
export type QuestCardV2Props = QuestCardProps;
/**
 * QuestCard — design variant **V2**: an **elevated card led by a big progress
 * bar**, with a prominent reward badge and a full-width Claim CTA. Where V1 is a
 * bordered card with a header row and a small `sm` bar, V2 headlines the medium
 * progress bar + percentage under the title, floats the reward as a soft badge,
 * and stretches the claim button across the footer. Status is a glyph + labeled
 * badge (never color alone); state derives from `progress/goal` when omitted and
 * the CTA only enables when `completed`. Same props as {@link QuestCardProps}.
 * Token-only.
 */
export declare function QuestCardV2({ quest, state, claiming, onClaim, style, }: QuestCardV2Props): React.ReactElement;
//# sourceMappingURL=QuestCardV2.d.ts.map