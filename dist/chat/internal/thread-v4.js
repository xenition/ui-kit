"use strict";
/**
 * The `chat` module's own V4 vocabulary (web) — the twin of
 * `native/chat/internal/thread-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECEIPT_META = exports.PRESENCE_META = exports.CHAT_SIZE = exports.TONE_ON = exports.TONE_INK = exports.TONE_BG = exports.SKELETON_CLASS = exports.metaLine = void 0;
exports.clock = clock;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_BG", { enumerable: true, get: function () { return tone_v4_1.TONE_BG; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
/** The dot/glyph size per named step, as a Tailwind class pair. */
exports.CHAT_SIZE = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
};
/**
 * Presence → tone and default word.
 *
 * `away` takes `warn` in the base, which overstates it: stepping away is not
 * a caution. `busy` keeps `danger` because "do not disturb" is a stop signal.
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
 * passively as `sent`.
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