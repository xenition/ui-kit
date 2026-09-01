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
exports.HourlyRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * HourlyRow — **tiled on a brand ground** design (v4), web parity of the native
 * `HourlyRowV4`. A `primary`-colored panel holding a horizontal scroll of soft
 * tiles, one per hour: the time, a condition glyph + label, the temperature, and
 * an optional precip chance. Ground is `primary`, tiles a lighter ramp step, text
 * the contrast-guaranteed `on-primary` — all from `--xen-*` classes, no literal
 * colors; the condition is a glyph AND text. Each tile is a `<button>` when
 * `onSelectHour` is set. Renders a muted line when `hours` is empty. Same props
 * as {@link HourlyRowProps}.
 */
exports.HourlyRowV4 = React.forwardRef(function HourlyRowV4({ hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', className, ...rest }, ref) {
    const ground = 'rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-4';
    if (hours.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(ground, className), ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: "text-center text-sm text-primary-100", children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(ground, className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-row gap-3 overflow-x-auto", children: hours.map((hour, index) => {
                const label = (0, weather_utils_1.conditionLabel)(hour.condition);
                const glyph = (0, weather_utils_1.conditionGlyph)(hour.condition);
                const Tag = onSelectHour ? 'button' : 'div';
                return ((0, jsx_runtime_1.jsxs)(Tag, { ...(onSelectHour ? { type: 'button', onClick: () => onSelectHour(hour, index) } : {}), "aria-label": `${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}`, className: (0, cn_1.cn)('flex min-w-[60px] flex-col items-center gap-1 rounded-full bg-primary-500 px-2 py-3', onSelectHour &&
                        'transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: hour.time }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", "aria-label": label, color: "onPrimary" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold text-on-primary", children: hour.temperature != null ? `${hour.temperature}${unit}` : '—' }), showPrecip && hour.precip != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-primary-100", children: ["\uD83D\uDCA7 ", (0, weather_utils_1.clamp)(hour.precip, 0, 100), "%"] })) : null] }, `${hour.time}-${index}`));
            }) }) }));
});
//# sourceMappingURL=HourlyRowV4.js.map