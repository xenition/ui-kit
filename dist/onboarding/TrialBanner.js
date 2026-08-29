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
exports.TrialBanner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const TONE = {
    // The web `Icon` exposes no `accent` slot, so the `info` tone maps to the
    // primary token pair (design guidance: accent → primary).
    info: { bg: 'bg-primary', fg: 'onPrimary', iconColor: 'onPrimary' },
    warn: { bg: 'bg-warn', fg: 'onWarn', iconColor: 'onWarn' },
    success: { bg: 'bg-success', fg: 'onSuccess', iconColor: 'onSuccess' },
};
/**
 * Free-trial status strip — a tinted banner that advertises an active or
 * available trial and, optionally, a countdown chip and an inline action. Sits
 * atop the paywall (value-first framing, design.md §27) or in-app once a trial
 * is running. Tone maps to the primary/warn/success token pairs. No literal
 * colors.
 *
 * **There is deliberately no `TrialBannerV2`/`V3`.** A strip this small has one
 * correct shape, so the base component *is* its whole design line — which is
 * why a v2 or v3 paywall composing this base banner is correct rather than a
 * cross-line leak. `design-line-composition.spec.tsx` documents the same
 * conclusion from the other side.
 */
exports.TrialBanner = React.forwardRef(function TrialBanner({ title, subtitle, daysLeft, tone = 'info', actionLabel, onAction, icon = '✨', className, ...rest }, ref) {
    const t = TONE[tone];
    const days = typeof daysLeft === 'number' ? Math.max(0, daysLeft) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-2 rounded-[var(--xen-radius-md)] px-4 py-2', t.bg, className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, size: "lg", color: t.iconColor }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "bold", tone: t.fg, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: t.fg, className: "opacity-90", children: subtitle })) : null] }), days != null ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-surface px-2 py-0.5", children: (0, jsx_runtime_1.jsxs)(Text_1.Text, { size: "xs", weight: "bold", children: [days, " ", days === 1 ? 'day' : 'days', " left"] }) })) : null, actionLabel && onAction ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": actionLabel, onClick: onAction, className: "underline", children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "bold", tone: t.fg, children: actionLabel }) })) : null] }));
});
//# sourceMappingURL=TrialBanner.js.map