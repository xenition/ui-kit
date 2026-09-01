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
exports.TicketStubV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const event_v4_1 = require("./internal/event-v4");
/** How many bars the placeholder band draws. */
const BAR_COUNT = 28;
/**
 * **V4 ticket stub** — the web twin of the native `TicketStubV4`, same props as
 * {@link TicketStub} plus `formatCode`.
 *
 * ## Four changes
 *
 * 1. **The barcode is drawn on a band that owns its own contrast.** The band
 *    was `bg-neutral-50` — a ramp step, which mirrors under
 *    `[data-theme="dark"]` — with bars inked `on-surface` over it. This twin
 *    happened to invert the right way and the native one did not (there the
 *    ramp carries its light orientation into dark mode, so a near-white ink sat
 *    on a near-white band and the stub's only scannable-looking artefact
 *    vanished). Both twins now paint the band `surface` and the bars
 *    `on-surface` and `muted` — a guaranteed pair rather than a ramp step that
 *    two platforms disagree about.
 * 2. **The stub's name lands on both twins**, and it is built from the same
 *    parts: the event, the holder, the date, the tier and the formatted code.
 * 3. **`formatCode` exists**, because a ticket code is the one string on this
 *    component a host actually wants to group — `ABCD 1234` printed, and the
 *    same grouping spoken, rather than twelve characters run together.
 * 4. **The band height and the code's tracking come from tokens**, not `h-10`
 *    and Tailwind's `tracking-widest`, and the code is tabular so its
 *    characters sit on a fixed pitch the way a printed stub's do.
 */
exports.TicketStubV4 = React.forwardRef(function TicketStubV4({ eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', formatCode, className, ...rest }, ref) {
    if (!eventTitle)
        return null;
    const printedCode = (formatCode ?? ((c) => c))(code);
    // Deterministic bar widths from the code characters. The widths are bare
    // numbers on purpose: a barcode bar is hairline geometry, the same
    // exception the row family's 1px separator takes, and quantising it to the
    // spacing scale would make a 28-bar band four times too wide.
    const chars = code.length > 0 ? code.split('') : ['0'];
    const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
        const ch = chars[i % chars.length] ?? '0';
        const magnitude = (ch.charCodeAt(0) % 3) + 1;
        const dark = ch.charCodeAt(0) % 2 === 0;
        return { width: magnitude, dark };
    });
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": (0, event_v4_1.spokenLine)([eventTitle, holderName, dateLabel, tier, printedCode]), className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("h3", { className: "flex-1 font-heading text-lg font-bold text-on-card", children: eventTitle }), tier ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "primary", children: tier })) : null] }), holderName ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: holderName }) : null, dateLabel ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: dateLabel }) : null, variant !== 'compact' && fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-xs flex flex-row flex-wrap gap-lg", children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text [letter-spacing:calc(var(--xen-space-xs)_/_4)]", children: f.label.toUpperCase() }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: f.value })] }, `${f.label}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "h-px bg-border" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] items-end justify-center gap-0.5 bg-surface py-sm", children: bars.map((b, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-full', b.dark ? 'bg-on-surface' : 'bg-muted'), style: { width: b.width } }, i))) }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('bg-surface pb-sm text-center text-xs text-muted-text [letter-spacing:calc(var(--xen-space-xs)_/_2)]', event_v4_1.TABULAR_CLASS), children: printedCode })] }));
});
//# sourceMappingURL=TicketStubV4.js.map