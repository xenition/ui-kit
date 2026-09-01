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
exports.OnboardingSlidesV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TextV4_1 = require("../primitives/TextV4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const ProgressDotsV4_1 = require("./ProgressDotsV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * **V4 intro carousel** — the web twin of the native `OnboardingSlidesV4`: the
 * base's props plus `swipeable`, `nextLabel`, `skipLabel`, `emptyMessage` and
 * the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **It swipes.** A scroll-snap track drives the same index the buttons do,
 *    in both directions, controlled or uncontrolled. The base's carousel could
 *    only be advanced by clicking "Next".
 * 2. **Each slide gets its own artwork** — `OnboardingSlide.illustration`. The
 *    base took one `illustration` for the whole carousel, so a three-slide
 *    intro showed one picture while the copy changed under it.
 * 3. **The copy is the host's** — `nextLabel`, `skipLabel`, `emptyMessage`
 *    replace three hard-coded English strings.
 * 4. **The footer is the shared one**, so the CTA clears the inset and a skip
 *    action has a place under it rather than only as a ✕ a user may read as
 *    "close the app".
 * 5. **Slides arrive**, and not at all under `prefers-reduced-motion`.
 *
 * An empty `slides` renders the message, not a blank screen.
 */
exports.OnboardingSlidesV4 = React.forwardRef(function OnboardingSlidesV4({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip = true, finishLabel = 'Get started', nextLabel = 'Next', skipLabel, emptyMessage = 'Nothing to show yet.', swipeable = true, variant = 'default', ground = 'plain', accent = 'primary', className, style, ...rest }, ref) {
    const [internal, setInternal] = React.useState(0);
    const track = React.useRef(null);
    const count = slides?.length ?? 0;
    const controlled = index != null;
    const rawActive = controlled ? index : internal;
    const active = count === 0 ? 0 : Math.min(Math.max(0, rawActive), count - 1);
    const isLast = active >= count - 1;
    const isFirst = active <= 0;
    const goTo = React.useCallback((next) => {
        const clamped = Math.min(Math.max(0, next), Math.max(0, count - 1));
        if (!controlled)
            setInternal(clamped);
        onIndexChange?.(clamped);
    }, [controlled, count, onIndexChange]);
    // Keep the track and the index in step whichever moved first: a click on
    // "Next" scrolls the track, and a swipe reports the page it landed on.
    React.useEffect(() => {
        const el = track.current;
        if (!el)
            return;
        const left = active * el.clientWidth;
        // `scrollTo` is absent in jsdom and in a few older engines, and a
        // carousel is not worth a crash: fall back to setting the offset, which
        // lands in the same place without the smooth interpolation.
        if (typeof el.scrollTo === 'function')
            el.scrollTo({ left, behavior: 'smooth' });
        else
            el.scrollLeft = left;
    }, [active]);
    const onScroll = () => {
        const el = track.current;
        if (!el || el.clientWidth === 0)
            return;
        const page = Math.round(el.scrollLeft / el.clientWidth);
        if (page !== active)
            goTo(page);
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
    const vars = { ...(0, flow_v4_1.flowGroundVars)(ground, accent), ...style };
    if (count === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: vars, className: (0, cn_1.cn)('flex min-h-full flex-col items-center justify-center bg-[var(--flow-page)] p-xl', className), ...rest, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", align: "center", children: emptyMessage }) }));
    }
    const showBack = onBack != null || !isFirst;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: vars, className: (0, cn_1.cn)('flex min-h-full flex-col bg-[var(--flow-page)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: showBack ? goBack : undefined, onDismiss: showSkip ? onSkip : undefined, progress: (0, jsx_runtime_1.jsx)(ProgressDotsV4_1.ProgressDotsV4, { variant: "bars", accent: accent, count: count, activeIndex: active }) }), (0, jsx_runtime_1.jsx)("div", { ref: track, onScroll: onScroll, className: (0, cn_1.cn)('flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden', 
                // The scrollbar is the gesture's own affordance on a trackpad and
                // pure noise under a phone's finger; the snap points already say
                // there is more.
                '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden', swipeable ? 'touch-pan-x' : 'overflow-x-hidden'), children: slides.map((slide, i) => ((0, jsx_runtime_1.jsxs)("div", { ...(i === active ? (0, flow_v4_1.flowRegion)(0) : {}), className: "flex w-full shrink-0 snap-center flex-col items-center justify-center gap-lg px-lg", children: [variant === 'default' ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: slide.illustration ?? illustration, logoGlyph: slide.icon })) : null, (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: slide.title, subtitle: slide.description })] }, slide.id))) }), (0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { secondaryLabel: skipLabel, onSecondary: onSkip, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: isLast ? finishLabel : nextLabel, "aria-label": isLast ? finishLabel : `${nextLabel}, slide ${active + 2} of ${count}`, onClick: onNext }) })] }));
});
//# sourceMappingURL=OnboardingSlidesV4.js.map