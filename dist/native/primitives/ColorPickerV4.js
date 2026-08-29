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
exports.ColorPickerV4 = ColorPickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const picker_v4_1 = require("./internal/picker-v4");
/**
 * **V4 swatch picker** — the same props as {@link ColorPicker}, a different
 * design line.
 *
 * ## Two problems, both about the selected chip
 *
 * 1. **The tick had no contrast guarantee.** The base draws a ✓ in
 *    `colors.onPrimary` on top of the chosen swatch — but the swatch is an
 *    arbitrary colour supplied by the caller, and `onPrimary` promises AA
 *    against `primary` and against nothing else. Pick a pale swatch and the
 *    tick is invisible; pick the brand and it happens to work. A mark whose
 *    legibility depends on which colour you chose is not a selection state.
 *
 *    So the selection is a **ring around the chip**, not a mark on top of it.
 *    A ring never lands on the swatch, so its contrast is against the page —
 *    known, and the same for every swatch. It is also a shape cue rather than
 *    only a colour one, which is what §46 asks for.
 *
 * 2. **The chip was too small to hit.** 36px in a wrapping grid, where the
 *    neighbouring target is a different colour. Every swatch here is
 *    `tapTarget()` — `spacing['2xl']`, 48px — with the coloured chip drawn
 *    smaller inside it, so the thing you can hit is comfortably larger than the
 *    thing you are aiming at.
 *
 * ## Two rings, deliberately
 *
 * The chip always carries a `colors.border` hairline, so a swatch the same
 * colour as the page (there is one in the default palette: `surface`) still has
 * an edge. The selection ring is a second, thicker ring outside it, and its
 * space is **always reserved** — transparent when unselected — so choosing a
 * colour never reflows the grid (§36.11).
 *
 * No depth at all. A swatch grid is a set of colours; a shadow on each one
 * would be one more thing competing with the only thing the control is about.
 */
function ColorPickerV4({ value, onChange, swatches, disabled = false, accessibilityLabel = 'Choose a color', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const palette = React.useMemo(() => swatches ?? [
        { label: 'Primary', value: colors.primary },
        { label: 'Accent', value: colors.accent },
        { label: 'Success', value: colors.success },
        { label: 'Warning', value: colors.warn },
        { label: 'Danger', value: colors.danger },
        { label: 'Foreground', value: colors.onSurface },
        { label: 'Muted', value: colors.muted },
        { label: 'Border', value: colors.border },
        { label: 'Surface', value: colors.surface },
        { label: 'Neutral 300', value: tokens.ramps.neutral[300] },
        { label: 'Neutral 500', value: tokens.ramps.neutral[500] },
        { label: 'Neutral 700', value: tokens.ramps.neutral[700] },
    ], [swatches, colors, tokens]);
    const target = (0, picker_v4_1.tapTarget)(theme);
    // The chip, inset far enough that the selection ring has somewhere to live.
    const chip = target - tokens.spacing.md;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: [
            {
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: tokens.spacing.sm,
                opacity: disabled ? theme.state.disabledContent : 1,
            },
            style,
        ], children: palette.map((sw) => {
            const active = value === sw.value;
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityLabel: sw.label, accessibilityState: { selected: active, disabled }, disabled: disabled, onPress: () => onChange?.(sw.value), style: {
                    width: target,
                    height: target,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    // Always two points of ring, so selecting never reflows the grid.
                    borderWidth: 2,
                    borderColor: active ? colors.primary : 'transparent',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: chip,
                        height: chip,
                        borderRadius: tokens.radius.full,
                        backgroundColor: sw.value,
                        // A swatch the same colour as the page still needs an edge.
                        borderWidth: 1,
                        borderColor: colors.border,
                    } }) }, `${sw.label}-${sw.value}`));
        }) }));
}
//# sourceMappingURL=ColorPickerV4.js.map