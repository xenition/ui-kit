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
exports.ForecastStripV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * ForecastStrip — **tiled on a brand ground** design (v4), web parity of the
 * native `ForecastStripV4`. A `primary`-colored panel of soft day tiles
 * (horizontal scroll, or full-width rows under `variant='list'`): day label,
 * condition glyph + label, and high/low. The selected day inverts to a solid
 * `on-primary` tile with `primary` text — a filled chip plus a bold label, never
 * color alone. All colors come from `--xen-*` classes, no literals. Renders a
 * muted line when `days` is empty. Same props as {@link ForecastStripProps}.
 */
exports.ForecastStripV4 = React.forwardRef(function ForecastStripV4({ days, unit = '°', selectedIndex, onSelectDay, variant = 'scroll', emptyLabel = 'No forecast available', className, ...rest }, ref) {
    const ground = 'rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-4';
    const isRow = variant === 'list';
    if (days.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(ground, className), ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: "text-center text-sm text-primary-100", children: emptyLabel }) }));
    }
    const renderCell = (day, index) => {
        const selected = index === selectedIndex;
        const label = (0, weather_utils_1.conditionLabel)(day.condition);
        const glyph = (0, weather_utils_1.conditionGlyph)(day.condition);
        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": selected, "aria-label": `${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${day.low != null ? `, low ${day.low}${unit}` : ''}`, onClick: onSelectDay ? () => onSelectDay(day, index) : undefined, className: (0, cn_1.cn)('flex gap-1 rounded-[var(--xen-radius-md)] px-3 py-3 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary', isRow ? 'flex-row items-center justify-between' : 'min-w-[68px] flex-col items-center', selected ? 'bg-on-primary' : 'bg-primary-500 hover:opacity-90'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', isRow && 'flex-1 text-left', selected ? 'font-extrabold text-primary' : 'font-semibold text-on-primary'), children: day.label }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", "aria-label": label, color: selected ? 'primary' : 'onPrimary' }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-extrabold', selected ? 'text-primary' : 'text-on-primary'), children: day.high != null ? `${day.high}${unit}` : '—' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', selected ? 'text-primary' : 'text-primary-100'), children: day.low != null ? `${day.low}${unit}` : '—' })] }), day.precip != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs', selected ? 'text-primary' : 'text-primary-100'), children: ["\uD83D\uDCA7 ", day.precip, "%"] })) : null] }, `${day.label}-${index}`));
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(ground, className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex gap-2', isRow ? 'flex-col' : 'flex-row overflow-x-auto'), children: days.map(renderCell) }) }));
});
//# sourceMappingURL=ForecastStripV4.js.map