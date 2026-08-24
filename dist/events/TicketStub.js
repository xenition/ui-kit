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
exports.TicketStub = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
/**
 * A tear-off ticket stub. The lower band is a placeholder "barcode" — a row of
 * vertical bars whose widths are derived deterministically from the ticket
 * `code` characters and painted purely from theme tokens (`on-surface` /
 * `muted`). There is no barcode or scanning dependency; this is a visual
 * stand-in only. All colors come from the `--xen-*` tokens — no literal colors.
 */
exports.TicketStub = React.forwardRef(function TicketStub({ eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', className, ...rest }, ref) {
    // Deterministic bar widths from the code characters (guarded, token-colored).
    const chars = code.length > 0 ? code.split('') : ['0'];
    const bars = Array.from({ length: 28 }, (_, i) => {
        const ch = chars[i % chars.length] ?? '0';
        const magnitude = (ch.charCodeAt(0) % 3) + 1; // 1..3
        const dark = ch.charCodeAt(0) % 2 === 0;
        return { width: magnitude, dark };
    });
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": `Ticket for ${eventTitle}, code ${code}`, className: (0, cn_1.cn)('overflow-hidden rounded-lg border border-border bg-surface text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("h3", { className: "flex-1 font-heading text-lg font-bold text-on-surface", children: eventTitle }), tier ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: tier }) : null] }), holderName ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: holderName }) : null, dateLabel ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: dateLabel }) : null, variant !== 'compact' && fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-xs flex flex-row flex-wrap gap-lg", children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold tracking-wider text-muted", children: f.label.toUpperCase() }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: f.value })] }, `${f.label}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "h-px bg-border" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-10 items-end justify-center gap-0.5 bg-neutral-50 py-sm", children: bars.map((b, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-full', b.dark ? 'bg-on-surface' : 'bg-muted'), style: { width: b.width } }, i))) }), (0, jsx_runtime_1.jsx)("p", { className: "pb-sm text-center text-xs tracking-widest text-muted", children: code })] }));
});
//# sourceMappingURL=TicketStub.js.map