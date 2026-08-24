import * as React from 'react';
import { type MatchmakingPhase } from './types';
export interface MatchmakingStatusProps {
    /** Current phase — drives the icon, headline, and available actions. */
    phase: MatchmakingPhase;
    /** Seconds spent searching (shown as `m:ss` while searching). */
    elapsedSeconds?: number;
    /** Players found so far (for the "3 / 10" slot readout). */
    found?: number;
    /** Total players needed. */
    needed?: number;
    /** Optional queue / mode label, e.g. `'Ranked · Solo'`. */
    queueLabel?: string;
    /** Called to cancel the search (shown while `searching`). */
    onCancel?: () => void;
    /** Called to accept a found match (shown while `found`). */
    onAccept?: () => void;
    /** Called to retry after a failure (shown while `failed`). */
    onRetry?: () => void;
    /** Extra classes on the root card. */
    className?: string;
}
/**
 * A matchmaking status panel — reflects the queue `phase` with an icon,
 * headline, a live elapsed timer + player-slot readout, and phase-appropriate
 * actions (Cancel while searching, Accept when found, Retry on failure). While
 * `searching` it shows a spinner; the phase is announced via the accessible
 * label (never conveyed by color alone). Composes `Card`, `Button`, `Spinner`,
 * `Icon`. Token-only.
 */
export declare function MatchmakingStatus({ phase, elapsedSeconds, found, needed, queueLabel, onCancel, onAccept, onRetry, className, }: MatchmakingStatusProps): React.ReactElement;
//# sourceMappingURL=MatchmakingStatus.d.ts.map