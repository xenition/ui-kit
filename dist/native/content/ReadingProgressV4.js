"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingProgressV4 = ReadingProgressV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 reading progress** — same props as {@link ReadingProgress} plus
 * `formatProgress` and `pinned`.
 *
 * ## Four changes
 *
 * 1. **The name reaches the progressbar.** The label sat on the wrapper while
 *    the `Progress` primitive inside it — the element that actually *is* a
 *    progressbar — had none, so a reader was told "42 percent read" by a
 *    roleless box on one platform and by nothing at all on the other. The
 *    role, the name and the value are now on one element.
 * 2. **`pinned` does what the prop doc always claimed.** The base described
 *    the `bar` variant as being "for pinning to the top of a reader" and left
 *    the pinning to the caller, who then had to discover the notch. `pinned`
 *    anchors the bar and pays `useSafeAreaInsets().top`.
 * 3. **The percentage cannot overrun the track**, because it runs through
 *    `readingPercent()` rather than straight into the bar.
 * 4. **The visible readout is not announced twice.** It is the same number the
 *    progressbar already reports, so it is hidden from the reader.
 */
function ReadingProgressV4({ progress, variant = 'bar', formatProgress = (pct) => `${pct} percent read`, pinned = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Needs a `SafeAreaProvider` above it (Expo mounts one by default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    // `progress` is the 0–1 fraction the base took; the clamp is what stops a
    // caller mid-computation pushing the fill past the end of the track.
    const pct = Math.round((0, reading_v4_1.readingPercent)(progress * 100));
    const pinnedStyle = pinned
        ? {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            // The notch is the reason this prop exists at all.
            paddingTop: insets.top,
            backgroundColor: colors.surface,
            zIndex: 1,
        }
        : null;
    const bar = (barStyle) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: formatProgress(pct), accessibilityValue: { min: 0, max: 100, now: pct }, style: barStyle, children: (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, max: 100, tone: "primary", size: "sm" }) }));
    if (variant === 'labeled') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
                pinnedStyle,
                style,
            ], children: [bar({ flex: 1 }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4
                // The progressbar beside it already says this number.
                , { 
                    // The progressbar beside it already says this number.
                    accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", size: "xs", weight: "semibold", tone: "mutedText", numeric: "tabular", align: "right", style: { minWidth: tokens.spacing['2xl'] - tokens.spacing.md }, children: `${pct}%` })] }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [pinnedStyle, style], children: bar() });
}
//# sourceMappingURL=ReadingProgressV4.js.map