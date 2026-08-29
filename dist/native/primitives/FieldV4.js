"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldV4 = FieldV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const LabelV4_1 = require("./LabelV4");
const icon_names_1 = require("../../primitives/icon-names");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
/**
 * **V4 field** — same props as {@link Field}, a different design line.
 *
 * A field is three things stacked in a column, which makes it look like the
 * least interesting component in the kit and hides the fact that it is the one
 * carrying a form's entire error story.
 *
 * 1. **The message reaches the control.** The base field rendered its error in
 *    a sibling `Text` and left it there: nothing tied the message to the input,
 *    so a screen-reader user landing on the field heard the label and nothing
 *    about what was wrong with it. V4 hands the message down to the control as
 *    `accessibilityHint`, which is how React Native says "here is the extra
 *    thing you need to know about this input". It only fills in what the caller
 *    left blank — a hint already set on the control is theirs and wins (§23 —
 *    preserve unrelated work).
 * 2. **An error is not only red.** A red line under a field is invisible to a
 *    red-green viewer and to anyone reading in bright sun. V4 leads the error
 *    with the kit's `error` glyph, so the state has a shape as well as a hue
 *    (§46) — and `role="alert"` still announces it when it appears.
 * 3. **Both messages are measured.** The error took `dangerText`, which is
 *    right; the hint took `muted`, which is `neutral[600]` with no contrast
 *    promise against `surface` at all. Both are now run through
 *    `ensureContrast`. Helper text is the smallest thing on a form and the
 *    first thing an unmeasured colour makes unreadable.
 *
 * The gap comes from `spacing.xs` on both twins — the web field was on
 * Tailwind's `gap-1.5` (6px) against native's 4px, so the same field was two
 * different heights. No card, no fill, no gradient: §10 and §11 both say a
 * label, a control and a line of helper text are a group because of spacing,
 * not because of a container.
 */
function FieldV4({ label, required = false, error, hint, style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const message = error != null && error !== '' ? error : hint;
    const invalid = error != null && error !== '';
    // Hand the message to the control itself. Only where the caller left a gap —
    // an explicit hint on the child is theirs, and wins (§23).
    const described = React.Children.map(children, (child) => {
        if (!React.isValidElement(child) || message == null || message === '')
            return child;
        const props = child.props;
        if (props.accessibilityHint !== undefined)
            return child;
        return React.cloneElement(child, {
            accessibilityHint: message,
        });
    });
    const size = tokens.typography.scale.sm;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], ...rest, children: [label != null ? (0, jsx_runtime_1.jsx)(LabelV4_1.LabelV4, { required: required, children: label }) : null, described, invalid ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color: (0, color_1.ensureContrast)(colors.dangerText, colors.surface, compile_1.MIN_CONTRAST), fontSize: size }, children: (0, icon_names_1.resolveIconGlyph)('error') }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: (0, color_1.ensureContrast)(colors.dangerText, colors.surface, compile_1.MIN_CONTRAST),
                            fontSize: size,
                            fontFamily: tokens.typography.fontBody,
                        }, children: error })] })) : hint ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    // `muted` is `neutral[600]`; the compiler guarantees the on-pairs,
                    // not this one, and helper text is the first thing that costs.
                    color: colors.mutedText,
                    fontSize: size,
                    fontFamily: tokens.typography.fontBody,
                }, children: hint })) : null] }));
}
//# sourceMappingURL=FieldV4.js.map