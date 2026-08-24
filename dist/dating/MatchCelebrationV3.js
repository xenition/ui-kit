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
exports.MatchCelebrationV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * MatchCelebration — design variant **V3**, a **compact toast** (web parity of the
 * native V3). Rather than taking over the screen, it drops a small horizontal card
 * in from the top over a light dismissable scrim: two tiny overlapping avatars, a
 * two-line headline/subtitle, and an inline message button. Ideal when a full
 * celebration would be too heavy. Same `MatchCelebrationProps`; token classes
 * only; dismissible via backdrop or Escape; returns nothing when not visible.
 */
exports.MatchCelebrationV3 = React.forwardRef(function MatchCelebrationV3({ visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping' }, ref) {
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle = variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex justify-center bg-neutral-950/30 p-md", onClick: () => (onKeepSwiping ?? onClose)?.(), "aria-label": keepSwipingLabel, onKeyDown: (e) => {
            if (e.key === 'Escape')
                onClose?.();
        }, children: (0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alertdialog", "aria-modal": "true", "aria-label": `${heading} ${subtitle}`, onClick: (e) => e.stopPropagation(), className: (0, cn_1.cn)('flex w-full max-w-lg items-center gap-md self-start rounded-[var(--xen-radius-lg)] border border-border bg-surface p-md shadow-lg', 'transition-transform duration-200 motion-reduce:transition-none'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [you ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: you.photoUri, name: you.name, size: "sm", ring: true }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: match.photoUri, name: match.name, size: "sm", ring: true, className: you ? '-ml-2.5' : undefined })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-extrabold text-primary", children: heading }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: subtitle })] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: () => onMessage?.(), "aria-label": messageLabel, children: messageLabel })] }) }));
});
//# sourceMappingURL=MatchCelebrationV3.js.map