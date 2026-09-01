"use strict";
/**
 * The `events` module's own V4 vocabulary (native) — the twin of
 * `events/internal/event-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABULAR = exports.BADGE_V4 = exports.AGENDA_TONE = exports.RSVP_TONE = exports.weekdayName = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.seatParts = exports.remainingParts = exports.onPair = exports.monthName = exports.dayNumber = exports.countdownSentence = exports.countdownParts = void 0;
exports.placeholderGround = placeholderGround;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const schedule_v4_1 = require("../../../events/schedule-v4");
Object.defineProperty(exports, "countdownParts", { enumerable: true, get: function () { return schedule_v4_1.countdownParts; } });
Object.defineProperty(exports, "countdownSentence", { enumerable: true, get: function () { return schedule_v4_1.countdownSentence; } });
Object.defineProperty(exports, "dayNumber", { enumerable: true, get: function () { return schedule_v4_1.dayNumber; } });
Object.defineProperty(exports, "monthName", { enumerable: true, get: function () { return schedule_v4_1.monthName; } });
Object.defineProperty(exports, "remainingParts", { enumerable: true, get: function () { return schedule_v4_1.remainingParts; } });
Object.defineProperty(exports, "seatParts", { enumerable: true, get: function () { return schedule_v4_1.seatParts; } });
Object.defineProperty(exports, "weekdayName", { enumerable: true, get: function () { return schedule_v4_1.weekdayName; } });
/**
 * An RSVP answer is a **choice, not a status**.
 *
 * `RSVPButton` painted `going → success`, `maybe → warn`, `declined → danger`
 * — the same three slots the module spends on `cancelled` and `Sold out`. A
 * user saying they cannot come is not an error, and "Maybe" is not a warning.
 */
exports.RSVP_TONE = {
    going: 'primary',
    maybe: 'neutral',
    declined: 'neutral',
};
/**
 * An agenda item's progress is **not colour alone**.
 *
 * `STATUS_DOT` gave `upcoming`, `live` and `done` three hues and a text
 * counterpart for `live` only, so a finished session and a future one differed
 * by an 8px dot and nothing else. `done` was also painted `bg-border` — a
 * hairline token with no promise of being visible as a solid dot.
 */
exports.AGENDA_TONE = {
    upcoming: 'neutral',
    live: 'success',
    done: 'neutral',
};
/** One badge shape for the whole module. */
exports.BADGE_V4 = { variant: 'soft', size: 'sm' };
/** Dates, times, prices and seat counts that stack in a column. */
exports.TABULAR = { fontVariant: ['tabular-nums'] };
/**
 * The ground behind a skeleton or an unloaded cover.
 *
 * Eight components reached for `tokens.ramps.neutral[100|200]`, and the native
 * ramp is **light-oriented in both schemes** — the theme's own comment says so
 * — so every skeleton in this module was a near-white slab on a dark surface.
 */
function placeholderGround(theme) {
    return (0, tone_v4_1.skeletonFill)(theme);
}
/**
 * Build the one accessible name an interactive events row or card should
 * carry.
 *
 * Nine of the twelve components put a short label on the interactive root,
 * which **replaces** the subtree — so every date, time, price, seat count,
 * capacity meter, status caption and scarcity badge in the module was
 * unreachable to a screen reader. A buyer was told the price and never that
 * two tickets remained.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=event-v4.js.map