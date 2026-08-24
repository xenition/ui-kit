"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDetailSheet = EventDetailSheet;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const Modal_1 = require("../primitives/Modal");
const Icon_1 = require("../primitives/Icon");
const format_1 = require("./format");
/**
 * An event detail sheet — the tap-target destination from any calendar surface.
 * Shows a tone bar + title, a formatted date/time line, location, description
 * and optional recurrence/timezone captions, plus Edit/Delete actions. Renders
 * inline (`card`) or inside the `Modal` primitive (`modal`). Token colors only.
 */
function EventDetailSheet({ event, description, recurrenceLabel, timezoneLabel, variant = 'card', open = true, onClose, onEdit, onDelete, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (event == null)
        return null;
    const { base } = (0, format_1.resolveTone)(colors, event.tone);
    const dateLine = `${(0, format_1.weekdayLabel)(event.start)}, ${(0, format_1.monthLongLabel)(event.start)} ${event.start.getDate()}`;
    const timeLine = event.allDay ? 'All day' : (0, format_1.timeRangeLabel)(event.start, event.end);
    const metaRow = (glyph, text, key) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginLeft: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: text })] }, key));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing.xs,
                            alignSelf: 'stretch',
                            minHeight: tokens.spacing.xl,
                            borderRadius: tokens.radius.full,
                            backgroundColor: base,
                            marginRight: tokens.spacing.sm,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: event.title })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: [metaRow('🕑', `${dateLine} · ${timeLine}`, 'time'), event.location ? metaRow('📍', event.location, 'loc') : null, recurrenceLabel ? metaRow('🔁', recurrenceLabel, 'rec') : null, timezoneLabel ? metaRow('🌐', timezoneLabel, 'tz') : null] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: tokens.spacing.md, color: colors.muted, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }, children: description })) : null, onEdit || onDelete || onClose ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }, children: [onEdit ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", size: "sm", onPress: () => onEdit(event), children: "Edit" })) : null, onDelete ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", size: "sm", tone: "danger", onPress: () => onDelete(event), children: "Delete" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }), onClose ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "ghost", size: "sm", onPress: onClose, children: "Close" })) : null] })) : null] }));
    if (variant === 'modal') {
        return ((0, jsx_runtime_1.jsx)(Modal_1.Modal, { open: open, onClose: onClose ?? (() => undefined), children: body }));
    }
    return (0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "elevated", children: body });
}
//# sourceMappingURL=EventDetailSheet.js.map