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
 *
 * **This is a progress indicator, not an instruction list.** Each step gets
 * `flex: 1` of the row, so it is at its best with three or four one-word
 * titles ("Cart · Shipping · Pay") and falls apart past that: at eight steps
 * every title collapses to nothing, and there is nowhere to put a body.
 *
 * If what you have is *content* — a recipe method, an onboarding checklist
 * body, a setup guide — reach for {@link StepList} instead. It is the vertical
 * sibling: same numbering, but it grows downward and each step carries a title
 * and a description. `Steps` answers "where am I in this flow"; `StepList`
 * answers "here are the instructions".
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