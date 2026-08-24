import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type PermissionKind = 'notifications' | 'location' | 'camera' | 'microphone' | 'photos' | 'contacts' | 'generic';
export type PermissionState = 'idle' | 'requesting' | 'granted' | 'denied';
export interface PermissionPromptProps {
    /** Which OS permission this pre-prompt is priming. Sets the default glyph. */
    kind?: PermissionKind;
    /** Explicit glyph override for the medallion. */
    icon?: string;
    /** Outcome-oriented headline (e.g. `'Never miss a reply'`). */
    title: string;
    /**
     * The "why" shown before the OS dialog — the explain half of explain-then-ask
     * (design.md §17). Say what the user gets, not what you access.
     */
    rationale: string;
    /** Allow-button copy. Default `'Allow'`. */
    allowLabel?: string;
    /** Decline-link copy. Default `'Not now'`. */
    denyLabel?: string;
    /** Fires when the user opts in — the host then triggers the real OS request. */
    onAllow?: () => void;
    /** Fires when the user declines the pre-prompt. */
    onDeny?: () => void;
    /** Drives the button/affordance states. Default `'idle'`. */
    state?: PermissionState;
    /** Message shown in the `denied` state. */
    deniedMessage?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Contextual permission pre-prompt — the in-app "explain, then ask" screen that
 * precedes the real OS dialog so the system prompt only fires once the user has
 * already said yes (design.md §17). Renders a rationale, an `Allow`/`Not now`
 * pair, and reflects `requesting`/`granted`/`denied` states (granted shows a
 * success line; denied shows a recovery hint). Colors come from the success and
 * primary tokens. No literal colors.
 */
export declare function PermissionPrompt({ kind, icon, title, rationale, allowLabel, denyLabel, onAllow, onDeny, state, deniedMessage, style, }: PermissionPromptProps): React.ReactElement;
//# sourceMappingURL=PermissionPrompt.d.ts.map