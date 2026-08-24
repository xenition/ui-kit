"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Steps = Steps;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Horizontal step indicator — the native mirror of the web `Steps`. A row of
 * numbered/checked markers with titles; done steps fill with the primary color,
 * the active step is outlined. For wizards/checkout. No literal colors.
 */
function Steps({ steps, current, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'flex-start' }, style], children: steps.map((s, i) => {
            const done = i < current;
            const active = i === current;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 32,
                            height: 32,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: done ? colors.primary : 'transparent',
                            borderWidth: done ? 0 : 2,
                            borderColor: active ? colors.primary : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '600',
                                color: done ? colors.onPrimary : active ? colors.primary : colors.muted,
                            }, children: done ? '✓' : i + 1 }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.xs, alignItems: 'center' }, children: [typeof s.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '500',
                                    textAlign: 'center',
                                    color: active || done ? colors.onSurface : colors.muted,
                                }, children: s.title })) : (s.title), s.description != null ? (typeof s.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, textAlign: 'center', color: colors.muted }, children: s.description })) : (s.description)) : null] })] }, i));
        }) }));
}
//# sourceMappingURL=Steps.js.map