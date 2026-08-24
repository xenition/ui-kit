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
exports.TicketTypeRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
/**
 * A selectable ticket-tier row for a purchase sheet: name, price, description
 * and inventory, with a radio-style indicator on the right. Selection is
 * conveyed by a filled indicator, a bold border, and `aria-checked` — not color
 * alone. Sold-out rows are dimmed, badged, and non-interactive (`onSelect`
 * never fires while sold out). `onSelect` is renamed from the DOM `onSelect`.
 * Colors come from the `--xen-*` tokens; no literal colors.
 */
exports.TicketTypeRow = React.forwardRef(function TicketTypeRow({ name, price, description, remaining, soldOut, selected = false, onSelect, disabled = false, className, ...rest }, ref) {
    const isSoldOut = soldOut === true || remaining === 0;
    const isDisabled = disabled || isSoldOut;
    const lowStock = !isSoldOut && typeof remaining === 'number' && remaining > 0 && remaining <= 10;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", role: "radio", "aria-checked": selected, "aria-label": `${name}, ${price}${isSoldOut ? ', sold out' : ''}`, disabled: isDisabled, onClick: isDisabled ? undefined : onSelect, className: (0, cn_1.cn)('flex w-full flex-row items-center gap-md rounded-md p-md text-left', selected ? 'border-2 border-primary' : 'border border-border', 'bg-surface transition-colors', isDisabled ? 'opacity-60' : 'hover:bg-neutral-50', 'disabled:pointer-events-none', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: name }), isSoldOut ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", children: "Sold out" })) : lowStock ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "warn", children: `${remaining} left` })) : null] }), description ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: description }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: price }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-5 w-5 items-center justify-center rounded-full border-2', selected ? 'border-primary' : 'border-border'), children: selected ? (0, jsx_runtime_1.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }) : null })] }));
});
//# sourceMappingURL=TicketTypeRow.js.map