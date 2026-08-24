"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicNoticeCard = PublicNoticeCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const CATEGORY = {
    hearing: { label: 'Public hearing', glyph: '⚖️', tone: 'primary' },
    meeting: { label: 'Meeting', glyph: '📋', tone: 'accent' },
    roadwork: { label: 'Roadwork', glyph: '🚧', tone: 'warn' },
    election: { label: 'Election', glyph: '🗳️', tone: 'primary' },
    ordinance: { label: 'Ordinance', glyph: '📜', tone: 'neutral' },
    bid: { label: 'Bid / RFP', glyph: '📑', tone: 'accent' },
    general: { label: 'Notice', glyph: '📢', tone: 'neutral' },
};
/**
 * A public-notice / civic-announcement card for a notices feed. The `category`
 * selects a tinted leading glyph and a labelled badge (text + glyph + color,
 * never color alone), with optional agency / date / location metadata and a
 * "New" flag. Becomes a button only when `onPress` is supplied. Every color
 * traces to a `SemanticColors` slot or a token-derived tint — no literals.
 */
function PublicNoticeCard({ category, title, body, agency, date, location, isNew = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const cat = CATEGORY[category] ?? CATEGORY.general;
    const content = ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: onPress ? 'interactive' : 'outlined', style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(cat.tone === 'neutral' ? colors.muted : colors[cat.tone], 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: cat.glyph, accessibilityLabel: cat.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: cat.tone, variant: "soft", size: "sm", children: cat.label }), isNew ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "danger", variant: "solid", size: "sm", children: "\u25CF New" })) : null] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    marginTop: tokens.spacing.sm,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                }, children: title }), body != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { marginTop: 2, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: body })) : null, agency != null || date != null || location != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: tokens.spacing.sm, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [agency, location, date].filter((v) => v != null && v !== '').join(' · ') })) : null] }));
    if (!onPress)
        return content;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${cat.label}: ${title}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: content }));
}
//# sourceMappingURL=PublicNoticeCard.js.map