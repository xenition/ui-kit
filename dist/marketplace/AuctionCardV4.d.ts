import * as React from 'react';
import type { MoneyFormatter } from '../commerce/money';
import type { AuctionCardProps, AuctionCardVariant } from './AuctionCard';
export type { AuctionCardVariant };
export interface AuctionCardV4Props extends AuctionCardProps {
    /**
     * How long before the close the card starts leaning on the countdown.
     * Default one hour. Pass `0` to never emphasise it.
     *
     * **The emphasis is weight, not colour.** Rule 3 names "an ending auction"
     * explicitly as *not* status — so the chip goes from `soft` to `solid` and
     * from neutral to the brand, and never to `warn` or `danger`. The base did
     * the opposite: it painted every live auction `warn` and every closed one
     * `danger`, which taught a reader that amber means "an auction" and red
     * means "an auction that finished normally".
     */
    urgentBeforeMs?: number;
    /**
     * Fires once, when the auction crosses its close while the card is mounted.
     *
     * Not fired for a card that was already closed when it mounted — that is not
     * an event, it is a fact — and not fired again on re-render. Use it to
     * refetch the final price.
     */
    onEnd?: () => void;
    /**
     * Carry `elevation.card`. Default `true` — §4.6 gives a shadow to "a card
     * sitting on the page". Pass `false` inside another card.
     */
    raised?: boolean;
    /** Locale override for the bid, handed straight to `PriceTagV4`. */
    formatMoney?: MoneyFormatter;
}
/**
 * The visible countdown — **at most two units**, and only as precise as the
 * reader asked for.
 *
 * `precise` is off under Reduce Motion, which drops the seconds unit
 * altogether. That is the honest reduction for this component: a digit
 * repainting once a second *is* motion, it is motion nobody can pause, and it
 * is the kind that pulls the eye off the rest of the page. What is left —
 * `3h 12m`, `14m`, `Under a minute` — is still true, still current, and
 * changes at most once a minute. See {@link useCountdownV4} for the matching
 * change to how often it is recomputed.
 */
export declare function formatRemainingV4(ms: number, precise: boolean): string;
/**
 * The **spoken** countdown, which is a different string from the visible one
 * and has to be.
 *
 * `2d 4h` is a set of abbreviations a screen reader pronounces as "two dee
 * four aitch". This is the same fact in words, and it is said **once** — see
 * the component note on why a countdown must never live in a live region that
 * updates.
 */
export declare function spokenRemainingV4(ms: number): string;
/**
 * The clock, and the only place in either module that owns one.
 *
 * ## Controlled vs. self-ticking
 *
 * Passing `nowMs` keeps the base's contract exactly: the card is a pure
 * function of its props, no timer is started, and a test can render any moment
 * it likes. Omitting it makes the card live — which is what the brief asks
 * for, and what every real auction screen needs, since the base's "no internal
 * timer" meant the countdown was frozen at whatever `Date.now()` returned
 * during the render that happened to mount it.
 *
 * ## Why a self-scheduling timeout and not `setInterval(…, 1000)`
 *
 * Three things fall out of it, and none of them can be had from a fixed
 * interval:
 *
 * - **The period follows the smallest unit on screen.** While the readout says
 *   `2d 4h`, ticking every second repaints an identical string 3,599 times an
 *   hour. Above an hour the period is a minute; below it, a second.
 * - **Reduce Motion floors the period at a minute** and
 *   {@link formatRemainingV4} drops the seconds unit to match, so the two
 *   agree: nothing on screen changes more than once a minute, and nothing on
 *   screen is stale.
 * - **The last wait lands exactly on the close.** `Math.min(period,
 *   remaining)` means "Ended" appears at `endsAtMs`, not up to a minute after
 *   it — which matters, because the moment the button must stop accepting bids
 *   is that instant and not the next tick.
 *
 * The timer stops dead once the auction is over. A closed auction has nothing
 * left to count, and a page of fifty closed lots should not be running fifty
 * timers.
 */
