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
exports.JobSiteCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const JOB_SITE_STATUS = {
    active: { label: 'On site', glyph: '▶', tone: 'success' },
    scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
    completed: { label: 'Completed', glyph: '✓', tone: 'neutral' },
    blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};
/**
 * A summary card for a job site. A tinted leading glyph disc, name/address
 * stack, a status pill (text + glyph + a color that traces to a semantic token
 * — never color alone), crew / open-order / distance meta, and an optional
 * "Directions" action. Becomes a `role="button"` surface (click / Enter /
 * Space) only when `onClick` is supplied; the Directions action is a real
 * `<button>` that stops propagation. Every color traces to a `--xen-*` token.
 */
exports.JobSiteCard = React.forwardRef(function JobSiteCard({ name, address, status, crewCount, openOrders, distance, glyph = '🏗', onNavigate, onClick, className, style }, ref) {
    const sd = JOB_SITE_STATUS[status] ?? JOB_SITE_STATUS.scheduled;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, style: style, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${name}, ${address}, ${sd.label}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), className: (0, cn_1.cn)(interactive && 'cursor-pointer transition-shadow hover:shadow-md', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)]', format_1.DISC_TINT.accent), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", "aria-label": "Job site" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: address })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, children: `${sd.glyph} ${sd.label}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-md)] border-t border-border pt-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-[var(--xen-space-md)]", children: [crewCount != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDC77 ", Math.max(0, Math.trunc(crewCount)), " crew"] })) : null, openOrders != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDDD2 ", Math.max(0, Math.trunc(openOrders)), " open"] })) : null, distance != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDCCD ", distance] }) : null] }), onNavigate ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            onNavigate();
                        }, children: "Directions" })) : null] })] }));
});
//# sourceMappingURL=JobSiteCard.js.map