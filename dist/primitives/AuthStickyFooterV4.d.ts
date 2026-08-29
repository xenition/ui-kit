import * as React from 'react';
import type { AuthStickyFooterProps } from './AuthCard';
export interface AuthStickyFooterV4Props extends AuthStickyFooterProps {
    /**
     * §5's secondary action — "No thanks", "Back". Rendered **below** the CTA as
     * a centred, muted text link, never beside it.
     */
    secondaryLabel?: string;
    /** Fires when the secondary link is pressed. */
    onSecondaryClick?: () => void;
    /** Freezes the secondary link. The CTA's own disabled state is its own. */
    secondaryDisabled?: boolean;
    /**
     * Pad the band by the viewport's bottom safe-area inset. Default `true` —
     * §5 says the footer sits *above* the inset.
     *
     * Turn it off only when an ancestor has already consumed the inset (a bottom
     * sheet, a `SafeAreaView`); paying for it twice leaves a visible gap under
     * the CTA.
     */
    safeArea?: boolean;
}
/**
 * **V4 auth sticky footer** — the web twin of the native `AuthStickyFooterV4`,
 * the base's props plus the §5 secondary action and safe-area handling.
 *
 * §5's anatomy exactly: pinned to the bottom, a hairline `border` divider on
 * top and an opaque `surface` behind it, so scrolling content passes **under**
 * the action instead of colliding with it.
 *
 * ## What V4 changes
 *
 * **It clears the safe-area inset.** §5 says "above the safe-area inset" and
 * the base did not read one at all: on a notched phone the CTA sat under the
 * home indicator, which is the single most visible way a web surface admits it
 * was not designed for a phone. The band now pays `spacing.lg` *plus* the
 * inset, and `safeArea={false}` gives it back to an ancestor that already
 * consumed it.
 *
 * **The secondary action has a place.** §5: a secondary action goes below the
 * CTA as a centred muted text link, "never beside it competing for the same
 * weight". The base exposed only `children`, so where the "No thanks" landed
 * was up to whoever assembled the screen — and on the shipped screens it landed
 * beside the CTA. `secondaryLabel` puts it under the CTA, centred, at the muted
 * tone, by construction. It is drawn by `AuthSwitchFooterV4` at `tone="muted"`
 * rather than hand-rolled here (§10.5): the two footer lines are one anatomy at
 * two volumes, and this way the tap target, the state layer and the focus ring
 * are the same object in both.
 *
 * **It stacks.** The base was `sticky` with no stacking order, so a
 * transformed or positioned child of the scrolling content could paint over
 * the CTA — which defeats the entire point of the band.
 *
 * **Nothing renders when there is nothing to pin** (§10.6/§12). An empty band
 * is a hairline and a strip of surface across the bottom of the screen with no
 * explanation, the same defect as §9's divider above no providers.
 */
export declare function AuthStickyFooterV4({ children, secondaryLabel, onSecondaryClick, secondaryDisabled, safeArea, className, ...rest }: AuthStickyFooterV4Props): React.ReactElement | null;
//# sourceMappingURL=AuthStickyFooterV4.d.ts.map