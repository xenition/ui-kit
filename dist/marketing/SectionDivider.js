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
exports.SectionDivider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const Parallax_1 = require("../motion/Parallax");
const cn_1 = require("../primitives/cn");
const OrnamentRule_1 = require("./OrnamentRule");
const DIVIDER_CSS = `
[data-xen-section-divider="hairline"] {
  height: 1px;
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, var(--xen-primary-500) 55%, transparent), color-mix(in srgb, var(--xen-accent-400) 55%, transparent), transparent);
}
[data-xen-section-divider="fade"] {
  height: var(--xen-space-2xl);
  background-image: linear-gradient(to bottom, transparent, var(--xen-surface));
}
`;
/**
 * Section separators distilled from all three templates, optionally
 * parallax-capable: wrap any variant with a small counter-scroll drift by
 * passing `parallax`. Decorative (`role="separator"`), token-only, and
 * motion-free unless parallax is requested (which the motion layer already
 * guards for reduced motion and SSR).
 */
exports.SectionDivider = React.forwardRef(function SectionDivider({ variant = 'hairline', parallax, ornament = 'diamond', tone = 'accent', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-section-divider-styles', DIVIDER_CSS);
    const divider = variant === 'ornament' ? ((0, jsx_runtime_1.jsx)(OrnamentRule_1.OrnamentRule, { ref: ref, ornament: ornament, tone: tone, className: className, ...rest })) : ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "separator", "aria-orientation": "horizontal", "data-xen-section-divider": variant, className: (0, cn_1.cn)(className), ...rest }));
    return parallax !== undefined && parallax !== 0 ? ((0, jsx_runtime_1.jsx)(Parallax_1.Parallax, { speed: parallax, "aria-hidden": "true", children: divider })) : (divider);
});
//# sourceMappingURL=SectionDivider.js.map