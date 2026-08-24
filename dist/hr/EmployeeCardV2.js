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
exports.EmployeeCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/** Tone → soft background tint (token-bound opacity, never a literal). */
const TONE_TINT = {
    neutral: 'bg-neutral-100',
    primary: 'bg-primary/10',
    success: 'bg-success/10',
    warn: 'bg-warn/10',
    danger: 'bg-danger/10',
    accent: 'bg-accent/10',
};
/**
 * EmployeeCard, design **V2** — a banner-header profile card. A tone-tinted
 * banner (derived from the employee's status, never color alone) sits above an
 * overlapping ringed avatar; name, title and department stack below, followed by
 * employment / location / start-date chips and a full-width row of contact
 * `<button>`s. Same Props as {@link EmployeeCard}, so it swaps in with no
 * call-site change. Elevated with a subtle hover lift; token-pure (no literals).
 */
exports.EmployeeCardV2 = React.forwardRef(function EmployeeCardV2({ name, title, department, avatarUrl, employmentType, status, location, startDate, actions, loading = false, onClick, className, }, ref) {
    const interactive = onClick != null && !loading;
    const bannerTone = status ? internal_1.EMPLOYEE_STATUS_META[status].tone : 'primary';
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, variant: "elevated", padding: "none", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Employee ${name}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('overflow-hidden transition duration-200 motion-reduce:transition-none', interactive &&
            'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading employee", className: "p-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 animate-pulse rounded bg-neutral-100" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-3/5 animate-pulse rounded bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2/5 animate-pulse rounded bg-neutral-100" })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-14', TONE_TINT[bannerTone]), "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 px-4 pb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "-mt-6 flex items-end justify-between gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "rounded-full ring-2 ring-surface", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xl", name: name, src: avatarUrl, ring: true }) }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EMPLOYEE_STATUS_META[status], size: "sm", className: "mb-1" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), title || department ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: [title, department].filter(Boolean).join(' · ') })) : null] }), employmentType || location || startDate ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [employmentType ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EMPLOYMENT_META[employmentType], size: "sm" }) : null, location ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDCCD ", location] }) : null, startDate ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Since ", startDate] }) : null] })) : null, actions && actions.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex gap-2", children: actions.map((a) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": a.label, onClick: (e) => {
                                    e.stopPropagation();
                                    a.onClick();
                                }, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: a.glyph }), a.label] }, a.key))) })) : null] })] })) }));
});
//# sourceMappingURL=EmployeeCardV2.js.map