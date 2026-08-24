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
exports.EmployeeCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * EmployeeCard, design **V3** — a compact directory row. A small avatar, name +
 * title on one line, a trailing employment word, and the status carried by a
 * leading tone glyph plus its word (never color alone) — dense enough to stack
 * many per screen. Same Props as {@link EmployeeCard}; the card chrome is
 * dropped for a borderless hairline-divider row. Token-pure (no literals).
 */
exports.EmployeeCardV3 = React.forwardRef(function EmployeeCardV3({ name, title, department, avatarUrl, employmentType, status, loading = false, onClick, className, }, ref) {
    const interactive = onClick != null && !loading;
    const statusMeta = status ? internal_1.EMPLOYEE_STATUS_META[status] : undefined;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Employee ${name}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border bg-surface px-2 py-2 transition-colors motion-reduce:transition-none', interactive &&
            'cursor-pointer hover:bg-neutral-100 active:scale-[.99] motion-reduce:active:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading employee", className: "flex flex-1 items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8 w-8 animate-pulse rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/2 animate-pulse rounded bg-neutral-100" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), title || department ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: [title, department].filter(Boolean).join(' · ') })) : null] }), employmentType ? ((0, jsx_runtime_1.jsx)("span", { className: "hidden text-xs text-muted sm:inline", children: internal_1.EMPLOYMENT_META[employmentType].label })) : null, statusMeta ? ((0, jsx_runtime_1.jsxs)("span", { "aria-label": statusMeta.label, className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', internal_1.TONE_TEXT_CLASS[statusMeta.tone]), children: statusMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT_CLASS[statusMeta.tone]), children: statusMeta.label })] })) : null] })) }));
});
//# sourceMappingURL=EmployeeCardV3.js.map