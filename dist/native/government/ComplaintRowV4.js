"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintRowV4 = ComplaintRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const civic_v4_1 = require("./internal/civic-v4");
/** What the ticket number identifies — the word the base's own spoken name used. */
const TICKET_LABEL = 'Request';
const STATUS_V4 = {
    open: { label: 'Open', glyph: '🆕', tone: civic_v4_1.IDENTITY_TONE },
    assigned: { label: 'Assigned', glyph: '👤', tone: civic_v4_1.IDENTITY_TONE },
    'in-progress': { label: 'In progress', glyph: '🔧', tone: 'warn' },
    resolved: { label: 'Resolved', glyph: '✓', tone: 'success' },
    closed: { label: 'Closed', glyph: '✕', tone: 'neutral' },
};
const PRIORITY_V4 = {
    low: { label: 'Low', glyph: '↓', tone: 'neutral' },
    normal: { label: 'Normal', glyph: '•', tone: 'neutral' },
    high: { label: 'High', glyph: '↑', tone: 'warn' },
    urgent: { label: 'Urgent', glyph: '!', tone: 'danger' },
};
/**
 * **V4 complaint row** — same props as {@link ComplaintRow} plus
 * `priorityLabels` and `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **"Urgent" joins the name.** Priority is the module's only triage
 *    escalation, it is drawn as a pill, and the row announced
 *    `` `Request ${ticket}, ${title}, ${status}` `` — so the one field that
 *    says *this one first* never reached a reader at all. The category and the
 *    filed date were pruned with it.
 * 2. **The ticket number is labelled**, visibly and in the name, instead of a
 *    bare "311-88214" a reader cannot place.
 * 3. **One badge shape.** The status pill was `soft` and the priority pill
 *    `outline` in the same row, which reads as two different kinds of thing
 *    rather than two facts about one request.
 * 4. **It is a row from the shared row line** — the family's 44 leading slot
 *    and metrics — with a state layer in place of `opacity: 0.7`, and a status
 *    disc inked with the contrast-corrected slot on an opaque ground rather
 *    than a fill slot washed over whatever is behind it, which is a different
 *    colour on every surface it lands on.
 * 5. **A queue position is not a status.** `open` was `primary` and `assigned`
 *    was `accent` — brand colours spent on where a request sits in a queue,
 *    the way `fieldservice` spent them on `en-route` and `on-site`. Both are
 *    `IDENTITY_TONE` now, so the tones that survive mean an outcome:
 *    `resolved` is done, `urgent` needs you.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function ComplaintRowV4({ ticketNumber, title, status, category, priority, date, priorityLabels, statusLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const sd = STATUS_V4[status] ?? STATUS_V4.open;
    const statusWord = statusLabels?.[status] ?? sd.label;
    const pr = priority ? (PRIORITY_V4[priority] ?? PRIORITY_V4.normal) : undefined;
    // Only an escalation is worth a pill; `low` and `normal` are the absence of
    // one, and a badge saying "Normal" on every row is noise.
    const showPriority = pr != null && (priority === 'high' || priority === 'urgent');
    const priorityWord = priority && pr ? (priorityLabels?.[priority] ?? pr.label) : undefined;
    const idLine = (0, civic_v4_1.labelledId)(TICKET_LABEL, ticketNumber);
    const name = (0, civic_v4_1.spokenLine)([
        title,
        idLine,
        category,
        statusWord,
        showPriority ? priorityWord : null,
        date,
    ]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            {
                backgroundColor: pressed ? (0, row_v4_1.rowPressFill)(theme, colors.surface, colors.onSurface) : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    {
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, civic_v4_1.tintGround)(theme, sd.tone),
                    },
                ], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, style: { color: (0, civic_v4_1.tintInk)(theme, sd.tone) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: (0, tone_v4_1.metaLine)([idLine, category]) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${statusWord}` }), showPriority && priorityWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: pr.tone, ...civic_v4_1.BADGE_V4, children: `${pr.glyph} ${priorityWord}` })) : null] })] }), date ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: date }) })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=ComplaintRowV4.js.map