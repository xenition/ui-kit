import * as React from 'react';
import type { AuthSwitchFooterProps } from './AuthCard';
/**
 * How much weight the action carries.
 *
 * `'primary'` is §9's line — "Don't have an account? **Register**" — where the
 * action is the whole point of the line and reads in `primaryText`.
 *
 * `'muted'` is §5's line — the "No thanks" / "Back" that sits **below** the
 * CTA. §5 is explicit that it must never compete with the CTA for weight, so
 * this tone drops both the colour and the weight: `mutedText` at `medium`
 * rather than `primaryText` at `semibold`. It is the same anatomy at a lower
 * volume, not a second component.
 */
export type AuthSwitchTone = 'primary' | 'muted';
export interface AuthSwitchFooterV4Props extends AuthSwitchFooterProps {
    /** How loudly the action reads. Default `'primary'` — the §9 register line. */
    tone?: AuthSwitchTone;
}
/**
 * **V4 auth switch footer** — the native twin of the web `AuthSwitchFooterV4`,
 * the base's props plus {@link AuthSwitchTone}, a different design line.
 *
 * §9's centred footer line carrying the opposite action. One line, one
 * emphasis: the prompt is muted, the action is the only thing with weight.
 *
 * ## What V4 changes
 *
 * **The link is a real tap target.** The base put `minHeight: 44` on the *row*
 * and gave the `Pressable` a `hitSlop`, which extends the touchable area but
 * leaves the *visible* target the size of the word — so the press feedback and
 * the thing the user aimed at were different shapes. The minimum moves onto the
 * pressable itself, composed as `2xl - xs` off the spacing scale rather than
 * remembered as `44`: the same expression `ButtonV4` and the V4 nav line
 * compose, so a footer link, a nav row and a button land on one size.
 *
 * **It answers the press with a layer, not a dim.** The base auth family fades
 * a pressed control to `opacity: 0.6`, which lightens the control's own
 * *content* — the signal M3 spends 0.38 on to mean **disabled**. So a pressed
 * link and a dead link looked alike. V4 tints the container instead:
 * `pressFill`, the M3 pressed layer flattened opaquely against `surface`,
 * because this label carries a measured contrast promise against the surface it
 * is drawn on and a translucent layer would make that promise depend on
 * whatever the caller put behind the footer.
 *
 * **The prompt reads.** `muted` is `neutral[600]` and carries no contrast
 * promise; `mutedText` is that slot corrected to AA on `surface`, once, by the
 * compiler. A footer line is small type, which is the last place that can
 * afford ink nobody measured.
 *
 * **Nothing renders without a label** (§10.6/§12).
 */
export declare function AuthSwitchFooterV4({ prompt, label, onPress, disabled, tone, style, }: AuthSwitchFooterV4Props): React.ReactElement | null;
//# sourceMappingURL=AuthSwitchFooterV4.d.ts.map