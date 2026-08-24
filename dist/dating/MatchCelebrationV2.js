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
exports.MatchCelebrationV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
/**
 * MatchCelebration — design variant **V2**, an **immersive full-screen** moment
 * (web parity of the native V2). Instead of a small centred dialog, the whole
 * viewport becomes a deep tinted stage: two **overlapping ringed avatars** sit
 * above a filled **celebratory band** carrying the headline, with the CTAs
 * anchored below. Same `MatchCelebrationProps`; token classes only; dismissible
 * via backdrop or Escape; returns nothing when `visible` is false.
 */
exports.MatchCelebrationV2 = React.forwardRef(function MatchCelebrationV2({ visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping' }, ref) {
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle = variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex flex-col items-center justify-center gap-lg bg-neutral-950/90 p-xl", onClick: () => onClose?.(), onKeyDown: (e) => {
            if (e.key === 'Escape')
                onClose?.();
        }, children: (0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alertdialog", "aria-modal": "true", "aria-label": `${heading} ${subtitle}`, onClick: (e) => e.stopPropagation(), className: "flex w-full max-w-md flex-col items-center gap-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [you ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: you.photoUri, name: you.name, size: "xl", ring: true }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: match.photoUri, name: match.name, size: "xl", ring: true, className: you ? '-ml-4' : undefined })] }), (0, jsx_runtime_1.jsx)("div", { className: "rounded-full bg-primary px-xl py-sm", children: (0, jsx_runtime_1.jsx)("p", { className: "text-center text-2xl font-extrabold text-on-primary", children: heading }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-center text-base text-neutral-100", children: subtitle }), (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onClick: () => onMessage?.(), children: messageLabel }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onClick: () => (onKeepSwiping ?? onClose)?.(), children: keepSwipingLabel })] })] }) }));
});
//# sourceMappingURL=MatchCelebrationV2.js.map