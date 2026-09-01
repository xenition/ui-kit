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
exports.StatsSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * StatsSummary — an overview row of headline numbers on a clean card, split by
 * thin border dividers. Each stat shows an optional glyph, a big value with a
 * muted unit, and a muted label. Restraint is the point: the card stays surface
 * + border, and only the first stat's value picks up the primary accent — one
 * colored number, not a rainbow. Token-only colors.
 */
exports.StatsSummary = React.forwardRef(function StatsSummary({ stats, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "group", className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex items-stretch p-5 shadow-sm', className), ...rest, children: stats.map((stat, i) => {
            const valueText = typeof stat.value === 'string' || typeof stat.value === 'number' ? String(stat.value) : '';
            return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${stat.label}: ${valueText}${stat.unit ? ' ' + stat.unit : ''}`, className: (0, cn_1.cn)('flex flex-1 flex-col items-center gap-[var(--xen-space-xs)] px-[var(--xen-space-md)]', i > 0 && 'border-l border-border'), children: [stat.glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: stat.glyph })) : null, (0, jsx_runtime_1.jsxs)("p", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-extrabold', i === 0 ? 'text-primary' : 'text-on-surface'), children: stat.value }), stat.unit ? (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-muted", children: [" ", stat.unit] }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: stat.label })] }, `${stat.label}-${i}`));
        }) }));
});
//# sourceMappingURL=StatsSummary.js.map