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
exports.PhotoCarouselV4 = PhotoCarouselV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const profile_v4_1 = require("./internal/profile-v4");
const RATIO = { portrait: 4 / 5, square: 1, landscape: 3 / 2 };
/** The segmented indicator's thickness. A rail, not a hairline. */
const SEGMENT = 3;
/**
 * **V4 photo carousel** — same props as {@link PhotoCarousel} plus
 * `previousLabel`, `nextLabel`, `formatPosition` and `showControls`.
 *
 * ## Five changes
 *
 * 1. **The pager has controls you can see.** Both twins shipped two
 *    `Pressable`s with **no children** — invisible halves of the frame. A
 *    sighted user was given nothing that said the photo was steppable, and
 *    discovered it by accident or not at all. V4 draws two round chevron
 *    buttons over the frame, each clearing 44, each disabled at its end of the
 *    strip. The invisible halves stay (tap-anywhere is the gesture people
 *    expect on a profile) but are taken out of the accessibility tree when the
 *    real controls are drawn, so a reader gets one control per direction
 *    rather than two.
 * 2. **`alt` reaches the image.** `CarouselPhoto.alt` was documented, accepted
 *    and never passed to the native `Image` — every profile photo in the kit
 *    was silent on a phone. It is the image's accessible name now, with the
 *    position line beside it.
 * 3. **Nothing over a photograph is themed.** The indicator drew its unplayed
 *    segments from `withAlpha(colors.onSurface, 0.35)`, which is a *light*
 *    wash in a dark theme — so on a dark scheme the whole strip read as
 *    played. Segments and control grounds are the fixed photo scrim and photo
 *    ink, which mean the same thing in both schemes because a photograph does.
 * 4. **A step that goes nowhere does nothing.** `go()` set the internal index
 *    unconditionally and reported only a real move, so a tap at either end of
 *    the strip re-rendered the pager to say that nothing had happened.
 * 5. **Loading is a skeleton and empty says what to do.** The base's loading
 *    frame was a `border`-filled rectangle with a label and no role.
 */
function PhotoCarouselV4({ photos, index, onIndexChange, ratio = 'portrait', rounded = true, loading = false, emptyLabel = 'No photos yet', previousLabel = 'Previous photo', nextLabel = 'Next photo', formatPosition, showControls = true, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const list = photos ?? [];
    const controlled = index != null;
    const [internal, setInternal] = React.useState(0);
    const active = Math.max(0, Math.min(list.length - 1, controlled ? index : internal));
    const radius = rounded ? tokens.radius.lg : 0;
    const go = (next) => {
        const clamped = Math.max(0, Math.min(list.length - 1, next));
        // The base set internal state unconditionally and reported only a real
        // move, so a tap at either end of the strip re-rendered the pager to say
        // nothing had happened. Either the index moved or nothing did.
        if (clamped === active)
            return;
        if (!controlled)
            setInternal(clamped);
        onIndexChange?.(clamped);
    };
    const frame = {
        width: '100%',
        aspectRatio: RATIO[ratio],
        borderRadius: radius,
        overflow: 'hidden',
        backgroundColor: (0, profile_v4_1.placeholderGround)(theme),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: "Loading photos", style: [frame, style] }));
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: emptyLabel, style: [frame, { alignItems: 'center', justifyContent: 'center' }, style], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", allowFontScaling: false, children: "\uD83D\uDCF7" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", style: { marginTop: tokens.spacing.xs }, children: emptyLabel })] }));
    }
    const current = list[active] ?? list[0];
    const position = (formatPosition ?? ((i, n) => `Photo ${i + 1} of ${n}`))(active, list.length);
    const atStart = active === 0;
    const atEnd = active >= list.length - 1;
    const control = (label, mark, disabled, onPress, side) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, style: ({ pressed }) => ({
            position: 'absolute',
            top: '50%',
            left: side === 'left' ? tokens.spacing.sm : undefined,
            right: side === 'right' ? tokens.spacing.sm : undefined,
            marginTop: -(0, chrome_v4_1.minTap)(tokens.spacing) / 2,
            width: (0, chrome_v4_1.minTap)(tokens.spacing),
            height: (0, chrome_v4_1.minTap)(tokens.spacing),
            borderRadius: (0, chrome_v4_1.minTap)(tokens.spacing) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            // Fixed, not themed: this disc sits on a photograph, and a scrim built
            // from `onSurface` washes near-white in a dark scheme.
            backgroundColor: pressed || disabled ? profile_v4_1.PHOTO_SCRIM_STRONG : profile_v4_1.PHOTO_SCRIM,
            opacity: disabled ? theme.state.disabledContent : 1,
        }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", allowFontScaling: false, style: { color: profile_v4_1.PHOTO_INK }, children: mark }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { accessible: true, accessibilityRole: "image", 
                // The prop existed, was documented, and never arrived. Without a name
                // the position line is all a reader gets about a person's photo.
                accessibilityLabel: (0, profile_v4_1.spokenLine)([current.alt, position]), source: { uri: current.uri }, resizeMode: "cover", style: { width: '100%', height: '100%' } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: showControls, importantForAccessibility: showControls ? 'no-hide-descendants' : 'yes', style: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: previousLabel, disabled: atStart, onPress: () => go(active - 1), style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: nextLabel, disabled: atEnd, onPress: () => go(active + 1), style: { flex: 1 } })] }), showControls ? control(previousLabel, '‹', atStart, () => go(active - 1), 'left') : null, showControls ? control(nextLabel, '›', atEnd, () => go(active + 1), 'right') : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    position: 'absolute',
                    top: tokens.spacing.sm,
                    left: tokens.spacing.sm,
                    right: tokens.spacing.sm,
                    flexDirection: 'row',
                    gap: tokens.spacing.xs,
                }, children: list.map((p, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flex: 1,
                        height: SEGMENT,
                        borderRadius: tokens.radius.full,
                        backgroundColor: i <= active ? profile_v4_1.PHOTO_INK : profile_v4_1.PHOTO_SCRIM_STRONG,
                    } }, `${p.uri}-${i}`))) })] }));
}
//# sourceMappingURL=PhotoCarouselV4.js.map