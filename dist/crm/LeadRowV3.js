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
exports.LeadRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
/** Left-accent border color class for a temperature tone. */
function tempBorderClass(tone) {
    if (tone === 'danger')
        return 'border-danger';
    if (tone === 'warn')
        return 'border-warn';
    return 'border-primary';
}
/**
 * LeadRow **design V3** — the *densest* single line: a leading temperature glyph
 * (🔥/☀/❄), the name with the company inline, the value pushed hard right, and a
 * small score. No avatar, no second line of chrome — a maximum-density lead list
 * for triage screens. A left accent bar (colored by temperature, or `primary`
 * when `selected`) reinforces heat, and the glyph is paired with an accessible
 * word in the row label so meaning never rests on color. Same props as
 * {@link LeadRow}. Token-pure.
 */
exports.LeadRowV3 = React.forwardRef(function LeadRowV3({ name, company, temperature, valueCents, currency = 'USD', score, selected = false, onClick, className, ...rest }, ref) {
    const meta = internal_1.TEMPERATURE_META[temperature];
    const interactive = onClick ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label} lead ${name}${company ? `, ${company}` : ''}`, className: (0, cn_1.cn)('flex items-center gap-sm border-l-[3px] bg-surface px-sm py-xs transition duration-200 motion-reduce:transition-none', selected ? 'border-primary' : tempBorderClass(meta.tone), onClick && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-5 shrink-0 text-center text-base', (0, internal_1.toneTextClass)(meta.tone)), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("p", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: [name, company ? (0, jsx_runtime_1.jsx)("span", { className: "ml-2 font-normal text-muted", children: company }) : null] }), valueCents != null ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-sm font-bold text-on-surface", children: (0, commerce_1.formatMoney)(valueCents, currency) })) : null, score != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-[20px] shrink-0 text-right text-xs font-bold', (0, internal_1.toneTextClass)(meta.tone)), children: (0, internal_1.clampPct)(score) })) : null] }));
});
//# sourceMappingURL=LeadRowV3.js.map