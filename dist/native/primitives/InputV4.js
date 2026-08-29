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
exports.InputV4 = InputV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("./internal/color");
/**
 * **V4 text input** — same props as {@link Input} plus an optional `error`
 * message, a different design line.
 *
 * Three things make it read as a considered control rather than a box:
 *
 * 1. **Height and softness.** A `2xl` minimum height (a comfortable target for
 *    a thumb, and room for the text to breathe) and the `md` radius instead of
 *    `sm`. Both come off the scales, so a `sharp` seed still gets square
 *    corners and nothing is picked here.
 * 2. **A real focus ring.** Focus paints a translucent brand halo AROUND the
 *    field, not just a different border colour — the difference between a
 *    control that responds and one that merely changes. The halo's space is
 *    reserved whether or not it is showing, so focusing a field never nudges
 *    the layout (§36.11 — do not move controls out from under the finger).
 *    The colour is `colors.primary`, which the provider has resolved for the
 *    active scheme; `ramps.primary[400]` would be a near-white halo on a dark
 *    page, because the ramps keep the light orientation in both schemes.
 * 3. **An error state that says something.** `invalid` turns the field and its
 *    ring to `danger`; `error` adds the message underneath, announced politely
 *    to a screen reader.
 *
 * No gradient, no glass, no shadow. A form field is not a hero, and depth on
 * an input is depth spent where §35.11 and §8 say it should not be — which is
 * why nothing here consumes `gradient` or `elevation` at all.
 */
function InputV4({ invalid = false, error, label, containerStyle, style, editable = true, onFocus, onBlur, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [focused, setFocused] = React.useState(false);
    // An error message IS an invalid state; keeping them in one variable is how
    // the border and the copy stay in agreement.
    const isInvalid = invalid || error !== undefined;
    const accent = isInvalid ? colors.danger : colors.primary;
    // Reserved whether or not it is showing, so focus never shifts the layout.
    // The negative margin lets the halo bleed outward, keeping the field's own
    // edge flush with the label above it; the container's `sm` gap leaves room.
    const ring = tokens.spacing.xs;
    const handleFocus = (event) => {
        setFocused(true);
        onFocus?.(event);
    };
    const handleBlur = (event) => {
        setFocused(false);
        onBlur?.(event);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, containerStyle], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontFamily: tokens.typography.fontBody,
                    fontWeight: '500',
                }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    padding: ring,
                    margin: -ring,
                    borderRadius: tokens.radius.md + ring,
                    backgroundColor: focused ? (0, color_1.withAlpha)(accent, 0.18) : 'transparent',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: editable, accessibilityState: { disabled: !editable }, placeholderTextColor: colors.mutedText, onFocus: handleFocus, onBlur: handleBlur, style: [
                        {
                            width: '100%',
                            minHeight: tokens.spacing['2xl'],
                            color: colors.onSurface,
                            backgroundColor: colors.surface,
                            borderWidth: 1,
                            borderColor: isInvalid ? colors.danger : focused ? accent : colors.border,
                            borderRadius: tokens.radius.md,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            fontSize: tokens.typography.scale.base,
                            fontFamily: tokens.typography.fontBody,
                            opacity: editable ? 1 : 0.5,
                        },
                        style,
                    ], ...rest }) }), error !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: {
                    color: colors.dangerText,
                    fontSize: tokens.typography.scale.sm,
                    fontFamily: tokens.typography.fontBody,
                }, children: error })) : null] }));
}
//# sourceMappingURL=InputV4.js.map