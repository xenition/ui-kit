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
exports.ForecastStrip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
const weather_utils_1 = require("./weather-utils");
/**
 * Multi-day forecast (web parity of the native `ForecastStrip`). Each day is a
 * tappable `<button>` cell showing its label, the condition as a glyph + short
 * text, and high/low temps; an optional precip chance sits underneath.
 * `variant='scroll'` lays the days out in a horizontally-scrolling row; `'list'`
 * stacks full-width rows. The selected day is highlighted with a token tint AND
 * a bold label + border — never color alone. Renders an `EmptyState` when `days`
 * is empty. All colors come from the `--xen-*` tokens via Tailwind classes.
 */
exports.ForecastStrip = React.forwardRef(function ForecastStrip({ days, unit = '°', selectedIndex, onSelectDay, variant = 'scroll', emptyLabel = 'No forecast available', className, ...rest }, ref) {
    if (days.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF24\uFE0F", size: "2xl", "aria-hidden": true }), title: emptyLabel, className: className, ...rest }));
    }
    const isRow = variant === 'list';
    const renderCell = (day, index) => {
        const selected = index === selectedIndex;
        const label = (0, weather_utils_1.conditionLabel)(day.condition);
        const glyph = (0, weather_utils_1.conditionGlyph)(day.condition);
        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": selected, "aria-label": `${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${day.low != null ? `, low ${day.low}${unit}` : ''}`, onClick: onSelectDay ? () => onSelectDay(day, index) : undefined, className: (0, cn_1.cn)('flex gap-1 rounded-[var(--xen-radius-md)] px-3 py-2 transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', isRow ? 'flex-row items-center' : 'min-w-[72px] flex-col items-center', selected
                ? 'border border-primary bg-primary-50'
                : 'border border-transparent hover:bg-neutral-100'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', isRow && 'flex-1 text-left', selected ? 'font-bold text-primary' : 'font-semibold text-on-surface'), children: day.label }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", "aria-label": label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: day.high != null ? `${day.high}${unit}` : '—' }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: day.low != null ? `${day.low}${unit}` : '—' })] }), day.precip != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDCA7 ", day.precip, "%"] })) : null] }, `${day.label}-${index}`));
    };
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex gap-1', isRow ? 'flex-col' : 'flex-row overflow-x-auto'), children: days.map(renderCell) }) }));
});
//# sourceMappingURL=ForecastStrip.js.map