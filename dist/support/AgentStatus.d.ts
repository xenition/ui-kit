import * as React from 'react';
/** Availability of a support agent. */
export type AgentPresence = 'online' | 'away' | 'offline';
export interface AgentStatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Presence state. Drives dot tone + label — never color alone. */
    presence: AgentPresence;
    /** Agent display name. */
    name?: string;
    /** Optional avatar URL (falls back to initials). */
    avatar?: string;
    /** Optional secondary line (e.g. `"3 active chats"`). */
    detail?: string;
    /** `dot` = compact dot+label; `row` = avatar + name + status line. */
    variant?: 'dot' | 'row';
    /** Fires when the row is activated (only meaningful for `row`). */
    onClick?: () => void;
}
/**
 * Agent availability indicator (`online`/`away`/`offline`). The `dot` variant
 * is a status dot + text label; the `row` variant adds an avatar and an optional
 * detail line and can be activated (click / Enter / Space). Presence is
 * announced by text and dot, not color alone. Online reuses the pulsing
 * `StatusDot` (inert under reduced-motion); offline is a muted token dot. Token
 * classes only — no literal hex.
 */
export declare const AgentStatus: React.ForwardRefExoticComponent<AgentStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentStatus.d.ts.map