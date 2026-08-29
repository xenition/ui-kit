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
exports.PopconfirmV4 = PopconfirmV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_state_1 = require("../../primitives/internal/v4-state");
const chrome_v4_1 = require("./internal/chrome-v4");
const state_v4_1 = require("./internal/state-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
/**
 * `Popconfirm`, V4 — the same props, and the last thing between a user and a
 * mistake.
 *
 * ## What the depth is saying
 *
 * The bubble is a floating layer, so it takes `elevation.sheet` and the shared
 * `panelSkin` — the same altitude and the same glass rule as `ModalV4`,
 * `MenuV4` and `DrawerV4`, because all four are one kind of object at four
 * sizes. The scrim is `scrimColor`, the shadow colour at a fixed alpha; the
 * base painted `colors.onSurface` at 0.5, which INVERTS with the scheme and
 * lays a white veil over a dark page.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`. Elevation is
 * consumed unconditionally, so a `depth: 'flat'` seed flattens the bubble with
 * no branch in this file.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress` of its own, so wrapping the trigger in Popconfirm's own
 * `Pressable` only ever worked while the trigger was inert: pass the obvious
 * thing — a kit `<Button>`, which is a `Pressable` — and the Button claims the
 * responder, the wrapper's `onPress` never fires, and the confirm bubble never
 * opens. Every destructive action in an app built on the kit was silently a
 * no-op, and the kit's own test hid it because it passed a bare `<Text>`.
 *
 * Cloning the trigger and injecting `onPress` fixes it at the root: one
 * pressable instead of two nested ones, so there is no responder to lose, and a
 * `disabled` trigger stays disabled because the press dies in its own
 * `Pressable` — which is what `disabled` means. Anything the trigger already
 * does on press runs first. A non-element trigger has nothing to clone onto,
 * and nothing that could steal the responder, so it keeps the wrapper.
 *
 * ## Reading the choice
 *
 * §25 asks for friction proportional to risk and §26 that a destructive
 * consequence be legible. So the destructive button is the **only** coloured
 * thing in the bubble — `danger` filled with `onDanger`, the compiler's paired
 * ink, not the `onPrimary` the base painted on a red fill by mistake — and
 * Cancel is quiet text in `mutedText`, which is `muted` with an actual AA
 * promise rather than `muted`, which has none.
 *
 * Both buttons clear the 44pt target the rest of the V4 line composes from the
 * spacing scale. A confirm bubble is the one place in a product where a mis-tap
 * is unrecoverable, and the base's `paddingVertical: xs` chips were about 24
 * tall — half a target, for the highest-stakes tap on the screen.
 *
 * Press feedback is the M3 state layer: the control's own ink over its own
 * ground, at `state.pressed`. Under Reduce Motion the modal's fade is dropped
 * (§36.10); the state layer is not motion and stays.
 */
function PopconfirmV4({ trigger, message, onConfirm, onCancel, confirmLabel = 'Confirm', cancelLabel = 'Cancel', }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(false);
    const cancel = () => {
        onCancel?.();
        setOpen(false);
    };
    const renderedTrigger = React.isValidElement(trigger) ? (React.cloneElement(trigger, {
        onPress: (event) => {
            trigger.props.onPress?.(event);
            setOpen(true);
        },
    })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: () => setOpen(true), children: trigger }));
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    /*
      The bubble's measure, from the spacing scale rather than the base's literal
      240: six of the largest step. A number written into a component cannot move
      when the theme's density does.
    */
    const panelWidth = tokens.spacing['2xl'] * 6;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderedTrigger, (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, 
                // §36.10: the fade is the whole transition, so removing it is the
                // reduced-motion answer rather than replacing it with something else.
                animationType: reduced ? 'none' : 'fade', onRequestClose: cancel, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: tokens.spacing.lg,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: cancel, style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                // Black at a fixed alpha. `onSurface` inverts and would paint a
                                // white veil over a dark page.
                                backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityViewIsModal: true, style: [
                                (0, surface_v4_1.panelSkin)(theme),
                                (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                                {
                                    width: '100%',
                                    maxWidth: panelWidth,
                                    borderRadius: tokens.radius.md,
                                    padding: tokens.spacing.md,
                                    gap: tokens.spacing.md,
                                },
                            ], children: [typeof message === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        fontFamily: tokens.typography.fontBody,
                                        fontSize: tokens.typography.scale.sm,
                                        // `onSurface`, never `muted` — over glass, `muted` measurably
                                        // falls below AA, and this sentence is the whole warning.
                                        color: colors.onSurface,
                                    }, children: message })) : (message), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        gap: tokens.spacing.sm,
                                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: cancelLabel, onPress: cancel, style: ({ pressed }) => ({
                                                minHeight: tap,
                                                justifyContent: 'center',
                                                paddingHorizontal: tokens.spacing.md,
                                                borderRadius: tokens.radius.md,
                                                backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                    fontFamily: tokens.typography.fontBody,
                                                    fontSize: tokens.typography.scale.sm,
                                                    fontWeight: '500',
                                                    // `mutedText`, not `muted`: the plain slot carries no
                                                    // contrast promise, and this is text.
                                                    color: colors.mutedText,
                                                }, children: cancelLabel }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: confirmLabel, onPress: () => {
                                                onConfirm();
                                                setOpen(false);
                                            }, style: ({ pressed }) => ({
                                                minHeight: tap,
                                                justifyContent: 'center',
                                                paddingHorizontal: tokens.spacing.md,
                                                borderRadius: tokens.radius.md,
                                                // A filled control layers its own PAIRED ink over its own
                                                // fill — the M3 model applied to the ground it actually has.
                                                backgroundColor: pressed
                                                    ? (0, v4_state_1.stateMix)(colors.danger, colors.onDanger, 'pressed', theme.state)
                                                    : colors.danger,
                                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                    fontFamily: tokens.typography.fontBody,
                                                    fontSize: tokens.typography.scale.sm,
                                                    fontWeight: '600',
                                                    // `onDanger`, the compiler's paired ink for the danger FILL.
                                                    // The base wrote `onPrimary` on a red ground, which is a
                                                    // contrast promise made against a different colour entirely.
                                                    color: colors.onDanger,
                                                }, children: confirmLabel }) })] })] })] }) })] }));
}
//# sourceMappingURL=PopconfirmV4.js.map