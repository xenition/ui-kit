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
exports.OnboardingSlidesV4 = OnboardingSlidesV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const ProgressDotsV4_1 = require("./ProgressDotsV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * **V4 intro carousel** — the base's props plus `swipeable`, `nextLabel`,
 * `skipLabel`, `emptyMessage` and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **It swipes.** A paged `ScrollView` drives the same index the buttons do,
 *    in both directions, controlled or uncontrolled. This is the change: the
 *    base's carousel could only be advanced by tapping "Next".
 * 2. **Each slide gets its own artwork.** `OnboardingSlide.illustration`.
 *    The base took one `illustration` for the whole carousel, so a three-slide
 *    intro showed one picture while the copy changed under it. The
 *    carousel-wide prop still works as the fallback.
 * 3. **The copy is the host's.** `nextLabel`, `skipLabel` and `emptyMessage`
 *    replace three hard-coded English strings in a module whose whole contract
 *    is that copy is caller-supplied.
 * 4. **The footer is the shared one**, so the CTA clears the home indicator
 *    and a skip action has a place under it rather than only as a ✕ a user may
 *    read as "close the app".
 * 5. **Slides arrive.** The staggered entrance, replayed as the index changes,
 *    and collapsed under `useReducedMotion()`.
 *
 * The header ✕ is still the skip affordance when `showSkip` is on, so nothing
 * existing moves. An empty `slides` renders the message, not a blank screen.
 */
function OnboardingSlidesV4({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip = true, finishLabel = 'Get started', nextLabel = 'Next', skipLabel, emptyMessage = 'Nothing to show yet.', swipeable = true, variant = 'default', ground = 'plain', accent = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const { width } = (0, react_native_1.useWindowDimensions)();
    const grounds = (0, flow_v4_1.flowGrounds)(theme, ground, accent);
    const [internal, setInternal] = React.useState(0);
    const pager = React.useRef(null);
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
    // Keep the pager and the index in step whichever moved first: a tap on
    // "Next" scrolls the pager, and a swipe reports the page it landed on.
    React.useEffect(() => {
        pager.current?.scrollTo({ x: active * width, animated: true });
    }, [active, width]);
    const onMomentumEnd = (event) => {
        const page = Math.round(event.nativeEvent.contentOffset.x / Math.max(1, width));
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
    // The entrance is keyed on the slide, so it replays as the carousel moves —
    // this is the one component in the line where that is right, because a new
    // slide really is new content rather than the same screen redrawn.
    const body = (0, flow_v4_1.useFlowEntrance)(0);
    if (count === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [
                { flex: 1, backgroundColor: grounds.page, padding: tokens.spacing.xl, alignItems: 'center', justifyContent: 'center' },
                style,
            ], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", align: "center", children: emptyMessage }) }));
    }
    const showBack = onBack != null || !isFirst;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: grounds.page }, style], children: [(0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: showBack ? goBack : undefined, onDismiss: showSkip ? onSkip : undefined, progress: (0, jsx_runtime_1.jsx)(ProgressDotsV4_1.ProgressDotsV4, { variant: "bars", accent: accent, count: count, activeIndex: active }) }), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { ref: pager, horizontal: true, pagingEnabled: true, scrollEnabled: swipeable, showsHorizontalScrollIndicator: false, onMomentumScrollEnd: onMomentumEnd, style: { flex: 1 }, 
                // A pager's pages are laid out by width, not by content, so the
                // container must not grow — `flexGrow` here would collapse paging.
                contentContainerStyle: { alignItems: 'stretch' }, children: slides.map((slide, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { 
                    // Only the visible slide animates; the neighbours are already
                    // rendered and would otherwise fade in behind the finger.
                    style: [
                        {
                            width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: tokens.spacing.lg,
                            paddingHorizontal: tokens.spacing.lg,
                        },
                        i === active ? body : null,
                    ], children: [variant === 'default' ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: slide.illustration ?? illustration, logoGlyph: slide.icon, grounds: grounds })) : null, (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: slide.title, subtitle: slide.description })] }, slide.id))) }), (0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { secondaryLabel: skipLabel, onSecondary: onSkip, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: isLast ? finishLabel : nextLabel, accessibilityLabel: isLast ? finishLabel : `${nextLabel}, slide ${active + 2} of ${count}`, onPress: onNext }) })] }));
}
//# sourceMappingURL=OnboardingSlidesV4.js.map