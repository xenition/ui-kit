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
exports.WindCompassV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CARDINALS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
/** Nearest 8-point cardinal name for a bearing in degrees. */
function cardinalFor(deg) {
    const idx = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
    return CARDINALS[idx] ?? 'N';
}
function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
}
/**
 * V4 design-line wind compass — a polished elevated white card carrying a clean
 * dial. Same props, defaults and behaviour as the base `WindCompass`: a
 * token-bordered ring with N/E/S/W ticks and a rotated arrow (CSS transform)
 * showing the bearing, the sustained speed centred, and an optional gust
 * caption. The cardinal direction is ALSO written out as text, so orientation
 * never relies on the arrow alone. All colors flow through Tailwind token
 * classes.
 */
exports.WindCompassV4 = React.forwardRef(function WindCompassV4({ direction = 0, speed, gust, unit = 'mph', size = 120, className, ...rest }, ref) {
    const deg = ((direction % 360) + 360) % 360;
    const cardinal = cardinalFor(deg);
    const dial = clamp(size, 72, 400);
    const arrowLen = dial * 0.36;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": `Wind from ${cardinal}, ${deg} degrees${speed != null ? `, ${speed} ${unit}` : ''}${gust != null ? `, gusting ${gust} ${unit}` : ''}`, className: (0, cn_1.cn)('flex flex-col items-center gap-2 rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center rounded-full border-2 border-border bg-neutral-50", style: { width: dial, height: dial }, children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute top-1 text-xs text-muted", children: "N" }), (0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-1 text-xs text-muted", children: "S" }), (0, jsx_runtime_1.jsx)("span", { className: "absolute left-1 text-xs text-muted", children: "W" }), (0, jsx_runtime_1.jsx)("span", { className: "absolute right-1 text-xs text-muted", children: "E" }), (0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "flex flex-col items-center", style: { width: 2, height: arrowLen, transform: `rotate(${deg}deg)` }, children: [(0, jsx_runtime_1.jsx)("span", { className: "border-b-primary", style: {
                                    width: 0,
                                    height: 0,
                                    borderLeft: '5px solid transparent',
                                    borderRight: '5px solid transparent',
                                    borderBottomWidth: 8,
                                    borderBottomStyle: 'solid',
                                } }), (0, jsx_runtime_1.jsx)("span", { className: "w-0.5 flex-1 bg-primary" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-on-surface", children: speed != null ? speed : '—' }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: unit })] })] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-on-surface", children: ["From ", cardinal, " (", deg, "\u00B0)"] }), gust != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Gusts ", gust, " ", unit] })) : null] }));
});
//# sourceMappingURL=WindCompassV4.js.map