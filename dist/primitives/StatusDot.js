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
exports.StatusDot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const TONES = ['success', 'warn', 'danger', 'primary', 'accent'];
/**
 * Color comes from the semantic slots via an injected sheet; the echo ring is
 * the same slot animated on scale/opacity only, and reduced motion removes
 * the animation (the solid dot still communicates state).
 */
const STATUS_DOT_CSS = `
@keyframes xen-status-echo {
  0% { transform: scale(1); opacity: 0.75; }
  70% { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
}
[data-xen-status-dot] { position: relative; display: inline-flex; width: 0.5rem; height: 0.5rem; }
[data-xen-status-dot] [data-xen-status-fill] { position: absolute; inset: 0; border-radius: 9999px; }
[data-xen-status-dot] [data-xen-status-echo] {
  position: absolute; inset: 0; border-radius: 9999px;
  animation: xen-status-echo 2s ease-out infinite;
}
${TONES.map((tone) => `[data-xen-status-dot="${tone}"] [data-xen-status-fill], [data-xen-status-dot="${tone}"] [data-xen-status-echo] { background-color: var(--xen-${tone}); }`).join('\n')}
@media (prefers-reduced-motion: reduce) {
  [data-xen-status-dot] [data-xen-status-echo] { animation: none; opacity: 0; }
}
`;
/**
 * The pulsing "live" indicator distilled from the templates: a solid semantic
 * dot with an expanding, fading echo. CSS-only, token-only, and inert under
 * `prefers-reduced-motion`. Drop it inside chips, nav items, or the
 * `ProductMock` chrome bar.
 */
exports.StatusDot = React.forwardRef(function StatusDot({ tone = 'success', pulse = true, label, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-status-dot-styles', STATUS_DOT_CSS);
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "data-xen-status-dot": tone, className: (0, cn_1.cn)(className), ...(label !== undefined
            ? { role: 'img', 'aria-label': label }
            : { 'aria-hidden': 'true' }), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-status-fill": "" }), pulse ? (0, jsx_runtime_1.jsx)("span", { "data-xen-status-echo": "" }) : null] }));
});
//# sourceMappingURL=StatusDot.js.map