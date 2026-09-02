"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoreCardV4 = ChoreCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const family_v4_1 = require("../../kids/family-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** The glyph and chip tone each status wears. `skipped` is deliberately neutral. */
const STATUS_MARK = {
    todo: { glyph: '⬜', tone: 'neutral' },
    'in-progress': { glyph: '🔄', tone: 'primary' },
    done: { glyph: '✅', tone: 'success' },
    skipped: { glyph: '⏭️', tone: 'neutral' },
};
/** Default wording. Every one of them is overridable through `statusLabels`. */
const STATUS_LABEL = {
    todo: 'To do',
    'in-progress': 'In progress',
    done: 'Done',
    skipped: 'Skipped',
};
/**
 * **V4 chore card** — same props as {@link ChoreCard} plus `reason`,
 * `statusLabels` and `completeLabel`.
 *
 * ## Five changes
 *
 * 1. **"Mark done" is reachable.** The base wrapped the whole card in a
 *    `Pressable`, and a `Pressable` is `accessible` by default: VoiceOver
 *    flattened the card to one leaf carrying the card's own name, so the
 *    button, the points chip and the status chip were not reachable at all. A
 *    child could not complete a chore with a screen reader on. The fix is
 *    structural, not a guard — the container is a plain `View`, the activation
 *    wraps only the icon-and-text region, and every control sits beside it.
 * 2. **A skipped chore is not a warning.** `skipped → warn` put an amber chip
 *    on a child's card for a chore nobody may have expected them to do. It is
 *    neutral, with a glyph and a word, and `reason` carries the explanation the
 *    status had nowhere to put — `needsExplanation()` is what decides a status
 *    owes one.
 * 3. **The card is a card.** It painted `colors.surface`, the *page* colour, so
 *    it never read as raised and dark mode went flat; the skeleton painted
 *    `colors.border`, the hairline colour used as a fill.
 * 4. **Press is a state layer.** `opacity: pressed ? 0.85 : 1` sits inside M3's
 *    disabled band (0.38), so a pressed card read as an unavailable one.
 * 5. **Every string is a prop**, so a Spanish chore board is not four English
 *    words in the middle of it.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function ChoreCardV4({ title, assignee, points, due, icon = '🧹', status = 'todo', loading = false, reason, statusLabels, completeLabel = 'Mark done', onComplete, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const container = [(0, tone_v4_1.cardStyle)(theme), style];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading chore", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.base, width: '60%' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.xs, width: '40%' }) })] }));
    }
    if (!title)
        return null;
    const mark = STATUS_MARK[status] ?? STATUS_MARK.todo;
    const word = statusLabels?.[status] ?? STATUS_LABEL[status];
    const isDone = status === 'done';
    // A status that owes an explanation gets one, and it is an explanation
    // rather than a reprimand — see `needsExplanation`.
    const explanation = (0, family_v4_1.needsExplanation)(status) ? reason : undefined;
    const caption = (0, tone_v4_1.metaLine)([assignee, due]);
    const name = (0, tone_v4_1.spokenLine)([title, assignee, due, word, explanation]);
    const heading = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.xs,
            marginHorizontal: -tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: icon }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { textDecorationLine: isDone ? 'line-through' : 'none' }, children: title }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, children: ({ pressed }) => heading(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: heading(false) })), explanation ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: explanation })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: word, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: mark.tone, variant: "soft", size: "sm", children: `${mark.glyph} ${word}` }) }), typeof points === 'number' && Number.isFinite(points) ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: `⭐ ${points}`, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "accent", variant: "soft", size: "sm", children: `⭐ ${points}` }) })) : null] }), !isDone && onComplete ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "soft", tone: "success", onPress: onComplete, children: completeLabel })) : null] })] }));
}
//# sourceMappingURL=ChoreCardV4.js.map