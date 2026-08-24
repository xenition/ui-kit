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
exports.JobSiteCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    active: { label: 'On site', glyph: '▶', tone: 'success' },
    scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
    completed: { label: 'Completed', glyph: '✓', tone: 'neutral' },
    blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};
function StatTile({ value, label }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] bg-neutral-100 py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-on-surface", children: value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: label })] }));
}
exports.JobSiteCardV2 = React.forwardRef(function JobSiteCardV2({ name, address, status, crewCount, openOrders, distance, glyph = '🏗', onNavigate, onClick, className, style }, ref) {
    const sd = STATUS[status] ?? STATUS.scheduled;
    const interactive = onClick != null;
    const hasStats = crewCount != null || openOrders != null || distance != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, style: style, padding: "none", className: (0, cn_1.cn)('overflow-hidden', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...(interactive
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
            : {}), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)] bg-accent/10 p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-accent/20", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "2xl", "aria-label": "Job site" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-xl font-extrabold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: address })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), hasStats ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)] px-[var(--xen-space-lg)] pt-[var(--xen-space-md)]", children: [crewCount != null ? (0, jsx_runtime_1.jsx)(StatTile, { value: `${Math.max(0, Math.trunc(crewCount))}`, label: "crew" }) : null, openOrders != null ? ((0, jsx_runtime_1.jsx)(StatTile, { value: `${Math.max(0, Math.trunc(openOrders))}`, label: "open orders" })) : null, distance != null ? (0, jsx_runtime_1.jsx)(StatTile, { value: distance, label: "away" }) : null] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "p-[var(--xen-space-lg)] pt-[var(--xen-space-md)]", children: onNavigate ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", className: "w-full", onClick: (e) => {
                        e.stopPropagation();
                        onNavigate();
                    }, children: "\uD83E\uDDED Directions" })) : null })] }));
});
//# sourceMappingURL=JobSiteCardV2.js.map