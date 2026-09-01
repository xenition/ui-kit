"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamFormGuide = TeamFormGuide;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Accessible word + semantic color slot per result (color reinforces the letter, never alone). */
const RESULT_META = {
    W: { word: 'Win', slot: 'success' },
    D: { word: 'Draw', slot: 'warn' },
    L: { word: 'Loss', slot: 'danger' },
};
/**
 * TeamFormGuide — **V4** "broadcast" design. A compact form line: an optional
 * caption followed by a row of small circular soft-tint pills, one per recent
 * result, ordered most-recent-first. Each pill shows its letter (W / D / L) and
 * carries a semantic tint — win→success, draw→warn, loss→danger — so the result
 * reads from letter + color together, never color alone. When `onResultPress`
 * is given each pill is an accessible ≥44px button. Token-only colors via
 * `useXenitionTheme()`; dark-mode safe.
 */
function TeamFormGuide({ results, label, onResultPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const container = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    const summary = results.map((r) => RESULT_META[r]?.word ?? r).join(', ');
    const renderPill = (r) => {
        const meta = RESULT_META[r] ?? RESULT_META.D;
        const tint = colors[meta.slot];
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: 28,
                height: 28,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (0, color_1.withAlpha)(tint, 0.12),
            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: tint, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: r }) }));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: label ? `${label}: ${summary}` : `Recent form: ${summary}`, style: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 }, children: results.map((r, i) => {
                    const meta = RESULT_META[r] ?? RESULT_META.D;
                    if (onResultPress) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: meta.word, onPress: () => onResultPress(i), hitSlop: 8, style: ({ pressed }) => ({
                                minWidth: 44,
                                minHeight: 44,
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: pressed ? 0.7 : 1,
                            }), children: renderPill(r) }, i));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: meta.word, style: { alignItems: 'center', justifyContent: 'center' }, children: renderPill(r) }, i));
                }) })] }));
}
//# sourceMappingURL=TeamFormGuide.js.map