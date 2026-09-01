"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUCTION_V4_TIMING = exports.AuctionCardV4 = exports.AUCTION_CARD_V4_CSS = exports.AUCTION_CARD_V4_STYLE_ID = void 0;
exports.formatRemainingV4 = formatRemainingV4;
exports.spokenRemainingV4 = spokenRemainingV4;
exports.useCountdownV4 = useCountdownV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const reduced_motion_1 = require("../motion/internal/reduced-motion");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const icon_names_1 = require("../primitives/icon-names");
const PriceTagV4_1 = require("../commerce/PriceTagV4");
const GenerativeCoverV4_1 = require("../commerce/GenerativeCoverV4");
const SECOND_MS = 1000;
const MINUTE_MS = 60000;
const HOUR_MS = 3600000;
const DAY_MS = 86400000;
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
function formatRemainingV4(ms, precise) {
    if (ms <= 0)
        return 'Ended';
    const totalSec = Math.floor(ms / SECOND_MS);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (d > 0)
        return `${d}d ${h}h`;
    if (h > 0)
        return `${h}h ${m}m`;
    if (!precise)
        return m > 0 ? `${m}m` : 'Under a minute';
    if (m > 0)
        return `${m}m ${s}s`;
    return `${s}s`;
}
const plural = (n, unit) => `${n} ${unit}${n === 1 ? '' : 's'}`;
/**
 * The **spoken** countdown, which is a different string from the visible one
 * and has to be.
 *
 * `2d 4h` is a set of abbreviations a screen reader pronounces as "two dee
 * four aitch". This is the same fact in words, and it is said **once** — see
 * the component note on why a countdown must never live in a live region that
 * updates.
 */
