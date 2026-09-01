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
exports.WeatherStripV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * WeatherStrip — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a multi-day forecast: a horizontal strip of day tiles
 * where the `highlightIndex` day is lifted onto a brand-gradient fill with
 * near-white ink (the signature V4 touch) and announced as "today", while the
 * other tiles stay clean surface with a hairline edge and muted labels. Condition
 * glyphs and high/low temperatures are preserved. Renders an empty hint when
 * there are no days. Same props/behavior as {@link WeatherStripProps}; all colors
 * from `--xen-*` token classes (no literal colors).
 */
exports.WeatherStripV4 = React.forwardRef(function WeatherStripV4({ days, unit = '°', highlightIndex, scrollEnabled = true, className, ...rest }, ref) {
    if (days.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-weather-strip": "", className: (0, cn_1.cn)('text-sm text-muted', className), ...rest, children: "No forecast available." }));
    }
    const tiles = days.map((d, i) => {
        const active = i === highlightIndex;
        return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${d.day}${active ? ' today' : ''}, ${d.condition ? `${d.condition}, ` : ''}high ${d.high}${unit}${typeof d.low === 'number' ? `, low ${d.low}${unit}` : ''}`, className: (0, cn_1.cn)('flex min-w-[64px] flex-col items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', active
                ? 'border-transparent bg-gradient-to-br from-primary-400 to-primary-600'
                : 'border-border bg-surface'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', active ? 'text-primary-50' : 'text-muted'), children: d.day }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-lg', active ? 'text-primary-50' : 'text-on-surface'), children: d.glyph ?? '—' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold', active ? 'text-primary-50' : 'text-on-surface'), children: [d.high, unit] }), typeof d.low === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs', active ? 'text-primary-100' : 'text-muted'), children: [d.low, unit] })) : null] })] }, `${d.day}-${i}`));
    });
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-weather-strip": "", className: (0, cn_1.cn)('gap-[var(--xen-space-sm)]', scrollEnabled ? 'flex overflow-x-auto' : 'flex flex-wrap', className), ...rest, children: tiles }));
});
//# sourceMappingURL=WeatherStripV4.js.map