import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { SellerCardProps, SellerCardVariant } from './SellerCard';
export type { SellerCardVariant };
export interface SellerCardV4Props extends SellerCardProps {
    /**
     * Carry `elevation.card`. Default `true` for the `card` variant — §4.6 gives
     * a shadow to "a card sitting on the page", and this is one. Ignored by
     * `inline`, which has no card to raise.
     *
     * Pass `false` for a seller card nested inside another card; §4.6 forbids
     * nesting a shadow in a shadow.
     */
    raised?: boolean;
    /**
     * The word beside the verified mark. Default `Verified`.
     *
     * A prop rather than a constant because it is the one string in this
     * component a marketplace will want to say in its own vocabulary — "ID
     * checked", "Trusted shop" — and because it has to be translatable. It is
     * **not** a way to turn the word off: rule 6 makes the word mandatory, and
     * an empty string falls back to the default rather than leaving a bare tick.
     */
    verifiedLabel?: string;
    /**
     * What the trust line says when there is no rating yet.
     * Default `No ratings yet`.
     *
     * Silence is the wrong answer here. A seller with no history is a *fact* a
     * buyer needs, and omitting the line makes an unrated seller and a seller
     * whose rating failed to load look identical.
     */
    emptyRatingLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 seller card** — half of the trust pair, with `RatingBreakdownV4`, and
 * the highest-stakes read in the kit.
 *
 * Brief §3 Group C: "rating as a number *and* stars *and* a count, never stars
 * alone", and rule 6: "a verified seller… ships an icon **and** a label".
 * Everything below is one of those two sentences.
 *
 * 1. **The rating is three channels, not one.** The base composed
 *    `Rating showValue` — glyphs with a small number tucked inside them — and
 *    a parenthesised count beside it. V4 pulls the figure out as its own
 *    tabular text at a step the eye lands on first, keeps `RatingV4` beside it
 *    as the shape, and spells the count as words (`1,204 reviews`) rather than
 *    as `(1,204)`, which reads as a footnote marker when announced.
 * 2. **A missing rating says so.** See
 *    {@link SellerCardV4Props.emptyRatingLabel}.
 * 3. **Verified is a mark and a word**, and the mark is not announced —
 *    "check Verified" is noise, so the badge is one accessibility element
 *    named `Verified seller` and the tick stays visual. It also moves from
 *    `accent` to `primary`: verification is the marketplace's own assurance,
 *    which is the brand's job, and it matches the web twin, which used
 *    `primary` all along.
 * 4. **The ground is `card`** (§4.2) for the `card` variant; `inline` keeps no
 *    container at all, because an identity block dropped into a listing detail
 *    is a *row*, and §4.3 gives a row a transparent ground so the container
 *    owns the surface.
 * 5. **The identity block clears the tap floor** (44) and takes the state
 *    layer instead of `opacity: pressed ? 0.85 : 1` — dimming fades the card's
 *    own content, which is the signal M3 spends `0.38` on to mean *disabled*,
 *    so a pressed seller and a suspended one looked alike.
 * 6. **The contact button stays outside the press target**, as the base
 *    already had it right, so contacting never also navigates.
 *
 * Composes `CardV4`, `AvatarV4`, `RatingV4`, `BadgeV4`, `ButtonV4` and
 * `TextV4` (rule 7). Renders **nothing** without a name (§4.5) — an identity
 * block with no identity is a blank bordered box.
 */
export declare function SellerCardV4({ name, avatarUrl, rating, reviewCount, salesCount, location, verified, actionLabel, onContact, onPress, variant, raised, verifiedLabel, emptyRatingLabel, style, }: SellerCardV4Props): React.ReactElement | null;
//# sourceMappingURL=SellerCardV4.d.ts.map