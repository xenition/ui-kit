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
exports.CalloutV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const feedback_v4_1 = require("./internal/feedback-v4");
/**
 * Per-tone ground and title. `neutral` gets `bg-surface` — a note with no tone
 * is not a faint warning, and a grey wash would only make a colourless thing
 * look broken.
 */
const TONE = {
    info: {
        ground: `bg-[${(0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.info.fill, feedback_v4_1.TINT_ASIDE)}]`,
        title: 'text-primary-text',
    },
    success: {
        ground: `bg-[${(0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.success.fill, feedback_v4_1.TINT_ASIDE)}]`,
        title: 'text-success-text',
    },
    warn: {
        ground: `bg-[${(0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.warn.fill, feedback_v4_1.TINT_ASIDE)}]`,
        title: 'text-warn-text',
    },
    danger: {
        ground: `bg-[${(0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.danger.fill, feedback_v4_1.TINT_ASIDE)}]`,
        title: 'text-danger-text',
    },
    neutral: { ground: 'bg-surface', title: 'text-muted-text' },
};
/**
 * **V4 callout** — the web twin of the native `CalloutV4`, same props as
 * {@link Callout}, a different design line.
 *
 * ## An aside is not an alert
 *
 * The base callout drew a **full 1px ring in the tone colour**. A red box around
 * a tip and a red box around a failed payment are then the same object at the
 * same volume, and the reader learns that a red edge means nothing in
 * particular. `design.md` §35.6 asks colour to build hierarchy rather than
 * noise, and a component that spends `danger` on an aside has spent a meaning
 * the product may need later for a real one (§35.4).
 *
 * So V4 sets the feedback line's loudness by **tint depth, not by hue**:
 *
 * | component  | ground          | edge             |
 * | ---------- | --------------- | ---------------- |
 * | `BannerV4` | the solid tone  | none, full bleed |
 * | `AlertV4`  | tone at 10%     | tone rule, 4px   |
 * | `CalloutV4`| tone at 6%      | neutral hairline |
 *
 * Three different volumes for three different jobs, all reading as one family
 * because they are made of the same two moves.
 *
 * The edge is `border-border` — re-derived per scheme by the provider — so the
 * box says "this is a container" and the tint says which kind, instead of both
 * saying the same thing twice.
 *
 * The title takes the compiler's contrast-safe TEXT form of the tone, never the
 * fill: the fill is a background colour with no promise against `surface`, and
 * this kit has measured such a pairing as low as 1.32:1. The 6% ground is
 * shallow enough that the compiler's `surface` guarantee still holds on it; the
 * native twin re-measures the same mix with `ensureContrast` and its spec is
 * what holds the claim.
 */
exports.CalloutV4 = React.forwardRef(function CalloutV4({ tone = 'info', icon, title, className, children, ...rest }, ref) {
    const t = TONE[tone];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-callout": tone, role: "note", className: (0, cn_1.cn)('flex items-start gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)]', 'border border-border p-[var(--xen-space-md)]', t.ground, className), ...rest, children: [icon != null && (0, jsx_runtime_1.jsx)("span", { className: "inline-flex shrink-0", children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [title != null && ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('font-heading text-sm font-semibold', t.title), children: title })), children != null && (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-on-surface", children: children })] })] }));
});
//# sourceMappingURL=CalloutV4.js.map