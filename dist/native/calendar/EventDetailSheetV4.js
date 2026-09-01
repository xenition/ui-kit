"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDetailSheetV4 = EventDetailSheetV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const BottomSheetV4_1 = require("../primitives/BottomSheetV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const format_1 = require("../../calendar/format");
const grid_v4_1 = require("./internal/grid-v4");
/** The tone rail down the leading edge. 3px — a bar, not a hairline. */
const RAIL = 3;
/**
 * **V4 event detail sheet** — same props as {@link EventDetailSheet} plus four
 * copy hooks.
 *
 * ## Four changes
 *
 * 1. **The modal variant is `BottomSheetV4`.** The base hand-rolled an
 *    overlay, so it had no scrim, no focus containment, no safe-area inset and
 *    no drag-to-dismiss — four things the sheet primitive already does.
 * 2. **Delete is not the same weight as edit.** A destructive action drawn as
 *    a peer of a routine one is how people delete things by accident; it is
 *    now the quiet `danger` action, below.
 * 3. **The event's tone reaches the sheet** as a leading rail, so the sheet
 *    and the block a user tapped read as the same object.
 * 4. **Every field is a labelled row**, announced as a pair rather than as a
 *    run of loose lines.
 *
 * **Renders nothing without an event** (§4.5).
 */
function EventDetailSheetV4({ event, description, recurrenceLabel, timezoneLabel, variant = 'card', open = true, editLabel = 'Edit', deleteLabel = 'Delete', closeLabel = 'Close', allDayLabel = 'All day', onClose, onEdit, onDelete, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!event)
        return null;
    const tone = (0, grid_v4_1.eventTone)(event.tone);
    const time = event.allDay ? allDayLabel : (0, format_1.timeRangeLabel)(event.start, event.end);
    const row = (glyph, value) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: value, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: glyph, size: "sm", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", style: { flex: 1 }, children: value })] }, `${glyph}-${value}`));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: RAIL,
                    alignSelf: 'stretch',
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, grid_v4_1.toneFill)(theme, tone),
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", face: "heading", size: "lg", weight: "bold", tone: "onCard", style: { flex: 1 }, children: event.title }), event.allDay ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: tone, variant: "soft", size: "sm", children: allDayLabel })) : null] }), time ? row('clock', time) : null, event.location ? row('location', event.location) : null, recurrenceLabel ? row('refresh', recurrenceLabel) : null, timezoneLabel ? row('globe', timezoneLabel) : null, description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: description })) : null, onEdit || onDelete ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }, children: [onEdit ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onPress: () => onEdit(event), accessibilityLabel: `${editLabel}, ${event.title}`, children: editLabel })) : null, onDelete ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", tone: "danger", size: "md", onPress: () => onDelete(event), accessibilityLabel: `${deleteLabel}, ${event.title}`, children: deleteLabel })) : null] })) : null] })] }));
    if (variant === 'modal') {
        return ((0, jsx_runtime_1.jsx)(BottomSheetV4_1.BottomSheetV4, { open: open, 
            // `BottomSheet` requires a close handler — a sheet a user cannot
            // dismiss is a trap — so an omitted `onClose` becomes a no-op here
            // rather than a type error at every call site. `closeLabel` is kept in
            // the props for parity with the web twin, which titles its dismiss.
            onClose: onClose ?? (() => undefined), title: event.title, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body });
}
//# sourceMappingURL=EventDetailSheetV4.js.map