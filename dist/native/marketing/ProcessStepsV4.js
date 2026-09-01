"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessStepsV4 = ProcessStepsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * ProcessSteps — **V4** "showcase" design (native mirror of the web V4). A
 * refined numbered "how it works" flow: each step opens with a big soft-primary
 * numbered token (a `withAlpha(colors.primary, 0.1)` circle carrying the bold
 * step number, or the step's `icon`), connected to the next by a hairline rule.
 * Bold step `title` and muted `description`. As on the native base, phones are
 * narrow so this is a vertical list (the web desktop-horizontal layout is
 * dropped). NOT a gradient surface. Honors every `step` (`title`,
 * `description`, `icon`). Same props/behavior as {@link ProcessStepsProps};
 * token-only colors, no literals.
 */
function ProcessStepsV4({ steps, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-process-steps", style: [{ gap: tokens.spacing.lg }, style], children: steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: 48,
                                    width: 48,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                                }, children: step.icon !== undefined ? (typeof step.icon === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.primary,
                                        fontSize: tokens.typography.scale.lg,
                                        fontWeight: '800',
                                    }, children: step.icon })) : (step.icon)) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.primary,
                                        fontSize: tokens.typography.scale.lg,
                                        fontWeight: '800',
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
                                    fontWeight: '800',
                                    letterSpacing: -0.3,
                                }, children: step.title })) : (step.title), step.description !== undefined && step.description !== null ? (typeof step.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.muted,
                                    fontSize: tokens.typography.scale.sm,
                                    lineHeight: tokens.typography.scale.sm * 1.5,
                                }, children: step.description })) : (step.description)) : null] })] }, index));
        }) }));
}
//# sourceMappingURL=ProcessStepsV4.js.map