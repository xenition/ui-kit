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
exports.HourlyRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const weather_utils_1 = require("./weather-utils");
/**
 * HourlyRow, redesigned (v3): a **tight hour ticker**. Very small columns — time,
 * glyph, temperature, and an optional precip hint — pack into a horizontal scroll
 * for a compact strip. The minimal counterpart to v2's bar chart. Same props,
 * token-only.
 */
exports.HourlyRowV3 = React.forwardRef(function HourlyRowV3({ hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', className, ...rest }, ref) {
    if (hours.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDD50" }), title: emptyLabel, className: className });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-hourly-row": "", className: (0, cn_1.cn)('flex gap-3 overflow-x-auto', className), ...rest, children: hours.map((h, i) => {
            const interactive = typeof onSelectHour === 'function';
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${h.time}${typeof h.temperature === 'number' ? `, ${h.temperature}${unit}` : ''}${h.condition ? `, ${(0, weather_utils_1.conditionLabel)(h.condition)}` : ''}`, disabled: !interactive, onClick: interactive ? () => onSelectHour?.(h, i) : undefined, className: "flex shrink-0 flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[10px] text-muted", children: h.time }), h.condition ? (0, jsx_runtime_1.jsx)("span", { className: "text-base", "aria-hidden": true, children: (0, weather_utils_1.conditionGlyph)(h.condition) }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-on-surface", children: typeof h.temperature === 'number' ? `${h.temperature}${unit}` : '' }), showPrecip && typeof h.precip === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-[10px] text-primary", children: ["\uD83D\uDCA7", h.precip, "%"] }) : null] }, `${h.time}-${i}`));
        }) }));
});
//# sourceMappingURL=HourlyRowV3.js.map