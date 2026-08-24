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
exports.OnboardingSlidesV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
const ProgressDots_1 = require("./ProgressDots");
/**
 * OnboardingSlides, redesigned (v2): a **full-bleed hero carousel**. Each slide
 * fills a tall primary-tinted panel with a large medallion, headline, and
 * description centered; progress dots sit at the bottom with Skip and a circular
 * Next/Done button. A bolder intro than v1. Same props, token-only.
 */
exports.OnboardingSlidesV2 = React.forwardRef(function OnboardingSlidesV2({ slides, index, onIndexChange, onSkip, onComplete, showSkip = true, finishLabel = 'Get started', variant, className, ...rest }, ref) {
    void variant;
    const [internal, setInternal] = React.useState(0);
    const active = index ?? internal;
    const clamped = Math.max(0, Math.min(slides.length - 1, active));
    const isLast = clamped >= slides.length - 1;
    if (slides.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDC4B" }), title: "Nothing to show", className: className, ...rest });
    }
    const go = (next) => {
        if (index === undefined)
            setInternal(next);
        onIndexChange?.(next);
    };
    const advance = () => {
        if (isLast)
            onComplete?.();
        else
            go(clamped + 1);
    };
    const slide = slides[clamped];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col bg-surface', className), ...rest, children: [showSkip && !isLast ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end p-3", children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onSkip, className: "text-sm font-semibold text-muted", children: "Skip" }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "h-12" })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col items-center justify-center gap-4 bg-primary/10 px-6 text-center", children: [slide.icon ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-24 w-24 items-center justify-center rounded-full bg-surface shadow-sm", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: slide.icon, size: "3xl", color: "primary" }) })) : null, (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-on-surface", children: slide.title }), slide.description ? (0, jsx_runtime_1.jsx)("p", { className: "max-w-sm text-base text-muted", children: slide.description }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-6", children: [(0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { count: slides.length, activeIndex: clamped, onDotClick: (i) => go(i) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isLast ? finishLabel : 'Next', onClick: advance, className: "flex h-12 items-center justify-center gap-1 rounded-full bg-primary px-5 text-sm font-bold text-on-primary", children: isLast ? finishLabel : '→' })] })] }));
});
//# sourceMappingURL=OnboardingSlidesV2.js.map