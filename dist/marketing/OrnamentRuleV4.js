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
exports.OrnamentRuleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const OrnamentRule_1 = require("./OrnamentRule");
/** Ramp step used for each tone's V4 rule gradient / ornament fill. */
const TONE_VAR = {
    accent: 'var(--xen-accent-400)',
    primary: 'var(--xen-primary-400)',
    border: 'var(--xen-border)',
};
const TONES = ['accent', 'primary', 'border'];
/**
 * V4 re-skin sheet. Targets the same `[data-xen-ornament-rule]` element +
 * `::before`/`::after` halves + `[data-xen-ornament]` the base renders, scoped
 * under `[data-xen-ornament-rule-v4]`, and sharpens them: a **fuller
 * three-stop** rule gradient (a stronger mid before fading out), a crisper 1px
 * rule, and a subtly glowing ornament. Every color is a `--xen-*` token.
 */
const ORNAMENT_V4_CSS = `
${TONES.map((tone) => `
[data-xen-ornament-rule-v4][data-tone="${tone}"]::before {
  height: 1px;
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, ${TONE_VAR[tone]} 40%, transparent) 55%, color-mix(in srgb, ${TONE_VAR[tone]} 85%, transparent));
}
[data-xen-ornament-rule-v4][data-tone="${tone}"]::after {
  height: 1px;
  background-image: linear-gradient(270deg, transparent, color-mix(in srgb, ${TONE_VAR[tone]} 40%, transparent) 55%, color-mix(in srgb, ${TONE_VAR[tone]} 85%, transparent));
}
[data-xen-ornament-rule-v4][data-tone="${tone}"] [data-xen-ornament] {
  background-color: ${TONE_VAR[tone]};
  box-shadow: 0 0 6px color-mix(in srgb, ${TONE_VAR[tone]} 55%, transparent);
}`).join('\n')}
`;
/**
 * OrnamentRule — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link OrnamentRule}: a fading 1px gradient
 * rule flanking an optional centered `diamond`/`dot`/`line`/`none` ornament,
 * token-tinted by `tone` (`accent`/`primary`/`border`). The base owns the
 * layout + the `::before`/`::after` rule halves; the V4 only re-skins.
 *
 * The refinement: **sharper token-driven dividers** — a fuller three-stop rule
 * gradient (a confident mid before it fades) and a subtly glowing ornament, so
 * the divider reads crisper per shape/tone while staying editorial. Every
 * `ornament` shape and `tone` value is honored exactly.
 *
 * Purely decorative and **static** — no motion, nothing to reduce (same as the
 * base). Token-only colors, no literals.
 */
exports.OrnamentRuleV4 = React.forwardRef(function OrnamentRuleV4({ ornament = 'diamond', tone = 'accent', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-ornament-rule-v4-styles', ORNAMENT_V4_CSS);
    // Keep the shape union referenced for tooling/tests.
    const shape = ornament;
    return ((0, jsx_runtime_1.jsx)(OrnamentRule_1.OrnamentRule, { ref: ref, "data-xen-ornament-rule-v4": "", ornament: shape, tone: tone, className: (0, cn_1.cn)(className), ...rest }));
});
//# sourceMappingURL=OrnamentRuleV4.js.map