"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderCardV4 = WorkOrderCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const job_v4_1 = require("./internal/job-v4");
const STATUS_META = {
    open: { label: 'Open', glyph: '○', tone: 'neutral' },
    'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary' },
    'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};
/**
 * Priority is which job this is, not how the job is going — so it wears a
 * glyph and a word on a neutral chip rather than a status colour. Spending
 * `danger` on an identity leaves nothing louder for the thing that is actually
 * wrong, which is the whole reason the status pill has a palette.
 */
const PRIORITY_META = {
    low: { label: 'Low', glyph: '↓' },
    medium: { label: 'Medium', glyph: '=' },
    high: { label: 'High', glyph: '↑' },
    emergency: { label: 'Emergency', glyph: '!' },
};
/**
 * **V4 work order card** — same props as {@link WorkOrderCard} plus
 * `priorityLabels`, `statusLabels` and `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card announces the priority.** Its name was
 *    `"Work order WO-1, title, Open"`, which **replaces** the subtree — so an
 *    emergency job and a low-priority one sounded identical, and the site, the
 *    assignee and the schedule were never spoken at all. A technician heard
 *    "Open" and never "Emergency".
 * 2. **Priority stops wearing a status colour.** `emergency` was a `danger`
 *    pill beside a `danger`-capable status pill, so two different questions
 *    answered in the same red. It is a neutral chip with its own glyph now.
 * 3. **A press is a state layer.** `opacity: 0.85` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled*.
 * 4. **The skeleton is opaque and announced.** It was a translucent `muted`
 *    wash — a different colour on every ground — sitting on a plain `View`
 *    whose `accessibilityLabel` announced nothing.
 * 5. **The badges are one shape across the twins**, and the meta glyphs are
 *    decorative rather than emoji embedded in the sentence a reader speaks.
 *
 * **Renders nothing without a `title`.**
 */
function WorkOrderCardV4({ workOrderNumber, title, status, priority, assignee, site, scheduledFor, glyph = '🔧', loading = false, priorityLabels, statusLabels, loadingLabel = 'Loading work order', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "elevated", style: [{ backgroundColor: colors.card }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tap,
                            height: tap,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, job_v4_1.skeletonFill)(theme),
                        } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.spacing.md,
                                    width: '70%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, job_v4_1.skeletonFill)(theme),
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.spacing.sm + tokens.spacing.xs,
                                    width: '40%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, job_v4_1.skeletonFill)(theme),
                                } })] })] }) }));
    }
    if (!title)
        return null;
    const meta = STATUS_META[status] ?? STATUS_META.open;
    const statusWord = statusLabels?.[status] ?? meta.label;
    const priorityMeta = priority ? PRIORITY_META[priority] : undefined;
    const priorityWord = priority ? (priorityLabels?.[priority] ?? priorityMeta?.label) : undefined;
    const metaLines = [
        site != null ? { glyph: '📍', text: site } : null,
        assignee != null ? { glyph: '👷', text: assignee } : null,
        scheduledFor != null ? { glyph: '🕑', text: scheduledFor } : null,
    ].filter((line) => line != null);
    const name = (0, job_v4_1.spokenLine)([
        workOrderNumber,
        title,
        statusWord,
        priorityWord,
        site,
        assignee,
        scheduledFor,
    ]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: onPress ? 'interactive' : 'elevated', style: {
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : colors.card,
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            width: tap,
                            height: tap,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, job_v4_1.discGround)(theme, 'primary'),
                        }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numberOfLines: 2, children: title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, numeric: "tabular", children: workOrderNumber })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...job_v4_1.BADGE_V4, children: `${meta.glyph} ${statusWord}` }), priorityMeta && priorityWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", ...job_v4_1.BADGE_V4, children: `${priorityMeta.glyph} ${priorityWord}` })) : null] })] }), metaLines.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    gap: tokens.spacing.xs / 2,
                }, children: metaLines.map((line) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: line.glyph, size: "xs" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, style: { flex: 1 }, children: line.text })] }, line.glyph))) })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: style, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: [{ borderRadius: tokens.radius.lg }, style], children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=WorkOrderCardV4.js.map