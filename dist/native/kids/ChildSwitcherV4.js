"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildSwitcherV4 = ChildSwitcherV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Enough ghost tiles to show the shape without pretending to know the count. */
const DEFAULT_SKELETONS = 3;
/**
 * **V4 child switcher** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A family app can finally say *which* child.** Every one of the twelve
 *    `kids` components takes exactly one child — one profile, one allowance,
 *    one growth curve — and nothing in the module chose between them, so the
 *    first control on a family screen did not exist and every app had to invent
 *    it. This is that control: one horizontal strip, one selected child, and
 *    an optional way to add another.
 * 2. **It is a real tab list, not a row of coloured chips.** Each child is a
 *    `tab` carrying `selected` state and their own name inside a `tablist`, so
 *    a reader is told which child is showing rather than being left to infer it
 *    from a tint. Selection is the `selected`/`onSelected` token pair, a ring,
 *    a bold name **and** the word `selectedLabel` — never the hue on its own.
 * 3. **The targets fit a child's thumb.** Every tile clears 44 on both axes and
 *    presses with a state layer over its own ground, so a pressed tile does not
 *    dim into M3's *disabled* band the way the rest of this module does.
 *
 * Mood rides along as a glyph and a word from the module's one mood table, so
 * the switcher and `ChildProfileCardV4` cannot disagree about what `sick`
 * looks like — and, as everywhere else here, a mood is never a tone.
 *
 * **Renders an empty state, never a blank strip** (§4.5).
 */
function ChildSwitcherV4({ items, selectedId, onSelect, label = 'Children', loading = false, skeletonCount = DEFAULT_SKELETONS, loadingLabel = 'Loading children', emptyLabel = 'No children yet', emptyDescription, addLabel = 'Add child', onAdd, selectedLabel = 'selected', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    if (loading) {
        const ghosts = Math.max(1, Math.floor(Number.isFinite(skeletonCount) ? skeletonCount : 1));
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: [{ flexDirection: 'row', gap: tokens.spacing.md }, style], children: Array.from({ length: ghosts }).map((_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tap, width: tap, round: true }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.xs, width: tap }) })] }, i))) }));
    }
    const children = items ?? [];
    if (children.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: (0, tone_v4_1.spokenLine)([label, emptyLabel, emptyDescription]), style: [{ paddingVertical: tokens.spacing.md, gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: emptyLabel }), emptyDescription ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: emptyDescription })) : null] }));
    }
    const tileStyle = (selected, pressed) => ({
        minWidth: tap + tokens.spacing.xl,
        minHeight: tap,
        alignItems: 'center',
        gap: tokens.spacing.xs,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.sm,
        borderRadius: tokens.radius.lg,
        backgroundColor: pressed
            ? (0, state_v4_1.pressOver)(theme, selected ? colors.selected : colors.card, selected ? colors.onSelected : colors.onCard)
            : selected
                ? colors.selected
                : 'transparent',
    });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityRole: "tablist", accessibilityLabel: label, style: style, contentContainerStyle: { gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, children: [children.map((child) => {
                const selected = child.id === selectedId;
                const moodWord = child.mood ? tone_v4_1.MOOD_LABEL[child.mood] : null;
                const moodGlyph = child.mood ? tone_v4_1.MOOD_GLYPH[child.mood] : null;
                // The word, not only the tint: `selected` state is honoured by iOS and
                // dropped by parts of Android, and a ring is nothing to a reader.
                const name = (0, tone_v4_1.spokenLine)([child.name, moodWord, selected ? selectedLabel : null]);
                const tile = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: tileStyle(selected, pressed), children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: child.photoUrl, name: child.name, size: "md", ring: selected }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [moodGlyph ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: moodGlyph })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: selected ? 'bold' : 'regular', numberOfLines: 1, style: { color: selected ? colors.onSelected : colors.mutedText }, children: child.name })] })] }));
                if (!onSelect) {
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: tile(false) }, child.id));
                }
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityLabel: name, accessibilityState: { selected }, onPress: () => onSelect(child.id), children: ({ pressed }) => tile(pressed) }, child.id));
            }), onAdd ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: addLabel, onPress: onAdd, children: ({ pressed }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: tileStyle(false, pressed), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: tap,
                                height: tap,
                                borderRadius: tokens.radius.full,
                                borderWidth: 1,
                                borderColor: colors.border,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", tone: "mutedText", allowFontScaling: false, children: "+" }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: addLabel })] })) })) : null] }));
}
//# sourceMappingURL=ChildSwitcherV4.js.map