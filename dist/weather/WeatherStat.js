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
exports.WeatherStat = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Statistic_1 = require("../primitives/Statistic");
/**
 * Compact weather metric tile (web parity of the native `WeatherStat`) —
 * humidity, pressure, visibility, dew point, etc. Built on the shared web
 * `Statistic` primitive: a leading glyph + muted label, a large token-scaled
 * value with an optional unit suffix, and a caption line. `variant='plain'`
 * drops the card chrome for use inside grids/rows. Renders a muted placeholder
 * when `value` is absent. All colors come from the `--xen-*` tokens via Tailwind
 * classes — no literal colors.
 */
exports.WeatherStat = React.forwardRef(function WeatherStat({ label, value, unit, glyph, caption, variant = 'card', emptyValue = '—', className, ...rest }, ref) {
    const hasValue = value != null;
    const a11y = `${label}, ${hasValue ? `${value}${unit ? ' ' + unit : ''}` : 'no data'}`;
    const stat = ((0, jsx_runtime_1.jsx)(Statistic_1.Statistic, { label: (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [glyph ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "sm", "aria-hidden": true }) : null, label] }), value: hasValue ? value : emptyValue, suffix: unit && hasValue ? unit : undefined }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [stat, caption ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs text-muted", children: caption }) : null] }));
    if (variant === 'plain') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "img", "aria-label": a11y, className: className, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: body }));
});
//# sourceMappingURL=WeatherStat.js.map