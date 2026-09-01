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
exports.AuthFieldV4 = AuthFieldV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("./IconV4");
const TextV4_1 = require("./TextV4");
const field_v4_1 = require("./internal/field-v4");
const v4_state_1 = require("../../primitives/internal/v4-state");
/*
  §10.1 permits a named 44 with a comment: it is the platform floor for an
  *incidental* tap target — the password eye, the clear ✕ — and it is geometry,
  not theme. There is no "tap target" token and inventing one would push a
  platform constant into the brand seed.

  The field's own height is NOT here: it comes from `fieldMetrics`, which is
  the whole point of the shared module.
*/
const TAP_TARGET = 44;
/**
 * **V4 auth input** — the native twin of the web `AuthFieldV4`, the same props
 * as the auth family's {@link AuthField} plus an optional clear affordance.
 *
 * Four things separate it from the base:
 *
 * 1. **It is a field like every other V4 field.** Height, radius, horizontal
 *    padding, ring width, border colour and the halo all come from
 *    `internal/field-v4` — `spacing['2xl']` tall on `radius.md`, which the
 *    Addendum settled as the line's answer over §6's written 56/`radius.lg`.
 *    Nothing is picked here, so a sign-in field stacked above an `InputV4` or a
 *    `SelectV4` shares an edge and a `sharp` seed squares all three together.
 * 2. **A real focus ring, not a border swap.** Focus paints the shared
 *    translucent halo *around* the control, and its space is reserved whether
 *    or not it is showing — so focusing never nudges the form out from under
 *    the finger (§36.11).
 * 3. **An error state that says something.** `error` turns the border and the
 *    halo `danger` **and** prints the message underneath in `dangerText`,
 *    announced politely. A red border alone is invisible to a colour-blind
 *    user, which is why the Addendum lets a field-shaped V4 keep `error` at the
 *    cost of strict prop parity — and why the message is the state, not a
 *    decoration on it.
 * 4. **Affordances a thumb can actually hit.** The eye and the ✕ carry a 44
 *    `hitSlop` instead of being a bare glyph the size of its font.
 *
 * Everything else is the base's contract, unchanged: a muted leading icon, a
 * `muted` placeholder that is never a faked label (§6), `hint` below when there
 * is no error, `trailing` for a caller's own affordance. No gradient, no glass,
 * no shadow — §16 asks that forms stay minimal, and a sign-in field is not a
 * hero.
 */
function AuthFieldV4({ label, icon, error, hint, secure = false, trailing, disabled = false, style, showLabel = 'Show password', hideLabel = 'Hide password', clearable = false, clearLabel = 'Clear', onClear, value, onChangeText, onFocus, onBlur, ...rest }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const metrics = (0, field_v4_1.fieldMetrics)(theme);
    const [focused, setFocused] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    // Mirrors the text for an uncontrolled caller, so the ✕ knows whether there
    // is anything to clear. A controlled `value` always wins.
    const [text, setText] = React.useState(value ?? '');
    const current = value ?? text;
    // The error message IS the invalid state; one flag is how the border, the
    // halo and the copy can never disagree.
    const invalid = Boolean(error);
    const accent = (0, field_v4_1.fieldAccent)(theme, invalid);
    const handleChangeText = (next) => {
        setText(next);
        onChangeText?.(next);
    };
    const handleClear = () => {
        setText('');
        onChangeText?.('');
        onClear?.();
    };
    const handleFocus = (event) => {
        setFocused(true);
        onFocus?.(event);
    };
    const handleBlur = (event) => {
        setFocused(false);
        onBlur?.(event);
    };
    // A hit area of 44 around a glyph drawn at the base type step.
    const slop = (TAP_TARGET - tokens.typography.scale.base) / 2;
    /*
      The inline affordances take an M3 **state layer** rather than a dimmed
      glyph: dimming fades the control's own content, which is the signal the
      scale spends `disabledContent` on — so a pressed ✕ and a dead ✕ looked
      alike. The `xs` padding is cancelled by an equal negative margin, so the
      layer has a body to fill without the row's geometry moving.
    */
    const pressAction = {
        borderRadius: tokens.radius.full,
        padding: tokens.spacing.xs,
        margin: -tokens.spacing.xs,
    };
    const pressLayer = {
        backgroundColor: (0, v4_state_1.stateOverlay)(colors.onSurface, 'pressed', theme.state),
    };
    const showClear = clearable && !disabled && current !== '';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: metrics.gap }, style], children: [label ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "medium", children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, field_v4_1.haloStyle)(theme, { showing: focused, accent }), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: metrics.inner,
                        minHeight: metrics.height,
                        paddingHorizontal: metrics.padX,
                        borderRadius: metrics.radius,
                        backgroundColor: colors.surface,
                        opacity: disabled ? theme.state.disabledContent : 1,
                        ...(0, field_v4_1.fieldBorder)(theme, { invalid, focused }),
                    }, children: [icon ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, size: "base", color: "muted" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityState: { disabled }, 
                            // §6: the placeholder is `muted`, and it is never standing in for
                            // the label above.
                            placeholderTextColor: colors.muted, secureTextEntry: secure && !visible, value: value, onChangeText: handleChangeText, onFocus: handleFocus, onBlur: handleBlur, style: {
                                flex: 1,
                                padding: 0,
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.base,
                                fontFamily: tokens.typography.fontBody,
                            }, ...rest }), secure ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: visible ? hideLabel : showLabel, accessibilityState: { selected: visible, disabled }, disabled: disabled, onPress: () => setVisible((v) => !v), hitSlop: slop, style: ({ pressed }) => [pressAction, pressed ? pressLayer : null], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: visible ? 'eye-off' : 'eye', size: "base", color: visible ? 'primary' : 'muted' }) })) : null, showClear ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: clearLabel, onPress: handleClear, hitSlop: slop, style: ({ pressed }) => [pressAction, pressed ? pressLayer : null], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "sm", color: "muted" }) })) : null, trailing] }) }), invalid ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "dangerText", accessibilityRole: "alert", accessibilityLiveRegion: "polite", children: error })) : hint ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "muted", children: hint })) : null] }));
}
//# sourceMappingURL=AuthFieldV4.js.map