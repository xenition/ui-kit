import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ButtonTone } from './Button';
import type { IconName } from '../../primitives/icon-names';
export declare const AUTH_SUBMIT_HEIGHT_V4 = 56;
export interface AuthSubmitButtonV4Props {
    /** The action, spelled out. "Sign in", "Create account", "Done". */
    label: string;
    onPress?: () => void;
    /** Swaps the trailing glyph for a spinner and blocks a second press. */
    loading?: boolean;
    disabled?: boolean;
    /** Trailing `→` on a forward action; drop it on a terminal one (§5). Default `true`. */
    trailingArrow?: boolean;
    /**
     * Semantic accent — V4 addition. `default`/`primary` carry the brand
     * gradient; `danger`/`success` stay solid, because a semantic colour is not a
     * brand colour (§35.4) and a destructive CTA wearing the brand sweep reads as
     * a promotion. Default `'default'`.
     */
    tone?: ButtonTone;
    /**
     * Which glyph sits in the trailing slot — V4 addition. Default `'forward'`,
     * §5's `→`. Only consulted when {@link trailingArrow} is on, so the two props
     * cannot disagree about whether there is a trailing glyph at all.
     */
    trailingIcon?: IconName;
    /**
     * The label while {@link loading} — V4 addition. "Signing in…" rather than a
     * frozen "Sign in", so the announced name changes with the state instead of
     * leaving a screen-reader user with a button that says it has not been
     * pressed. Falls back to {@link label}.
     */
    busyLabel?: string;
    /**
     * Announced name — V4 addition, the native spelling of the `aria-label` the
     * web twin already accepts through its DOM props. Defaults to the label on
     * screen.
     */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 auth submit button** — the same props as `AuthSubmitButton` plus the
 * four additive ones above, a different design line.
 *
 * This is the single most prominent element in the auth and onboarding
 * reference screens: `ONBOARDING-DESIGN-SPEC.md` §5's big, warm, full-width
 * pill with a trailing arrow, sitting confidently at the bottom of the sticky
 * footer. Everything in this file exists to make it read as *generous* and
 * *unmissable*, and to make sure it never changes shape underneath the finger.
 *
 * ## Why this one keeps 56 / `radius.full`
 *
 * The Addendum settled V4 control metrics at `spacing['2xl']` (48) and
 * `radius.md` — but it anchored that ruling on `InputV4`, and it is a ruling
 * about **field-shaped** controls: the things that stack in a form and have to
 * share an edge. The sticky primary CTA is not one of them. It is the one
 * dominant action on the screen (§5), it stands alone under a hairline, and
 * shrinking it to field height would flatten the exact hierarchy the reference
 * screens are built on. So §5's own shape stands: {@link AUTH_SUBMIT_HEIGHT_V4}
 * tall, `radius.full`.
 *
 * ## What V4 changes against the base
 *
 * - **The fill is `gradient.brand`** at the default/primary tone, run through
 *   {@link gradientInk} so the label clears AA against **both** stops rather
 *   than against the one flat colour `onPrimary` was measured on. §35.11 keeps
 *   gradients rare and purposeful; §5's single dominant action is precisely the
 *   place one is earned. A `danger` or `success` tone stays solid — §35.4, a
 *   semantic colour is not a brand colour.
 * - **The lift is `elevation.action`** and the press genuinely depresses
 *   (`usePressScale`, plus a shadow that sits back down), both read off the
 *   theme — so a `depth: 'flat'` seed produces a flat button with no branch in
 *   this file, because the tokens are already inert. `usePressScale` is
 *   reduced-motion aware by construction (§36.10): with Reduce Motion on the
 *   scale stays at 1 and the elevation change carries the feedback alone.
 * - **The busy state lives in the trailing slot.** The base put a spinner
 *   *before* the label, which widens the button the moment it starts working —
 *   the same "it moved" defect §5 forbids for the disabled state. Here the
 *   trailing `→` is simply replaced by the spinner: one slot, one indicator,
 *   no reflow. It is `SpinnerV4` rather than the platform `ActivityIndicator`,
 *   so the busy state can actually stop under Reduce Motion.
 * - **Busy is not disabled.** M3 spends `0.38` to mean *unavailable*, and the
 *   base dimmed the whole button (spinner included) while it was working. This
 *   one blocks the second press but stays at full strength; only a genuinely
 *   disabled button dims.
 *
 * Disabled is the **same shape** at reduced opacity — never a different shape,
 * or the button appears to move when it enables (§5).
 */
export declare function AuthSubmitButtonV4({ label, onPress, loading, disabled, trailingArrow, tone, trailingIcon, busyLabel, accessibilityLabel, style, }: AuthSubmitButtonV4Props): React.ReactElement;
//# sourceMappingURL=AuthSubmitButtonV4.d.ts.map