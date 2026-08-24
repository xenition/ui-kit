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
exports.OnboardingSlides = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
const ProgressDots_1 = require("./ProgressDots");
/**
 * Paged intro carousel — the first-run "here's the value" sequence
 * (design.md §41-42). Renders one {@link OnboardingSlide} at a time with a hero
 * medallion, a {@link ProgressDots} indicator, a "Skip" escape hatch and a
 * Next/Done primary action that walks to `onComplete` on the last slide. Works
 * controlled (`index` + `onIndexChange`) or uncontrolled. All indexing is
 * clamped so an out-of-range `index` can't crash, and an empty `slides` list
 * renders the {@link EmptyState}. No literal colors.
 */
exports.OnboardingSlides = React.forwardRef(function OnboardingSlides({ slides, index, onIndexChange, onSkip, onComplete, showSkip = true, finishLabel = 'Get started', variant = 'default', className, ...rest }, ref) {
    const [internal, setInternal] = React.useState(0);
    const count = slides.length;
    const controlled = index != null;
    const rawActive = controlled ? index : internal;
    const active = count === 0 ? 0 : Math.min(Math.max(0, rawActive), count - 1);
    const isLast = active >= count - 1;
    const goTo = (next) => {
        const clamped = Math.min(Math.max(0, next), Math.max(0, count - 1));
        if (!controlled)
            setInternal(clamped);
        onIndexChange?.(clamped);
    };
    const onNext = () => {
        if (isLast) {
            onComplete?.();
            return;
        }
        goTo(active + 1);
    };
    if (count === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: "Nothing to show yet." }) }));
    }
    const slide = slides[active];
    if (!slide)
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest });
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col gap-6 px-6 py-4', className), ...rest, children: [showSkip ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end", children: (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Skip intro", onClick: onSkip, className: "text-sm font-medium text-muted transition-colors hover:text-on-surface", children: "Skip" }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col items-center justify-center gap-6 text-center", children: [variant === 'default' && slide.icon ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-24 w-24 items-center justify-center rounded-full bg-primary", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: slide.icon, size: "3xl", color: "onPrimary" }) })) : null, (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-on-surface", children: slide.title }), slide.description ? ((0, jsx_runtime_1.jsx)("p", { className: "text-base leading-relaxed text-muted", children: slide.description })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-6", children: [(0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { count: count, activeIndex: active, onDotClick: goTo }), (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", size: "lg", onClick: onNext, "aria-label": isLast ? finishLabel : 'Next slide', className: "w-full", children: isLast ? finishLabel : 'Next' })] })] }));
});
//# sourceMappingURL=OnboardingSlides.js.map