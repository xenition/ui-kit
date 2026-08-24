import * as React from 'react';
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
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A scoreboard — a `ranked` ordered standings list (leader highlighted in weight
 * + position, not color alone) or a `versus` head-to-head between the first two
 * entries. Renders an `EmptyState` when there are no entries. Uses guarded
 * indexing for the versus sides. Composes `Card`, `Avatar`, `EmptyState`.
 * Token-only.
 */
export declare function ScoreBoard({ entries, variant, title, emptyLabel, className, }: ScoreBoardProps): React.ReactElement;
//# sourceMappingURL=ScoreBoard.d.ts.map