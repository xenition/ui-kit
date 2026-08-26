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
exports.GetStartedButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const Spinner_1 = require("../primitives/Spinner");
const cn_1 = require("../primitives/cn");
/**
 * The sticky-footer CTA height from the onboarding spec (§5), as a Tailwind
 * class: `h-14` is 56px. A geometric control dimension, which §10.1 permits —
 * it is not a spacing token and must not be one: 56 is the touch-comfortable
 * height the inputs, provider buttons and this CTA all share so the funnel
 * reads as one control family.
 */
const CTA_HEIGHT_CLASS = 'h-14';
/**
 * Which semantic slot the trailing arrow takes, per button variant, so it
 * matches the label the `Button` primitive coloured. `IconColor` has no
 * `primary-text` slot, so the outlined/quiet variants take `primary`.
 */
const ARROW_COLOR = {
    primary: 'onPrimary',
    secondary: 'primary',
    ghost: 'onSurface',
    outline: 'onSurface',
    danger: 'onDanger',
    soft: 'primary',
    link: 'primary',
    elevated: 'onSurface',
};
/**
 * The primary onboarding call-to-action — and, since the redesign, the shape
 * every screen in the funnel ends on.
 *
 * What shipped before was a short flat rectangle sitting mid-page: the same
 * `Button` the rest of the app used, at whatever width its parent happened to
 * give it. The reference screens all end on one unmistakable bar, so this now
 * pins the spec's §5 treatment — **56 tall, fully rounded, full width, primary
 * fill, semibold on-primary label, trailing `→`** — into one place, so every
 * entry screen (welcome, slides, sign-in, paywall, profile) gets it without
 * re-specifying anything. Disabled is the same shape at reduced opacity, never
 * a different shape, so the button does not appear to move when it enables.
 *
 * The hero treatment applies at `size="lg"` (the default). `sm`/`md` fall back
 * to the `Button` primitive's own compact geometry, for the rare inline use.
 * The RN `loading` idiom (spinner + blocked press) has one web home here:
 * `disabled` + `aria-busy` + an inline {@link Spinner}. All color and radius
 * come from the `--xen-*` tokens. No literal colors.
 */
exports.GetStartedButton = React.forwardRef(function GetStartedButton({ label = 'Get started', variant = 'primary', size = 'lg', trailingArrow = true, loading = false, fullWidth = true, disabled, className, style, 'aria-label': ariaLabel, ...rest }, ref) {
    // Only the hero size takes the §5 bar; a `sm`/`md` caller wanted a small
    // button and should keep getting one.
    const hero = size === 'lg';
    return ((0, jsx_runtime_1.jsxs)(Button_1.Button, { ref: ref, variant: variant, size: size, disabled: disabled || loading, "aria-busy": loading || undefined, "aria-label": ariaLabel ?? label, className: (0, cn_1.cn)(fullWidth && 'w-full', 'gap-2', hero && CTA_HEIGHT_CLASS, className), 
        /*
          `cn` is a plain joiner, not tailwind-merge, so a `rounded-full` class
          would sit alongside the primitive's own `rounded-[var(--xen-radius-md)]`
          and the winner would be whichever Tailwind emitted last. An inline rule
          is deterministic — and it is still the token, never a literal radius.
        */
        style: hero ? { borderRadius: 'var(--xen-radius-full)', ...style } : style, ...rest, children: [loading ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", "aria-label": "Loading" }) : null, (0, jsx_runtime_1.jsx)("span", { children: label }), trailingArrow ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "forward", size: size === 'lg' ? 'lg' : 'base', color: ARROW_COLOR[variant] }) : null] }));
});
//# sourceMappingURL=GetStartedButton.js.map