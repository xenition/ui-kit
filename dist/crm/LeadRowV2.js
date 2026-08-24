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
exports.LeadRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
/** Tinted-pill classes (soft bg + matching text) for a temperature tone. */
function tempChipClass(tone) {
    if (tone === 'danger')
        return 'bg-danger/10 text-danger';
    if (tone === 'warn')
        return 'bg-warn/10 text-warn';
    return 'bg-primary/10 text-primary';
}
/**
 * LeadRow **design V2** — a *card* (not a dense line) with a prominent
 * hot/warm/cold *flame chip*: a tinted pill carrying the temperature glyph + word
 * so heat reads instantly without relying on color. Avatar, name and company
 * lead; value and score sit in a right column. Elevated on a token `shadow-sm`,
 * with a `primary` left accent bar when `selected`. Same props as
 * {@link LeadRow}. Token-pure.
 */
exports.LeadRowV2 = React.forwardRef(function LeadRowV2({ name, company, temperature, valueCents, currency = 'USD', score, avatarUrl, selected = false, onClick, className, ...rest }, ref) {
    const meta = internal_1.TEMPERATURE_META[temperature];
    const interactive = onClick ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label} lead ${name}${company ? `, ${company}` : ''}`, className: (0, cn_1.cn)('flex items-center gap-md rounded-lg bg-surface p-md shadow-sm transition duration-200 motion-reduce:transition-none', selected && 'border-l-4 border-primary', onClick && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "md", name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-bold text-on-surface", children: name }), company ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: company }) : null, (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('mt-0.5 flex items-center gap-0.5 self-start rounded-full px-sm py-0.5 text-xs font-bold', tempChipClass(meta.tone)), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [valueCents != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold text-on-surface", children: (0, commerce_1.formatMoney)(valueCents, currency) })) : null, score != null ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, internal_1.toneBadgeTone)(meta.tone), children: `${(0, internal_1.clampPct)(score)}` }) : null] })] }));
});
//# sourceMappingURL=LeadRowV2.js.map