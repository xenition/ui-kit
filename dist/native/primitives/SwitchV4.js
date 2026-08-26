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
exports.SwitchV4 = SwitchV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const field_v4_1 = require("./internal/field-v4");
const surface_v4_1 = require("./internal/surface-v4");
/**
 * **V4 switch** — the same props as {@link Switch}, a different design line.
 *
 * `design.md` §8 lists "excessive pill-shaped controls" among the tells of
 * generic AI UI, and this is the control that is exempt: a switch is a pill
 * because a switch **is** a pill — a knob that travels a track. The ban is on
 * capsule-shaping things that are not, which is why the V4 select, field and
 * textarea all take `radius.md` from the seed instead. The track's roundness
 * here is derived from its own height rather than `radius.full`, so the shape
 * survives a `sharp` seed that would otherwise square off the one control
 * whose whole affordance is the roundness.
 *
 * Three things make it read as a physical object rather than a coloured bar:
 *
 * 1. **The knob is above the track.** It carries `elevation.card` — the same
 *    token a raised surface takes, consumed unconditionally, so a
 *    `depth: 'flat'` seed flattens it with no branch here. This is one of the
 *    two places in the V4 form line where a shadow is honest: a switch knob is
 *    genuinely an object sitting on something (§11 — a container has to earn
 *    its existence, and so does a shadow).
 * 2. **The throw is a throw.** The knob translates on the native driver in
 *    {@link FIELD_MOTION}ms and the `colors.primary` track fades up beneath
 *    it, so on and off are connected by a movement rather than separated by a
 *    repaint (§36.1, §36.3). Under Reduce Motion both land on their final
 *    value on the first frame — the state is never carried by the animation
 *    (§36.10).
 * 3. **A target you can hit.** The track is `2xl` wide and `lg + xs` tall;
 *    `hitSlop` opens the touch area out to the `2xl` height every other V4
 *    control takes, and a brand halo lights in the space the focus ring
 *    already reserves while it is held, so pressing never shifts the layout
 *    (§36.11).
 *
 * The off track is `colors.border` rather than a ramp step. `ramps.neutral`
 * keeps the light-mode orientation in both schemes, so a neutral-300 track is
 * a pale bar on a dark page; `border` is resolved for the active scheme and is
 * the same hairline every other control in the form is outlined in.
 */
function SwitchV4({ checked = false, onCheckedChange, onChange, disabled = false, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, elevation } = theme;
    const metrics = (0, field_v4_1.fieldMetrics)(theme);
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [held, setHeld] = React.useState(false);
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;
    const knob = tokens.spacing.lg;
    const trackH = knob + tokens.spacing.xs;
    const trackW = metrics.height;
    const inset = (trackH - knob) / 2;
    // A pill by derivation, not by literal: the track is as round as it is tall.
    const pill = trackH / 2;
    const on = React.useRef(new react_native_1.Animated.Value(checked ? 1 : 0)).current;
    const mounted = React.useRef(false);
    React.useEffect(() => {
        const to = checked ? 1 : 0;
        if (reduced || !mounted.current) {
            mounted.current = true;
            on.setValue(to);
            return;
        }
        const anim = react_native_1.Animated.timing(on, {
            toValue: to,
            duration: field_v4_1.FIELD_MOTION,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [checked, reduced, on]);
    const translateX = on.interpolate({
        inputRange: [0, 1],
        outputRange: [inset, trackW - knob - inset],
    });
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            (0, field_v4_1.haloStyle)(theme, { showing: held, accent: colors.ring, radius: pill }),
            { alignSelf: 'flex-start' },
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "switch", accessibilityState: { checked, disabled }, accessibilityLabel: accessibilityLabel, disabled: disabled, hitSlop: Math.max(0, (metrics.height - trackH) / 2), onPress: () => emit?.(!checked), onPressIn: () => setHeld(true), onPressOut: () => setHeld(false), style: [
                {
                    width: trackW,
                    height: trackH,
                    borderRadius: pill,
                    justifyContent: 'center',
                    overflow: 'hidden',
                    backgroundColor: colors.border,
                    opacity: disabled ? theme.state.disabledContent : 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
                        react_native_1.StyleSheet.absoluteFill,
                        { backgroundColor: colors.primary, borderRadius: pill, opacity: on },
                    ] }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
                        {
                            width: knob,
                            height: knob,
                            borderRadius: knob / 2,
                            backgroundColor: colors.surface,
                            transform: [{ translateX }],
                        },
                        (0, surface_v4_1.elevationStyle)(elevation.card),
                    ] })] }) }));
}
//# sourceMappingURL=SwitchV4.js.map