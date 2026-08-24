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
exports.CoverageItemV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Badge_1 = require("../primitives/Badge");
const format_1 = require("./internal/format");
/**
 * CoverageItem, redesigned (**V2**) — a **standalone elevated card**. An
 * included / excluded `Badge` (glyph + text + color, never color-alone) sits
 * top-right of the coverage label and detail; the limit lives in its own tinted
 * block below so the benefit ceiling is easy to scan. Excluded coverage dims and
 * strikes the label and shows "Not covered". Same `CoverageItemProps` (integer
 * cents via `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
exports.CoverageItemV2 = React.forwardRef(function CoverageItemV2({ label, included = true, limitCents, detail, currency = 'USD', formatMoney: format = format_1.formatMoney, className, ...rest }, ref) {
    const limit = included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : null;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: "elevated", padding: "md", radius: "md", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-base font-bold', included ? 'text-on-surface' : 'text-muted line-through'), children: label }), detail != null ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-xs text-muted", children: detail }) : null] }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: included ? 'success' : 'neutral', variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: included ? '✓' : '✕' }), ' ', included ? 'Included' : 'Excluded'] })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center justify-between rounded-[var(--xen-radius-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', included ? 'bg-success/10' : 'bg-neutral-100'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: included ? 'Coverage limit' : 'Status' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', included ? 'text-on-surface' : 'text-muted'), children: included ? limit ?? 'No limit' : 'Not covered' })] })] }));
});
//# sourceMappingURL=CoverageItemV2.js.map