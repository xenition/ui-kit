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
exports.ContextMenuV4 = ContextMenuV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const chrome_v4_1 = require("./internal/chrome-v4");
const nav_v4_1 = require("./internal/nav-v4");
const state_v4_1 = require("./internal/state-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
/**
 * How long a press has to be held before it counts as a long press.
 *
 * The platform default is 500ms and the base picked 350. It stays 350 here for
 * one reason: it is the number the base shipped and a gesture threshold is
 * muscle memory, not styling — changing it would make every existing app's
 * context menus feel different for no design gain. §31: use familiar
 * interactions.
 */
const LONG_PRESS_MS = 350;
/**
 * `ContextMenu`, V4 — the same props, and a long press that actually reaches
 * the thing you pressed.
 *
 * ## The child is the target
 *
 * This is the one behavioural change, and it is the same fix `Popconfirm` and
 * `Menu` already carry. On native the deepest `Pressable` under the finger wins
 * the touch responder whether or not it has a handler of its own, so the base's
 * wrapping `<Pressable onLongPress>` only ever worked while its child was
 * inert. Long-press a row that happens to be a kit `<Button>`, a `ListRow`, a
 * `Card` with an `onPress` — anything pressable, which is most of what people
 * attach a context menu to — and the child claims the responder, the wrapper
 * never fires, and the menu never opens.
 *
 * So V4 clones the child and injects `onLongPress` into it: one pressable
 * instead of two nested ones, so there is no responder to lose. A `disabled`
 * child stays disabled, because the press dies in its own `Pressable`, which is
 * what `disabled` means. Anything the child already did on long press runs
 * first. A child that cannot take the prop — a bare string, a plain `<View>` —
 * has nothing to clone onto and nothing that could steal the responder either,
 * so it keeps the wrapper it has always had.
 *
 * ## What the depth is saying
 *
 * The action list is a floating layer, so it takes `elevation.sheet` and the
 * shared `panelSkin` — the same altitude and glass rule as `MenuV4`, `ModalV4`
 * and `DrawerV4`, because all four are one kind of object at four sizes. The
 * rows inside are flat; §8's "cards inside cards inside cards" is what a menu
 * becomes when every item gains a surface.
 *
 * The scrim is the shadow colour at a fixed alpha. The base painted
 * `colors.onSurface` at 0.5, which INVERTS with the scheme and lays a white
 * veil over a dark page.
 *
 * ## Reading the list
 *
 * The destructive row is `dangerText` — the compiler's contrast-corrected red,
 * not the `danger` FILL slot the base used as text, which carries no promise
 * when it is ink. That makes it the **only** coloured thing in the menu, so it
 * is unmistakable because it is different rather than because it shouts (§32).
 *
 * Every row clears 44pt, composed from the spacing scale. Press feedback is the
 * M3 state layer at `state.pressed` rather than a fill of `colors.border` — a
 * hairline colour used as a surface. A disabled row drops to M3's 0.38 rather
 * than each component's own 0.5.
 */
function ContextMenuV4({ actions, children, accessibilityLabel, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(false);
    const renderedChild = React.isValidElement(children) ? (React.cloneElement(children, {
        onLongPress: (event) => {
            children.props.onLongPress?.(event);
            setOpen(true);
        },
        delayLongPress: children.props.delayLongPress ?? LONG_PRESS_MS,
    })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: accessibilityLabel ?? 'Open context menu', accessibilityHint: "Long press for actions", onLongPress: () => setOpen(true), delayLongPress: LONG_PRESS_MS, children: children }));
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderedChild, (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, 
                // §36.10: the fade is the whole transition, so removing it is the
                // reduced-motion answer rather than replacing it with something else.
                animationType: reduced ? 'none' : 'fade', onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
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
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "menu", accessibilityLabel: accessibilityLabel ?? 'Context menu', accessibilityViewIsModal: true, style: [
                                (0, surface_v4_1.panelSkin)(theme),
                                (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                                {
                                    minWidth: (0, nav_v4_1.panelMinWidth)(tokens.spacing),
                                    maxHeight: '70%',
                                    borderRadius: tokens.radius.md,
                                    overflow: 'hidden',
                                },
                            ], children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: actions.map((action, index) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "menuitem", 
                                    // The label rather than the Text child: an icon-only action
                                    // would otherwise be announced as nothing at all (§46).
                                    accessibilityLabel: action.label, accessibilityState: { disabled: action.disabled }, disabled: action.disabled, onPress: () => {
                                        action.onSelect?.();
                                        setOpen(false);
                                    }, style: ({ pressed }) => ({
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: tokens.spacing.sm,
                                        minHeight: tap,
                                        paddingVertical: tokens.spacing.sm,
                                        paddingHorizontal: tokens.spacing.lg,
                                        opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, action.disabled),
                                        // The M3 state layer, not a hairline colour used as a
                                        // surface. A tiny action deserves tiny feedback (§36.8),
                                        // and the row must not compete with the one coloured item.
                                        backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                                    }), children: [action.icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action.icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                fontFamily: tokens.typography.fontBody,
                                                fontSize: tokens.typography.scale.base,
                                                fontWeight: '500',
                                                // `dangerText`, not `danger`: the plain slot is a FILL
                                                // colour and carries no promise as text.
                                                color: action.danger === true ? colors.dangerText : colors.onSurface,
                                            }, children: action.label })] }, index))) }) })] }) })] }));
}
//# sourceMappingURL=ContextMenuV4.js.map