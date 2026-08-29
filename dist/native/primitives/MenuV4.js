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
exports.MenuV4 = MenuV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const state_v4_1 = require("./internal/state-v4");
/**
 * **V4 menu** — same props as {@link Menu}, a different design line.
 *
 * ## What the depth is saying
 *
 * A menu is above the page and nothing is above it, so it takes
 * `elevation.sheet` — the same altitude as `ModalV4` and `BottomSheetV4`,
 * because a menu and a sheet are the same kind of object at different sizes and
 * a kit where they drift apart has two depth systems. The rows inside it are
 * flat; §8's "cards inside cards inside cards" is exactly what a menu becomes
 * when every item gains its own surface.
 *
 * The scrim is built from the shadow colour at a fixed alpha, not from
 * `colors.onSurface` — which INVERTS with the scheme and paints a 50% white
 * veil over a dark page, the bug this component has today. `scrimColor` is
 * shared with the V4 sheets so there is one answer to "how dark is a scrim".
 *
 * Glass applies only when the seed asked for `depth: 'glass'`. Everything else
 * is consumed unconditionally, so a `depth: 'flat'` seed gets a flat menu with
 * no branch in this file — the compiler already zeroed the tokens.
 *
 * ## Reading the list
 *
 * Rows are `onSurface`, and the destructive one is `dangerText` — the
 * compiler's contrast-corrected red, not the `danger` FILL slot the base used
 * as text. That makes the destructive item **the only coloured thing in the
 * menu**, so it is unmistakable because it is different rather than because it
 * shouts (§32), and §25's friction-proportional-to-risk is paid in attention
 * rather than in an extra tap.
 *
 * Every row is a 44pt target composed from the spacing scale.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress`, so wrapping the trigger in Menu's own `Pressable` only ever
 * worked while the trigger was inert — pass a kit `<Button>` and the Button
 * claims the responder and the menu never opens. Cloning the element and
 * injecting `onPress` means there is one pressable instead of two nested ones,
 * a `disabled` trigger stays disabled because the press dies in its own
 * `Pressable`, and no `<button>`-inside-a-`<button>` can arise under
 * react-native-web. Anything the trigger already did on press runs first. A
 * non-element trigger (a bare string) has nothing to clone onto — and nothing
 * that could steal the responder — so it keeps the transparent wrapper.
 */
function MenuV4({ trigger, items, align = 'start' }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(false);
    const renderedTrigger = React.isValidElement(trigger) ? (React.cloneElement(trigger, {
        onPress: (event) => {
            trigger.props.onPress?.(event);
            setOpen(true);
        },
    })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: () => setOpen(true), children: trigger }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderedTrigger, (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, 
                // §36.10: the fade is the whole transition, so removing it is the
                // reduced-motion answer rather than replacing it with something else.
                animationType: reduced ? 'none' : 'fade', onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: align === 'end' ? 'flex-end' : 'flex-start',
                        padding: tokens.spacing.lg,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                // Black at a fixed alpha. `onSurface` inverts and would paint a
                                // white veil over a dark page.
                                backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "menu", accessibilityViewIsModal: true, style: [
                                {
                                    minWidth: (0, nav_v4_1.panelMinWidth)(tokens.spacing),
                                    maxHeight: '70%',
                                    borderRadius: tokens.radius.md,
                                    overflow: 'hidden',
                                },
                                (0, surface_v4_1.panelSkin)(theme),
                                (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                            ], children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: items.map((item, index) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityState: { disabled: item.disabled }, disabled: item.disabled, onPress: () => {
                                        item.onSelect?.();
                                        setOpen(false);
                                    }, style: ({ pressed }) => ({
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: tokens.spacing.sm,
                                        minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                                        paddingVertical: tokens.spacing.sm,
                                        paddingHorizontal: tokens.spacing.lg,
                                        opacity: item.disabled === true ? theme.state.disabledContent : 1,
                                        // One border step, not a flash: a tiny action deserves tiny
                                        // feedback (§36.8), and the row must not compete with the
                                        // one coloured item in the list.
                                        backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                                    }), children: [item.icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: item.icon }) : null, typeof item.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                fontSize: tokens.typography.scale.base,
                                                fontFamily: tokens.typography.fontBody,
                                                fontWeight: '500',
                                                // `dangerText`, not `danger`: the plain slot is a FILL
                                                // colour and carries no promise as text.
                                                color: item.danger === true ? colors.dangerText : colors.onSurface,
                                            }, children: item.label })) : (item.label)] }, index))) }) })] }) })] }));
}
//# sourceMappingURL=MenuV4.js.map