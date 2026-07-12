"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessSteps = ProcessSteps;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Numbered "how it works" flow — the native mirror of the web `ProcessSteps`.
 * The web version is horizontal on desktop / vertical on mobile with connector
 * lines; native renders a **token-styled numbered vertical list** with a
 * connector segment between markers (phones are always narrow, so the
 * horizontal desktop layout is dropped). Token-only.
 */
function ProcessSteps({ steps, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-process-steps", style: [{ gap: tokens.spacing.lg }, style], children: steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: 40,
                                    width: 40,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: colors.primary,
                                }, children: step.icon !== undefined ? (typeof step.icon === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onPrimary,
                                        fontSize: tokens.typography.scale.base,
                                        fontWeight: '600',
                                    }, children: step.icon })) : (step.icon)) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onPrimary,
                                        fontSize: tokens.typography.scale.base,
                                        fontWeight: '600',
                                    }, children: index + 1 })) }), !isLast ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    marginTop: tokens.spacing.xs,
                                    width: 1,
                                    flex: 1,
                                    backgroundColor: colors.border,
                                } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flex: 1,
                            gap: tokens.spacing.xs,
                            paddingBottom: isLast ? 0 : tokens.spacing.md,
                        }, children: [typeof step.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.lg,
                                    fontWeight: '600',
                                }, children: step.title })) : (step.title), step.description !== undefined && step.description !== null ? (typeof step.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.muted,
                                    fontSize: tokens.typography.scale.sm,
                                }, children: step.description })) : (step.description)) : null] })] }, index));
        }) }));
}
//# sourceMappingURL=ProcessSteps.js.map