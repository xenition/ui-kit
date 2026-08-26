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
exports.ToggleGroupV4 = ToggleGroupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_state_1 = require("../../primitives/internal/v4-state");
const chrome_v4_1 = require("./internal/chrome-v4");
const field_v4_1 = require("./internal/field-v4");
/**
 * `ToggleGroup`, V4 — the same props, at the height every other control in the
 * form is.
 *
 * ## One form, one edge
 *
 * The single biggest quality signal a form can send is that every control in it
 * agrees, so this reads its height and radius from `fieldMetrics` — the same
 * `2xl` / `radius.md` `InputV4` shipped and the other eleven V4 form controls
 * share. The base's `paddingVertical: sm` put it around 34, so a toggle group
 * stacked next to a select was visibly a different family and missed the 44pt
 * target as well.
 *
 * ## The seam
 *
 * A hairline `<View>` between cells rather than a `borderLeftWidth` on each.
 * A border on the cell stops at the cell's own box, so when one neighbour is
 * filled and the other is not the divider reads as a step rather than a seam; a
 * stretched hairline is full-bleed in every combination. Same construction as
 * `ButtonGroupV4`.
 *
 * The group is joined by adjacency and one hairline. No fill, no gradient, no
 * shadow (§9, §11) — the selected cell is what carries colour, and it is the
 * only thing that does.
 *
 * ## Feedback
 *
 * Press is the M3 state layer, and each cell layers over **its own** ground: an
 * unselected cell mixes `onSurface` into `surface`, a selected one mixes
 * `onPrimary` into `primary`. The base pressed with a fill of `colors.border` —
 * a hairline colour used as a surface — and skipped the selected cell, so the
 * chosen option was the one thing in the control that never answered a tap.
 *
 * A disabled cell drops to M3's `disabledContent` (0.38) instead of the base's
 * blanket 0.5 on the whole group, so the group's own edge stays legible while
 * its contents read as unavailable.
 *
 * ## What the group announces
 *
 * `radiogroup` only in single mode. The base claimed `radiogroup` in **both**,
 * so a `multiple` group announced itself to a screen reader as a set of
 * mutually exclusive choices — the opposite of what it does. In multiple mode
 * the container makes no role claim at all and the `checkbox` children carry
 * the meaning, which is the honest description.
 */
function ToggleGroupV4({ options, value, onChange, multiple = false, disabled = false, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const metrics = (0, field_v4_1.fieldMetrics)(theme);
    const selected = React.useMemo(() => {
        if (multiple)
            return Array.isArray(value) ? value : [];
        return typeof value === 'string' && value ? [value] : [];
    }, [value, multiple]);
    const toggle = (v) => {
        if (multiple) {
            const set = new Set(selected);
            if (set.has(v))
                set.delete(v);
            else
                set.add(v);
            onChange?.(Array.from(set));
        }
        else {
            onChange?.(selected[0] === v ? '' : v);
        }
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View
    // `radiogroup` only when the choices actually are exclusive.
    , { 
        // `radiogroup` only when the choices actually are exclusive.
        accessibilityRole: multiple ? undefined : 'radiogroup', accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, style: [
            {
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'stretch',
                minHeight: metrics.height,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: metrics.radius,
                overflow: 'hidden',
            },
            style,
        ], children: options.map((opt, i) => {
            const active = selected.includes(opt.value);
            const itemDisabled = disabled || opt.disabled === true;
            const ground = active ? colors.primary : colors.surface;
            const ink = active ? colors.onPrimary : colors.onSurface;
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { width: 1, backgroundColor: colors.border } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityState: { selected: active, disabled: itemDisabled, checked: active }, accessibilityLabel: opt.label, disabled: itemDisabled, onPress: () => toggle(opt.value), style: ({ pressed }) => ({
                            justifyContent: 'center',
                            paddingHorizontal: metrics.padX,
                            opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, itemDisabled),
                            // Each cell layers over ITS OWN ground, so the selected one
                            // answers the tap too.
                            backgroundColor: pressed ? (0, v4_state_1.stateMix)(ground, ink, 'pressed', theme.state) : ground,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: ink,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: active ? '600' : '500',
                            }, children: opt.label }) })] }, opt.value));
        }) }));
}
//# sourceMappingURL=ToggleGroupV4.js.map