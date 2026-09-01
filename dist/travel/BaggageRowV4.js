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
exports.BaggageRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const PriceTag_1 = require("../commerce/PriceTag");
const KIND = {
    personal: { glyph: '👜', label: 'Personal item' },
    cabin: { glyph: '🧳', label: 'Cabin bag' },
    checked: { glyph: '🧳', label: 'Checked bag' },
};
/**
 * BaggageRow — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a baggage-allowance line: the baggage-kind glyph sits in
 * a small brand-gradient disc (the signature V4 touch), followed by the title and
 * the allowance detail, then a trailing status — an "Included" success badge when
 * the allowance is in the fare, otherwise the fare add-on price via `PriceTag`
 * (or a muted "Not available"). `included` drives both the badge text and the
 * announcement, so meaning never rides on color alone. Same props/behavior as
 * {@link BaggageRowProps}; all colors from `--xen-*` token classes (no literal
 * colors).
 */
exports.BaggageRowV4 = React.forwardRef(function BaggageRowV4({ kind = 'cabin', label, allowance, included = false, priceCents, currency = 'USD', className, ...rest }, ref) {
    const meta = KIND[kind];
    const title = label ?? meta.label;
    const trailing = included ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: "Included" })) : typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, size: "sm" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Not available" }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-baggage-row": "", "aria-label": `${title}${allowance ? `, ${allowance}` : ''}, ${included ? 'included' : 'extra'}`, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700 text-lg leading-none text-primary-50", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: title }), allowance ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: allowance }) : null] }), trailing] }));
});
//# sourceMappingURL=BaggageRowV4.js.map