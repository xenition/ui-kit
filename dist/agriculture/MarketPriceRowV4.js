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
exports.MarketPriceRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const farm_v4_1 = require("./internal/farm-v4");
/**
 * Direction → glyph, spoken label and sign.
 *
 * The colours are **not** here: a price movement genuinely is good or bad news
 * to the person reading it, so `up` keeps `success-text` and `down` keeps
 * `danger-text` — but the glyph and the word carry it too, because a
 * red-green-only signal is the single most common accessibility defect in a
 * markets table.
 */
const DIR_META = {
    up: { glyph: '▲', label: 'up', sign: '+' },
    down: { glyph: '▼', label: 'down', sign: '' },
    flat: { glyph: '▪', label: 'unchanged', sign: '' },
};
const DIR_INK = {
    up: 'text-success-text',
    down: 'text-danger-text',
    flat: 'text-muted-text',
};
/**
 * **V4 market price row** — the web twin of the native `MarketPriceRowV4`,
 * same props as {@link MarketPriceRow} plus `formatChange` and
 * `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **Direction is not carried by colour alone.** The glyph was already
 *    there; the spoken label is new, so a screen reader says "up 2.4 percent"
 *    rather than reading a triangle.
 * 2. **The change is formattable** — see `formatChange`.
 * 3. **It is a row from the shared row line**, with the shared hover layer.
 * 4. **The price and the change are tabular**, which is the whole point of a
 *    column of prices.
 *
 * **Renders nothing without a `commodity`** (§4.5).
 */
exports.MarketPriceRowV4 = React.forwardRef(function MarketPriceRowV4({ commodity, price, unit, changePct, direction, icon = '🌽', market, formatChange, directionLabels, last = false, onClick, className, ...rest }, ref) {
    if (!commodity)
        return null;
    const dir = direction ??
        (typeof changePct === 'number'
            ? changePct > 0
                ? 'up'
                : changePct < 0
                    ? 'down'
                    : 'flat'
            : 'flat');
    const meta = DIR_META[dir];
    const dirLabel = directionLabels?.[dir] ?? meta.label;
    const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
    const changeText = hasChange
        ? (formatChange ??
            ((n, d) => `${DIR_META[d].sign}${n.toFixed(1)}%`))(changePct, dir)
        : null;
    const caption = (0, farm_v4_1.metaLine)([market, unit]);
    const name = [commodity, String(price), unit, changeText ? `${dirLabel} ${changeText}` : null]
        .filter(Boolean)
        .join(', ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-market-price-row": "", "data-xen-v4-chrome": onClick ? 'on-surface' : undefined, role: onClick ? 'button' : undefined, onClick: onClick, "aria-label": name, className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(Boolean(caption)), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: commodity }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-0'), children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]", children: String(price) }), changeText ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex items-center gap-xs text-xs', DIR_INK[dir]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "font-semibold [font-variant-numeric:tabular-nums]", children: changeText })] })) : null] })] }));
});
//# sourceMappingURL=MarketPriceRowV4.js.map