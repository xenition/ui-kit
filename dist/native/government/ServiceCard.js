"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCard = ServiceCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const CATEGORY = {
    license: { label: 'Licensing', glyph: '🪪' },
    permit: { label: 'Permits', glyph: '📋' },
    tax: { label: 'Tax', glyph: '🧾' },
    records: { label: 'Records', glyph: '🗂️' },
    benefit: { label: 'Benefits', glyph: '🤝' },
    health: { label: 'Public health', glyph: '⚕️' },
    utility: { label: 'Utilities', glyph: '💧' },
    other: { label: 'Service', glyph: '🏛️' },
};
const CHANNEL = {
    online: { label: 'Online', glyph: '🌐', tone: 'success' },
    'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
    phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
    unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};
/**
 * A single public-service tile for a civic app home / directory. The `category`
 * selects a tinted leading glyph disc; a `channel` badge conveys availability by
 * **text + glyph + color** (never color alone). An optional primary `Button`
 * fires `onStart`, and the whole card becomes a button only when `onPress` is
 * supplied. Every color traces to a `SemanticColors` slot or a token-derived
 * tint — no literals.
 */
function ServiceCard({ category, title, description, channel, estimatedTime, actionLabel = 'Start', onStart, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const cat = CATEGORY[category] ?? CATEGORY.other;
    const ch = channel ? CHANNEL[channel] : undefined;
    const body = ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: onPress ? 'interactive' : 'elevated', style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: cat.glyph, size: "xl", accessibilityLabel: cat.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: cat.label })] }), ch != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: ch.tone, variant: "soft", size: "sm", children: `${ch.glyph} ${ch.label}` })) : null] }), description != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: description })) : null, estimatedTime != null || onStart != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [estimatedTime != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u23F1 ", estimatedTime] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onStart != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", onPress: onStart, children: actionLabel })) : null] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}, ${cat.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=ServiceCard.js.map