"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseRow = ExerciseRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A workout-set row: exercise name, a `sets × reps` prescription, an optional
 * weight, and a completion toggle. Completed rows read muted with a success
 * check. `onToggle` receives the next boolean. Token-only.
 */
function ExerciseRow({ name, sets, reps, weight, done = false, meta, onToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const prescription = sets != null && reps != null ? `${sets} × ${reps}` : sets != null ? `${sets} sets` : reps != null ? `${reps} reps` : undefined;
    const detailParts = [prescription, weight != null ? String(weight) : undefined, meta].filter(Boolean);
    const a11y = `${name}${detailParts.length ? `, ${detailParts.join(', ')}` : ''}, ${done ? 'done' : 'not done'}`;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 52,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: done ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                        }, children: name }), detailParts.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: detailParts.join('  ·  ') })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 24,
                    height: 24,
                    borderRadius: tokens.radius.sm,
                    borderWidth: 2,
                    borderColor: done ? colors.success : colors.border,
                    backgroundColor: done ? colors.success : colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null })] }));
    if (!onToggle) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: a11y, onPress: () => onToggle(!done), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=ExerciseRow.js.map