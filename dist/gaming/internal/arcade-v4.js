"use strict";
/**
 * The `gaming` module's own V4 vocabulary (web) — the twin of
 * `native/gaming/internal/arcade-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ART_INK = exports.ART_SCRIM = exports.PLACEHOLDER_CLASS = exports.TABULAR_CLASS = exports.BADGE_V4 = exports.IDENTITY_TONE = exports.TONE_ON = exports.TONE_INK = exports.SKELETON_CLASS = exports.slotParts = exports.questParts = void 0;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
const progress_v4_1 = require("../progress-v4");
Object.defineProperty(exports, "questParts", { enumerable: true, get: function () { return progress_v4_1.questParts; } });
Object.defineProperty(exports, "slotParts", { enumerable: true, get: function () { return progress_v4_1.slotParts; } });
/**
 * A genre, a rarity tier and a podium place are **identity, not status**.
 *
 * The module spent status slots on all three: genre was `primary` on web and
 * `accent` on native, rarity ran across `success`/`primary`/`accent`/`warn`,
 * gold was `warn` and bronze `accent`, a reward was `warn`, and a **full
 * lobby** was `danger` — a capacity fact drawn as an error.
 *
 * The glyph, the medal and the frame carry which tier it is. `neutral` frees
 * every status slot to mean status.
 */
exports.IDENTITY_TONE = 'neutral';
/** One badge shape for the whole module. */
exports.BADGE_V4 = { variant: 'soft', size: 'sm' };
/** Scores, ranks and XP all stack in a column. */
exports.TABULAR_CLASS = 'tabular-nums';
/** The ground behind cover art that has not loaded — never `border`. */
exports.PLACEHOLDER_CLASS = tone_v4_1.SKELETON_CLASS;
/**
 * A scrim over **cover art** is not a themed surface.
 *
 * `GameCardV2` built one from `from-neutral-900/75` with `text-neutral-50` on
 * it — and the web ramp inverts under `[data-theme="dark"]` while the artwork
 * does not, so the scrim went light over an unchanged image. The native twin
 * had the mirror: `tokens.ramps.neutral[900]`, which is **not** inverted for
 * native, so the scrim never darkened for dark mode at all.
 */
exports.ART_SCRIM = 'rgba(0, 0, 0, 0.62)';
exports.ART_INK = '#ffffff';
/**
 * Build the one accessible name an interactive gaming row or card should
 * carry.
 *
 * Ten web components and seventeen native ones put a short label on a root
 * that prunes its own subtree — and in `MatchmakingStatus`, `GameCard` and
 * `LevelBar` what it pruned was a **control** or a `progressbar`.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=arcade-v4.js.map