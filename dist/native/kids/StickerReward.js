"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerReward = StickerReward;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A sticker-collection reward board: a grid of earned + locked stickers with an
 * earned/total summary. Locked stickers are dimmed and marked with a lock glyph
 * (state, not color alone). Tapping a sticker fires `onCollect(index)`. Renders
 * an explicit empty state. Token-only colors.
 */
function StickerReward({ stickers, title = 'Sticker rewards', columns = 4, loading = false, emptyLabel = 'No stickers yet', onCollect, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cols = Math.max(1, Math.floor(columns));
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading stickers", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 48, width: '100%', borderRadius: tokens.radius.md, backgroundColor: colors.border } })] }));
    }
    if (stickers.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\u2728" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] })] }));
    }
    const earnedCount = stickers.filter((s) => s.earned).length;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [earnedCount, "/", stickers.length] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: stickers.map((sticker, i) => {
                    const earned = sticker.earned ?? false;
                    const cell = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            alignItems: 'center',
                            gap: 2,
                            paddingVertical: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 44,
                                    height: 44,
                                    borderRadius: tokens.radius.full,
                                    borderWidth: 1,
                                    borderColor: earned ? colors.accent : colors.border,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: earned ? 1 : 0.45,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: earned ? sticker.glyph : '🔒' }) }), sticker.label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: sticker.label })) : null] }));
                    const a11y = `${sticker.label ?? 'Sticker'}, ${earned ? 'earned' : 'locked'}`;
                    if (!onCollect) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, style: { width: `${100 / cols}%` }, children: cell }, sticker.id ?? i));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: () => onCollect(i), style: ({ pressed }) => ({ width: `${100 / cols}%`, opacity: pressed ? 0.6 : 1 }), children: cell }, sticker.id ?? i));
                }) })] }));
}
//# sourceMappingURL=StickerReward.js.map