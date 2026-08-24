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
exports.TechnicianCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online', halo: 'bg-success/20' },
    'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy', halo: 'bg-primary/20' },
    'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away', halo: 'bg-warn/20' },
    offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline', halo: 'bg-neutral-200' },
};
const PRESENCE_BG = {
    online: 'bg-success',
    busy: 'bg-primary',
    away: 'bg-warn',
    offline: 'bg-neutral-400',
};
exports.TechnicianCardV2 = React.forwardRef(function TechnicianCardV2({ name, role, status, avatarUrl, skills, jobsToday, phone, onCall, onAssign, className, style }, ref) {
    const sd = STATUS[status] ?? STATUS.offline;
    const skillList = Array.isArray(skills) ? skills : [];
    const showActions = (phone != null && onCall != null) || onAssign != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, style: style, variant: "elevated", className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-sm)] text-center', className), children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative inline-flex shrink-0", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex rounded-full p-1', sd.halo), children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "xl" }) }), (0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": sd.label, className: (0, cn_1.cn)('absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-surface', PRESENCE_BG[sd.presence]) })] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-extrabold text-on-surface", children: name }), role != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: role }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` }), jobsToday != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDDD2 ", Math.max(0, Math.trunc(jobsToday)), " jobs today"] })) : null, skillList.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap justify-center gap-[var(--xen-space-xs)]", children: skillList.map((skill, i) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-medium text-primary", children: skill }, `${skill}-${i}`))) })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex w-full gap-[var(--xen-space-sm)]", children: [phone != null && onCall != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onClick: onCall, className: "flex-1", children: "\uD83D\uDCDE Call" })) : null, onAssign != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: onAssign, className: "flex-1", children: "Assign" })) : null] })) : null] }));
});
//# sourceMappingURL=TechnicianCardV2.js.map