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
exports.WeatherStatV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * WeatherStat — **sky tile** design (v4), web parity of the native `WeatherStatV4`.
 * A polished metric tile: the leading glyph sits in a small gradient badge (the
 * brand ramp), the muted label rides above a big value with an optional unit
 * suffix, and a caption closes it. Same label / value / unit / caption / glyph
 * contract, defaults and empty handling as the base; `variant='plain'` drops the
 * card chrome. All colors flow through Tailwind token classes. Same props as
 * {@link WeatherStatProps}.
 */
exports.WeatherStatV4 = React.forwardRef(function WeatherStatV4({ label, value, unit, glyph, caption, variant = 'card', emptyValue = '—', className, ...rest }, ref) {
    const hasValue = value != null;
    const a11y = `${label}, ${hasValue ? `${value}${unit ? ' ' + unit : ''}` : 'no data'}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-2", children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "base", color: "onPrimary", "aria-hidden": true }) })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: label })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex flex-row items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold text-on-surface", children: hasValue ? value : emptyValue }), unit && hasValue ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: unit }) : null] }), caption ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs text-muted", children: caption }) : null] }));
    if (variant === 'plain') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface p-5 shadow-lg', className), ...rest, children: body }));
});
//# sourceMappingURL=WeatherStatV4.js.map