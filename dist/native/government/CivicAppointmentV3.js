"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CivicAppointmentV3 = CivicAppointmentV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const STATUS = {
    scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
    confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
    'checked-in': { label: 'Checked in', glyph: '📍', tone: 'accent' },
    completed: { label: 'Completed', glyph: '🏁', tone: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
    'no-show': { label: 'No-show', glyph: '!', tone: 'danger' },
};
/**
 * CivicAppointment, alternate design **V3** — a dense agenda line. A left
 * date/time column (bold date over muted time) leads, the service and office
 * share the middle, and the lifecycle status closes the line as a text + glyph +
 * color pill (never color alone). Tight rhythm for a day/agenda list. Same
 * `CivicAppointmentProps`; drops in for `CivicAppointment`. Token-pure.
 */
function CivicAppointmentV3({ service, office, date, time, status = 'scheduled', location, reference, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = STATUS[status] ?? STATUS.scheduled;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    minWidth: 56,
                    alignItems: 'center',
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.xs,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.1),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: date }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: service }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [office, location != null ? ` · ${location}` : '', reference != null ? ` · #${reference}` : ''] })] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }));
}
//# sourceMappingURL=CivicAppointmentV3.js.map