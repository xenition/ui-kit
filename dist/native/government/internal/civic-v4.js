"use strict";
/**
 * The `government` module's own V4 vocabulary (native) — the twin of
 * `government/internal/civic-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDENTITY_TONE = exports.CARD_V4 = exports.BADGE_V4 = exports.toneInk = exports.toneFill = exports.statusSentence = exports.skeletonFill = exports.onPair = exports.labelledId = exports.isAdverse = void 0;
exports.tintGround = tintGround;
exports.tintInk = tintInk;
exports.placeholderGround = placeholderGround;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const v4_state_1 = require("../../../primitives/internal/v4-state");
const civic_v4_1 = require("../../../government/civic-v4");
Object.defineProperty(exports, "isAdverse", { enumerable: true, get: function () { return civic_v4_1.isAdverse; } });
Object.defineProperty(exports, "labelledId", { enumerable: true, get: function () { return civic_v4_1.labelledId; } });
Object.defineProperty(exports, "statusSentence", { enumerable: true, get: function () { return civic_v4_1.statusSentence; } });
/**
 * A tinted disc or banner, with an ink that carries a promise.
 *
 * The base module ships `internal/tint.ts`, a shared table whose every
 * foreground is a **fill token used as ink** — `text-success`, `text-warn`,
 * `text-danger`, `text-muted`, `text-primary`, `text-accent` — on grounds
 * built from ramp steps. Every component that calls it inherits both defects
 * at once.
 *
 * Its own docblock says "Mirror of the insurance module's `internal/tint.ts`",
 * and it is: the two files are byte-identical apart from that one sentence. So
 * the same table sits in a second module, and only the copy that documents
 * itself as a mirror knows the other exists.
 *
 * There is no native counterpart to either, so the twins diverge — web has a
 * fixed table, native uses `withAlpha` per call site.
 */
/**
 * The ground behind a tinted disc or banner.
 *
 * Opaque and card-relative, the way `skeletonFill` is — not a translucent
 * `withAlpha` wash, which borrows whatever happens to be behind it and so
 * renders a different colour on a card, a sheet and a page. This is the twin
 * of the web's `tintGround`, which mixes through `toneGround`.
 */
function tintGround(theme, tone) {
    return (0, v4_state_1.stateMix)(theme.colors.card, (0, tone_v4_1.toneFill)(theme, tone), 'focus', theme.state);
}
function tintInk(theme, tone) {
    return (0, tone_v4_1.toneInk)(theme, tone);
}
/**
 * One badge shape, and one card variant, for the whole module.
 *
 * Every badge in `government` is a filled pill on web and a soft tint on
 * native — ten components — and every card is `outlined` on web and
 * `elevated`/`interactive` on native — nine components. Neither twin passes
 * what the other passes, so the same civic screen is two different designs.
 */
exports.BADGE_V4 = { variant: 'soft', size: 'sm' };
exports.CARD_V4 = 'elevated';
/** A department, a service category and a document type are identity. */
exports.IDENTITY_TONE = 'neutral';
/** The ground behind a skeleton — never `border`, never a ramp step. */
function placeholderGround(theme) {
    return (0, tone_v4_1.skeletonFill)(theme);
}
/**
 * Build the one accessible name an interactive civic row or card should carry.
 *
 * All five pressable components use a fixed three-field template that omits
 * exactly what a civic user needs: the "Unavailable" channel, the notice date
 * and venue, the next payment date and case number, the "Urgent" priority, the
 * agency and the filing date.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=civic-v4.js.map