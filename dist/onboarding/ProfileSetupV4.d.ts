import * as React from 'react';
import { type OnboardingFlowV4Props } from './internal/flow-v4';
import type { ProfileSetupProps } from './ProfileSetup';
export interface ProfileSetupV4Props extends ProfileSetupProps, OnboardingFlowV4Props {
    /**
     * Render as a whole screen — the shared shell, so the form scrolls under a
     * pinned CTA. Default `false`, the base's block rendering.
     */
    fullScreen?: boolean;
    /** Accessible name for the avatar control. Default `'Change profile photo'`. */
    avatarAccessibilityLabel?: string;
}
/**
 * **V4 profile setup** — the web twin of the native `ProfileSetupV4`: the
 * base's props plus `fullScreen`, `avatarAccessibilityLabel` and the line's
 * `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The fields are `AuthFieldV4`.** The base hand-rolled an `<input>` with
 *    its own border, focus colour and height, so the sign-in screen's fields
 *    and this screen's fields were two different controls in one funnel — the
 *    exact drift the design-spec Addendum settled. §10.5: use the primitive.
 * 2. **An error is a message, not a red edge.** `AuthFieldV4` renders
 *    `ProfileField.error` as text under the field.
 * 3. **`keyboard` reaches the browser** (see {@link INPUT_TYPE}). The base
 *    accepted the prop and dropped it on this twin, so a phone field on the
 *    web brought up a full keyboard.
 * 4. **The avatar action takes a contrast-corrected tone** and an accessible
 *    name that is a prop rather than a hard-coded English string.
 * 5. **`fullScreen`** — the shared shell.
 *
 * The avatar editor is still this screen's own artwork in the §3 hero slot, and
 * `illustration` still replaces it.
 */
export declare const ProfileSetupV4: React.ForwardRefExoticComponent<ProfileSetupV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileSetupV4.d.ts.map