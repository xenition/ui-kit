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
exports.BookmarkButtonV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 bookmark button** — the web twin of the native `BookmarkButtonV4`, same
 * props as {@link BookmarkButton} plus `saveLabel`, `savedLabel`, `addLabel`
 * and `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **One tone, on both twins.** Web painted the saved star `primary` and the
 *    word beside it `accent` — two brand colours inside one control — while
 *    native painted the star `accent`. Both twins now say `primary` for the
 *    glyph *and* the word, and both draw it with `primaryText`: `primary` is a
 *    fill slot with no contrast promise as ink.
 * 2. **It clears 44.** The button was roughly 26px on web with no recourse,
 *    and 26px on native rescued only by `hitSlop` — which does nothing for a
 *    pointer or a switch control.
 * 3. **Press is the state layer and disabled is 0.38.** The base invented
 *    `0.5` for disabled and `0.8` for hover; `0.5` sits inside M3's disabled
 *    band, so a hovered bookmark and a dead one looked alike.
 * 4. **The on-screen English is a prop.** `'Save'` and `'Saved'` were rendered
 *    text with no way to translate them.
 */
exports.BookmarkButtonV4 = React.forwardRef(function BookmarkButtonV4({ bookmarked, onToggle, variant = 'icon', disabled = false, saveLabel = 'Save', savedLabel = 'Saved', addLabel = 'Bookmark article', removeLabel = 'Remove bookmark', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const labeled = variant === 'labeled';
    const word = bookmarked ? savedLabel : saveLabel;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": bookmarked ? removeLabel : addLabel, "aria-pressed": bookmarked, disabled: disabled, onClick: () => onToggle(!bookmarked), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('inline-flex items-center justify-center gap-xs rounded-[var(--xen-radius-full)]', 
        // The HIG floor, composed from the spacing scale — not a typed 44.
        chrome_v4_1.MIN_TAP_CLASS, labeled
            ? 'border border-border px-md'
            : 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', v4_state_1.V4_DISABLED_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('text-lg leading-none', bookmarked ? reading_v4_1.TONE_INK.primary : reading_v4_1.TONE_INK.muted), children: bookmarked ? '★' : '☆' }), labeled ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', bookmarked ? reading_v4_1.TONE_INK.primary : 'text-on-surface'), children: word })) : null] }));
});
//# sourceMappingURL=BookmarkButtonV4.js.map