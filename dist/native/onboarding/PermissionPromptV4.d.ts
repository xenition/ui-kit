import * as React from 'react';
import { type OnboardingFlowV4Props } from './internal/flow-v4';
import type { PermissionPromptProps } from './PermissionPrompt';
export interface PermissionPromptV4Props extends PermissionPromptProps, OnboardingFlowV4Props {
    /**
     * "Open Settings" — shown **only** in the `denied` state, under the message.
     *
     * `deniedMessage` defaults to "You can enable this later in Settings" and the
     * base gave the user no way to get there. A dead end that names its own exit
     * and does not offer it is worse than one that says nothing.
     */
    settingsLabel?: string;
    /** Fires on the settings link. The host owns `Linking.openSettings()`. */
    onOpenSettings?: () => void;
}
/**
 * **V4 permission prompt** — the base's props plus `settingsLabel`,
 * `onOpenSettings` and the line's `ground`/`accent`.
 *
 * The "explain, then ask" pattern (§17): say what the permission buys before
 * the OS dialog appears, so a user who declines the system prompt has already
 * been told what they are declining.
 *
 * ## Five changes
 *
 * 1. **A denied state has an exit.** See `settingsLabel`.
 * 2. **The benefit rows are the module's rows.** They were a private,
 *    near-identical copy of `PaywallFeatureRows` — same 44 circle, same tinted
 *    ground, no rail — which is how the two drifted apart. One component now.
 * 3. **The tint has no `scheme` branch.** `flowGrounds()` mixes it from
 *    resolved semantic colours.
 * 4. **The deny action reads as a choice**, underlined with its own tap
 *    target, rather than muted text under the button.
 * 5. **Full-screen gets the shared shell** — scroll, pinned footer, safe-area
 *    inset. The base's band had none of the three.
 *
 * `granted` replaces the actions with a live-region confirmation rather than
 * leaving a live "Allow" button on a screen where there is nothing left to
 * allow. The card form (`fullScreen={false}`) is unchanged in shape.
 */
export declare function PermissionPromptV4({ kind, icon, title, rationale, allowLabel, denyLabel, onAllow, onDeny, state, deniedMessage, grantedMessage, fullScreen, illustration, benefits, progress, onBack, onDismiss, settingsLabel, onOpenSettings, ground, accent, style, }: PermissionPromptV4Props): React.ReactElement;
//# sourceMappingURL=PermissionPromptV4.d.ts.map