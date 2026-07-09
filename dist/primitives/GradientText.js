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
 * All color-bearing declarations live in this injected sheet and reference
 * `--xen-*` ramp variables exclusively; the inline style carries only the
 * angle as a custom property. Restyles by theme seed alone.
 */
const GRADIENT_TEXT_CSS = `
[data-xen-gradient-text] {
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
[data-xen-gradient-text="primary"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-primary-300) 0%, var(--xen-primary-400) 45%, var(--xen-primary-600) 100%);
}
[data-xen-gradient-text="accent"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-accent-300) 0%, var(--xen-accent-400) 45%, var(--xen-accent-600) 100%);
}
[data-xen-gradient-text="primary-accent"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-primary-300) 0%, var(--xen-primary-400) 38%, var(--xen-accent-400) 100%);
}
[data-xen-gradient-text="accent-primary"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-accent-200) 0%, var(--xen-accent-400) 38%, var(--xen-primary-400) 100%);
}
`;
/**
 * Ramp-driven clipped gradient text — the highlighted word inside a headline.
 * Purely token-colored (the four recipes are fixed blends of the primary and
 * accent ramps), so it reads correctly over light and dark surfaces and
 * restyles from the theme seed alone. No motion, so nothing to reduce.
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