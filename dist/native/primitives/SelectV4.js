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
exports.SelectV4 = SelectV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const field_v4_1 = require("./internal/field-v4");
const surface_v4_1 = require("./internal/surface-v4");
const state_v4_1 = require("./internal/state-v4");
/**
 * **V4 select** — the same props as {@link Select}, a different design line.
 *
 * The trigger is a **field**, not a button: `2xl` tall, `md` radius, `md`
 * horizontal padding — the same numbers `InputV4` takes, from the same shared
 * `fieldMetrics`. That is the whole point. A form where the text field is 48pt
 * and the select is 34pt reads as two components that happen to be near each
 * other; matching them is the single cheapest thing a kit can do to make a
 * screen look considered (§13, reusable components rather than one-off UI).
 *
 * §8 bans excessive pill-shaped controls, so unlike the `SwitchV4` track this
 * takes `radius.md` straight off the seed and a `sharp` brand gets a square
 * select. A select is a box; only the switch is a pill.
 *
 * What makes it feel like a control rather than a label:
 *
 * - **A ring that was always there.** The halo's space is reserved whether or
 *   not it is showing, so opening the sheet — or holding the trigger — never
 *   nudges the field or the label above it (§36.11).
 * - **A caret that answers.** It rotates through half a turn as the sheet
 *   opens, which is the disclosure explaining itself rather than a decoration
 *   (§36.1); it runs on the native driver and is skipped entirely under Reduce
 *   Motion (§36.10).
 * - **A sheet that is genuinely a layer.** The option list takes `panelSkin`
 *   and `elevation.sheet` from the shared surface plumbing, so it is the one
 *   place in this component where depth is honest — an overlay really is above
 *   the page. Its scrim is built from the elevation colour rather than a
 *   neutral ramp step, so it stays dark in dark mode instead of becoming the
 *   white veil the base select paints there.
 *
 * The rows inside are flat. §8's "cards inside cards inside cards" is the same
 * mistake as a raised row inside a raised sheet: the sheet is the layer, and
 * everything in it belongs to that layer.
 */
function SelectV4({ options, value, onValueChange, placeholder = 'Select…', invalid = false, disabled = false, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, elevation } = theme;
    const metrics = (0, field_v4_1.fieldMetrics)(theme);
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(false);
    const [held, setHeld] = React.useState(false);
    const selected = options.find((o) => o.value === value);
    const accent = (0, field_v4_1.fieldAccent)(theme, invalid);
    const turn = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        const to = open ? 1 : 0;
        if (reduced) {
            turn.setValue(to);
            return;
        }
        const anim = react_native_1.Animated.timing(turn, {
            toValue: to,
            duration: field_v4_1.FIELD_MOTION,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [open, reduced, turn]);
    const rotate = turn.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, field_v4_1.haloStyle)(theme, { showing: held || open, accent }), children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled, expanded: open }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => setOpen(true), onPressIn: () => setHeld(true), onPressOut: () => setHeld(false), style: [
                        {
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: metrics.inner,
                            minHeight: metrics.height,
                            paddingHorizontal: metrics.padX,
                            borderRadius: metrics.radius,
                            backgroundColor: colors.surface,
                            opacity: disabled ? theme.state.disabledContent : 1,
                            ...(0, field_v4_1.fieldBorder)(theme, { invalid, focused: open }),
                        },
                        style,
                    ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: selected ? colors.onSurface : colors.mutedText,
                                fontSize: tokens.typography.scale.base,
                                fontFamily: tokens.typography.fontBody,
                            }, children: selected ? selected.label : placeholder }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.Text, { style: {
                                color: colors.mutedText,
                                fontSize: tokens.typography.scale.sm,
                                fontFamily: tokens.typography.fontBody,
                                transform: [{ rotate }],
                            }, children: "\u25BE" })] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                                {
                                    maxHeight: '70%',
                                    borderRadius: tokens.radius.lg,
                                    overflow: 'hidden',
                                },
                                (0, surface_v4_1.panelSkin)(theme),
                                (0, surface_v4_1.elevationStyle)(elevation.sheet),
                            ], children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: options.map((option) => {
                                    const active = option.value === value;
                                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityState: { selected: active }, onPress: () => {
                                            onValueChange?.(option.value);
                                            setOpen(false);
                                        }, style: ({ pressed }) => ({
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: metrics.inner,
                                            minHeight: metrics.height,
                                            paddingHorizontal: tokens.spacing.lg,
                                            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                    flex: 1,
                                                    color: active ? colors.primaryText : colors.onSurface,
                                                    fontSize: tokens.typography.scale.base,
                                                    fontFamily: tokens.typography.fontBody,
                                                    fontWeight: active ? '600' : '400',
                                                }, children: option.label }), active ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                    color: colors.primaryText,
                                                    fontSize: tokens.typography.scale.base,
                                                    fontFamily: tokens.typography.fontBody,
                                                }, children: "\u2713" })) : null] }, option.value));
                                }) }) })] }) })] }));
}
//# sourceMappingURL=SelectV4.js.map