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
exports.TypingIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
/**
 * The bounce keyframe + reduced-motion guard. Colors stay in the token classes;
 * this sheet only animates transform/opacity, so the token-only rule holds.
 */
const TYPING_CSS = `
@keyframes xen-typing-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
  40% { transform: translateY(-60%); opacity: 1; }
}
[data-xen-typing-dot] { animation: xen-typing-bounce 1.2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  [data-xen-typing-dot] { animation: none; opacity: 0.6; }
}
`;
const DELAYS = [0, 150, 300];
/**
 * Animated "someone is typing" indicator — three bouncing dots, optionally in a
 * surface bubble with a leading name caption. The animation is disabled under
 * `prefers-reduced-motion`. Marked as a polite live region so assistive tech
 * announces when typing starts. No literal colors.
 */
exports.TypingIndicator = React.forwardRef(function TypingIndicator({ name, bubble = true, size = 6, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-typing-indicator-styles', TYPING_CSS);
    const dots = ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-end", style: { gap: size * 0.6 }, children: DELAYS.map((delay) => ((0, jsx_runtime_1.jsx)("span", { "data-xen-typing-dot": "", className: "inline-block rounded-full bg-muted", style: { width: size, height: size, animationDelay: `${delay}ms` } }, delay))) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-live": "polite", "aria-label": name ? `${name} is typing` : 'Typing', className: (0, cn_1.cn)('flex items-center gap-2', className), ...rest, children: [name ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: name }) : null, bubble ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex rounded-[var(--xen-radius-lg)] border border-border bg-surface px-3 py-2", children: dots })) : (dots)] }));
});
//# sourceMappingURL=TypingIndicator.js.map