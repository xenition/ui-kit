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
exports.Tooltip = Tooltip;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed tooltip — the native mirror of the web `Tooltip`. Native has no hover,
 * so the tip is revealed by **long-press** on the trigger instead of mouse-enter
 * — the platform's own tooltip gesture, and like hover it activates nothing, so
 * the wrapped control keeps its press for its own action (see the note in the
 * body). It shows as a centered `Modal` bubble rather than a bubble anchored to
 * `side` (native simplification — `side` is kept for prop parity only). The
 * bubble uses the inverted `onSurface`/`surface` token pair. No literal colors.
 */
function Tooltip({ label, side = 'top', children }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    /*
      The child IS the control. Tooltip does not wrap it in a pressable.
  
      Same root defect as Popover / Menu / Popconfirm: on native the deepest
      `Pressable` under the finger wins the touch responder, and wins it whether or
      not it has an `onPress`. The thing you attach a tooltip to is almost always
      already pressable — a `<Button>`, an icon button — so it claimed the responder,
      Tooltip's wrapper never fired, and the tip never appeared. The kit's own test
      hid it for one reason: it passed a bare `<Text>`, which has no responder to
      steal. Cloning the child removes the second pressable, so there is no responder
      to lose, and the `<button>`-inside-a-`<button>` the old wrapper was careful to
      avoid under react-native-web cannot arise at all.
  
      The handler injected is `onLongPress`, NOT `onPress` — this is where Tooltip
      parts company with its three siblings. They ARE the control's action: pressing
      a Popconfirm trigger is meant to open the bubble. A tooltip is not an action;
      on web it is revealed by hover, a gesture that does not activate anything, and
      the control still does its own job on click. Native has no hover, and the
      nearest gesture that likewise activates nothing is long-press — the platform
      convention for exactly this. Injecting `onPress` would make every tooltipped
      Save button save AND throw a modal over the screen.
  
      So: the child's press stays entirely the child's, whatever it already did on
      long-press runs first, then the tip opens. A `disabled` child opens nothing,
      because the press dies in its own `Pressable` — a tip on a disabled control
      means wrapping it in a `<Pressable>` (which is then the element that gets the
      handler) and explaining there why it is disabled.
  
      A child that is not a single element (a bare string, several nodes) has nothing
      to clone onto — and nothing that could steal the responder — so it keeps the
      transparent wrapper. That wrapper listens for the same gesture and nothing
      else, so there is one rule to learn rather than two: on native, long-press
      reveals the tip.
    */
    const renderedChild = React.isValidElement(children) ? (React.cloneElement(children, {
        onLongPress: (event) => {
            children.props.onLongPress?.(event);
            setOpen(true);
        },
    })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onLongPress: () => setOpen(true), children: children }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderedChild, (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: colors.onSurface,
                                opacity: 0.5,
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", style: {
                                backgroundColor: colors.onSurface,
                                borderRadius: tokens.radius.sm,
                                paddingVertical: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.sm,
                            }, children: typeof label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.surface }, children: label })) : (label) })] }) })] }));
}
//# sourceMappingURL=Tooltip.js.map