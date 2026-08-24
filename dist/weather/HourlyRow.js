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
exports.HourlyRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
const weather_utils_1 = require("./weather-utils");
/**
 * Horizontal hour-by-hour timeline (web parity of the native `HourlyRow`): each
 * column shows the time, the condition as a glyph + label, the temperature, and
 * (optionally) precip chance. A horizontally-scrolling row of token-styled
 * columns — the condition is conveyed by glyph and text, never color alone. Each
 * column is a `<button>` when `onSelectHour` is set, otherwise a static cell.
 * Renders an `EmptyState` when `hours` is empty. All colors come from the
 * `--xen-*` tokens via Tailwind classes.
 */
exports.HourlyRow = React.forwardRef(function HourlyRow({ hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', className, ...rest }, ref) {
    if (hours.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD50", size: "2xl", "aria-hidden": true }), title: emptyLabel, className: className, ...rest }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-row gap-4 overflow-x-auto", children: hours.map((hour, index) => {
                const label = (0, weather_utils_1.conditionLabel)(hour.condition);
                const glyph = (0, weather_utils_1.conditionGlyph)(hour.condition);
                const Tag = onSelectHour ? 'button' : 'div';
                return ((0, jsx_runtime_1.jsxs)(Tag, { ...(onSelectHour
                        ? { type: 'button', onClick: () => onSelectHour(hour, index) }
                        : {}), "aria-label": `${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}`, className: (0, cn_1.cn)('flex min-w-[56px] flex-col items-center gap-1', onSelectHour &&
                        'rounded-[var(--xen-radius-md)] px-1 py-1 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: hour.time }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", "aria-label": label }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: hour.temperature != null ? `${hour.temperature}${unit}` : '—' }), showPrecip && hour.precip != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDCA7 ", (0, weather_utils_1.clamp)(hour.precip, 0, 100), "%"] })) : null] }, `${hour.time}-${index}`));
            }) }) }));
});
//# sourceMappingURL=HourlyRow.js.map