"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroomingCard = GroomingCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const SERVICE_META = {
    bath: { glyph: '🛁', label: 'Bath' },
    haircut: { glyph: '✂️', label: 'Haircut' },
    nails: { glyph: '💅', label: 'Nail trim' },
    teeth: { glyph: '🦷', label: 'Teeth cleaning' },
    deshedding: { glyph: '🧹', label: 'De-shedding' },
    full: { glyph: '🐩', label: 'Full groom' },
};
const STATUS_META = {
    scheduled: { label: 'Scheduled', tone: 'primary', slot: 'primary' },
    due: { label: 'Due', tone: 'warn', slot: 'warn' },
    overdue: { label: 'Overdue', tone: 'danger', slot: 'danger' },
    done: { label: 'Done', tone: 'success', slot: 'success' },
};
/**
 * A grooming service card: service icon + name, a status chip, the last-done and
 * next-due dates, optional groomer + price, and a "Book" action for anything not
 * yet done. Status reads via a labelled chip + left accent bar (never color
 * alone). Token-only colors.
 */
function GroomingCard({ service, status, groomer, lastDone, nextDue, price, bookLabel = 'Book', onBook, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SERVICE_META[service];
    const statusMeta = STATUS_META[status];
    const showBook = onBook != null && status !== 'done';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label}, ${statusMeta.label}${nextDue ? `, next due ${nextDue}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderLeftColor: colors[statusMeta.slot],
                borderWidth: 1,
                borderLeftWidth: 4,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: meta.label }), groomer ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: groomer })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "soft", size: "sm", children: statusMeta.label })] }), lastDone || nextDue ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xl }, children: [lastDone ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Last" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: lastDone })] })) : null, nextDue ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Next" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: nextDue })] })) : null] })) : null, showBook ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [price ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: price })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onBook, children: bookLabel })] })) : null] }));
}
//# sourceMappingURL=GroomingCard.js.map