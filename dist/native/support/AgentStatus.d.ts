import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Availability of a support agent. */
export type AgentPresence = 'online' | 'away' | 'offline';
export interface AgentStatusProps {
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
    /** Fires when the row is tapped (only meaningful for `row`). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Agent availability indicator (`online`/`away`/`offline`). The `dot` variant
 * is a pulsing status dot + text label; the `row` variant adds an avatar and an
 * optional detail line and can be tapped. Presence is announced by text and dot
 * position, not color alone. The dot maps to `SemanticColors`
 * (`success`/`warn`/`muted`); no literal hex. The pulse animation respects the
 * OS reduced-motion setting via the underlying `StatusDot`.
 */
export declare function AgentStatus({ presence, name, avatar, detail, variant, onPress, style, }: AgentStatusProps): React.ReactElement;
//# sourceMappingURL=AgentStatus.d.ts.map