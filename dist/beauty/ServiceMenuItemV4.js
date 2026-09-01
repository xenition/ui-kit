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
exports.ServiceMenuItemV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * Category → glyph and default word.
 *
 * A treatment category is **not** a status: it does not mean good or bad, so
 * the glyph carries identity and the status colours stay free. The base
 * assigned each category a `keyof SemanticColors`, which spent `success` and
 * `warn` on "nails" and "waxing".
 */
const CATEGORY_META = {
    hair: { label: 'Hair', glyph: '💇' },
    nails: { label: 'Nails', glyph: '💅' },
    skin: { label: 'Skin', glyph: '🧴' },
    massage: { label: 'Massage', glyph: '💆' },
    makeup: { label: 'Makeup', glyph: '💄' },
    brows: { label: 'Brows', glyph: '👁' },
    waxing: { label: 'Waxing', glyph: '🕯' },
    spa: { label: 'Spa', glyph: '🧖' },
};
/**
 * **V4 service menu item** — the web twin of the native `ServiceMenuItemV4`,
 * same props as {@link ServiceMenuItem} plus five hooks.
 *
 * ## Four changes
 *
 * 1. **A category stops spending the status colours** — see
 *    {@link CATEGORY_META}.
 * 2. **An unavailable service is `aria-disabled` and inert**, where the base
 *    greyed it and kept the click live.
 * 3. **It is a row from the shared row line**, with tabular prices.
 * 4. **Nine English strings become props.**
 *
 * **Renders nothing without a `name`** (§4.5).
 */
exports.ServiceMenuItemV4 = React.forwardRef(function ServiceMenuItemV4({ name, priceCents, currency = 'USD', category, durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney = money_1.formatMoney, categoryLabels, popularLabel = 'Popular', unavailableLabel = 'Unavailable', formatDuration, last = false, onClick, className, ...rest }, ref) {
    if (!name)
        return null;
    const meta = category ? CATEGORY_META[category] : null;
    const categoryWord = category ? (categoryLabels?.[category] ?? meta.label) : null;
    const price = formatMoney(priceCents, currency);
    const duration = typeof durationMin === 'number'
        ? (formatDuration ?? ((m) => `${m} min`))(durationMin)
        : null;
    const caption = (0, salon_v4_1.metaLine)([categoryWord, duration, description]);
    const live = Boolean(onClick) && !unavailable;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-service-menu-item": category, "data-xen-v4-chrome": live ? 'on-surface' : undefined, role: live ? 'button' : undefined, onClick: live ? onClick : undefined, "aria-disabled": unavailable || undefined, "aria-label": (0, salon_v4_1.metaLine)([name, caption, price, unavailable ? unavailableLabel : null]), className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(Boolean(caption)), !last && (0, row_v4_1.rowEdgeClass)(), unavailable && 'opacity-[0.38]', className), ...rest, children: [meta ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, size: "lg" }) : null, (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: name }), popular && !unavailable ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "accent", variant: "soft", size: "sm", children: popularLabel })) : null, unavailable ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: unavailableLabel })) : null] }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'items-baseline'), children: [pricePrefix ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: pricePrefix }) : null, (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]", children: price })] })] }));
});
//# sourceMappingURL=ServiceMenuItemV4.js.map