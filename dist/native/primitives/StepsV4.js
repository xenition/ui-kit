"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepsV4 = StepsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * **V4 steps** — same props as {@link Steps}, a different design line.
 *
 * ## The connector is the component
 *
 * The base drew a row of disconnected circles. That is a set of badges, not a
 * progress indicator: it says which markers are filled, and leaves the reader
 * to infer that they form a sequence at all. §29 asks that navigation reflect
 * the user's mental model, and the model of a checkout is a **path** — so V4
 * draws the path.
 *
 * The rail runs behind the markers and is split at each one, which makes the
 * completed portion a single continuous filled line ending exactly at where you
 * are. That is the whole answer to "how far along am I", available without
 * counting circles (§32, §33).
 *
 * ## Three states, three shapes
 *
 * - **Done** is filled with `primary` and carries a check in `onPrimary` — a
 *   compiler-guaranteed pair.
 * - **Now** is an outlined marker on `surface`, ringed in `primary`, with its
 *   number in `primaryText`. It is the only hollow marker inside the filled
 *   run, so it reads as the head of the path rather than as another completed
 *   step.
 * - **Later** is the same outline in `border` with a `muted` number: present,
 *   plainly not reached.
 *
 * The number is `primaryText` rather than `primary`, because a numeral is text
 * and the fill slot carries no contrast promise as text.
 *
 * ## Still a progress indicator, not an instruction list
 *
 * Each step takes `flex: 1` of the row, so this is at its best with three or
 * four one-word titles ("Cart · Shipping · Pay") and falls apart past that. If
 * what you have is content — a recipe method, a setup guide — reach for
 * `StepList`, the vertical sibling. `Steps` answers "where am I in this flow";
 * `StepList` answers "here are the instructions".
 *
 * Nothing here is a tap target: `Steps` reports progress and takes no input, so
 * the 44pt rule does not apply and the markers stay the size they need to be.
 */
function StepsV4({ steps, current, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Composed from the spacing scale rather than the base's hard-coded 32.
    const marker = tokens.spacing.xl;
    const railTop = marker / 2 - 1;
    const lastIndex = steps.length - 1;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Progress", style: [{ flexDirection: 'row', alignItems: 'flex-start' }, style], children: steps.map((step, index) => {
            const done = index < current;
            const active = index === current;
            // The segment INTO this step is complete once you have reached it; the
            // segment OUT of it is complete once you have left it.
            const railInFilled = index <= current;
            const railOutFilled = index < current;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Step ${index + 1} of ${steps.length}${done ? ', done' : active ? ', current' : ''}`, style: { flex: 1, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            width: '100%',
                            height: marker,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: [index > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    position: 'absolute',
                                    left: 0,
                                    right: '50%',
                                    top: railTop,
                                    height: 2,
                                    backgroundColor: railInFilled ? colors.primary : colors.border,
                                } })) : null, index < lastIndex ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    position: 'absolute',
                                    left: '50%',
                                    right: 0,
                                    top: railTop,
                                    height: 2,
                                    backgroundColor: railOutFilled ? colors.primary : colors.border,
                                } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: marker,
                                    height: marker,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // Above the rail, and opaque, so the rail is split rather
                                    // than drawn through the marker.
                                    zIndex: 1,
                                    backgroundColor: done ? colors.primary : colors.surface,
                                    borderWidth: done ? 0 : 2,
                                    borderColor: active ? colors.primary : colors.border,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        fontSize: tokens.typography.scale.xs,
                                        fontFamily: tokens.typography.fontBody,
                                        fontWeight: '600',
                                        // `primaryText`, not `primary`: a numeral is text, and the
                                        // fill slot carries no contrast promise as one.
                                        color: done ? colors.onPrimary : active ? colors.primaryText : colors.mutedText,
                                    }, children: done ? '✓' : index + 1 }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            marginTop: tokens.spacing.xs,
                            alignItems: 'center',
                            paddingHorizontal: tokens.spacing.xs,
                        }, children: [typeof step.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    fontSize: tokens.typography.scale.xs,
                                    fontFamily: tokens.typography.fontBody,
                                    textAlign: 'center',
                                    // Where you are is the only title at full weight.
                                    fontWeight: active ? '600' : done ? '500' : '400',
                                    color: active || done ? colors.onSurface : colors.mutedText,
                                }, children: step.title })) : (step.title), step.description != null ? (typeof step.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    fontSize: tokens.typography.scale.xs,
                                    textAlign: 'center',
                                    color: colors.mutedText,
                                }, children: step.description })) : (step.description)) : null] })] }, index));
        }) }));
}
//# sourceMappingURL=StepsV4.js.map