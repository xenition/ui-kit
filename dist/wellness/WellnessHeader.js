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
exports.WellnessHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * WellnessHeader (web parity) — the home-screen header: a soft brand gradient
 * ground with a greeting and name, an optional profile avatar, and frosted
 * "glass" stat chips (streak, minutes today). Near-white ink (`text-on-primary`
 * / `text-primary-100`) and the gradient both derive from the brand ramp; the
 * frosted chips are `bg-primary-500`. Token-only colors, the single vivid
 * surface on the screen.
 */
exports.WellnessHeader = React.forwardRef(function WellnessHeader({ greeting = 'Good morning', name, subtitle, streakDays, minutes, avatarGlyph = '🧘', onProfile, className, ...rest }, ref) {
    const Chip = ({ glyph, text }) => ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-500 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-primary", children: text })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-wellness-header": "", className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-primary-100", children: greeting }), name ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-2xl font-extrabold text-on-primary", children: name }) : null, subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-sm text-primary-100", children: subtitle }) : null] }), onProfile ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Open profile", onClick: onProfile, className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: avatarGlyph }) })) : null] }), streakDays != null || minutes != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-sm)]", children: [streakDays != null ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83D\uDD25", text: `${streakDays} day streak` }) : null, minutes != null ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83E\uDDD8", text: `${minutes} min today` }) : null] })) : null] }));
});
//# sourceMappingURL=WellnessHeader.js.map