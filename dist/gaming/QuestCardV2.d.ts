import * as React from 'react';
import type { QuestCardProps } from './QuestCard';
/** Same public contract as {@link QuestCard} — a drop-in alternate design. */
export type QuestCardV2Props = QuestCardProps;
/**
 * QuestCard, redesigned (v2): a **bold quest banner**. A quest glyph tile leads the
 * title/description; a thick progress bar shows steps toward the goal, a reward
 * chip sits prominent, and a state-aware Claim button anchors the card. Elevated.
 * Distinct from v1. Same props, token-only.
 */
export declare const QuestCardV2: React.ForwardRefExoticComponent<QuestCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuestCardV2.d.ts.map