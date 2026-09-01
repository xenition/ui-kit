import * as React from 'react';
import type { GetStartedButtonProps } from './GetStartedButton';
export interface GetStartedButtonV4Props extends GetStartedButtonProps {
    /**
     * What sits after the label.
     *
     * The base offered `trailingArrow: boolean`, and the reference screens show
     * why that is one bit too few: a forward step ends in `→`, but the *offer*
     * step ends in a sparkle — the mark is part of what the button is selling.
     * Pass any node to replace the arrow; pass `null` for nothing. Omit it and
     * `trailingArrow` decides, exactly as today.
     */
    trailing?: React.ReactNode;
    /**
     * Carry `elevation.action`. Default `true`.
     *
     * A funnel's CTA is the one control on the screen that genuinely sits above
     * the page — it is pinned over content that scrolls beneath it. A
     * `depth: 'flat'` seed has already zeroed the token, so flat apps get flat
     * for free with no branch here. Pass `false` inside a sheet or a card that
     * already casts one.
     */
    raised?: boolean;
}
/**
 * **V4 onboarding CTA** — the web twin of the native `GetStartedButtonV4`,
 * same props as {@link GetStartedButton} plus `trailing` and `raised`.
 *
 * The shape every screen in the funnel ends on: full width, `radius.full`,
 * semibold label, a trailing mark, pinned into one place so no screen
 * re-specifies it.
 *
 * ## Four changes
 *
 * 1. **The height comes off the scale** (see {@link CTA_HEIGHT}).
 * 2. **The trailing mark is a slot, not a boolean.**
 * 3. **The label and mark take contrast-corrected tones** (see
 *    {@link ARROW_COLOR}).
 * 4. **It is raised** — `elevation.action` via `ButtonV4`'s own depth, which
 *    a flat seed has already zeroed.
 *
 * `disabled` is the same shape at reduced opacity, never a different one, so
 * the button does not appear to move when it enables. The hero treatment
 * applies at `size="lg"` (the default); `sm`/`md` fall back to `ButtonV4`'s
 * compact geometry for the rare inline use.
 */
export declare const GetStartedButtonV4: React.ForwardRefExoticComponent<GetStartedButtonV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=GetStartedButtonV4.d.ts.map