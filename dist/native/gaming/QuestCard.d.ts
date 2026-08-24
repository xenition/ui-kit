import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Quest, type QuestState } from './types';
export interface QuestCardProps {
    /** The quest to render. */
    quest: Quest;
    /**
     * Lifecycle. Derives from progress when omitted (`completed` at goal, else
     * `active`). `locked` dims the card; `claimed` disables the reward button.
     */
    state?: QuestState;
    /** Show a spinner + block the claim button (claim in flight). */
    claiming?: boolean;
    /**
     * Called when the reward is claimed. The claim button appears (enabled) only
     * when the quest is `completed`; it reads "Claimed" once `state==='claimed'`.
     */
    onClaim?: (quest: Quest) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A quest / mission card — title, objective, a step progress bar, a reward
 * chip, and a state-aware Claim button. The status is shown as a labeled badge
 * (not color alone); the claim button only enables when `completed`. State is
 * derived from `progress/goal` when not supplied. `onClaim(quest)` fires the
 * intent. Composes `Card`, `Progress`, `Button`, `Badge`, `Icon`. Token-only.
 */
export declare function QuestCard({ quest, state, claiming, onClaim, style, }: QuestCardProps): React.ReactElement;
//# sourceMappingURL=QuestCard.d.ts.map