"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReminder = ServiceReminder;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Urgency → tone + spelled-out word (never color alone). */
const URGENCY = {
    upcoming: { tone: 'primary', word: 'Upcoming' },
    due: { tone: 'warn', word: 'Due now' },
    overdue: { tone: 'danger', word: 'Overdue' },
};
/**
 * A vehicle service reminder — the service name, an urgency level
 * (upcoming/due/overdue) shown as a text-labelled badge with a left accent bar
 * so meaning never rests on color, plus due-date and mileage context and an
 * optional action. An `overdue` reminder maps to the `danger` slot per contract.
 * Data + `onAction`/`onDismiss` callbacks only; nothing fetches. Colors come
 * from semantic tokens and `withAlpha` tints — no literal colors.
 * `variant="row"` renders a denser list line.
 */
function ServiceReminder({ service, urgency = 'upcoming', glyph = '🔧', dueLabel, mileageLabel, detail, variant = 'card', actionLabel, onAction, onDismiss, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const u = URGENCY[urgency] ?? URGENCY.upcoming;
    const toneColor = colors[u.tone];
    const row = variant === 'row';
    const a11y = `${service}, ${u.word}${dueLabel ? `, ${dueLabel}` : ''}${mileageLabel ? `, ${mileageLabel}` : ''}`;
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 34,
                    height: 34,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(toneColor, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, children: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: service }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [dueLabel, mileageLabel].filter(Boolean).join(' · ') })] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: (u.tone === 'muted' ? 'neutral' : u.tone), variant: "soft", size: "sm", children: u.word })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: !onAction && !onDismiss, accessibilityLabel: a11y, style: [
            {
                flexDirection: 'row',
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, backgroundColor: toneColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: row ? tokens.spacing.md : tokens.spacing.lg, gap: row ? tokens.spacing.sm : tokens.spacing.md }, children: [header, detail && !row ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: detail })) : null, onAction || onDismiss ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "ghost", size: "sm", onPress: onDismiss, accessibilityLabel: `Snooze ${service} reminder`, children: "Snooze" }) })) : null, onAction && actionLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: onDismiss ? 2 : 1 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "primary", tone: urgency === 'overdue' ? 'danger' : 'default', size: "sm", onPress: onAction, accessibilityLabel: `${actionLabel} — ${service}`, children: actionLabel }) })) : null] })) : null] })] }));
}
//# sourceMappingURL=ServiceReminder.js.map