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
exports.TicketStubV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
/**
 * TicketStub — **minimal boarding-pass line** alternate design (web / React DOM).
 *
 * Everything sits on one horizontal strip: the event name + holder / date on
 * the left, structured fields inline through the middle, and a short vertical
 * token-bar strip with the code on the right, split off by a dashed rule. Flat
 * and hairline-bordered rather than the tall elevated stub. Same props as
 * {@link TicketStub} — a drop-in swap. Token-pure; the bars carry no scan
 * dependency.
 */
exports.TicketStubV3 = React.forwardRef(function TicketStubV3({ eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', className, ...rest }, ref) {
    const chars = code.length > 0 ? code.split('') : ['0'];
    const bars = Array.from({ length: 16 }, (_, i) => {
        const ch = chars[i % chars.length] ?? '0';
        const magnitude = (ch.charCodeAt(0) % 3) + 1;
        const dark = ch.charCodeAt(0) % 2 === 0;
        return { width: magnitude, dark };
    });
    const subLine = [holderName, dateLabel].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": `Ticket for ${eventTitle}, code ${code}`, className: (0, cn_1.cn)('flex flex-row items-stretch overflow-hidden rounded-md border border-border bg-surface text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col justify-center gap-xs p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-base font-bold text-on-surface", children: eventTitle }), tier ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", size: "sm", children: tier }) : null] }), subLine ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subLine }) : null, variant !== 'compact' && fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-0.5 flex flex-row flex-wrap gap-md", children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold tracking-wide text-muted", children: `${f.label.toUpperCase()} ` }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: f.value })] }, `${f.label}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex flex-col items-center justify-between py-xs", children: Array.from({ length: 8 }, (_, i) => ((0, jsx_runtime_1.jsx)("span", { className: "h-1 w-px bg-border" }, i))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center gap-xs bg-neutral-50 px-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-8 flex-row items-end gap-0.5", children: bars.map((b, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-full', b.dark ? 'bg-on-surface' : 'bg-muted'), style: { width: b.width } }, i))) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold tracking-wide text-muted", children: code })] })] }));
});
//# sourceMappingURL=TicketStubV3.js.map