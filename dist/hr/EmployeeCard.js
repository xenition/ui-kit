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
exports.EmployeeCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * Profile card for a single employee: avatar, name, title, department, and
 * employment-type / status chips (each a glyph + word so state never rests on
 * color alone). `compact` trims to a single row; `detailed` adds location and
 * start date. Quick contact `actions` render as real `<button>`s. Renders a
 * `loading` skeleton on demand. When `onClick` is set the card becomes a
 * keyboard-operable `role="button"`. All colors are `--xen-*` token classes —
 * no literals.
 */
exports.EmployeeCard = React.forwardRef(function EmployeeCard({ name, title, department, avatarUrl, employmentType, status, location, startDate, actions, variant = 'default', loading = false, onClick, className, }, ref) {
    const compact = variant === 'compact';
    const detailed = variant === 'detailed';
    const interactive = onClick != null && !loading;
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Employee ${name}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-3', interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading employee", className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-10 w-10 rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-3/5 rounded bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2/5 rounded bg-neutral-200" })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: name }), title ? ((0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-muted", children: [title, department ? ` · ${department}` : ''] })) : department ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: department })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EMPLOYEE_STATUS_META[status], size: "sm" }) : null] }), !compact && (employmentType || detailed) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [employmentType ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EMPLOYMENT_META[employmentType], size: "sm" }) : null, detailed && location ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDCCD ", location] }) : null, detailed && startDate ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Since ", startDate] }) : null] })) : null, !compact && actions && actions.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: actions.map((a) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": a.label, onClick: (e) => {
                            e.stopPropagation();
                            a.onClick();
                        }, className: "inline-flex items-center gap-1 rounded-[var(--xen-radius-md)] bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: a.glyph }), a.label] }, a.key))) })) : null] })) }));
});
//# sourceMappingURL=EmployeeCard.js.map