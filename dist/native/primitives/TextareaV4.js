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
exports.TextareaV4 = TextareaV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const field_v4_1 = require("./internal/field-v4");
/**
 * How tall a line of body text is set, as a multiple of its size.
 *
 * 1.5 rather than the base's 1.4. A single-line field is a label you are
 * editing; a textarea is prose, and prose is read in lines — §10 asks for
 * typography to do the work before containers do, and line height is most of
 * what makes several lines readable rather than dense.
 */
const LINE_HEIGHT = 1.5;
/**
 * **V4 multi-line field** — the same props as {@link Textarea}, a different
 * design line.
 *
 * A textarea is the one form control whose job is reading, not just entry, so
 * the changes split between the two:
 *
 * 1. **It matches the fields around it.** `md` radius and `md` horizontal
 *    padding from the shared `fieldMetrics`, and a minimum height of at least
 *    one full control height, so a one-row textarea is never shorter than the
 *    `InputV4` above it in a form (§13). The base's `radius.sm` box was
 *    visibly a different component.
 * 2. **It is set to be read.** Lines at 1.5× rather than 1.4×, which is most of
 *    what separates prose from a wall (§10). `rows` still drives the height,
 *    so the caller decides how much of the answer is visible before scrolling.
 * 3. **A real focus ring.** The same brand halo `InputV4` paints, with its
 *    space reserved whether or not it is showing, so focusing never nudges the
 *    label above it or the field below (§36.11).
 *
 * `invalid` turns the border and the ring `danger` from one flag, so they can
 * never disagree; the recovery copy belongs to the `Field` that wraps this
 * control, because a primitive cannot invent the sentence that says what to fix
 * (§38).
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal, and a
 * box someone is writing in is the last place to spend depth.
 */
function TextareaV4({ invalid = false, label, rows = 4, containerStyle, style, editable = true, onFocus, onBlur, ...rest }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const metrics = (0, field_v4_1.fieldMetrics)(theme);
    const [focused, setFocused] = React.useState(false);
    const accent = (0, field_v4_1.fieldAccent)(theme, invalid);
    const lineHeight = Math.round(tokens.typography.scale.base * LINE_HEIGHT);
    const padY = tokens.spacing.sm;
    const handleFocus = (event) => {
        setFocused(true);
        onFocus?.(event);
    };
    const handleBlur = (event) => {
        setFocused(false);
        onBlur?.(event);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: metrics.gap }, containerStyle], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontFamily: tokens.typography.fontBody,
                    fontWeight: '500',
                }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, field_v4_1.haloStyle)(theme, { showing: focused, accent }), children: (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { multiline: true, textAlignVertical: "top", editable: editable, accessibilityState: { disabled: !editable }, placeholderTextColor: colors.mutedText, onFocus: handleFocus, onBlur: handleBlur, style: [
                        {
                            width: '100%',
                            // Never shorter than a single-line field, however few rows are
                            // asked for — a one-row textarea beside an input should not look
                            // like a mistake.
                            minHeight: Math.max(metrics.height, rows * lineHeight + padY * 2),
                            color: colors.onSurface,
                            backgroundColor: colors.surface,
                            borderRadius: metrics.radius,
                            paddingVertical: padY,
                            paddingHorizontal: metrics.padX,
                            fontSize: tokens.typography.scale.base,
                            fontFamily: tokens.typography.fontBody,
                            lineHeight,
                            opacity: editable ? 1 : 0.5,
                            ...(0, field_v4_1.fieldBorder)(theme, { invalid, focused }),
                        },
                        style,
                    ], ...rest }) })] }));
}
//# sourceMappingURL=TextareaV4.js.map