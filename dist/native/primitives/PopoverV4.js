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
exports.PopoverV4 = PopoverV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
/**
 * **V4 popover** — same props as {@link Popover}, a different design line.
 *
 * ## What the depth is saying
 *
 * A popover is a layer above the page with nothing above it, so it takes
 * `elevation.sheet` — the same altitude as `MenuV4`, `ModalV4` and
 * `BottomSheetV4`. One rule for every floating panel in the kit: they are the
 * same kind of object at different sizes. Its content is flat; a card inside a
 * popover is §8's "cards inside cards".
 *
 * The scrim is built from the shadow colour at a fixed alpha, not from
 * `colors.onSurface` — which INVERTS with the scheme and paints a 50% white
 * veil over a dark page, the bug this component has today. Glass applies only
 * when the seed asked for `depth: 'glass'`; elevation is consumed
 * unconditionally, so a `depth: 'flat'` seed gets a flat panel with no branch
 * in this file.
 *
 * ## Rhythm
 *
 * The base panel padded itself with `spacing.sm`, which puts arbitrary content
 * eight points from a hard edge and reads as cramped next to every other
 * surface in the kit. V4 uses `spacing.md`, the same step `CardV4` and the V4
 * sheets use, so a popover looks like it came from the same system as the
 * thing that opened it.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress`, so wrapping the trigger in Popover's own `Pressable` only ever
 * worked while the trigger was inert — pass a kit `<Button>` and the Button
 * claims the responder and the panel never opens. Cloning the element and
 * injecting `onPress` means there is one pressable instead of two nested ones,
 * a `disabled` trigger stays disabled because the press dies in its own
 * `Pressable`, and no `<button>`-inside-a-`<button>` can arise under
 * react-native-web. Anything the trigger already did on press runs first. A
 * non-element trigger (a bare string) has nothing to clone onto — and nothing
 * that could steal the responder — so it keeps the transparent wrapper.
 */
function PopoverV4({ trigger, children, align = 'start', open, onOpenChange, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const setOpen = (next) => {
        if (!isControlled)
            setInternalOpen(next);
        onOpenChange?.(next);
    };
    const alignItems = align === 'end' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start';
    const renderedTrigger = React.isValidElement(trigger) ? (React.cloneElement(trigger, {
        onPress: (event) => {
            trigger.props.onPress?.(event);
            setOpen(!isOpen);
        },
    })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: () => setOpen(!isOpen), children: trigger }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderedTrigger, (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: isOpen, transparent: true, 
                // §36.10: the fade is the whole transition, so removing it is the
                // reduced-motion answer rather than replacing it with something else.
                animationType: reduced ? 'none' : 'fade', onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                // Black at a fixed alpha. `onSurface` inverts and would paint a
                                // white veil over a dark page.
                                backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityViewIsModal: true, style: [
                                {
                                    minWidth: (0, nav_v4_1.panelMinWidth)(tokens.spacing),
                                    maxWidth: '100%',
                                    borderRadius: tokens.radius.md,
                                    // The same step `CardV4` and the V4 sheets use, so a popover
                                    // looks like it came from the same system as its trigger.
                                    padding: tokens.spacing.md,
                                },
                                (0, surface_v4_1.panelSkin)(theme),
                                (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                                style,
                            ], children: children })] }) })] }));
}
//# sourceMappingURL=PopoverV4.js.map