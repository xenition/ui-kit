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
     * the page — it is pinned over content that scrolls beneath it — so this is
     * the rare place §35.11 spends a shadow. A `depth: 'flat'` seed has already
     * zeroed the token, so flat apps get flat for free with no branch here.
     *
     * Pass `false` inside a sheet or a card that already casts one: two stacked
     * shadows read as a control that has come loose from the screen.
     */
    raised?: boolean;
}
/**
 * **V4 onboarding CTA** — the shape every screen in the funnel ends on.
 *
 * Same props as {@link GetStartedButton} plus `trailing` and `raised`, and the
 * same job: pin §5's treatment — full width, `radius.full`, semibold label,
 * a trailing mark — into one place so no screen re-specifies it.
 *
 * ## Four changes
 *
 * 1. **The height comes off the scale.** The base pinned `56`. A seed that
 *    tightens `spacing` moved every field on the screen and left the CTA at 56,
 *    so the funnel's control family quietly split in two. `2xl + sm` is the
 *    same 56 on the default scale and stays proportional on any other.
 * 2. **The trailing mark is a slot, not a boolean.** `trailingArrow` could say
 *    "arrow" or "nothing"; the reference paywall ends its CTA in a sparkle,
 *    which is neither. `trailing` takes any node and `trailingArrow` still
 *    decides when it is omitted, so no existing caller moves.
 * 3. **The label takes a contrast-corrected tone.** The base painted the
 *    outlined and quiet variants' labels `primary` — a **fill** slot the
 *    compiler promises nothing about as ink on `surface`, and measurably as
 *    low as 1.3:1 on a pale seed. `primaryText` is that same colour pulled
 *    until it clears AA.
 * 4. **It is raised.** The CTA is pinned over scrolling content and is the one
 *    control on the screen that really is above the page.
 *
 * `disabled` is the same shape at `ButtonV4`'s reduced opacity — never a
 * different shape, or the button appears to move when it enables. The hero
 * treatment applies at `size="lg"` (the default); `sm`/`md` fall back to
 * `ButtonV4`'s own compact geometry for the rare inline use.
 */
export declare function GetStartedButtonV4({ onPress, label, variant, size, trailingArrow, trailing, raised, accessibilityLabel, loading, disabled, fullWidth, style, }: GetStartedButtonV4Props): React.ReactElement;
//# sourceMappingURL=GetStartedButtonV4.d.ts.map