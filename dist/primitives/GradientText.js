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
exports.GradientText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
/**
 * All colour-bearing declarations live in this injected sheet and reference
 * `--xen-*` variables exclusively; the inline style carries only the angle.
 *
 * Every stop is a compiler-guaranteed **text** slot, never a pale ramp step. `--xen-primary-text` is `primary` walked in lightness until it
 * clears AA on `surface` — the same correction `gradientInk` applies, done once
 * by the compiler and emitted as a variable, which is the only way a web
 * component can carry that guarantee without printing a hex value into an
 * inline style.
 *
 * The single-ramp recipes need a second stop in the same hue family, and a
 * deep RAMP step will not do: measured on a teal seed, `primary-800` reads at
 * 3.81:1 on the dark page it lands on. So they run from the text slot toward
 * `--xen-on-surface` instead — the page's own ink, itself AA by construction.
 * Both ends are far from the surface on the same side, so everything between
 * them is too.
 */
const GRADIENT_TEXT_CSS = `
[data-xen-gradient-text] {
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
[data-xen-gradient-text="primary"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-primary-text) 0%, color-mix(in srgb, var(--xen-primary-text) 55%, var(--xen-on-surface)) 100%);
}
[data-xen-gradient-text="accent"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-accent-text) 0%, color-mix(in srgb, var(--xen-accent-text) 55%, var(--xen-on-surface)) 100%);
}
[data-xen-gradient-text="primary-accent"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-primary-text) 0%, var(--xen-accent-text) 100%);
}
[data-xen-gradient-text="accent-primary"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-accent-text) 0%, var(--xen-primary-text) 100%);
}
`;
/**
 * Ramp-driven clipped gradient text — the highlighted word inside a headline.
 *
 * This component predates the `gradient.brand` token, and it showed. Its stops
 * were hand-picked ramp steps starting at `300` — a pale tint of the brand,
 * used as **text**, on a light page. Nothing had measured it, and nothing
 * could: `300` is two steps from the surface, so the default recipe was an
 * unreadable headline word in every light-mode app that used it.
 *
 * The sweep is now the brand pair the compiler already owns — primary into
 * accent, the same two hues as `gradient.brand` — taken in the **contrast-safe
 * text form** of each. `--xen-primary-text` is `primary` walked in lightness
 * until it clears AA on `surface`, which is precisely the correction
 * `gradientInk` performs; doing it in the compiler rather than in the component
 * is what keeps this file free of hex, which the marketing token-purity sweep
 * requires. Single-ramp recipes fade that text slot toward `on-surface`, so
 * both of their stops are compiler-guaranteed against the page too.
 *
 * Purely token-coloured, so it restyles from the theme seed alone and reads on
 * light and dark surfaces. No motion, so nothing to reduce.
 *
 * ```tsx
 * <h1>Launch <GradientText>faster</GradientText></h1>
 * ```
 */
exports.GradientText = React.forwardRef(function GradientText({ ramp = 'primary-accent', angle = 92, as: Tag = 'span', className, style, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-gradient-text-styles', GRADIENT_TEXT_CSS);
    return ((0, jsx_runtime_1.jsx)(Tag, { ref: ref, "data-xen-gradient-text": ramp, className: (0, cn_1.cn)('inline-block', className), style: { ['--xen-gradient-text-angle']: `${angle}deg`, ...style }, ...rest, children: children }));
});
//# sourceMappingURL=GradientText.js.map