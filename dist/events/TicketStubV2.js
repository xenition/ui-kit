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
exports.TicketStubV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
/**
 * TicketStub — **elevated ticket** alternate design (web / React DOM).
 *
 * Leans into the physical stub metaphor: a soft primary-tinted header band with
 * the event name set large, a punched perforation line (edge notches + a dotted
 * tear) instead of a plain divider, and a taller token-bar "barcode" band. Drop
 * shadow, no border. Same props as {@link TicketStub} — a drop-in swap.
 * Token-pure — the barcode bars ship no scan dependency; their widths seed from
 * `code`.
 */
exports.TicketStubV2 = React.forwardRef(function TicketStubV2({ eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', className, ...rest }, ref) {
    const chars = code.length > 0 ? code.split('') : ['0'];
    const bars = Array.from({ length: 34 }, (_, i) => {
        const ch = chars[i % chars.length] ?? '0';
        const magnitude = (ch.charCodeAt(0) % 4) + 1; // 1..4
        const dark = ch.charCodeAt(0) % 2 === 0;
        return { width: magnitude, dark };
    });
    const perforationDots = Array.from({ length: 22 }, (_, i) => i);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": `Ticket for ${eventTitle}, code ${code}`, className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface text-on-surface shadow-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm bg-primary/10 p-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("h3", { className: "line-clamp-2 flex-1 font-heading text-2xl font-extrabold text-on-surface", children: eventTitle }), tier ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: tier }) : null] }), holderName ? (0, jsx_runtime_1.jsx)("p", { className: "text-base font-semibold text-primary", children: holderName }) : null, dateLabel ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: dateLabel }) : null] }), variant !== 'compact' && fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-row flex-wrap gap-lg px-lg pb-md", children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold tracking-wider text-muted", children: f.label.toUpperCase() }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: f.value })] }, `${f.label}-${i}`))) })) : null, (0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "flex h-6 flex-row items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "-ml-2 h-4 w-4 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 flex-row items-center justify-between px-sm", children: perforationDots.map((d) => ((0, jsx_runtime_1.jsx)("span", { className: "h-1 w-1 rounded-full bg-border" }, d))) }), (0, jsx_runtime_1.jsx)("span", { className: "-mr-2 h-4 w-4 rounded-full bg-neutral-100" })] }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-14 items-end justify-center gap-0.5 px-lg pt-sm", children: bars.map((b, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-full', b.dark ? 'bg-on-surface' : 'bg-on-surface/35'), style: { width: b.width } }, i))) }), (0, jsx_runtime_1.jsx)("p", { className: "py-md text-center text-sm font-bold tracking-[0.2em] text-muted", children: code })] }));
});
//# sourceMappingURL=TicketStubV2.js.map