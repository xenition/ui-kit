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
exports.JobSiteCardV3 = void 0;
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
exports.JobSiteCardV3 = React.forwardRef(function JobSiteCardV3({ name, address, status, crewCount, openOrders, distance, glyph = '🏗', onNavigate, onClick, className, style }, ref) {
    const sd = STATUS[status] ?? STATUS.scheduled;
    const interactive = onClick != null;
    const meta = [
        crewCount != null ? `👷 ${Math.max(0, Math.trunc(crewCount))}` : null,
        openOrders != null ? `🗒 ${Math.max(0, Math.trunc(openOrders))}` : null,
        distance != null ? `📍 ${distance}` : null,
    ]
        .filter(Boolean)
        .join('   ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, ...(interactive
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
            : {}), className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer transition-colors hover:bg-neutral-100 motion-reduce:transition-none', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-accent/10", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "base", "aria-label": "Job site" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta ? `${address}   ·   ${meta}` : address })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }), onNavigate ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Directions to ${name}`, onClick: (e) => {
                    e.stopPropagation();
                    onNavigate();
                }, className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-opacity hover:opacity-80 motion-reduce:transition-none", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83E\uDDED", size: "sm" }) })) : null] }));
});
//# sourceMappingURL=JobSiteCardV3.js.map