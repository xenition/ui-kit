"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyQuoteCardV4 = DailyQuoteCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
/**
 * DailyQuoteCardV4 — the "calm" restyle of {@link DailyQuoteCard}. Same props,
 * defaults, labels, a11y and behavior; the whole card becomes a soft gradient
 * ground: the quote in near-white ink, the author/category eyebrow in the softer
 * ink, and favorite/share as frosted round icon buttons. `favorited` flips the
 * heart glyph and its a11y state; `loading` shows frosted skeleton bars and a
 * missing quote shows the empty note.
 */
function DailyQuoteCardV4({ quote, author, category, 
// tone retained in the public props for parity; the calm ground is single-hue.
tone = 'primary', favorited = false, loading = false, onFavorite, onShare, emptyLabel = 'No quote today.', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, calm_1.calmInk)(r);
    const inkSoft = (0, calm_1.calmInkSoft)(r);
    void tone;
    const Ground = ({ children, label, align, }) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                overflow: 'hidden',
                gap: tokens.spacing.md,
                ...(align ? { alignItems: 'center' } : null),
            }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: label, style: { gap: tokens.spacing.md, ...(align ? { alignItems: 'center' } : null) }, children: children }) }) }));
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(Ground, { label: "Loading quote", children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.lg, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: (0, calm_1.calmTile)(r) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.lg, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: (0, calm_1.calmTile)(r) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: (0, calm_1.calmTile)(r) } })] }));
    }
    if (!quote) {
        return ((0, jsx_runtime_1.jsxs)(Ground, { label: emptyLabel, align: true, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: "\uD83D\uDD4A\uFE0F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    const RoundButton = ({ label, onPress, children, selected, }) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: selected != null ? { selected } : undefined, accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (0, calm_1.calmTile)(r),
            borderWidth: 1,
            borderColor: (0, calm_1.calmBorder)(r),
            opacity: pressed ? 0.85 : 1,
        }), children: children }));
    return ((0, jsx_runtime_1.jsxs)(Ground, { label: `Quote${author ? ` by ${author}` : ''}: ${quote}`, children: [category ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: inkSoft,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                }, children: category })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: ink,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '700',
                    lineHeight: Math.round(tokens.typography.scale.xl * 1.4),
                }, children: `“${quote}”` }), author ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }, children: ["\u2014 ", author] })) : null, onFavorite || onShare ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onFavorite ? ((0, jsx_runtime_1.jsx)(RoundButton, { label: favorited ? 'Remove from favorites' : 'Add to favorites', selected: favorited, onPress: () => onFavorite(!favorited), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: favorited ? '♥' : '♡', size: tokens.typography.scale.lg, style: { color: ink } }) })) : null, onShare ? ((0, jsx_runtime_1.jsx)(RoundButton, { label: "Share quote", onPress: onShare, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2197", size: tokens.typography.scale.lg, style: { color: ink } }) })) : null] })) : null] }));
}
//# sourceMappingURL=DailyQuoteCardV4.js.map