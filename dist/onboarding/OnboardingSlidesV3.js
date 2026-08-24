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
exports.OnboardingSlidesV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
/**
 * OnboardingSlides, redesigned (v3): a **minimal stepped intro**. A slim top
 * progress bar tracks position, the slide title/description sit left-aligned and
 * quiet, and Skip / Next are plain text links. No hero medallion, no dots — the
 * opposite of v2's full-bleed carousel. Same props, token-only.
 */
exports.OnboardingSlidesV3 = React.forwardRef(function OnboardingSlidesV3({ slides, index, onIndexChange, onSkip, onComplete, showSkip = true, finishLabel = 'Get started', variant, className, ...rest }, ref) {
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
    const pct = Math.round(((clamped + 1) / slides.length) * 100);
    const slide = slides[clamped];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col gap-6 bg-surface p-6', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1 w-full overflow-hidden rounded-full bg-neutral-100", role: "progressbar", "aria-valuenow": clamped + 1, "aria-valuemin": 1, "aria-valuemax": slides.length, children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary transition-all motion-reduce:transition-none", style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col justify-center gap-3", children: [slide.icon ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: slide.icon, size: "2xl", color: "primary" }) : null, (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-on-surface", children: slide.title }), slide.description ? (0, jsx_runtime_1.jsx)("p", { className: "text-base leading-relaxed text-muted", children: slide.description }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [showSkip && !isLast ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onSkip, className: "text-sm font-semibold text-muted", children: "Skip" })) : ((0, jsx_runtime_1.jsx)("span", {})), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isLast ? finishLabel : 'Next', onClick: advance, className: "text-sm font-bold text-primary", children: isLast ? finishLabel : 'Next →' })] })] }));
});
//# sourceMappingURL=OnboardingSlidesV3.js.map