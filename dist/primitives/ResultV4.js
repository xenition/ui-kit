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
exports.ResultV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const ButtonV4_1 = require("./ButtonV4");
const cn_1 = require("./cn");
const feedback_v4_1 = require("./internal/feedback-v4");
const GLYPH = {
    success: '✓',
    error: '✕',
    empty: '∅',
    '404': '?',
};
/**
 * The status seal. `empty` and `404` take **no semantic colour at all** — an
 * empty list is not a warning and a missing page is not a failure, and tinting
 * either spends a meaning §35.4 reserves for real ones. Their disc is a shade
 * of `on-surface`, not a signal.
 */
const SEAL = {
    success: {
        disc: `bg-[${(0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.success.fill)}]`,
        mark: 'text-success-text',
    },
    error: {
        disc: `bg-[${(0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.danger.fill)}]`,
        mark: 'text-danger-text',
    },
    empty: { disc: `bg-[${(0, feedback_v4_1.tintArbitrary)('onSurface')}]`, mark: 'text-muted-text' },
    '404': { disc: `bg-[${(0, feedback_v4_1.tintArbitrary)('onSurface')}]`, mark: 'text-muted-text' },
};
/**
 * **V4 result** — the web twin of the native `ResultV4`, same props as
 * {@link Result}, a different design line.
 *
 * ## §15 says the action is the component
 *
 * "Empty states should help users progress." Not decorate the absence of
 * content — *progress*. The base drew a `text-3xl` glyph at the top, then a
 * title, then a description, then a hand-rolled `<button>` at the bottom, all
 * four at roughly equal weight. That is a screen where the illustration is the
 * loudest thing and the way out is the quietest.
 *
 * V4 inverts it:
 *
 * - **The action is `ButtonV4`**, at `lg`, not a local button with its own
 *   padding and its own focus ring. It is the kit's real primary action, and
 *   §35.11's one licensed gradient lands here — on the one primary action of
 *   the screen — rather than being spread over a status card. The way out of a
 *   dead end should look like the most solid thing on it.
 * - **The glyph shrinks** from `3xl` to `xl` and moves inside a tinted disc.
 *   §8 lists "icon inside a coloured rounded square for every row" among the
 *   tells of generic AI UI, and the escape from that rule is *for every row* —
 *   this is one mark at the centre of one full-screen state, and it is a circle,
 *   which reads as a status seal rather than as an app icon.
 * - **The description gets a measure.** Capped at eight of the largest spacing
 *   step, so a sentence of explanation stays a column instead of stretching the
 *   width of a monitor (§33 — a line too long to scan is not read).
 *
 * The mark uses the compiler's contrast-safe `*-text` form rather than the raw
 * fill, which has no promise against the tint behind it. The native twin
 * re-measures the same pairing with `ensureContrast`.
 */
exports.ResultV4 = React.forwardRef(function ResultV4({ status = 'success', title, description, actionLabel, onAction, icon, className, ...rest }, ref) {
    const seal = SEAL[status];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-result": status, role: "status", className: (0, cn_1.cn)('flex w-full flex-col items-center justify-center text-center', 'gap-[var(--xen-space-md)] bg-surface p-[var(--xen-space-xl)]', className), ...rest, children: [icon != null ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex", children: icon })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-full', 'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]', 'text-xl leading-none', seal.disc, seal.mark), children: GLYPH[status] })), (0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-2xl font-bold text-on-surface", children: title }), description != null && ((0, jsx_runtime_1.jsx)("p", { className: "max-w-[calc(var(--xen-space-2xl)*8)] text-base text-muted-text", children: description })), actionLabel && ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "lg", onClick: onAction, className: "mt-[var(--xen-space-sm)]", children: actionLabel }))] }));
});
//# sourceMappingURL=ResultV4.js.map