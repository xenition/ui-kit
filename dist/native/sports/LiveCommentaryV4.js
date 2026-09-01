"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveCommentaryV4 = LiveCommentaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const KIND_META = {
    goal: { glyph: '⚽', label: 'Goal', key: true, slot: 'success' },
    card: { glyph: '🟨', label: 'Card', key: true, slot: 'warn' },
    sub: { glyph: '🔁', label: 'Substitution', key: false, slot: 'primary' },
    chance: { glyph: '🎯', label: 'Chance', key: false, slot: 'primary' },
    var: { glyph: '📺', label: 'VAR', key: false, slot: 'primary' },
    whistle: { glyph: '📣', label: 'Whistle', key: false, slot: 'muted' },
    info: { glyph: '•', label: 'Update', key: false, slot: 'muted' },
};
/**
 * LiveCommentary — **V4** "broadcast" design. A live text feed on an elevated
 * card: a `live` header carries a pulsing `danger` dot + "LIVE" label (never
 * color alone), and each entry pairs a minute chip with a kind glyph + text.
 * Key events (goal / card) and any `important` entry get a soft-tint accent
 * lane. One accent: `primary`. Same props/behavior as
 * {@link LiveCommentaryProps} (drop-in) — keeps the entry list contract,
 * kinds/minutes, loading and empty states. Token-only colors via
 * `useXenitionTheme()`.
 */
function LiveCommentaryV4({ entries, title = 'Live commentary', live = false, loadingRows, emptyLabel = 'No commentary yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const container = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [live ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.12),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: "LIVE" })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: title })] }));
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading commentary", style: [container, style], children: [header, Array.from({ length: loadingRows }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.xl, borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } }, i)))] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [container, style], children: [header, entries.length === 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: emptyLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "Updates will stream in once the match kicks off." })] })) : (entries.map((e) => {
                const meta = KIND_META[e.kind ?? 'info'] ?? KIND_META.info;
                const accent = meta.key || Boolean(e.important);
                const accentColor = colors[meta.slot];
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${e.minute ? e.minute + ', ' : ''}${meta.label}: ${e.text}`, style: {
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: tokens.spacing.sm,
                        paddingVertical: tokens.spacing.xs,
                        paddingLeft: accent ? tokens.spacing.sm : 0,
                        borderLeftWidth: accent ? 3 : 0,
                        borderColor: accentColor,
                        backgroundColor: accent ? (0, color_1.withAlpha)(accentColor, 0.1) : 'transparent',
                        borderRadius: accent ? tokens.radius.sm : 0,
                    }, children: [e.minute ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                minWidth: 40,
                                textAlign: 'center',
                                color: colors.muted,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '800',
                                backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.05),
                                borderRadius: tokens.radius.full,
                                paddingHorizontal: 6,
                                paddingVertical: 2,
                                overflow: 'hidden',
                            }, children: e.minute })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                flex: 1,
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: accent ? '600' : '400',
                            }, children: e.text })] }, e.id));
            }))] }));
}
//# sourceMappingURL=LiveCommentaryV4.js.map