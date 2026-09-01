"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroomingCardV4 = GroomingCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const SERVICE_META = {
    bath: { glyph: '🛁', label: 'Bath' },
    haircut: { glyph: '✂️', label: 'Haircut' },
    nails: { glyph: '💅', label: 'Nail trim' },
    teeth: { glyph: '🦷', label: 'Teeth cleaning' },
    deshedding: { glyph: '🧹', label: 'De-shedding' },
    full: { glyph: '🐩', label: 'Full groom' },
};
const STATUS_META = {
    scheduled: { label: 'Scheduled', tone: 'primary' },
    due: { label: 'Due', tone: 'warn' },
    overdue: { label: 'Overdue', tone: 'danger' },
    done: { label: 'Done', tone: 'success' },
};
/**
 * GroomingCard — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a grooming service: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the service glyph in a soft-primary
 * tinted well, a bold service name, a muted groomer line, a labelled status Badge,
 * and the last/next dates shown as soft-primary chips beside a rounded book CTA.
 * "Book" stays for anything not yet done. Same props/behavior as
 * {@link GroomingCardProps}; service + status both read via glyph + labelled chip
 * (never color alone). Token-only colors via `useXenitionTheme()`.
 */
function GroomingCardV4({ service, status, groomer, lastDone, nextDue, price, bookLabel = 'Book', onBook, style, variant = 'card', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SERVICE_META[service];
    const statusMeta = STATUS_META[status];
    const showBook = onBook != null && status !== 'done';
    const a11y = `${meta.label}, ${statusMeta.label}${nextDue ? `, next due ${nextDue}` : ''}`;
    const chipStyle = {
        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
        borderRadius: tokens.radius.full,
        paddingHorizontal: tokens.spacing.sm,
        paddingVertical: 2,
    };
    const glyphWell = (size, fontSize) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: size,
            height: size,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize }, children: meta.glyph }) }));
    const statusBadge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "soft", size: "sm", children: statusMeta.label }));
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    minHeight: 44,
                    gap: tokens.spacing.sm,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.sm,
                    shadowColor: colors.onSurface,
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 3,
                },
                style,
            ], children: [glyphWell(36, tokens.typography.scale.lg), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: meta.label }), groomer ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u2702\uFE0F ", groomer] })) : null] }), statusBadge, price ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: chipStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: price }) })) : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [
            {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [glyphWell(44, tokens.typography.scale.xl), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: meta.label }), groomer ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["\u2702\uFE0F ", groomer] })) : null] }), statusBadge] }), lastDone || nextDue ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [lastDone ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: chipStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ["Last \u00B7 ", lastDone] }) })) : null, nextDue ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: chipStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ["Next \u00B7 ", nextDue] }) })) : null] })) : null, showBook ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    marginTop: tokens.spacing.xs,
                }, children: [price ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: chipStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: price }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onBook, children: bookLabel })] })) : null] }));
}
//# sourceMappingURL=GroomingCardV4.js.map