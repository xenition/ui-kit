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
exports.MultiSelectV4 = MultiSelectV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const field_v4_1 = require("./internal/field-v4");
const surface_v4_1 = require("./internal/surface-v4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const state_v4_1 = require("./internal/state-v4");
/** How much brand a chip carries. Enough to read as chosen, not as a fill. */
const CHIP_MIX = 0.14;
/**
 * **V4 multi-select** — the same props as {@link MultiSelect}, a different
 * design line.
 *
 * The trigger is a **field**: `2xl` tall, `md` radius, `md` horizontal padding,
 * from the same shared `fieldMetrics` `InputV4` and `SelectV4` take. A form
 * whose controls disagree about their own height reads as parts that happened
 * to land near each other; matching them is the cheapest quality signal a kit
 * has (§13).
 *
 * Two things changed beyond the metrics, and both are about colour discipline:
 *
 * 1. **The chips are not a second brand colour.** The base fills every chip
 *    with `accent`, which puts the brand's secondary hue on screen once per
 *    selection — §35.5 asks for a limited number of simultaneous accents, and
 *    §35.2 says the accent exists for emphasis, not for repetition. A V4 chip
 *    is a 14% brand tint **composited into `surface`**, so it reads as chosen
 *    without shouting, and it is an opaque colour rather than a translucent
 *    one: a chip at 14% alpha is a different colour on a card, on glass and on
 *    the page, and its label only ever carried a contrast guarantee against
 *    one of the three.
 * 2. **The chips are not pills.** `radius.sm` from the seed, so a `sharp`
 *    brand gets square chips. §8 lists excessive pill-shaped controls among the
 *    tells of generic AI UI, and a row of capsules is exactly that shape.
 *
 * The sheet goes through the shared surface plumbing — `panelSkin` plus
 * `elevation.sheet` over a scrim built from the elevation colour, which does
 * not invert with the scheme the way the base's neutral ramp step does. The
 * rows inside it are flat: the sheet is the layer, and everything on it belongs
 * to that layer (§8, no cards inside cards).
 *
 * The caret rotates as the sheet opens, so the disclosure explains itself
 * (§36.1); it runs on the native driver and is skipped under Reduce Motion
 * (§36.10).
 */
function MultiSelectV4({ options, value = [], onChange, placeholder = 'Select…', invalid = false, disabled = false, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, elevation } = theme;
    const metrics = (0, field_v4_1.fieldMetrics)(theme);
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(false);
    const [held, setHeld] = React.useState(false);
    const accent = (0, field_v4_1.fieldAccent)(theme, invalid);
    const chosen = options.filter((o) => value.includes(o.value));
    // Composited once, so the chip owns its ground rather than borrowing it.
    const chipBg = (0, v4_depth_1.mixToken)(colors.surface, colors.primary, CHIP_MIX);
    const toggle = (v) => {
        onChange?.(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
    };
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
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: metrics.padX,
                            borderRadius: metrics.radius,
                            backgroundColor: colors.surface,
                            opacity: disabled ? theme.state.disabledContent : 1,
                            ...(0, field_v4_1.fieldBorder)(theme, { invalid, focused: open }),
                        },
                        style,
                    ], children: [chosen.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                flex: 1,
                                color: colors.mutedText,
                                fontSize: tokens.typography.scale.base,
                                fontFamily: tokens.typography.fontBody,
                            }, children: placeholder })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                flex: 1,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: tokens.spacing.xs,
                            }, children: chosen.map((o) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    backgroundColor: chipBg,
                                    borderRadius: tokens.radius.sm,
                                    paddingVertical: tokens.spacing.xs / 2,
                                    paddingHorizontal: tokens.spacing.sm,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.primaryText,
                                        fontSize: tokens.typography.scale.sm,
                                        fontFamily: tokens.typography.fontBody,
                                        fontWeight: '500',
                                    }, children: o.label }) }, o.value))) })), (0, jsx_runtime_1.jsx)(react_native_1.Animated.Text, { style: {
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
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                                { maxHeight: '70%', borderRadius: tokens.radius.lg, overflow: 'hidden' },
                                (0, surface_v4_1.panelSkin)(theme),
                                (0, surface_v4_1.elevationStyle)(elevation.sheet),
                            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: options.map((option) => {
                                        const active = value.includes(option.value);
                                        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: active }, onPress: () => toggle(option.value), style: ({ pressed }) => ({
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
                                    }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Done", onPress: () => setOpen(false), style: ({ pressed }) => ({
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: metrics.height,
                                        borderTopWidth: 1,
                                        borderTopColor: colors.border,
                                        backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: colors.primaryText,
                                            fontSize: tokens.typography.scale.base,
                                            fontFamily: tokens.typography.fontBody,
                                            fontWeight: '600',
                                        }, children: "Done" }) })] })] }) })] }));
}
//# sourceMappingURL=MultiSelectV4.js.map