function spokenRemainingV4(ms) {
    if (ms <= 0)
        return 'Auction ended';
    const totalSec = Math.floor(ms / SECOND_MS);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const parts = [];
    if (d > 0) {
        parts.push(plural(d, 'day'));
        if (h > 0)
            parts.push(plural(h, 'hour'));
    }
    else if (h > 0) {
        parts.push(plural(h, 'hour'));
        if (m > 0)
            parts.push(plural(m, 'minute'));
    }
    else if (m > 0) {
        parts.push(plural(m, 'minute'));
        if (s > 0)
            parts.push(plural(s, 'second'));
    }
    else {
        parts.push(plural(s, 'second'));
    }
    return `${parts.join(' ')} left`;
}
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
function useCountdownV4(endsAtMs, nowMs, reduced) {
    const [tick, setTick] = React.useState(() => Date.now());
    const now = nowMs ?? tick;
    const remaining = endsAtMs - now;
    React.useEffect(() => {
        if (nowMs !== undefined)
            return undefined;
        const left = endsAtMs - tick;
        if (left <= 0)
            return undefined;
        const period = reduced || left > HOUR_MS ? MINUTE_MS : SECOND_MS;
        const id = window.setTimeout(() => setTick(Date.now()), Math.min(period, left));
        return () => window.clearTimeout(id);
    }, [endsAtMs, nowMs, reduced, tick]);
    return { now, remaining, ended: remaining <= 0 };
}
/** The one `<style>` id this component injects its own sheet from. Idempotent. */
exports.AUCTION_CARD_V4_STYLE_ID = 'xen-v4-auction-card-styles';
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
exports.AUCTION_CARD_V4_CSS = `
[data-xen-v4-card][data-xen-v4-auction-card] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
[data-xen-v4-auction-countdown] {
  transition: none;
  animation: none;
}
`;
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
exports.AuctionCardV4 = React.forwardRef(function AuctionCardV4({ title, currentBidCents, currency = 'USD', bidCount = 0, endsAtMs, nowMs, imageUrl, actionLabel = 'Place bid', onPlaceBid, variant = 'card', urgentBeforeMs = HOUR_MS, onEnd, raised = true, formatMoney, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.AUCTION_CARD_V4_STYLE_ID, exports.AUCTION_CARD_V4_CSS);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    const { remaining, ended } = useCountdownV4(endsAtMs, nowMs, reduced);
    const compact = variant === 'compact';
    /*
      One sentence, said at most twice in the card's life: once when it mounts
      (or when `endsAtMs` moves, which is a real event — a sniping extension),
      and once when the auction closes. The region starts EMPTY on purpose: a
      polite region that already has content when it is inserted is not
      announced by most screen readers, so the first announcement has to be a
      change. `AnimatedCounterV4` does the same thing for the same reason.
    */
    const [announcement, setAnnouncement] = React.useState('');
    React.useEffect(() => {
        setAnnouncement(spokenRemainingV4(endsAtMs - (nowMs ?? Date.now())));
        // Deliberately NOT keyed on the tick: that is the whole point.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endsAtMs]);
    React.useEffect(() => {
        if (ended)
            setAnnouncement('Auction ended');
    }, [ended]);
    /*
      `onEnd` fires on the *crossing*, never on mount. A card that was already
      closed when it rendered has not just ended; it ended before anyone looked
      at it, and calling back would refetch a price that never changed.
    */
    const wasEnded = React.useRef(ended);
    React.useEffect(() => {
        if (ended && !wasEnded.current)
            onEnd?.();
        wasEnded.current = ended;
    }, [ended, onEnd]);
    // A lot with no title is the blank bordered box §4.5 rules out.
    if (title === undefined || title === null || title === '')
        return null;
    const urgent = !ended && urgentBeforeMs > 0 && remaining <= urgentBeforeMs;
    const countdown = formatRemainingV4(remaining, !reduced);
    const timer = ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4
    // Decoration: its value is wrong a second later, and the truth lives in
    // the live region below. Rule 6 is satisfied there, not here.
    , { "aria-hidden": "true", "data-xen-v4-auction-countdown": ended ? 'ended' : urgent ? 'urgent' : 'live', 
        // Rule 3: emphasis is weight and the brand, never `warn` / `danger`.
        tone: urgent ? 'primary' : 'neutral', variant: ended ? 'outline' : urgent ? 'solid' : 'soft', size: "sm", className: "shrink-0", children: ended ? 'Ended' : `${(0, icon_names_1.resolveIconGlyph)('clock')} ${countdown}` }));
    /*
      The chip and its one accessible carrier, together, so the sentence a
      screen reader reaches sits exactly where the countdown is drawn rather
      than trailing the card. The region is EMPTY on the first render on
      purpose: a polite region that already has content when it is inserted is
      not announced by most screen readers, so the first announcement has to be
      a change. `AnimatedCounterV4` does the same thing for the same reason.
    */
    const timerSlot = ((0, jsx_runtime_1.jsxs)("span", { "data-xen-v4-auction-timer": "", className: "inline-flex shrink-0 items-center", children: [timer, (0, jsx_runtime_1.jsx)("span", { "data-xen-v4-auction-announce": "", className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: announcement })] }));
    const media = compact ? null : ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-auction-media": "", 
        // `muted`, not a neutral ramp step: the ramps carry the LIGHT
        // orientation in both schemes, so a ramp well is a pale rectangle on a
        // dark page. The same slot `ProductCardV4` and `ListingCardV4` use.
        className: "relative aspect-[16/9] w-full overflow-hidden bg-muted", children: [imageUrl !== undefined && imageUrl !== '' ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover", loading: "lazy" })) : (
            // The same plate the other two cards fall back to, from the same
            // seed. Deliberately unlabelled: the title is printed beneath it.
            (0, jsx_runtime_1.jsx)(GenerativeCoverV4_1.GenerativeCoverV4, { seed: title, className: "h-full w-full" })), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-sm top-sm", children: timerSlot })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-v4-auction-card": variant, variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "none", className: (0, cn_1.cn)('flex flex-col overflow-hidden', className), ...rest, children: [media, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, className: "min-w-0 flex-1", children: title }), compact ? timerSlot : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: "Current bid" }), (0, jsx_runtime_1.jsx)(PriceTagV4_1.PriceTagV4, { cents: currentBidCents, currency: currency, formatMoney: formatMoney, size: "lg" })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", className: "shrink-0", children: bidCount === 0
                                    ? 'No bids yet'
                                    : `${bidCount.toLocaleString()} ${bidCount === 1 ? 'bid' : 'bids'}` })] }), onPlaceBid != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onClick: onPlaceBid, disabled: ended, children: ended ? 'Auction ended' : actionLabel })) : null] })] }));
});
/** Exported for the twin's parity check and for tests that assert the scale. */
exports.AUCTION_V4_TIMING = { SECOND_MS, MINUTE_MS, HOUR_MS, DAY_MS };
//# sourceMappingURL=AuctionCardV4.js.map