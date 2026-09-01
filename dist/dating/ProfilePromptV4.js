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
exports.ProfilePromptV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const profile_v4_1 = require("./internal/profile-v4");
/**
 * **V4 profile prompt** — the web twin of the native `ProfilePromptV4`, same
 * props as {@link ProfilePrompt} plus `likeLabel`.
 *
 * ## Four changes
 *
 * 1. **The like button is a sibling, not a child of a button.** Setting
 *    `onClick` wrapped the whole block in a `<div role="button" tabIndex={0}>`
 *    with the heart *inside* it — a control nested in a control, which is
 *    invalid, which is why the heart needed `stopPropagation` to work at all,
 *    and which leaves a screen reader announcing a button whose name already
 *    contains the answer and whose only child is another button. The two are
 *    now siblings inside a plain container: the answer is a real `<button>`,
 *    the heart is a real `<button>`, and neither has to defend itself from the
 *    other.
 * 2. **The heart is hittable.** It was a bare glyph at roughly 18px, with no
 *    focus ring, on the one affordance the component is named for.
 * 3. **Liking something is not `danger`.** The filled heart wore the error slot.
 * 4. **Press is a state layer.** `hover:opacity-90` on the outer container
 *    faded the answer itself, which is the signal M3 spends on *disabled*.
 *
 * `liked` keeps carrying its state through `aria-pressed` — one name plus a
 * pressed state, rather than a label that changes out from under the user.
 */
exports.ProfilePromptV4 = React.forwardRef(function ProfilePromptV4({ prompt, answer, variant = 'card', glyph, liked = false, onClick, onLike, likeLabel = 'Like this answer', emptyLabel = 'No answer yet', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const hasAnswer = answer != null && answer.trim().length > 0;
    const text = hasAnswer ? (variant === 'quote' ? `“${answer}”` : answer) : emptyLabel;
    const body = ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: glyph })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted-text", children: prompt })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-medium', variant === 'quote' ? 'text-xl italic' : 'text-lg', hasAnswer ? 'text-on-surface' : 'text-muted-text'), children: text })] }));
    const inner = onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, profile_v4_1.spokenLine)([prompt, text]), onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('flex min-w-0 flex-1 rounded-[var(--xen-radius-md)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : (body);
    const content = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-sm", children: [inner, onLike ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": likeLabel, "aria-pressed": liked, onClick: () => onLike(), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full text-lg leading-none', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', nav_v4_1.MIN_TAP_SQUARE_CLASS, liked ? 'text-primary-text' : 'text-muted-text'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: liked ? '♥' : '♡' }) })) : null] }));
    if (variant === 'card') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, ...rest, children: (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { padding: "md", className: className, children: content }) }));
    }
    if (variant === 'quote') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] border-l-[length:var(--xen-space-xs)] border-primary px-md py-sm', 'bg-[color-mix(in_srgb,var(--xen-primary)_10%,var(--xen-surface))]', className), children: content }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: className, children: content }) }));
});
//# sourceMappingURL=ProfilePromptV4.js.map