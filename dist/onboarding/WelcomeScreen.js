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
exports.WelcomeScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const GetStartedButton_1 = require("./GetStartedButton");
const ProgressDots_1 = require("./ProgressDots");
/**
 * Header controls keep a 44×44 tap target even though the glyph inside is small
 * (spec §2) — `h-11` is 44px. Geometric, so §10.1 permits it.
 */
const TAP_TARGET_CLASS = 'h-11 w-11';
/**
 * The hero panel: roughly 4:3, capped at ~38% of the viewport so the CTA never
 * leaves the fold on a small phone (spec §3). Both are geometry, not tokens.
 */
const HERO_SHAPE_CLASS = 'aspect-[4/3] max-h-[38vh]';
/**
 * First-launch welcome — the screen that establishes the onboarding shell.
 *
 * What shipped before was three things stacked in the middle of a grey page: a
 * medallion, a headline, a button. No hero, no header, no footer, no rhythm.
 * This is the anatomy from §1 of the onboarding spec, top to bottom:
 *
 * 1. **header** — back · segmented progress · dismiss, each optional, each a
 *    44×44 tap target;
 * 2. **hero slot** — the caller's `illustration`, or the `logoGlyph` medallion
 *    at hero size, on a tinted 4:3 panel capped at 38% of the viewport;
 * 3. **headline block** — centred, `2xl` bold over a muted value line held to a
 *    readable measure;
 * 4. **sticky footer** — the 56-tall fully-rounded {@link GetStartedButton}
 *    with a trailing arrow, and any secondary action BELOW it as a centred
 *    muted link, never beside it competing for the same weight.
 *
 * Every part is optional and the screen composes without any of them: no
 * illustration, no subtitle, no header controls, no secondary action. The
 * `bottomSheet` variant left-aligns the headline block for a sheet
 * presentation — the one place §4 allows it. Every color traces to a token.
 * No literal colors.
 */
exports.WelcomeScreen = React.forwardRef(function WelcomeScreen({ title, subtitle, logoGlyph, illustration, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, onBack, onDismiss, stepCount, stepIndex = 0, loading = false, variant = 'centered', className, ...rest }, ref) {
    const centered = variant === 'centered';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md px-lg pt-lg", children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Go back", onClick: onBack, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : (
                    // A spacer, not a missing element — otherwise the progress bars
                    // slide left the moment a back button appears.
                    (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('shrink-0', TAP_TARGET_CLASS) })), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { variant: "bars", count: stepCount, activeIndex: stepIndex })) : null }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onDismiss, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('shrink-0', TAP_TARGET_CLASS) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col justify-center gap-lg px-lg py-lg', centered ? 'text-center' : 'text-left'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex w-full items-center justify-center overflow-hidden rounded-lg bg-primary-50', HERO_SHAPE_CLASS), children: illustration ?? ((0, jsx_runtime_1.jsx)("span", { className: "flex h-24 w-24 items-center justify-center rounded-full bg-primary", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph ?? '✦', size: "3xl", color: "onPrimary" }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)("h1", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "2xl", weight: "bold", tone: "onSurface", numberOfLines: 2, className: "block", children: title }) }), subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", tone: "muted", numberOfLines: 3, className: (0, cn_1.cn)('block max-w-prose', centered && 'mx-auto'), children: subtitle })) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "sticky bottom-0 flex flex-col gap-sm border-t border-border bg-surface px-lg pb-lg pt-md", children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: primaryLabel, onClick: onGetStarted, loading: loading }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": secondaryLabel, onClick: onSecondary, className: "inline-flex min-h-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "medium", tone: "muted", children: secondaryLabel }) })) : null] })] }));
});
//# sourceMappingURL=WelcomeScreen.js.map