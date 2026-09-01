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
exports.SurveyComplete = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * SurveyComplete — the survey's peak-end **celebration hero** (V4 "focus" line).
 * A full two-hue celebratory gradient ground (`bg-gradient-to-br from-accent-400
 * to-primary-600`) carries near-white ink (`text-primary-50` / `text-primary-100`):
 * a big emoji/check mark, the headline, an optional thank-you message, and an
 * optional highlight stat as a frosted glass tile (`bg-primary-50/15 border
 * border-primary-50/30`). Big ≥44px CTAs sit in the thumb zone — a near-white
 * primary pill and an optional ghost secondary. Presentational only (shaped data
 * + callbacks). All colors from `--xen-*` token classes + gradient utilities (no
 * literal colors), dark-mode safe.
 */
exports.SurveyComplete = React.forwardRef(function SurveyComplete({ title = 'All done!', message, emoji = '🎉', stat, primaryLabel = 'Done', onPrimary, secondaryLabel, onSecondary, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-survey-complete": "", role: "status", "aria-live": "polite", className: (0, cn_1.cn)('flex flex-col items-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": title, className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30 text-3xl", children: emoji }), (0, jsx_runtime_1.jsx)("h2", { className: "mt-[var(--xen-space-md)] text-center text-2xl font-extrabold text-primary-50", children: title }), message ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-xs)] text-center text-base leading-relaxed text-primary-100", children: message })) : null, stat ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex w-full flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-primary-50", children: stat.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: stat.label })] })) : null, onPrimary || onSecondary ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex w-full flex-col gap-[var(--xen-space-sm)]", children: [onPrimary ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": primaryLabel, onClick: onPrimary, className: "flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50 py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: primaryLabel })) : null, onSecondary && secondaryLabel ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": secondaryLabel, onClick: onSecondary, className: "flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] border border-primary-50/30 py-[var(--xen-space-md)] text-base font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: secondaryLabel })) : null] })) : null] }));
});
//# sourceMappingURL=SurveyComplete.js.map