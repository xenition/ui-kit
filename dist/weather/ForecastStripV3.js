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
exports.ForecastStripV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const weather_utils_1 = require("./weather-utils");
/**
 * ForecastStrip, redesigned (v3): a **vertical day list**. Each day is a hairline
 * row — label, condition glyph, a precip hint, and the high/low pinned right —
 * stacked for an at-a-glance week. The opposite of v2's card row. Same props,
 * token-only.
 */
exports.ForecastStripV3 = React.forwardRef(function ForecastStripV3({ days, unit = '°', selectedIndex, onSelectDay, variant, emptyLabel = 'No forecast', className, ...rest }, ref) {
    void variant;
    if (days.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDF24\uFE0F" }), title: emptyLabel, className: className });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-forecast-strip": "", className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: days.map((d, i) => {
            const selected = selectedIndex === i;
            const interactive = typeof onSelectDay === 'function';
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": selected, "aria-label": `${d.label}${d.condition ? `, ${(0, weather_utils_1.conditionLabel)(d.condition)}` : ''}`, disabled: !interactive, onClick: interactive ? () => onSelectDay?.(d, i) : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2 text-left transition-colors', selected ? 'bg-primary/5' : interactive ? 'hover:bg-neutral-50' : ''), children: [(0, jsx_runtime_1.jsx)("span", { className: "w-10 shrink-0 text-sm font-medium text-on-surface", children: d.label }), d.condition ? (0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: (0, weather_utils_1.conditionGlyph)(d.condition) }) : null, typeof d.precip === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-primary", children: ["\uD83D\uDCA7", d.precip, "%"] }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "ml-auto text-sm tabular-nums text-on-surface", children: [typeof d.high === 'number' ? `${d.high}${unit}` : '', typeof d.low === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-muted", children: [" / ", d.low, unit] }) : null] })] }, `${d.label}-${i}`));
        }) }));
});
//# sourceMappingURL=ForecastStripV3.js.map