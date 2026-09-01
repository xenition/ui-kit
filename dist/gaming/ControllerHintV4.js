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
exports.ControllerHintV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const arcade_v4_1 = require("./internal/arcade-v4");
/** Only the type scale changes with `size`; the cap's box is derived from it. */
const CAP_TEXT = { sm: 'text-xs', md: 'text-sm' };
/**
 * The key cap's box, in **`em`**.
 *
 * The base pinned it at `h-5 min-w-[20px]` and `h-[26px] min-w-[26px]` — two
 * absolute boxes around text that is free to grow. A reader at 200% type got
 * an `A` overflowing a 20px cap, or clipped by it. One and a half times the
 * glyph's own size tracks whatever the user has asked for.
 */
const CAP_BOX = 'min-h-[1.5em] min-w-[1.5em]';
/**
 * **V4 controller hint** — the same props as {@link ControllerHint}.
 *
 * ## Three changes
 *
 * 1. **The hint is announced in the order it is drawn.** The label was
 *    `` `${action}: ${button}` `` — so a sighted player read "Ⓐ Jump" and a
 *    screen-reader user heard "Jump: A", the mapping backwards. In a HUD strip
 *    of six hints that is six inverted sentences to reassemble. It is built
 *    with `spokenLine()` now, button first, in the reading order.
 * 2. **The key cap scales with Dynamic Type.** See {@link CAP_BOX}: the box
 *    was two hand-picked pixel heights around text that grows with the user's
 *    type setting, so a large-type player got a clipped glyph.
 * 3. **A strip of hints is a list.** It was a bare `flex` of `role="img"`
 *    spans with no container, so a reader had no count and no way to move
 *    through the mapping one hint at a time.
 */
exports.ControllerHintV4 = React.forwardRef(function ControllerHintV4({ button, action, hints, variant = 'pill', size = 'md', className }, ref) {
    const list = hints && hints.length > 0
        ? hints
        : button != null
            ? [{ button, action: action ?? '' }]
            : [];
    if (list.length === 0)
        return null;
    const renderHint = (hint, key) => ((0, jsx_runtime_1.jsxs)("span", { role: "img", "aria-label": (0, arcade_v4_1.spokenLine)([hint.button, hint.action]), className: (0, cn_1.cn)('inline-flex items-center gap-xs', CAP_TEXT[size], variant === 'pill' && 'rounded-full border border-border bg-surface px-sm py-xs'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-[var(--xen-radius-sm)]', 'bg-primary px-xs font-bold text-on-primary', CAP_BOX), children: hint.button }), hint.action ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-on-surface", children: hint.action })) : null] }, key));
    if (list.length === 1) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, children: renderHint(list[0], 'h0') }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, children: (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-wrap gap-sm", children: list.map((hint, index) => ((0, jsx_runtime_1.jsx)("li", { children: renderHint(hint, `h${index}`) }, `h${index}`))) }) }));
});
//# sourceMappingURL=ControllerHintV4.js.map