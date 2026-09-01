"use strict";
/**
 * The `email` module's own V4 vocabulary (web) — the twin of
 * `native/email/internal/mail-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACEHOLDER_CLASS = exports.ROW_HOVER_CLASS = exports.ROW_SELECTED_CLASS = exports.useThreadExpansion = exports.TONE_ON = exports.TONE_INK = exports.SKELETON_CLASS = exports.canSendMail = void 0;
exports.labelInkClass = labelInkClass;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
const thread_state_v4_1 = require("../thread-state-v4");
Object.defineProperty(exports, "canSendMail", { enumerable: true, get: function () { return thread_state_v4_1.canSendMail; } });
Object.defineProperty(exports, "useThreadExpansion", { enumerable: true, get: function () { return thread_state_v4_1.useThreadExpansion; } });
/**
 * A mail label is **identity, not status**.
 *
 * `MailLabelTone` handed labels `'success' | 'warn' | 'danger'`, so a
 * Gmail-style "Receipts" chip rendered in the error colour and was
 * indistinguishable from a genuine failure in the same list.
 */
function labelInkClass(tone) {
    return tone_v4_1.TONE_INK[(tone === 'success' || tone === 'warn' || tone === 'danger'
        ? 'neutral'
        : tone)] ?? tone_v4_1.TONE_INK.neutral;
}
/** The selected/hovered row ground — `selected`, never `border` and never a ramp step. */
exports.ROW_SELECTED_CLASS = 'bg-selected text-on-selected';
exports.ROW_HOVER_CLASS = 'hover:bg-selected/60';
/** The ground behind a skeleton row — never `border`. */
exports.PLACEHOLDER_CLASS = tone_v4_1.SKELETON_CLASS;
/**
 * Build the one accessible name a mail row should carry.
 *
 * `role="button"` makes its children **presentational**, so the preview, the
 * thread count and every label chip were removed from the accessibility tree
 * outright — the row's six-item `aria-label` was all a reader ever got.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=mail-v4.js.map