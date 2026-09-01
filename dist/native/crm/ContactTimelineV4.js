"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactTimelineV4 = ContactTimelineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 contact timeline** — same props as {@link ContactTimeline} plus
 * `emptyDescription`.
 *
 * ## Six changes
 *
 * 1. **Making the timeline interactive no longer destroys its list.** On web
 *    the item set `role="listitem"` and then spread the interactive props,
 *    whose `role: 'button'` won the JSX merge — so the moment `onItemClick`
 *    arrived the list had zero list items and readers announced an empty list.
 *    The button now lives **inside** the list item on both twins.
 * 2. **Native has list semantics at all.** It exposed none, so the same
 *    timeline was a list on one platform and a pile of text on the other.
 * 3. **The last node clears 44.** Its bottom padding drops to `0`, which left
 *    a 28px target on the one entry a user most often taps — the newest.
 * 4. **The node chip is one object on both twins**, on the `selected` /
 *    `onSelected` pair, and an activity **kind** is identity rather than
 *    `success` (`ACTIVITY_META_V4`).
 * 5. **No literals.** The `14` radius and the `2` connector width come off
 *    `tokens.radius` and the spacing scale; the skeleton takes the shared
 *    opaque placeholder rather than `colors.border`.
 * 6. **One spoken name per entry** (rule A) and a real press layer (rule B).
 */
function ContactTimelineV4({ items, onItemPress, loading = false, emptyLabel = 'No activity yet', emptyDescription, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // 28 — the node marker. The row around it, not the marker, is the target.
    const node = tokens.spacing.lg + tokens.spacing.xs;
    const rail = tokens.spacing.xs / 2;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading timeline", style: [{ gap: tokens.spacing.md }, style], children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: node,
                            height: node,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, crm_v4_1.skeletonFill)(theme),
                        } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, paddingTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.spacing.sm + tokens.spacing.xs,
                                    width: '60%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, crm_v4_1.skeletonFill)(theme),
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.spacing.sm,
                                    width: '35%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, crm_v4_1.skeletonFill)(theme),
                                } })] })] }, i))) }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [{ paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", align: "center", children: emptyLabel }), emptyDescription ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: emptyDescription })) : null] }));
    }
    const entry = (item, isLast, pressed) => {
        const meta = crm_v4_1.ACTIVITY_META_V4[item.kind];
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                // The last entry keeps its target even though its connector is gone.
                minHeight: isLast ? (0, chrome_v4_1.minTap)(tokens.spacing) : undefined,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: node }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: node,
                                height: node,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.selected,
                                borderWidth: 1,
                                borderColor: colors.border,
                            }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: colors.onSelected }, children: meta.glyph }) }), isLast ? null : ((0, jsx_runtime_1.jsx)(react_native_1.View
                        // The rail is decoration; the entry beside it carries the name.
                        , { 
                            // The rail is decoration; the entry beside it carries the name.
                            accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                                flex: 1,
                                width: rail,
                                backgroundColor: colors.border,
                                marginVertical: rail,
                            } }))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flex: 1,
                        minWidth: 0,
                        gap: tokens.spacing.xs / 2,
                        paddingBottom: isLast ? 0 : tokens.spacing.md,
                    }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: item.title }), item.detail ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: item.detail })) : null, (0, crm_v4_1.metaLine)([item.actor, item.timestamp]) ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "medium", tone: "mutedText", children: (0, crm_v4_1.metaLine)([item.actor, item.timestamp]) })) : null] })] }));
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: style, children: items.map((item, index) => {
            const meta = crm_v4_1.ACTIVITY_META_V4[item.kind];
            const isLast = index === items.length - 1;
            const name = (0, crm_v4_1.spokenLine)([
                meta.label,
                item.title,
                item.detail,
                item.actor,
                item.timestamp,
            ]);
            // The list item is the outer node; the button lives inside it, so
            // supplying `onItemPress` can never empty the list.
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: onItemPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onItemPress(item), style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => entry(item, isLast, pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: entry(item, isLast, false) })) }, item.id));
        }) }));
}
//# sourceMappingURL=ContactTimelineV4.js.map