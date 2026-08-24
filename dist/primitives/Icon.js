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
exports.Icon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const SIZE_CLASS = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
};
const COLOR_CLASS = {
    onSurface: 'text-on-surface',
    onPrimary: 'text-on-primary',
    primary: 'text-primary',
    muted: 'text-muted',
    success: 'text-success',
    onSuccess: 'text-on-success',
    warn: 'text-warn',
    onWarn: 'text-on-warn',
    danger: 'text-danger',
    onDanger: 'text-on-danger',
};
/**
 * Themed icon slot — the kit ships no icon font, so `Icon` renders a
 * caller-supplied `glyph`/`name` (emoji or unicode symbol) as a sized, colored
 * `<span>`. `size` maps to a `text-*` token class (or an inline px `fontSize`
 * for a raw number) and `color` resolves to a semantic `text-*` token — so
 * every color traces to a token, never a literal. Decorative by default; pass
 * `aria-label` to expose it as an image to screen readers.
 */
exports.Icon = React.forwardRef(function Icon({ glyph, name, size = 'lg', color = 'onSurface', className, style, 'aria-label': ariaLabel, ...rest }, ref) {
    const decorative = ariaLabel == null;
    const numeric = typeof size === 'number';
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: decorative ? undefined : 'img', "aria-label": ariaLabel, "aria-hidden": decorative || undefined, className: (0, cn_1.cn)('inline-flex items-center justify-center leading-none', !numeric && SIZE_CLASS[size], COLOR_CLASS[color], className), style: numeric ? { fontSize: size, ...style } : style, ...rest, children: glyph ?? name ?? '' }));
});
//# sourceMappingURL=Icon.js.map