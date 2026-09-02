"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoreListV4 = ChoreListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const ChoreCardV4_1 = require("./ChoreCardV4");
const tone_v4_1 = require("./internal/tone-v4");
/** Enough ghost cards to show the shape without pretending to know the length. */
const DEFAULT_SKELETONS = 3;
/**
 * **V4 chore list** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A chore screen with no chores says so.** `kids` shipped twelve
 *    components and no list container, so every screen that rendered chores
 *    mapped an array straight to `ChoreCard` — and an empty array rendered
 *    **nothing at all**: a blank region with no explanation and no next step,
 *    which reads as a broken screen rather than as a fresh start.
 * 2. **Loading is a shape, not a spinner.** `loading` lived on the card, so the
 *    only way to show a *list* loading was to invent a placeholder array at
 *    every call site — and nobody did. The list draws ghost cards in the shape
 *    the real ones are about to take, so the layout does not jump when the data
 *    lands, and the region says what it is waiting for.
 * 3. **The list is a region a reader can recognise**, with the `list` role and
 *    a count — and deliberately no `accessible` of its own, which would flatten
 *    every card under it into a single leaf. That is the same flattening the
 *    sibling rule exists to prevent inside a card, one level up.
 *
 * Deliberately a plain `View` rather than a `FlatList`: a chore list is short
 * and nearly always sits inside a screen's own `ScrollView`, where a nested
 * virtualised list is a known scrolling defect.
 */
function ChoreListV4({ items, loading = false, skeletonCount = DEFAULT_SKELETONS, loadingLabel = 'Loading chores', emptyLabel = 'No chores yet', emptyDescription, formatCount, onSelectItem, onCompleteItem, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (loading) {
        const ghosts = Math.max(1, Math.floor(Number.isFinite(skeletonCount) ? skeletonCount : 1));
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: [{ gap: tokens.spacing.md }, style], children: Array.from({ length: ghosts }).map((_, i) => ((0, jsx_runtime_1.jsx)(ChoreCardV4_1.ChoreCardV4, { title: "", loading: true }, i))) }));
    }
    const rows = items ?? [];
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: (0, tone_v4_1.spokenLine)([emptyLabel, emptyDescription]), style: [{ paddingVertical: tokens.spacing.xl, gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", align: "center", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: "\uD83E\uDDF9" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", align: "center", children: emptyLabel }), emptyDescription ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: emptyDescription })) : null] }));
    }
    const count = (formatCount ?? ((n) => `${n} chores`))(rows.length);
    return (
    /* A role and a name, but no `accessible`: setting that on a container
       flattens every card under it into one leaf, and each card already
       carries its own sentence and its own controls. */
    (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: count, style: [{ gap: tokens.spacing.md }, style], children: rows.map(({ id, ...chore }, index) => {
            const key = id ?? index;
            return ((0, jsx_runtime_1.jsx)(ChoreCardV4_1.ChoreCardV4, { ...chore, onPress: onSelectItem ? () => onSelectItem(key, index) : undefined, onComplete: onCompleteItem ? () => onCompleteItem(key, index) : undefined }, key));
        }) }));
}
//# sourceMappingURL=ChoreListV4.js.map