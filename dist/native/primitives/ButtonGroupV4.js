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
exports.ButtonGroupV4 = ButtonGroupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** The platform minimum touch target — a property of fingers, not of the seed. */
const MIN_TAP = 44;
/**
 * **V4 button group** — same props as {@link ButtonGroup}, a different design
 * line. Still purely structural: it adds one colour, the `border` hairline, and
 * lets every child keep its own.
 *
 * 1. **The seams actually close.** `overflow: 'hidden'` clips the CONTAINER's
 *    corners; it does nothing to the children's. So every button inside the
 *    native group kept its own `radius.md` and the group showed a notch at each
 *    seam, with the page bleeding through — while the web twin had it right all
 *    along with `[&>*]:rounded-none`. V4 passes `borderRadius: 0` down to each
 *    cell, which is that rule's native equivalent.
 * 2. **It stops claiming to be a `toolbar`.** That role promises arrow-key
 *    navigation between its controls, and this component provides none — a
 *    screen-reader user who trusts it is stranded inside the group. React
 *    Native has no `group` role to swap in (the web twin's `role="group"` has
 *    no native equivalent), so V4 claims nothing: the buttons are the
 *    accessible elements and the row is layout. An honest silence beats a
 *    promise the component cannot keep (§46).
 * 3. **One row, one height.** Nothing made the cells the same height, so a
 *    group mixing an `sm` and an `md` button had a ragged bottom edge inside a
 *    single border. They stretch now, and the row has a 44pt floor — a joined
 *    control is still a row of tap targets.
 *
 * No fill, no gradient, no shadow. A segmented control groups by adjacency and
 * a hairline (§9, §11); the buttons inside it are what carry colour.
 */
function ButtonGroupV4({ children, fill = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const items = React.Children.toArray(children).filter(React.isValidElement);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View
    // No role. React Native has no `group`, and `toolbar` — what the base
    // claimed — is a promise this component does not keep (see above). The
    // buttons inside are the accessible elements; the row is layout.
    , { 
        // No role. React Native has no `group`, and `toolbar` — what the base
        // claimed — is a promise this component does not keep (see above). The
        // buttons inside are the accessible elements; the row is layout.
        style: [
            {
                flexDirection: 'row',
                alignItems: 'stretch',
                alignSelf: fill ? 'stretch' : 'flex-start',
                minHeight: MIN_TAP,
                borderRadius: tokens.radius.md,
                borderColor: colors.border,
                borderWidth: 1,
                overflow: 'hidden',
            },
            style,
        ], children: items.map((child, i) => {
            const element = child;
            // The native equivalent of the web twin's `[&>*]:rounded-none`: the
            // container's clip never reaches a child's own corners.
            const flush = React.cloneElement(element, {
                style: [element.props.style, { borderRadius: 0 }],
            });
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, backgroundColor: colors.border } }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: fill ? 1 : undefined, justifyContent: 'center' }, children: flush })] }, i));
        }) }));
}
//# sourceMappingURL=ButtonGroupV4.js.map