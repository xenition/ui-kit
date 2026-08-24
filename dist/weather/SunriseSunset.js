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
exports.SunriseSunset = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * Sunrise / sunset card with a static daylight arc (web parity of the native
 * `SunriseSunset`). The arc is a dependency-free row of token-tinted dots forming
 * a dome; the sun marker sits at `progress` along it. Sunrise and sunset are
 * labelled with glyphs + times, so the info never relies on the arc alone.
 * Renders a muted empty state when both times are absent. All colors come from
 * the `--xen-*` tokens via Tailwind classes — no literal colors, no SVG deps.
 */
exports.SunriseSunset = React.forwardRef(function SunriseSunset({ sunrise, sunset, progress = 0.5, arcHeight = 72, emptyLabel = 'Sun times unavailable', className, ...rest }, ref) {
    if (sunrise == null && sunset == null) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, role: "img", "aria-label": emptyLabel, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel }) }));
    }
    const p = (0, weather_utils_1.clamp)(progress, 0, 1);
    const DOTS = 11;
    const height = (0, weather_utils_1.clamp)(arcHeight, 40, 200);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, role: "img", "aria-label": `Sunrise ${sunrise ?? 'unknown'}, sunset ${sunset ?? 'unknown'}`, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col justify-end", style: { height }, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-row items-end justify-between", style: { height }, children: Array.from({ length: DOTS }).map((_, i) => {
                            const t = i / (DOTS - 1);
                            const dome = Math.sin(t * Math.PI); // 0→1→0
                            const active = t <= p;
                            const dotSize = 6;
                            return ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('rounded-full', active ? 'bg-accent' : 'bg-neutral-200'), style: { width: dotSize, height: dotSize, marginBottom: dome * (height - dotSize * 2) } }, i));
                        }) }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute", style: { left: `${p * 100}%`, bottom: Math.sin(p * Math.PI) * (height - 12), marginLeft: -9 }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2600\uFE0F", size: "lg", "aria-hidden": true }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex flex-row justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF05", size: "sm", "aria-label": "Sunrise" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: sunrise ?? '—' })] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF07", size: "sm", "aria-label": "Sunset" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: sunset ?? '—' })] })] })] }));
});
//# sourceMappingURL=SunriseSunset.js.map