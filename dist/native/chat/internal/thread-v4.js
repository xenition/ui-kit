"use strict";
/**
 * The `chat` module's own V4 vocabulary: the presence and receipt tables, and
 * the named size scale that replaces four `size?: number` props.
 *
 * The tone-to-ink table lives in `primitives/internal/tone-v4`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECEIPT_META = exports.PRESENCE_META = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.onPair = exports.metaLine = void 0;
exports.chatSize = chatSize;
exports.clock = clock;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
function chatSize(theme, size) {
    const { spacing } = theme.tokens;
    return size === 'sm' ? spacing.sm : size === 'lg' ? spacing.lg : spacing.md;
}
/**
 * Presence → tone and default word.
 *
 * `away` takes `warn` in the base, which overstates it: stepping away is not
 * a caution. It is `neutral` here, and `busy` keeps `danger` because "do not
 * disturb" genuinely is a stop signal.
 */
exports.PRESENCE_META = {
    online: { label: 'Online', tone: 'success' },
    away: { label: 'Away', tone: 'neutral' },
    busy: { label: 'Busy', tone: 'danger' },
    offline: { label: 'Offline', tone: 'neutral' },
};
/**
 * Receipt → glyph, default word and tone.
 *
 * `failed` is the only state a user must act on, and the base announced it as
 * passively as `sent`. It is `danger`-toned and, in V4, assertive.
 */
exports.RECEIPT_META = {
    sending: { glyph: '◌', label: 'Sending', tone: 'neutral' },
    sent: { glyph: '✓', label: 'Sent', tone: 'neutral' },
    delivered: { glyph: '✓✓', label: 'Delivered', tone: 'neutral' },
    read: { glyph: '✓✓', label: 'Read', tone: 'primary' },
    failed: { glyph: '⊗', label: 'Not delivered', tone: 'danger' },
};
/** Seconds as `m:ss`, for a voice note's duration and position. */
function clock(seconds) {
    const total = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}
//# sourceMappingURL=thread-v4.js.map