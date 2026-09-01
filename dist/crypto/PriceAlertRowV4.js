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
exports.PriceAlertRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SwitchV4_1 = require("../primitives/SwitchV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/**
 * The trigger condition's glyph.
 *
 * No tone: `above → success` / `below → danger` spent the gain and error slots
 * on a condition the user *chose*. Neither is a status — an alert set below the
 * market is not an error — and once the two are toned, a row that has genuinely
 * failed has nothing left to say it with.
 */
const CONDITION_GLYPH = { above: '▲', below: '▼' };
const CONDITION_LABEL = { above: 'Above', below: 'Below' };
/**
 * **V4 price-alert row** — the web twin of the native `PriceAlertRowV4`, same
 * props as {@link PriceAlertRow} plus `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A disarmed alert is not drawn as an unavailable one.** The base dropped
 *    the whole row — the `Switch` included — to `opacity-60`, putting a live,
 *    toggleable control inside M3's disabled band. Whether an alert is armed
 *    is what the switch is *for*; dimming the row to say it a second time only
 *    makes the control look dead. The row keeps full strength.
 * 2. **Direction is identity, not status.** See {@link CONDITION_GLYPH}.
 * 3. **The switch clears 44.** It was the primitive's own compact size, in the
 *    only place on the row a finger can land.
 * 4. **The row joins the shared row family**, so an alert list, a settings
 *    screen and a notification feed are one object — one height, one text
 *    column, one trailing slot.
 */
exports.PriceAlertRowV4 = React.forwardRef(function PriceAlertRowV4({ symbol, condition, targetPrice, currentPrice, currencySymbol = '$', decimals = 2, enabled = false, onToggle, directionLabels, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    const word = directionLabels?.[condition] ?? CONDITION_LABEL[condition];
    const target = (0, format_1.formatPrice)(targetPrice, { symbol: currencySymbol, decimals });
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(currentPrice != null)), children: [(0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-card", children: symbol }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-muted-text", children: CONDITION_GLYPH[condition] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: word }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-card', market_v4_1.TABULAR_CLASS), children: target })] }), currentPrice != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', market_v4_1.TABULAR_CLASS), children: `Now ${(0, format_1.formatPrice)(currentPrice, { symbol: currencySymbol, decimals })}` })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(SwitchV4_1.SwitchV4, { checked: enabled, onCheckedChange: onToggle, "aria-label": (0, market_v4_1.spokenLine)([symbol, word, target]), className: chrome_v4_1.MIN_TAP_CLASS }) })] }) }));
});
//# sourceMappingURL=PriceAlertRowV4.js.map