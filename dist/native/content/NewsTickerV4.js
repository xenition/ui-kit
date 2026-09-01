"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsTickerV4 = NewsTickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TagV4_1 = require("../primitives/TagV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
/**
 * **V4 news ticker** — same props as {@link NewsTicker} plus `loadingLabel`,
 * `regionLabel` and `labelTone`.
 *
 * ## Six changes
 *
 * 1. **The eyebrow stops being an error.** `label` is caller copy — the prop
 *    doc offers `'LIVE'` and `'BREAKING'` as examples — and it was painted in
 *    `danger` unconditionally, so a section name or a sponsor tag came out in
 *    the colour that means something has gone wrong. It defaults to `neutral`;
 *    a newsroom that genuinely wants red passes `labelTone="danger"`.
 * 2. **Loading draws the ticker's own skeleton.** The base collapsed to a
 *    single line of text and then reflowed to N headlines, and the line was
 *    hard-coded English two lines below a parameterised `emptyLabel`.
 * 3. **The strip is named on both twins.** This one had no name at all, so a
 *    reader met an unlabelled group of headlines.
 * 4. **A headline is the same control on both twins** — a button, where this
 *    twin said `link` — and it clears 44.
 * 5. **The separator dots are hidden from the reader**, where they were
 *    announced between every headline.
 * 6. **Press is a state layer**, not `opacity: 0.6`.
 */
function NewsTickerV4({ items, label = 'LIVE', onItemPress, variant = 'scroll', loading = false, emptyLabel = 'No headlines', loadingLabel = 'Loading headlines…', regionLabel = 'Latest headlines', labelTone = 'neutral', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const scroll = variant === 'scroll';
    const labelChip = label != null ? ((0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: labelTone, variant: "solid", size: "sm", children: label })) : null;
    const shell = (children, busy = false) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: busy ? loadingLabel : regionLabel, accessibilityLiveRegion: busy ? 'polite' : 'none', style: [
            {
                flexDirection: scroll ? 'row' : 'column',
                alignItems: scroll ? 'center' : 'stretch',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [labelChip, children] }));
    if (loading) {
        // The shape it is about to be, so nothing reflows when the wire lands.
        return shell((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: (scroll ? ['70%'] : ['90%', '75%', '60%']).map((width) => ((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: width, height: tokens.typography.scale.sm }, width))) }), true);
    }
    if (items.length === 0) {
        return shell((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }));
    }
    if (!scroll) {
        return shell((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: items.map((item) => ((0, jsx_runtime_1.jsx)(Headline, { item: item, onItemPress: onItemPress, numberOfLines: 2 }, item.id))) }));
    }
    return shell((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { alignItems: 'center', gap: tokens.spacing.sm }, style: { flex: 1 }, children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [i > 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", size: "sm", tone: "mutedText", children: "\u00B7" })) : null, (0, jsx_runtime_1.jsx)(Headline, { item: item, onItemPress: onItemPress, numberOfLines: 1 })] }, item.id))) }));
}
/** One headline — a button when it goes somewhere, plain text when it does not. */
function Headline({ item, onItemPress, numberOfLines, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const text = ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numberOfLines: numberOfLines, children: item.text }));
    if (!onItemPress)
        return text;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: item.text, onPress: () => onItemPress(item.id), style: ({ pressed }) => ({
            flexShrink: 1,
            justifyContent: 'center',
            minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
            paddingHorizontal: tokens.spacing.xs,
            borderRadius: tokens.radius.sm,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }), children: text }));
}
//# sourceMappingURL=NewsTickerV4.js.map