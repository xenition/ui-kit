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
exports.MatchCelebration = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * The "It's a Match!" celebration overlay — the web parity of the native match
 * modal. Presents the two matched avatars with a heart between them and two clear
 * next steps (message / keep swiping). The dialog is a `role="dialog"` with
 * `aria-modal`, dismissible via the token-scrim backdrop or Escape. Token classes
 * only — no literal colors. Returns nothing when `visible` is false.
 */
exports.MatchCelebration = React.forwardRef(function MatchCelebration({ visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping' }, ref) {
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle = variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-neutral-900 p-xl", onClick: () => onClose?.(), onKeyDown: (e) => {
            if (e.key === 'Escape')
                onClose?.();
        }, children: (0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "dialog", "aria-modal": "true", "aria-label": `${heading} ${subtitle}`, onClick: (e) => e.stopPropagation(), className: (0, cn_1.cn)('flex w-full max-w-sm flex-col items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-xl'), children: [(0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-extrabold text-primary", children: heading }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [you ? ((0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: you.photoUri, name: you.name, size: "lg", className: "ring-2 ring-primary ring-offset-2" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-danger text-lg text-on-danger", "aria-hidden": "true", children: "\u2665" }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: match.photoUri, name: match.name, size: "lg", className: "ring-2 ring-primary ring-offset-2" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-center text-sm text-muted", children: subtitle }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-xs flex w-full flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onClick: () => onMessage?.(), children: messageLabel }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onClick: () => (onKeepSwiping ?? onClose)?.(), children: keepSwipingLabel })] })] }) }));
});
//# sourceMappingURL=MatchCelebration.js.map