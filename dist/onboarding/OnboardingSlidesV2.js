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
const Text_1 = require("../primitives/Text");
const commerce_1 = require("../commerce");
const GetStartedButton_1 = require("./GetStartedButton");
const ProgressDots_1 = require("./ProgressDots");
/** 44×44 header tap targets (spec §2) — `h-11` is 44px. Geometric, per §10.1. */
const TAP_TARGET_CLASS = 'h-11 w-11';
/**
 * The editorial hero runs to the top edge and takes a little under half the
 * viewport — bigger than the base line's 38% cap because nothing insets it
 * (spec §11, V2).
 */
const HERO_HEIGHT_CLASS = 'h-[46vh]';
/**
 * Onboarding intro — V2, the **editorial** line.
 *
 * Same shell as {@link OnboardingSlides} — header · hero · headline · sticky
 * footer — but the hero is not a panel sitting under the header: it runs
 * full-bleed to the very top edge, the header controls float over it, and a
 * `surface` content sheet lifts up over the bottom of the art.
 *
 * Identical props to {@link OnboardingSlides}, including the §3 `illustration`
 * slot and its medallion fallback. Same controlled/uncontrolled indexing and
 * clamping; an empty list renders the {@link EmptyState}. Token-only.
 */
exports.OnboardingSlidesV2 = React.forwardRef(function OnboardingSlidesV2({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip = true, finishLabel = 'Get started', variant, className, ...rest }, ref) {
    void variant;
    const [internal, setInternal] = React.useState(0);
    const count = slides.length;
    const controlled = index != null;
    const rawActive = controlled ? index : internal;
    const active = count === 0 ? 0 : Math.min(Math.max(0, rawActive), count - 1);
    const isLast = active >= count - 1;
    const isFirst = active <= 0;
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
    const goBack = () => {
        if (onBack) {
            onBack();
            return;
        }
        goTo(active - 1);
    };
    if (count === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: "Nothing to show yet." }) }));
    }
    const slide = slides[active];
    if (!slide)
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest });
    const showBack = onBack != null || !isFirst;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative flex min-h-full flex-col bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex w-full shrink-0 items-center justify-center overflow-hidden bg-primary-50', HERO_HEIGHT_CLASS), children: illustration ?? ((0, jsx_runtime_1.jsx)("span", { className: "flex h-28 w-28 items-center justify-center rounded-full bg-primary", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: slide.icon ?? '✦', size: "3xl", color: "onPrimary" }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-x-0 top-0 z-10 flex items-center gap-md px-lg pt-lg", children: [showBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous slide", onClick: goBack, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('shrink-0', TAP_TARGET_CLASS) })), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { variant: "bars", count: count, activeIndex: active }) }), showSkip ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Skip intro", onClick: onSkip, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('shrink-0', TAP_TARGET_CLASS) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "-mt-xl flex flex-1 flex-col justify-center gap-sm rounded-t-lg bg-surface px-lg pb-lg pt-xl text-center", children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "2xl", weight: "bold", tone: "onSurface", numberOfLines: 2, className: "block", children: slide.title }) }), slide.description ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", tone: "muted", numberOfLines: 3, className: "mx-auto block max-w-prose", children: slide.description })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "sticky bottom-0 border-t border-border bg-surface px-lg pb-lg pt-md", children: (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: isLast ? finishLabel : 'Next', "aria-label": isLast ? finishLabel : 'Next slide', onClick: onNext }) })] }));
});
//# sourceMappingURL=OnboardingSlidesV2.js.map