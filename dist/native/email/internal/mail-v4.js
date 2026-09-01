"use strict";
/**
 * The `email` module's own V4 vocabulary (native) — the twin of
 * `email/internal/mail-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThreadExpansion = exports.toneInk = exports.skeletonFill = exports.onPair = exports.canSendMail = void 0;
exports.labelInk = labelInk;
exports.rowSelectedGround = rowSelectedGround;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const thread_state_v4_1 = require("../../../email/thread-state-v4");
Object.defineProperty(exports, "canSendMail", { enumerable: true, get: function () { return thread_state_v4_1.canSendMail; } });
Object.defineProperty(exports, "useThreadExpansion", { enumerable: true, get: function () { return thread_state_v4_1.useThreadExpansion; } });
/**
 * A mail label is **identity, not status**.
 *
 * `MailLabelTone` handed labels `'success' | 'warn' | 'danger'`, so a
 * Gmail-style "Receipts" chip rendered in the error colour and was
 * indistinguishable from a genuine failure in the same list.
 */
function labelInk(theme, tone) {
    const identity = tone === 'success' || tone === 'warn' || tone === 'danger' ? 'neutral' : tone;
    return (0, tone_v4_1.toneInk)(theme, identity);
}
/**
 * The selected / pressed row ground.
 *
 * Three components used `colors.border` — a hairline token — as the pressed
 * fill, and web resolved `selected` and `hover` to the *same* ramp step, so a
 * hovered row was indistinguishable from the selected one in a split-view
 * inbox. The theme ships `selected`/`onSelected` for exactly this.
 */
function rowSelectedGround(theme) {
    return theme.colors.selected;
}
/** Build the one accessible name a mail row should carry. */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=mail-v4.js.map