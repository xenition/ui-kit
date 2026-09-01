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
exports.GetStartedButtonV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const Spinner_1 = require("../primitives/Spinner");
/**
 * The §5 CTA bar's height, composed from the spacing scale rather than pinned
 * at `h-14`.
 *
 * `2xl + sm` is the same 56px on the default scale and stays proportional on
 * any other — the base's literal is exactly the drift the design-spec Addendum
 * settled for form controls, applied here on the action side.
 */
const CTA_HEIGHT = 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]';
/**
 * Which semantic slot the trailing mark takes, per variant.
 *
 * `IconColor` carries no `primaryText` slot, so the quiet variants take
 * `primary` here and the **label** beside them is what wears the corrected
 * tone. Widening `IconColor` to the four `*Text` slots is worth doing — a
 * brand-coloured glyph on `surface` has the same contrast problem a
 * brand-coloured word does — but it is a change to `Icon`, not something to
 * fork inside one module.
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
 * **V4 onboarding CTA** — the web twin of the native `GetStartedButtonV4`,
 * same props as {@link GetStartedButton} plus `trailing` and `raised`.
 *
 * The shape every screen in the funnel ends on: full width, `radius.full`,
 * semibold label, a trailing mark, pinned into one place so no screen
 * re-specifies it.
 *
 * ## Four changes
 *
 * 1. **The height comes off the scale** (see {@link CTA_HEIGHT}).
 * 2. **The trailing mark is a slot, not a boolean.**
 * 3. **The label and mark take contrast-corrected tones** (see
 *    {@link ARROW_COLOR}).
 * 4. **It is raised** — `elevation.action` via `ButtonV4`'s own depth, which
 *    a flat seed has already zeroed.
 *
 * `disabled` is the same shape at reduced opacity, never a different one, so
 * the button does not appear to move when it enables. The hero treatment
 * applies at `size="lg"` (the default); `sm`/`md` fall back to `ButtonV4`'s
 * compact geometry for the rare inline use.
 */
exports.GetStartedButtonV4 = React.forwardRef(function GetStartedButtonV4({ label = 'Get started', variant = 'primary', size = 'lg', trailingArrow = true, trailing, raised = true, loading = false, fullWidth = true, disabled, className, style, 'aria-label': ariaLabel, ...rest }, ref) {
    // Only the hero size takes the §5 bar; an `sm`/`md` caller wanted a small
    // button and should keep getting one.
    const hero = size === 'lg';
    const mark = trailing !== undefined ? (trailing) : trailingArrow ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "forward", size: hero ? 'lg' : 'base', color: ARROW_COLOR[variant] })) : null;
    return ((0, jsx_runtime_1.jsxs)(ButtonV4_1.ButtonV4, { ref: ref, variant: variant, size: size, disabled: disabled || loading, "aria-busy": loading || undefined, "aria-label": ariaLabel ?? label, className: (0, cn_1.cn)(fullWidth && 'w-full', 'gap-sm', hero && CTA_HEIGHT, className), 
        /*
          `cn` is a plain joiner, not tailwind-merge, so a `rounded-full` class
          would sit beside the primitive's own radius and the winner would be
          whichever Tailwind emitted last. An inline rule is deterministic —
          and it is still the token, never a literal radius. The shadow rides
          along for the same reason: it is the compiled `--xen-elevation-action`,
          zero on a flat seed.
        */
        style: hero
            ? {
                borderRadius: 'var(--xen-radius-full)',
                // A disabled control that still casts a shadow reads as pressable.
                boxShadow: raised && !disabled ? 'var(--xen-elevation-action)' : undefined,
                ...style,
            }
            : style, ...rest, children: [loading ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", "aria-label": "Loading" }) : null, (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: label }), mark] }));
});
//# sourceMappingURL=GetStartedButtonV4.js.map