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
exports.CoverageItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const format_1 = require("./internal/format");
/**
 * One coverage line in a benefits breakdown: an included/excluded marker
 * (glyph + color, never color alone), the coverage label with optional detail,
 * and a right-aligned limit. Included reads `text-success`, excluded reads
 * `text-muted` — both semantic token slots. Limit is integer cents via
 * `formatMoney`; when omitted the line shows "—" rather than a fabricated value.
 * Web parity of the native `CoverageItem`.
 */
exports.CoverageItem = React.forwardRef(function CoverageItem({ label, included = true, limitCents, detail, currency = 'USD', formatMoney: format = format_1.formatMoney, className, ...rest }, ref) {
    const glyph = included ? '✓' : '✕';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-7 w-7 shrink-0 items-center justify-center rounded-full', included ? 'bg-success/10' : 'bg-neutral-100'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "sm", color: included ? 'success' : 'muted', "aria-label": included ? 'Included' : 'Not included' }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-base font-semibold', included ? 'text-on-surface' : 'text-muted line-through'), children: label }), detail != null ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-xs text-muted", children: detail }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : '—' })] }));
});
//# sourceMappingURL=CoverageItem.js.map