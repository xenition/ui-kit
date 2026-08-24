"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBar = DispatchBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const DISPATCH_STAGE = {
    unassigned: { label: 'Unassigned', glyph: '○', slot: 'muted', advance: 'Accept', next: 'accepted', tone: 'primary' },
    accepted: { label: 'Accepted', glyph: '✓', slot: 'primary', advance: 'Start driving', next: 'en-route', tone: 'primary' },
    'en-route': { label: 'En route', glyph: '→', slot: 'warn', advance: 'Arrive', next: 'on-site', tone: 'primary' },
    'on-site': { label: 'On site', glyph: '▶', slot: 'success', advance: 'Complete', next: 'complete', tone: 'success' },
    complete: { label: 'Complete', glyph: '✓', slot: 'success', advance: undefined, next: undefined, tone: 'success' },
};
/**
 * A dispatch status/action bar for the tech's active job. Shows the current
 * stage as a tinted glyph disc + label (text + glyph + a color that traces to a
 * `SemanticColors` slot — never color alone) with an optional ETA and job
 * label, plus a primary button that advances the workflow (accept → en-route →
 * on-site → complete) firing `onAdvance(next)`. An optional Navigate action
 * sits alongside. No literal colors.
 */
function DispatchBar({ stage, eta, jobLabel, onAdvance, onNavigate, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = DISPATCH_STAGE[stage] ?? DISPATCH_STAGE.unassigned;
    const tint = sd.slot === 'muted' ? colors.muted : colors[sd.slot];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                backgroundColor: colors.surface,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: sd.glyph, color: sd.slot, accessibilityLabel: sd.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: jobLabel ?? sd.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [sd.glyph, " ", sd.label, eta != null ? ` · ${eta}` : ''] })] }), onNavigate ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onPress: onNavigate, children: "Navigate" })) : null, sd.advance != null && sd.next != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", tone: sd.tone, loading: loading, onPress: () => onAdvance?.(sd.next), children: sd.advance })) : null] }));
}
//# sourceMappingURL=DispatchBar.js.map