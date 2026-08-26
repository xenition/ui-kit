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
exports.ActionSheetV4 = ActionSheetV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const surface_v4_1 = require("./internal/surface-v4");
const state_v4_1 = require("./internal/state-v4");
const motion_v4_1 = require("./internal/motion-v4");
/**
 * Split the actions into the ordinary ones and the destructive ones, keeping
 * relative order inside each group.
 *
 * The destructive actions become their own card at the bottom of the stack —
 * the "destructive slot". That is not decoration: §25 asks for friction
 * proportional to risk, and physical separation is the cheapest friction there
 * is. A Delete sitting flush against a Rename is one mis-scroll away from being
 * the thing your thumb lands on.
 */
function partition(actions) {
    const ordinary = [];
    const destructive = [];
    for (const action of actions) {
        (action.destructive === true ? destructive : ordinary).push(action);
    }
    return { ordinary, destructive };
}
/**
 * `ActionSheet`, V4 — the same props, grouped, with a destructive slot.
 *
 * ## What the depth is saying
 *
 * The groups are cards over a scrimmed page, all at ONE altitude: each carries
 * `elevation.sheet`, none is nested inside another. §8's "cards inside cards
 * inside cards" is about hierarchy invented for its own sake; three siblings at
 * the same height are three objects on one table, which is what an action sheet
 * literally is. The rows inside them are flat, and nothing in this component is
 * lifted twice.
 *
 * The scrim is the shadow colour, not `onSurface` — which inverts with the
 * scheme and paints a near-WHITE veil over a dark page, the bug the base
 * component has. Glass applies only when the seed asked for `depth: 'glass'`;
 * everything else is consumed unconditionally, so `depth: 'flat'` needs no
 * branch and gets a flat sheet for free.
 *
 * ## The destructive slot
 *
 * The base component tints EVERY row with `primary` — the iOS convention — and
 * marks the destructive one by swapping that tint for red. Two problems: the
 * sheet then has no hierarchy at all (§5: one dominant thing), and `primary` is
 * a FILL colour with no contrast guarantee as text.
 *
 * So V4 does the opposite. Ordinary rows are plain `onSurface`, which is a
 * contrast-guaranteed pair and reads as what it is: a list of choices, not a
 * list of links. The destructive action is then **the only coloured text on the
 * sheet**, in `dangerText` — the compiler's contrast-corrected red — and it
 * sits in its own card, away from where a thumb rests. Unmistakable because it
 * is the one thing that looks different, rather than because it shouts.
 *
 * ## Motion
 *
 * It rises from the bottom edge because that is where it came from (§36.1),
 * over `SURFACE_MOTION.sheet`. Reduce Motion drops the travel and keeps the
 * scrim's fade (§36.10).
 */
function ActionSheetV4({ open, onClose, title, actions, cancelLabel = 'Cancel', }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const progress = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (!open) {
            progress.setValue(0);
            return;
        }
        if (reduced) {
            progress.setValue(1);
            return;
        }
        const anim = react_native_1.Animated.timing(progress, {
            toValue: 1,
            duration: surface_v4_1.SURFACE_MOTION.sheet,
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [open, reduced, progress]);
    const { ordinary, destructive } = React.useMemo(() => partition(actions), [actions]);
    // A comfortable tap target, from the scale rather than a remembered 44.
    const rowMinHeight = tokens.spacing['2xl'];
    const card = [
        (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
        (0, surface_v4_1.panelSkin)(theme),
        { borderRadius: tokens.radius.lg, overflow: 'hidden' },
    ];
    const renderRow = (action, index, tone) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityState: { disabled: action.disabled }, disabled: action.disabled, onPress: () => {
            action.onSelect?.();
            onClose();
        }, style: ({ pressed }) => ({
            minHeight: rowMinHeight,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
            borderTopWidth: index === 0 ? 0 : 1,
            borderTopColor: colors.border,
            // A row that is being pressed is the only thing in the sheet that
            // changes colour, and it changes by one border step — feedback, not a
            // flash (§36.8: a tiny action deserves tiny feedback).
            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
            opacity: action.disabled === true ? theme.state.disabledContent : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                fontSize: tokens.typography.scale.base,
                fontWeight: '500',
                color: tone,
            }, children: action.label }) }, index));
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                        opacity: progress,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: onClose, style: { flex: 1 } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, style: {
                        padding: tokens.spacing.md,
                        paddingBottom: tokens.spacing.md + insets.bottom,
                        gap: tokens.spacing.sm,
                        transform: [
                            {
                                translateY: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [tokens.spacing['2xl'] * 4, 0],
                                }),
                            },
                        ],
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "menu", style: card, children: [title != null && title !== '' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        paddingVertical: tokens.spacing.md,
                                        paddingHorizontal: tokens.spacing.lg,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.border,
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            fontSize: tokens.typography.scale.sm,
                                            // `onSurface`, not `muted`: this card may be glass, and
                                            // `muted` measurably falls below AA there. Weight and size
                                            // do the de-emphasis instead of colour.
                                            color: colors.onSurface,
                                            textAlign: 'center',
                                        }, children: title }) })) : null, ordinary.map((action, i) => renderRow(action, title != null && title !== '' ? i + 1 : i, colors.onSurface))] }), destructive.length > 0 && ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "menu", style: card, children: destructive.map((action, i) => 
                            // `dangerText`, not `danger`: the plain slot is a FILL colour
                            // and carries no promise as text. This is the same red, walked
                            // until it clears AA on the surface.
                            renderRow(action, i, colors.dangerText)) })), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: cancelLabel, onPress: onClose, style: ({ pressed }) => [
                                ...card,
                                {
                                    minHeight: rowMinHeight,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: tokens.spacing.md,
                                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.surface) : colors.surface,
                                },
                            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                    color: colors.onSurface,
                                }, children: cancelLabel }) })] })] }) }));
}
//# sourceMappingURL=ActionSheetV4.js.map