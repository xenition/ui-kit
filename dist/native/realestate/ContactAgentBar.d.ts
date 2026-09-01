import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ContactAgentBarProps {
    /** Optional agent name shown on the left (e.g. `'Dana Reyes'`). */
    agentName?: string;
    /** Optional agent photo URL for the avatar. Falls back to initials of `agentName`. */
    agentAvatarUrl?: string;
    /** Optional supporting line under the name (e.g. `'Listing agent · Acme Realty'`). */
    agentSubtitle?: string;
    /** Fires when the Call action is pressed. When omitted the Call button is hidden. */
    onCall?: () => void;
    /** Fires when the Message action is pressed. When omitted the Message button is hidden. */
    onMessage?: () => void;
    /** Fires when the Schedule-tour action is pressed. When omitted the primary CTA is hidden. */
    onTour?: () => void;
    /** Label for the Call action. Defaults to `'Call'`. */
    callLabel?: string;
    /** Label for the Message action. Defaults to `'Message'`. */
    messageLabel?: string;
    /** Label for the primary Schedule-tour action. Defaults to `'Tour'`. */
    tourLabel?: string;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * ContactAgentBar — **V4** "listing" design. A sticky-style contact action bar
 * for a listing: an optional agent avatar + name/subtitle on the left, then the
 * secondary Call and Message actions and a primary Schedule-tour CTA on the
 * right. Editorial, single-accent (primary) with the tour as the only filled
 * button; every CTA is ≥44px. 8-pt spacing inside a rounded elevated bar.
 * Presentational only — data + callbacks; an action is only rendered when its
 * handler is supplied. Token-only colors via `useXenitionTheme()`, no literals;
 * dark-mode safe.
 */
export declare function ContactAgentBar({ agentName, agentAvatarUrl, agentSubtitle, onCall, onMessage, onTour, callLabel, messageLabel, tourLabel, style, }: ContactAgentBarProps): React.ReactElement;
//# sourceMappingURL=ContactAgentBar.d.ts.map