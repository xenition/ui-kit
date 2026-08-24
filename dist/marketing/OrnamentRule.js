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
exports.OrnamentRule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const TONES = ['accent', 'primary', 'border'];
/** Ramp step used for each tone's rule gradient / ornament fill. */
const TONE_VAR = {
    accent: 'var(--xen-accent-400)',
    primary: 'var(--xen-primary-400)',
    border: 'var(--xen-border)',
};
const ORNAMENT_CSS = `
[data-xen-ornament-rule] {
  display: flex;
  align-items: center;
  justify-content: center;
}
[data-xen-ornament-rule]::before,
[data-xen-ornament-rule]::after {
  content: '';
  flex: 1 1 auto;
  height: 1px;
}
[data-xen-ornament-rule] [data-xen-ornament] {
  flex: none;
  margin: 0 1rem;
}
[data-xen-ornament-rule="none"] [data-xen-ornament] { display: none; }
[data-xen-ornament-rule] [data-xen-ornament="diamond"] { width: 7px; height: 7px; transform: rotate(45deg); }
[data-xen-ornament-rule] [data-xen-ornament="dot"] { width: 6px; height: 6px; border-radius: 9999px; }
[data-xen-ornament-rule] [data-xen-ornament="line"] { width: 24px; height: 1px; }
${TONES.map((tone) => `
[data-xen-ornament-rule][data-tone="${tone}"]::before {
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, ${TONE_VAR[tone]} 65%, transparent));
}
[data-xen-ornament-rule][data-tone="${tone}"]::after {
  background-image: linear-gradient(270deg, transparent, color-mix(in srgb, ${TONE_VAR[tone]} 65%, transparent));
}
[data-xen-ornament-rule][data-tone="${tone}"] [data-xen-ornament] { background-color: ${TONE_VAR[tone]}; }`).join('\n')}
`;
/**
 * Editorial divider generalized from the restaurant template's brass rules: a
 * fading 1px gradient rule with an optional centered diamond/dot/line
 * ornament. Purely decorative and static — token-tinted via `tone`, so
 * "brass" is just whatever the theme's accent ramp says it is.
 */
exports.OrnamentRule = React.forwardRef(function OrnamentRule({ ornament = 'diamond', tone = 'accent', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-ornament-rule-styles', ORNAMENT_CSS);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "separator", "aria-orientation": "horizontal", "data-xen-ornament-rule": ornament, "data-tone": tone, className: (0, cn_1.cn)(className), ...rest, children: (0, jsx_runtime_1.jsx)("span", { "data-xen-ornament": ornament, "aria-hidden": "true" }) }));
});
//# sourceMappingURL=OrnamentRule.js.map