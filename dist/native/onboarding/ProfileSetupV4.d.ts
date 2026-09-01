import * as React from 'react';
import { type OnboardingFlowV4Props } from './internal/flow-v4';
import type { ProfileSetupProps } from './ProfileSetup';
export interface ProfileSetupV4Props extends ProfileSetupProps, OnboardingFlowV4Props {
    /**
     * Render as a whole screen — the shared shell, so the form scrolls under a
     * pinned CTA and taps still land while the keyboard is up. Default `false`,
     * the base's block rendering.
     */
    fullScreen?: boolean;
    /** Accessible name for the avatar control. Default `'Change profile photo'`. */
    avatarAccessibilityLabel?: string;
}
/**
 * **V4 profile setup** — the base's props plus `fullScreen`,
 * `avatarAccessibilityLabel` and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The fields are `AuthFieldV4`.** The base hand-rolled a `TextInput` with
 *    its own border, its own focus colour and its own 56 height, which is the
 *    exact drift the design-spec Addendum settled: the sign-in screen's fields
 *    and this screen's fields were two different controls in one funnel. §10.5
 *    — use the primitive.
 * 2. **An error is a message, not a red edge.** `AuthFieldV4` renders
 *    `ProfileField.error` as text under the field. The base tinted the border
 *    and stopped, which a colour-blind user cannot perceive at all.
 * 3. **The keyboard no longer sits on the CTA.** `fullScreen` puts the form in
 *    the shared shell with `keyboardShouldPersistTaps`, so the first tap after
 *    typing hits the button instead of dismissing the keyboard.
 * 4. **The avatar action takes a contrast-corrected tone** (`primaryText`) and
 *    a press layer, and its accessible name is a prop rather than a
 *    hard-coded English string.
 * 5. **The hero tint has no `scheme` branch** — `flowGrounds()` mixes it.
 *
 * The avatar editor is still this screen's own artwork in the §3 hero slot,
 * and `illustration` still replaces it. With no fields the screen is a hero, a
 * headline and a CTA, and composes fine.
 */
export declare function ProfileSetupV4({ name, avatarUri, onEditAvatar, fields, values, onChangeField, title, saveLabel, onSave, loading, skipLabel, onSkip, subtitle, illustration, avatarActionLabel, avatarAccessibilityLabel, progress, onBack, onDismiss, error, fullScreen, ground, accent, style, }: ProfileSetupV4Props): React.ReactElement;
//# sourceMappingURL=ProfileSetupV4.d.ts.map