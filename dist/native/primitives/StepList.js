"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepList = StepList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Text_1 = require("./Text");
/**
 * Vertical, content-bearing instruction list — a recipe method, an onboarding
 * checklist body, a setup guide. Numbered markers down the left, joined by a
 * rail, each carrying a title and as much body copy as the step needs.
 *
 * **Not to be confused with its sibling {@link Steps}, and the difference is
 * the whole reason this exists.** `Steps` is a *progress indicator*: one
 * `flex: 1` marker per step laid out horizontally, correct for a 3-step
 * checkout where the titles are one word each. Hand it eight recipe steps and
 * every title collapses to nothing — a real app hit exactly that and ended up
 * rendering its method as `ListRow`s beside a title-less `Steps`.
 *
 * So: **`Steps` for "where am I in this flow", `StepList` for "here are the
 * instructions".** `StepList` grows downward, so it reads the same at eight
 * items as at three, and it is the only one of the two with room for a body.
 *
 * Every color, size and space comes from the compiled tokens. No literal
 * colors.
 */
function StepList({ steps, current, onStepPress, connector = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Marker geometry. `md` spacing keeps the rail proportional to the theme's
    // rhythm instead of pinning it to a magic 32.
    const markerSize = tokens.spacing.md * 2;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'column' }, style], children: steps.map((step, i) => {
            const last = i === steps.length - 1;
            // `current` is optional: with no current step nothing is "done" and
            // nothing is "active" — it renders as a plain numbered list.
            const done = step.done === true || (current != null && i < current);
            const active = step.done !== true && current != null && i === current;
            const markerBg = done ? colors.primary : 'transparent';
            const markerBorder = active ? colors.primary : colors.border;
            const numberTone = done ? 'onPrimary' : active ? 'primaryText' : 'muted';
            const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    gap: tokens.spacing.md,
                    paddingBottom: last ? 0 : tokens.spacing.lg,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: markerSize,
                                    height: markerSize,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: markerBg,
                                    borderWidth: done ? 0 : 2,
                                    borderColor: markerBorder,
                                }, children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", weight: "semibold", tone: numberTone, children: done ? '✓' : String(i + 1) }) }), connector && !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 1,
                                    flex: 1,
                                    marginTop: tokens.spacing.xs,
                                    backgroundColor: colors.border,
                                } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs, paddingTop: tokens.spacing.xs }, children: [typeof step.title === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: active ? 'semibold' : 'medium', tone: "onSurface", children: step.title })) : (step.title), step.description != null ? (typeof step.description === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: step.description })) : (step.description)) : null] })] }));
            const key = step.id ?? String(i);
            return onStepPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { checked: done }, onPress: () => onStepPress(i), children: row }, key)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: row }, key));
        }) }));
}
//# sourceMappingURL=StepList.js.map