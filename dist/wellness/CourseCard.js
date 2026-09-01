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
exports.CourseCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * CourseCard (web parity) — a multi-day program on a calm, clean surface card. A
 * single small gradient cover tile and a slim gradient progress fill are the
 * only color; the rest stays on the neutral surface with `on-surface`/`muted`
 * type, in the spirit of restraint. Progress is stated in words ("Day 3 of 10")
 * as well as the bar (`bg-neutral-200` track, gradient fill via inline width %),
 * so it never depends on color alone. Token-only colors.
 */
exports.CourseCard = React.forwardRef(function CourseCard({ title, subtitle, category, totalDays, completedDays = 0, coverGlyph = '🌿', onPress, className, ...rest }, ref) {
    const safeTotal = totalDays > 0 ? totalDays : 0;
    const done = Math.max(0, Math.min(completedDays, safeTotal));
    const pct = safeTotal > 0 ? (done / safeTotal) * 100 : 0;
    const a11y = `${category ? category + ', ' : ''}${title}${subtitle ? ', ' + subtitle : ''}, day ${done} of ${safeTotal}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: coverGlyph, size: 24, color: "onPrimary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [category ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: category })) : null, (0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: subtitle }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1.5 overflow-hidden rounded-full bg-neutral-200", children: (0, jsx_runtime_1.jsx)("div", { className: "h-1.5 rounded-full bg-gradient-to-br from-primary-400 to-primary-700", style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: `Day ${done} of ${safeTotal}` })] })] }));
    const shell = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5';
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": a11y, onClick: onPress, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onPress();
                }
            }, "data-xen-course-card": "", className: (0, cn_1.cn)(shell, 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, "data-xen-course-card": "", className: (0, cn_1.cn)(shell, className), ...rest, children: body }));
});
//# sourceMappingURL=CourseCard.js.map