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
exports.FamilyMemberRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
// Native `accent` tone maps to `primary` on web (web Badge has no accent).
const ROLE_META = {
    parent: { label: 'Parent', tone: 'primary' },
    guardian: { label: 'Guardian', tone: 'primary' },
    child: { label: 'Child', tone: 'primary' },
    sibling: { label: 'Sibling', tone: 'primary' },
    grandparent: { label: 'Grandparent', tone: 'neutral' },
    caregiver: { label: 'Caregiver', tone: 'success' },
    other: { label: 'Family', tone: 'neutral' },
};
/**
 * A roster row for a family member: avatar, name, an optional relationship line,
 * a role chip, and an optional presence indicator (dot + "Online"/"Offline"
 * text, never color alone). When `onClick` is set the row is an accessible
 * `role="button"` with keyboard activation. Token-bound throughout — no literal
 * colors.
 */
exports.FamilyMemberRow = React.forwardRef(function FamilyMemberRow({ name, role = 'other', photoUrl, relationLabel, online, onClick, className, ...rest }, ref) {
    const meta = ROLE_META[role] ?? ROLE_META.other;
    const interactive = typeof onClick === 'function';
    const a11y = `${name}, ${meta.label}${online !== undefined ? `, ${online ? 'online' : 'offline'}` : ''}`;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-family-member-row": "", className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), relationLabel ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: relationLabel }) : null, online !== undefined ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 w-2 shrink-0 rounded-full', online ? 'bg-success' : 'bg-neutral-300'), "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: online ? 'Online' : 'Offline' })] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] }));
});
//# sourceMappingURL=FamilyMemberRow.js.map