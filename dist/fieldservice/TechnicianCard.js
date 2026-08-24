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
exports.TechnicianCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const TECHNICIAN_STATUS = {
    available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
    'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
    'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away' },
    offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};
/** Token-bound presence dot color; conveyed alongside the labeled status pill. */
const PRESENCE_BG = {
    online: 'bg-success',
    busy: 'bg-primary',
    away: 'bg-warn',
    offline: 'bg-neutral-400',
};
/**
 * A roster card for a field technician: avatar with a token-bound presence dot,
 * name/role stack, an availability pill (text + glyph + a color that traces to
 * a semantic token — never color alone), skill chips, and Call / Assign
 * actions. Skills are guarded against a missing array. No literal colors.
 */
exports.TechnicianCard = React.forwardRef(function TechnicianCard({ name, role, status, avatarUrl, skills, jobsToday, phone, onCall, onAssign, className, style }, ref) {
    const sd = TECHNICIAN_STATUS[status] ?? TECHNICIAN_STATUS.offline;
    const skillList = Array.isArray(skills) ? skills : [];
    const showActions = (phone != null && onCall != null) || onAssign != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: className, style: style, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative inline-flex shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": sd.label, className: (0, cn_1.cn)('absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface', PRESENCE_BG[sd.presence]) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: name }), role != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: role }) : null, jobsToday != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDDD2 ", Math.max(0, Math.trunc(jobsToday)), " jobs today"] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, children: `${sd.glyph} ${sd.label}` })] }), skillList.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-xs)]", children: skillList.map((skill, i) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-medium text-primary", children: skill }, `${skill}-${i}`))) })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex gap-[var(--xen-space-sm)]", children: [phone != null && onCall != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onClick: onCall, className: "flex-1", children: "Call" })) : null, onAssign != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: onAssign, className: "flex-1", children: "Assign" })) : null] })) : null] }));
});
//# sourceMappingURL=TechnicianCard.js.map