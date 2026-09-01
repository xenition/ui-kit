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
exports.SectionDividerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const Parallax_1 = require("../motion/Parallax");
const cn_1 = require("../primitives/cn");
const OrnamentRuleV4_1 = require("./OrnamentRuleV4");
/**
 * V4 re-skin sheet for the two gradient variants. `hairline` gets a fuller
 * primary→accent gradient with a confident core before it fades; `fade` gets a
 * taller, smoother two-stop melt into the surface. Every color is a `--xen-*`
 * token.
 */
const DIVIDER_V4_CSS = `
[data-xen-section-divider-v4="hairline"] {
  height: 1px;
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, var(--xen-primary-500) 70%, transparent) 32%, color-mix(in srgb, var(--xen-accent-400) 80%, transparent) 68%, transparent);
}
[data-xen-section-divider-v4="fade"] {
  height: var(--xen-space-2xl);
  background-image: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--xen-surface) 60%, transparent) 55%, var(--xen-surface));
}
`;
/**
 * SectionDivider — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link SectionDivider}: three variants —
 * `hairline` (a 1px primary→accent gradient rule), `ornament` (delegates to the
 * ornament rule), and `fade` (a tall gradient melting the section into the
 * surface) — optionally wrapped in `Parallax` for a small counter-scroll drift.
 * The V4 is a *refined* take: **cleaner shape dividers per variant** — a fuller
 * primary→accent hairline with a confident core, a taller smoother fade melt,
 * and the `ornament` variant delegating to `OrnamentRuleV4` so its sharpened
 * rule/ornament carry through. Every variant/ornament/tone value is honored.
 *
 * **Reduced motion:** motion only exists on the `parallax` path, and that drift
 * is handled by the shared motion layer (`Parallax`), which already disables
 * itself under `prefers-reduced-motion` and on the server — exactly as the base
 * relies on. The V4 adds no new motion. Token-only colors, no literals.
 */
exports.SectionDividerV4 = React.forwardRef(function SectionDividerV4({ variant = 'hairline', parallax, ornament = 'diamond', tone = 'accent', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-section-divider-v4-styles', DIVIDER_V4_CSS);
    const shape = ornament;
    const toneValue = tone;
    const divider = variant === 'ornament' ? ((0, jsx_runtime_1.jsx)(OrnamentRuleV4_1.OrnamentRuleV4, { ref: ref, ornament: shape, tone: toneValue, className: className, ...rest })) : ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "separator", "aria-orientation": "horizontal", "data-xen-section-divider-v4": variant, className: (0, cn_1.cn)(className), ...rest }));
    return parallax !== undefined && parallax !== 0 ? ((0, jsx_runtime_1.jsx)(Parallax_1.Parallax, { speed: parallax, "aria-hidden": "true", children: divider })) : (divider);
});
//# sourceMappingURL=SectionDividerV4.js.map