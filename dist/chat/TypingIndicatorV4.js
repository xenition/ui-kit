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
exports.TypingIndicatorV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const v4_motion_1 = require("../primitives/internal/v4-motion");
const thread_v4_1 = require("./internal/thread-v4");
const STYLE_ID = 'xen-v4-typing-styles';
/** M3: one bounce, three dots, 150ms apart. */
const STAGGER = 150;
const CSS = `
@keyframes xen-v4-typing {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-25%); opacity: 1; }
}
[data-xen-typing-dot] {
  animation: xen-v4-typing ${v4_motion_1.V4_MOTION.standard}ms ${STAGGER * 4}ms infinite;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-typing-dot] { animation: none; opacity: 0.7; }
}
`;
/**
 * **V4 typing indicator** — the web twin of the native `TypingIndicatorV4`,
 * same props as {@link TypingIndicator} plus `scale` and `formatLabel`.
 *
 * ## Four changes
 *
 * 1. **It announces itself once, politely.** The base was three animated dots
 *    and no text at all, so a screen-reader user was never told the other
 *    person was replying.
 * 2. **The dots are hidden from the reader.** Three bouncing spans are three
 *    stops on a tab-through and carry nothing the label does not.
 * 3. **The bounce is M3's standard duration and stagger.**
 * 4. **`prefers-reduced-motion` settles the dots** rather than stopping them
 *    dead — a still indicator still has to read as "in progress".
 */
exports.TypingIndicatorV4 = React.forwardRef(function TypingIndicatorV4({ name, bubble = true, size, scale = 'sm', formatLabel, className, ...rest }, ref) {
    React.useEffect(() => (0, inject_1.injectStyleOnce)(STYLE_ID, CSS), []);
    const label = (formatLabel ?? ((who) => (who ? `${who} is typing` : 'Typing')))(name);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-label": label, "data-xen-typing": "", className: (0, cn_1.cn)('inline-flex items-center gap-xs', bubble &&
            'rounded-[var(--xen-radius-lg)] rounded-bl-[var(--xen-radius-sm)] border border-border bg-card px-md py-sm', className), ...rest, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "inline-flex items-center gap-[3px]", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("span", { "data-xen-typing-dot": "", className: (0, cn_1.cn)('inline-block rounded-full bg-muted', size == null && thread_v4_1.CHAT_SIZE[scale]), style: {
                    animationDelay: `${i * STAGGER}ms`,
                    ...(size != null ? { width: size, height: size } : null),
                } }, i))) }) }));
});
//# sourceMappingURL=TypingIndicatorV4.js.map