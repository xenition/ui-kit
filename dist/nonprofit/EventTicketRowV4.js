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
exports.EventTicketRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * EventTicketRow — **V4** "rally" design (web parity of the native V4). The
 * warm, mission-driven take on a selectable charity-event ticket row: an
 * elevated rounded row (soft shadow, clean surface — no gradient) with a
 * leading ticket glyph in a soft-primary well, a bold tier name, muted perks,
 * an optional tax-deductible note, the price rendered bold via `formatMoney`,
 * and a radio indicator that doubles as the ≥44px hit target. Availability is
 * read via a glyph + a labelled Badge + token color (never color alone): sold
 * out gets a danger "Sold out" badge and disables the row; low stock gets a
 * warn "N left" badge. Selection is announced by `role="radio"` +
 * `aria-checked` (plus a filled dot and a bold primary border). Honors every
 * prop of {@link EventTicketRowProps}; the whole row is a real `<button>`.
 * All colors from `--xen-*` token classes (no literals).
 */
exports.EventTicketRowV4 = React.forwardRef(function EventTicketRowV4({ name, priceCents, currency = 'USD', description, deductibleCents, remaining, soldOut, selected = false, onSelect, disabled = false, className, ...rest }, ref) {
    const isSoldOut = soldOut === true || remaining === 0;
    const isDisabled = disabled || isSoldOut;
    const lowStock = !isSoldOut && typeof remaining === 'number' && remaining > 0 && remaining <= 10;
    const priceLabel = (0, internal_1.formatMoney)(priceCents, currency);
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", role: "radio", "aria-checked": selected, "aria-disabled": isDisabled || undefined, "aria-label": `${name}, ${priceLabel}${isSoldOut ? ', sold out' : ''}`, disabled: isDisabled, onClick: isDisabled ? undefined : onSelect, className: (0, cn_1.cn)('flex w-full items-center gap-md rounded-lg p-md text-left shadow-md transition-colors', 'min-h-[44px]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected ? 'border-2 border-primary bg-surface' : 'border border-border bg-surface', isDisabled ? 'opacity-60' : 'hover:bg-neutral-100', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9F\uFE0F", size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: name }), isSoldOut ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", children: "Sold out" })) : lowStock ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "warn", children: `${remaining} left` })) : null] }), description ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: description }) : null, typeof deductibleCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-success", children: `${(0, internal_1.formatMoney)(deductibleCents, currency)} tax-deductible` })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: priceLabel }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2', selected ? 'border-primary' : 'border-border'), children: selected ? (0, jsx_runtime_1.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }) : null })] }));
});
//# sourceMappingURL=EventTicketRowV4.js.map