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
exports.BenefitsEnrollment = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A benefits-plan enrollment card: plan name, benefit type, coverage tier, and
 * per-period cost (integer **cents** via `formatMoney`). Enrollment status is a
 * glyph + word pill (enrolled → success, eligible → primary, never color alone).
 * When `actionable` and not already enrolled, an enroll / change `<button>`
 * renders. `compact` drops coverage + deadline. All colors are `--xen-*` token
 * classes — no literals. `forwardRef` to the root `<div>`.
 */
exports.BenefitsEnrollment = React.forwardRef(function BenefitsEnrollment({ planName, type, status, coverage, costCents, costPeriod = '/mo', currency = 'USD', enrollBy, actionable = false, variant = 'default', onEnroll, onClick, className, }, ref) {
    const compact = variant === 'compact';
    const typeMeta = internal_1.BENEFIT_TYPE_META[type];
    const showAction = actionable && (status === 'eligible' || status === 'pending');
    const enrolled = status === 'enrolled';
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Benefit ${planName}, ${internal_1.BENEFIT_STATUS_META[status].label}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-3', interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base", children: typeMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: planName })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-muted", children: typeMeta.label })] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.BENEFIT_STATUS_META[status], size: "sm" })] }), !compact && coverage ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: coverage }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-3", children: [costCents != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: (0, internal_1.formatMoney)(costCents, currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: costPeriod })] })) : ((0, jsx_runtime_1.jsx)("span", {})), !compact && enrollBy && !enrolled ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Enroll by ", enrollBy] })) : null] }), showAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "secondary", onClick: (e) => {
                    e.stopPropagation();
                    onEnroll?.();
                }, children: status === 'pending' ? 'Complete enrollment' : 'Enroll' })) : null] }));
});
//# sourceMappingURL=BenefitsEnrollment.js.map