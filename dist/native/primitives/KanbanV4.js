"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanV4 = KanbanV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const v4_data_1 = require("../../primitives/internal/v4-data");
const v4_state_1 = require("../../primitives/internal/v4-state");
/**
 * `Kanban`, V4 — the same props, and the board stops being boxes inside boxes.
 *
 * ## The nesting problem, and what fixes it
 *
 * The base gives the column a `border` and a `surface` fill, then fills every
 * card inside it with `surface` and gives it a `border` too. Two nested
 * rectangles on identical grounds, separated only by a hairline each — which is
 * §8's "cards inside cards inside cards" almost exactly, and it makes a busy
 * board read as a grid of empty frames before it reads as work.
 *
 * V4 splits the two levels apart by **ground** rather than by outline. The
 * column becomes a recessed tray — one `ZEBRA_MIX` step towards `onSurface`,
 * the same step the V4 tables band with — and loses its border entirely. The
 * cards keep `surface` and their hairline, so they now sit *on* something
 * instead of inside something. One level of depth, said once, and the outline
 * that was doing the work goes away (§9 — spacing and ground as structure).
 *
 * Both mixes are composited from the two **scheme-resolved** slots rather than
 * from `tokens.ramps`, which carries the light orientation in both schemes; and
 * they are opaque rather than translucent, so a column on a patterned page
 * still owns its colour.
 *
 * Neither level gets a shadow. A card on a board is not a layer; it is an item
 * in a list that happens to be laid out in columns.
 *
 * ## The count chip
 *
 * It shared a bug with several other chips in the kit: a `muted` fill with
 * `surface` as its ink. `muted` is a decorative slot with no contrast promise
 * and `surface` is a *page* colour, so the pair was never measured against
 * anything — and both move independently per scheme. V4 uses the same recipe
 * the V4 navigation badges use on the web: an opaque mix of `onSurface` into
 * `surface`, carrying `onSurface` as its ink, which is a compiler-guaranteed
 * pair.
 *
 * ## Feedback
 *
 * Cards press with the M3 state layer over `surface` — the base gave a card no
 * press feedback at all, so a tappable card was indistinguishable from a static
 * one until something happened somewhere else on the screen (§14).
 *
 * Still non-drag: `onCardPress` is the whole interaction, and a gesture layer
 * for reordering is the caller's.
 */
function KanbanV4({ columns, onCardPress, columnWidth = 260, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    /** The recessed tray the cards sit on. */
    const columnGround = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.ZEBRA_MIX);
    /**
     * The count chip's ground — the same 12% the web twin's
     * `[data-xen-v4-nav-badge]` mixes, so a board reads identically on both
     * platforms. `onSurface` over it is a compiler-guaranteed pair.
     */
    const chipGround = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.SELECT_MIX);
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: columns.map((column) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: columnWidth,
                    // No border: the ground is what separates the tray from the page.
                    borderRadius: tokens.radius.md,
                    backgroundColor: columnGround,
                    padding: tokens.spacing.sm,
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.xs,
                            paddingBottom: tokens.spacing.xs,
                        }, children: [typeof column.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    flexShrink: 1,
                                    color: colors.onSurface,
                                    fontFamily: tokens.typography.fontHeading,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '600',
                                }, children: column.title })) : (column.title), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    minWidth: tokens.spacing.lg,
                                    alignItems: 'center',
                                    paddingHorizontal: tokens.spacing.xs,
                                    paddingVertical: tokens.spacing.xs / 2,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: chipGround,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        // `onSurface` over a mix of `onSurface` into `surface` — a
                                        // pair the compiler guarantees. The base wrote `surface` on
                                        // a `muted` fill, which nothing had measured.
                                        color: colors.onSurface,
                                        fontFamily: tokens.typography.fontBody,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: '600',
                                    }, children: column.cards.length }) })] }), column.cards.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                // `mutedText`, not `muted`: this is the only text in an
                                // empty column, and `muted` carries no contrast promise.
                                color: colors.mutedText,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.xs,
                            }, children: "No cards" }) })) : (column.cards.map((card) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", onPress: () => onCardPress?.(card, column), style: ({ pressed }) => ({
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: tokens.radius.sm,
                            padding: tokens.spacing.sm,
                            gap: tokens.spacing.xs,
                            // The base gave a card no press feedback at all, so a
                            // tappable card was indistinguishable from a static one.
                            backgroundColor: pressed
                                ? (0, v4_state_1.stateMix)(colors.surface, colors.onSurface, 'pressed', theme.state)
                                : colors.surface,
                        }), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    gap: tokens.spacing.xs,
                                }, children: [typeof card.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                                            flex: 1,
                                            color: colors.onSurface,
                                            fontFamily: tokens.typography.fontBody,
                                            fontSize: tokens.typography.scale.sm,
                                            fontWeight: '600',
                                        }, children: card.title })) : (card.title), card.trailing != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: card.trailing }) : null] }), card.description != null ? (typeof card.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: {
                                    color: colors.mutedText,
                                    fontFamily: tokens.typography.fontBody,
                                    fontSize: tokens.typography.scale.xs,
                                }, children: card.description })) : (card.description)) : null] }, card.id))))] }, column.key))) }) }));
}
//# sourceMappingURL=KanbanV4.js.map