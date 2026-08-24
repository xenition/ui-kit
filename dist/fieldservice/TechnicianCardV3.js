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
exports.TechnicianCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
    'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
    'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away' },
    offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};
const PRESENCE_BG = {
    online: 'bg-success',
    busy: 'bg-primary',
    away: 'bg-warn',
    offline: 'bg-neutral-400',
};
exports.TechnicianCardV3 = React.forwardRef(function TechnicianCardV3({ name, role, status, avatarUrl, jobsToday, phone, onCall, onAssign, className, style }, ref) {
    const sd = STATUS[status] ?? STATUS.offline;
    const sub = [role, jobsToday != null ? `🗒 ${Math.max(0, Math.trunc(jobsToday))}` : null]
        .filter(Boolean)
        .join('   ·   ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative inline-flex shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": sd.label, className: (0, cn_1.cn)('absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface', PRESENCE_BG[sd.presence]) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: name }), sub ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: sub }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }), phone != null && onCall != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Call ${name}`, onClick: onCall, className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-opacity hover:opacity-80 motion-reduce:transition-none", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCDE", size: "sm" }) })) : null, onAssign != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Assign ${name}`, onClick: onAssign, className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-opacity hover:opacity-80 motion-reduce:transition-none", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", size: "sm", color: "primary" }) })) : null] }));
});
//# sourceMappingURL=TechnicianCardV3.js.map