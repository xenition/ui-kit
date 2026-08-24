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
exports.BeneficiaryRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
const KIND_LABEL = {
    primary: 'Primary',
    contingent: 'Contingent',
};
/**
 * One beneficiary in a policy's allocation list: avatar (initials fallback),
 * name + relationship, a primary/contingent tag, and a right-aligned allocation
 * percentage. The percentage is clamped to 0–100 and rendered whole (no float
 * drift). Token-bound throughout; becomes a keyboard-operable button only when
 * `onClick` is supplied. Web parity of the native `BeneficiaryRow`.
 */
exports.BeneficiaryRow = React.forwardRef(function BeneficiaryRow({ name, relationship, allocationPct, kind = 'primary', avatarUrl, onClick, className, ...rest }, ref) {
    const pct = Number.isFinite(allocationPct) ? Math.min(100, Math.max(0, allocationPct)) : 0;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${name}, ${KIND_LABEL[kind]} beneficiary, ${(0, format_1.formatPct)(pct)}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: [KIND_LABEL[kind], relationship != null ? ` · ${relationship}` : ''] })] }), (0, jsx_runtime_1.jsx)("span", { "aria-label": `${(0, format_1.formatPct)(pct)} allocation`, className: "text-lg font-bold text-primary", children: (0, format_1.formatPct)(pct) })] }));
});
//# sourceMappingURL=BeneficiaryRow.js.map