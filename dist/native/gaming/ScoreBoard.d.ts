import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ScoreEntry } from './types';
export type ScoreBoardVariant = 'ranked' | 'versus';
export interface ScoreBoardProps {
    /** Rows to render. `ranked` sorts by score desc; `versus` keeps order. */
    entries: ScoreEntry[];
    /**
     * - `ranked` — ordered list with position + highlighted leader (default).
     * - `versus` — two-side head-to-head (uses the first two entries).
     */
    variant?: ScoreBoardVariant;
    /** Optional board title / header. */
    title?: string;
    /** Message shown when there are no entries. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A scoreboard — a `ranked` ordered standings list (leader highlighted in
 * weight + a badge, not color alone) or a `versus` head-to-head between the
 * first two entries. Renders an `EmptyState` when there are no entries. Uses
 * guarded indexing for the versus sides. Composes `Card`, `Avatar`. Token-only.
 */
export declare function ScoreBoard({ entries, variant, title, emptyLabel, style, }: ScoreBoardProps): React.ReactElement;
//# sourceMappingURL=ScoreBoard.d.ts.map