export declare function useCountdownV4(endsAtMs: number, nowMs: number | undefined, reduced: boolean): {
    now: number;
    remaining: number;
    ended: boolean;
};
/** The one `<style>` id this component injects its own sheet from. Idempotent. */
export declare const AUCTION_CARD_V4_STYLE_ID = "xen-v4-auction-card-styles";
/**
 * §4.2's headline fix, plus the one rule that has to *undo* something.
 *
 * The ground moves to `card` for the reason every card in these two modules
 * does, and by attribute specificity (0-2-0 over `CardV4`'s own 0-1-0
 * `bg-surface`) because `cn()` is a plain string join with no `tailwind-merge`
 * behind it.
 *
 * The second rule is the important one. `V4_STATE_CSS` puts a transition on
 * every element carrying `data-xen-v4-state`, and the V4 line's general
 * instinct is that a changing value should ease. **A countdown must not.** The
 * brief is explicit — "do not animate the digits" — and the reason is that an
 * easing digit is unreadable at the exact moment it matters most: the last ten
 * seconds of an auction. So the countdown declares `transition: none` for
 * itself, unconditionally, in both motion preferences.
 */
export declare const AUCTION_CARD_V4_CSS = "\n[data-xen-v4-card][data-xen-v4-auction-card] {\n  background-color: var(--xen-card);\n  color: var(--xen-on-card);\n}\n[data-xen-v4-auction-countdown] {\n  transition: none;\n  animation: none;\n}\n";
/**
 * **V4 auction card** — the one genuinely time-driven component in either
 * module, and the only one that owns a clock.
 *
 * Brief §3 Group C, in one sentence: "derive from `endsAtMs`/`nowMs`, tick no
 * faster than the second, do not animate the digits, and announce the
 * remaining time once rather than on every tick." Each clause is a decision:
 *
 * 1. **Derive, and tick.** {@link useCountdownV4}. `nowMs` still freezes the
 *    card for a test; omitting it now makes it live, which the base could not
 *    do at all.
 * 2. **No faster than the second, and usually far slower.** The period follows
 *    the smallest unit actually on screen, and Reduce Motion floors it at a
 *    minute while the readout drops its seconds unit to match.
 * 3. **The digits do not animate.** No `AnimatedCounterV4` here, and an
 *    explicit `transition: none` on the countdown — see
 *    {@link AUCTION_CARD_V4_CSS}. A number *arriving* at a value is an
 *    arrival, which is what the counter's easing is for; a number *counting
 *    down* is a clock, and an eased clock is unreadable in its final seconds.
 * 4. **It is announced once.** This is the accessibility decision the whole
 *    component turns on. The naive fix — a polite live region around the
 *    countdown — is *worse than silence*: a screen reader would read a number
 *    every second, forever, and the auction screen would be unusable. So the
 *    visible chip is `aria-hidden` (it is decoration whose value is wrong a
 *    moment later), and a visually-hidden polite region carries one sentence,
 *    in words, set on mount and replaced exactly once more when the auction
 *    closes. The same shape `AnimatedCounterV4` uses, for the same reason.
 *
 * ## What else changed
 *
 * - **The status colours are gone** (rule 3). See
 *   {@link AuctionCardV4Props.urgentBeforeMs} — the base painted a live
 *   auction `warn` and a finished one `danger`.
 * - **The bid is `PriceTagV4`** (rule 7). The base drew the most important
 *   figure on the card with a hand-written `formatMoney` call and a font size,
 *   which is the defect §2 names first.
 * - **The ground is `card`** (§4.2), the media is edge-to-edge at a fixed
 *   ratio, and the body carries the inset — the anatomy `ProductCardV4` and
 *   `ListingCardV4` share.
 * - **No bids reads "No bids yet"**, not "0 bids". A zero is a measurement; an
 *   auction nobody has bid on has not been measured.
 *
 * Composes `CardV4`, `PriceTagV4`, `BadgeV4`, `ButtonV4` and `TextV4`
 * (rule 7). Renders **nothing** without a title (§4.5).
 */
export declare const AuctionCardV4: React.ForwardRefExoticComponent<AuctionCardV4Props & React.RefAttributes<HTMLDivElement>>;
/** Exported for the twin's parity check and for tests that assert the scale. */
export declare const AUCTION_V4_TIMING: {
    SECOND_MS: number;
    MINUTE_MS: number;
    HOUR_MS: number;
    DAY_MS: number;
};
//# sourceMappingURL=AuctionCardV4.d.ts.map