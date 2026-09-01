"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaListV4 = AgendaListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
const STATUS_WORD = {
    upcoming: 'Upcoming',
    live: 'Live now',
    done: 'Done',
};
/** How many ghost rows the loading state draws — the same three as the base. */
const SKELETON_ROWS = 3;
/**
 * **V4 agenda list** — same props as {@link AgendaList} plus `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **A finished session no longer looks like a future one.** `upcoming` and
 *    `done` differed by the hue of an 8px dot and nothing else, and `done` was
 *    painted `colors.border` — a hairline token with no promise of being
 *    visible as a solid dot at all. Every state now carries a **word** beside
 *    the dot, and the dot's tone comes from `AGENDA_TONE`, where an agenda's
 *    progress stops borrowing the module's status palette.
 * 2. **A row announces what it shows.** The base spoke `"09:00 Coffee"` from
 *    the interactive root, which replaces the subtree — so the room, the track
 *    and the live marker were unreachable. The row is one comma-joined name.
 * 3. **The empty state is the shared one**, with a heading rather than a lone
 *    grey line centred in a box.
 * 4. **The loading region actually announces.** `accessibilityLabel` sat on a
 *    plain `View`, which names nothing on either platform; its ghost bars were
 *    also `tokens.ramps.neutral[100|200]`, and the native ramp keeps its light
 *    orientation in both schemes — so a dark-mode agenda loaded as two
 *    near-white slabs.
 * 5. **A press is a state layer and the row clears 44**, where the base dimmed
 *    the whole row to `opacity: 0.7` — inside M3's disabled band — on a target
 *    whose height was whatever the text happened to need.
 */
function AgendaListV4({ items, onSelectItem, emptyLabel = 'No sessions scheduled yet', statusLabels, loading = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const gutter = tokens.spacing['2xl'] + tokens.spacing.md;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading agenda", accessibilityLiveRegion: "polite", style: [{ gap: tokens.spacing.sm }, style], children: Array.from({ length: SKELETON_ROWS }, (_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing['2xl'],
                            height: tokens.spacing.md,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: (0, event_v4_1.placeholderGround)(theme),
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flex: 1,
                            height: tokens.spacing.lg,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: (0, event_v4_1.placeholderGround)(theme),
                        } })] }, i))) }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel }) }));
    }
    const word = (status) => statusLabels?.[status] ?? STATUS_WORD[status];
    const row = (item, pressed) => {
        const status = item.status ?? 'upcoming';
        const tone = event_v4_1.AGENDA_TONE[status] ?? 'neutral';
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                minHeight: tap,
                alignItems: 'flex-start',
                paddingVertical: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
            }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", numeric: "tabular", style: { width: gutter }, children: item.time }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { alignItems: 'center', paddingTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing.sm,
                            height: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, event_v4_1.toneFill)(theme, tone),
                        } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", style: { flex: 1 }, children: item.title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: status === 'live' ? 'bold' : 'medium', style: { color: (0, event_v4_1.toneInk)(theme, tone) }, children: word(status) })] }), item.subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: item.subtitle })) : null] })] }));
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: [{ gap: tokens.spacing.xs }, style], children: items.map((item) => {
            const name = (0, event_v4_1.spokenLine)([
                item.time,
                item.title,
                item.subtitle,
                word(item.status ?? 'upcoming'),
            ]);
            if (onSelectItem) {
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onSelectItem(item), style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => row(item, pressed) }, item.id));
            }
            // React Native has no `listitem` role, so the row's own accessible
            // element is the list item — one stop, one name, inside the list.
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: row(item, false) }, item.id));
        }) }));
}
//# sourceMappingURL=AgendaListV4.js.map