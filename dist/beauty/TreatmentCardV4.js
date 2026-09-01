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
exports.TreatmentCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * Treatment → glyph and default word.
 *
 * As with `ServiceMenuItemV4`: a treatment kind is not a status, so it does
 * not get a status colour. The base gave each one a `keyof SemanticColors`.
 */
const TREATMENT_META = {
    facial: { label: 'Facial', glyph: '🧖' },
    massage: { label: 'Massage', glyph: '💆' },
    body: { label: 'Body', glyph: '🌿' },
    nails: { label: 'Nails', glyph: '💅' },
    hair: { label: 'Hair', glyph: '💇' },
    wellness: { label: 'Wellness', glyph: '🧘' },
};
/**
 * **V4 treatment card** — the web twin of the native `TreatmentCardV4`, same
 * props as {@link TreatmentCard} plus `variantLabels` and `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **The category stops spending a status colour.**
 * 2. **The media box has a fixed 16:9 ratio and a `muted` ground**, so a grid
 *    does not reflow as images arrive and a missing image is not a pale
 *    rectangle on a dark page.
 * 3. **The price is in the display face and tabular.**
 * 4. **An interactive card is a real `<button>`**, and the whole card has one
 *    accessible name.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
exports.TreatmentCardV4 = React.forwardRef(function TreatmentCardV4({ name, priceCents, currency = 'USD', variant = 'facial', durationMin, description, imageUrl, formatMoney = money_1.formatMoney, bookLabel = 'Book', variantLabels, formatDuration, onBook, onClick, className, ...rest }, ref) {
    if (!name)
        return null;
    const meta = TREATMENT_META[variant] ?? TREATMENT_META.facial;
    const word = variantLabels?.[variant] ?? meta.label;
    const price = formatMoney(priceCents, currency);
    const duration = typeof durationMin === 'number'
        ? (formatDuration ?? ((m) => `${m} min`))(durationMin)
        : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "flex aspect-video w-full items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-muted", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, size: "3xl" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-bold text-on-card", children: name }), duration ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: duration })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: word })] }), description ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-xs line-clamp-2 text-sm text-muted-text", children: description })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-bold text-on-card [font-variant-numeric:tabular-nums]", children: price }), onBook ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", onClick: onBook, "aria-label": `${bookLabel}, ${name}`, children: bookLabel })) : null] })] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-treatment-card": variant, className: className, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-treatment-card": variant, className: (0, cn_1.cn)('p-0', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, salon_v4_1.metaLine)([name, word, duration, price]), "data-xen-v4-chrome": "on-surface", className: "flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left", children: body }) }));
});
//# sourceMappingURL=TreatmentCardV4.js.map