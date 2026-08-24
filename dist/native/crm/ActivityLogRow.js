"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogRow = ActivityLogRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * One entry in an activity feed. A tinted round badge carries the activity
 * **kind** as a glyph (📞 call, ✉ email, 👥 meeting, 📝 note, ✔ task, 💰 deal)
 * paired with a `kind`-derived tone — meaning is never color-only because the
 * glyph and the accessible label both name the kind. Optional actor + timestamp
 * meta line. The badge tint uses `withAlpha` over a theme token (no literal).
 */
function ActivityLogRow({ kind, title, detail, actor, timestamp, pending = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.ACTIVITY_META[kind];
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const metaLine = [actor, timestamp].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : 'text', accessibilityLabel: `${meta.label}: ${title}`, disabled: !onPress, onPress: onPress, testID: testID, style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                alignItems: 'flex-start',
                opacity: pending ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 32,
                    height: 32,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(accent, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: accent }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : null, metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: metaLine })) : null] })] }));
}
//# sourceMappingURL=ActivityLogRow.js.map