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
exports.SessionCompleteCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * SessionCompleteCard (web parity) — the peak moment after a practice: a festive
 * brand gradient ground, a big frosted `bg-primary-500` check badge, and frosted
 * stat chips (minutes, streak). `Done` is a near-white `bg-on-primary
 * text-primary` pill; `Reflect` is a bordered ghost. Each action renders only
 * when its handler is set. Near-white ink and the gradient derive from the brand
 * ramp — token-only colors. The one screen allowed to feel like a reward.
 */
exports.SessionCompleteCard = React.forwardRef(function SessionCompleteCard({ title = 'Session complete', message, minutes, streakDays, onDone, onReflect, className, ...rest }, ref) {
    const Chip = ({ glyph, text }) => ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-500 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-primary", children: text })] }));
    const a11y = `${title}${message ? ', ' + message : ''}${minutes != null ? ', ' + minutes + ' minutes' : ''}${streakDays != null ? ', ' + streakDays + ' day streak' : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-session-complete-card": "", className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": "Complete", className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary-500", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "2xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsxs)("div", { "aria-label": a11y, className: "flex flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-center text-xl font-extrabold text-on-primary", children: title }), message ? (0, jsx_runtime_1.jsx)("p", { className: "text-center text-sm text-primary-100", children: message }) : null] }), minutes != null || streakDays != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap justify-center gap-[var(--xen-space-sm)]", children: [minutes != null ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83E\uDDD8", text: `${minutes} min` }) : null, streakDays != null ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83D\uDD25", text: `${streakDays} day streak` }) : null] })) : null, onDone || onReflect ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex flex-wrap justify-center gap-[var(--xen-space-sm)]", children: [onDone ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Done", onClick: onDone, className: "rounded-full bg-on-primary px-[var(--xen-space-xl)] py-[var(--xen-space-sm)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Done" })) : null, onReflect ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Reflect", onClick: onReflect, className: "rounded-full border border-on-primary px-[var(--xen-space-xl)] py-[var(--xen-space-sm)] text-base font-bold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Reflect" })) : null] })) : null] }));
});
//# sourceMappingURL=SessionCompleteCard.js.map