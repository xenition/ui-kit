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
exports.Text = void 0;
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
/*
  The same leading ratios the native twin computes (1.5 for body copy, 1.375 at
  `lg`, 1.25 for display sizes), expressed as Tailwind's named classes:
  `leading-normal` = 1.5, `leading-snug` = 1.375, `leading-tight` = 1.25. Keep
  this table in step with `LEADING_RATIO` in the native file.
*/
const LEADING_CLASS = {
    xs: 'leading-normal',
    sm: 'leading-normal',
    base: 'leading-normal',
    lg: 'leading-snug',
    xl: 'leading-tight',
    '2xl': 'leading-tight',
    '3xl': 'leading-tight',
};
/**
 * Semantic slot → token class. Keyed by `SemanticColors` so a slot added to the
 * compiler and forgotten here is a type error, not a silently unstyled span.
 */
const TONE_CLASS = {
    surface: 'text-surface',
    onSurface: 'text-on-surface',
    primary: 'text-primary',
    onPrimary: 'text-on-primary',
    accent: 'text-accent',
    onAccent: 'text-on-accent',
    muted: 'text-muted',
    primaryText: 'text-primary-text',
    accentText: 'text-accent-text',
    successText: 'text-success-text',
    warnText: 'text-warn-text',
    dangerText: 'text-danger-text',
    border: 'text-border',
    success: 'text-success',
    onSuccess: 'text-on-success',
    warn: 'text-warn',
    onWarn: 'text-on-warn',
    danger: 'text-danger',
    onDanger: 'text-on-danger',
};
const WEIGHT_CLASS = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
};
const ALIGN_CLASS = {
    auto: '',
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
};
/**
 * Themed text — **the** way to render text in a Xenition app, and the web
 * mirror of the native `Text`.
 *
 * Before this existed every screen hand-assembled `className="text-lg
 * text-muted"` (or worse, an inline `style={{ fontSize: 15 }}`) at every call
 * site. `Text` takes the scale step and the semantic slot as *props* —
 * `size` and `tone` — so there is nothing left to hand-assemble.
 *
 * **A raw `fontSize` (or a literal colour) in an app is a bug.** If a size or a
 * colour you need is missing here, the fix is a token, not a literal: reach for
 * the next `size`, or add the slot to the theme compiler.
 *
 * Renders a `<span>` and forwards the rest of its props. `numberOfLines` clamps
 * to N lines with an ellipsis (the same prop name the native twin uses — prop
 * parity beats platform idiom here).
 */
exports.Text = React.forwardRef(function Text({ size = 'base', tone = 'onSurface', weight = 'regular', align = 'auto', numberOfLines, className, style, children, ...rest }, ref) {
    // Line clamping has no token to violate — it is pure layout, so an inline
    // rule is fine here where a colour or a size would not be.
    const clamp = numberOfLines != null
        ? {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: numberOfLines,
            overflow: 'hidden',
        }
        : undefined;
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, className: (0, cn_1.cn)(SIZE_CLASS[size], LEADING_CLASS[size], TONE_CLASS[tone], WEIGHT_CLASS[weight], ALIGN_CLASS[align], className), style: clamp ? { ...clamp, ...style } : style, ...rest, children: children }));
});
//# sourceMappingURL=Text.js.map