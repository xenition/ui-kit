import * as React from 'react';
import { type GameLobby } from './types';
export type LobbyRowVariant = 'default' | 'compact';
export interface LobbyRowProps {
    /** The lobby / room to render. */
    lobby: GameLobby;
    /** Variant — `compact` drops the mode line + slot bar. */
    variant?: LobbyRowVariant;
    /** Show the join button as busy + block it (join in flight). */
    joining?: boolean;
    /** Called when the join button is clicked. Renders the button when set. */
    onJoin?: (lobby: GameLobby) => void;
    /** Extra classes on the root card. */
    className?: string;
}
/**
 * One joinable lobby / room row — name, host, mode, a filled/total slot meter,
 * and a Join button. The button disables (with a "Full" / "In progress" label,
 * not color alone) when the room can't be joined. `onJoin(lobby)` fires the
 * intent. Composes `Card`, `Button`, `Badge`, `Icon`. Token-only.
 */
export declare function LobbyRow({ lobby, variant, joining, onJoin, className, }: LobbyRowProps): React.ReactElement;
//# sourceMappingURL=LobbyRow.d.ts.map