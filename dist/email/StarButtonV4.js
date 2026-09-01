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
exports.StarButtonV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const mail_v4_1 = require("./internal/mail-v4");
/**
 * The glyph's size as a type-scale class.
 *
 * Redrawn here rather than delegated to `Icon` because `IconColor` has no
 * contrast-corrected slot: `Icon` can only paint the star in `warn`, which is a
 * **fill**. `ReadReceiptV4` resolves the same conflict the same way.
 */
const GLYPH_SIZE = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
};
/** 44 on both axes, composed from the spacing scale — never a typed 44. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/**
 * **V4 star button** — same props as {@link StarButton} plus `starLabel` and
 * `unstarLabel`.
 *
 * ## Five changes
 *
 * 1. **It is big enough to hit.** The base was a glyph in `xs` padding — about
 *    26px square — sitting on the busiest line of a mail row, between a subject
 *    that opens the message and a row that opens the message. A miss did not do
 *    nothing; it opened the mail.
 * 2. **The name is the action, and the state is `aria-pressed`.** "Starred" as
 *    a *name* tells a reader what the message is, not what the button will do,
 *    so nothing announced that pressing it would remove the star. Native said
 *    the same thing a third way. Both twins now name the action and carry the
 *    state in the toggle state.
 * 3. **The star is inked with `warnText`, not the `warn` fill.** The fill slot
 *    carries a contrast promise for things drawn *on* it, not for a mark drawn
 *    *in* it, and an amber star on a white row was the thinnest thing in the
 *    list.
 * 4. **Press is a state layer.** `hover:opacity-70` dims the control's own
 *    content, which is the band M3 spends on *disabled* — a hovered star and a
 *    dead star looked alike.
 * 5. **Disabled is 0.38**, M3's number, not the `opacity-50` that was picked
 *    because fifty is round.
 */
exports.StarButtonV4 = React.forwardRef(function StarButtonV4({ starred = false, onToggle, size = 'lg', disabled = false, starLabel = 'Star', unstarLabel = 'Remove star', className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-label": starred ? unstarLabel : starLabel, "aria-pressed": starred, disabled: disabled, onClick: () => onToggle?.(!starred), "data-xen-v4-state": "", 
        // The ink is already on the glyph; the layer only needs the ground.
        style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'currentColor'), className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-full', chrome_v4_1.MIN_TAP_CLASS, TAP_SQUARE, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS, className), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('leading-none', typeof size === 'number' ? undefined : GLYPH_SIZE[size], starred ? mail_v4_1.TONE_INK.warn : mail_v4_1.TONE_INK.muted), style: typeof size === 'number' ? { fontSize: size } : undefined, children: starred ? '★' : '☆' }) }));
});
//# sourceMappingURL=StarButtonV4.js.map