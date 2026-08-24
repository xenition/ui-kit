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
exports.SeatPicker = SeatPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
/** [background, foreground, border] token slots per resolved status. */
const STATUS_SLOTS = {
    available: ['surface', 'onSurface', 'border'],
    occupied: ['border', 'muted', 'border'],
    selected: ['primary', 'onPrimary', 'primary'],
};
/** Glyph reinforces status so it is never conveyed by color alone. */
const STATUS_GLYPH = {
    available: '',
    occupied: '✕',
    selected: '✓',
};
/**
 * A cabin seat map — a grid of pressable seats. Each seat announces its label
 * and status via `accessibilityLabel`/`accessibilityState` and carries a glyph
 * (`✓` selected, `✕` occupied), so state never depends on color alone.
 * Occupied seats are disabled and never fire `onSelect`. Selection is
 * controlled via `selectedIds`. Token-only colors.
 */
function SeatPicker({ rows, selectedIds = [], rowLabels, onSelect, maxSelectable, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const selected = React.useMemo(() => new Set(selectedIds), [selectedIds]);
    const statusOf = (seat) => {
        if (seat.occupied)
            return 'occupied';
        return selected.has(seat.id) ? 'selected' : 'available';
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [{ gap: tokens.spacing.sm, alignSelf: 'flex-start' }, style], children: [rows.map((seats, r) => {
                const rowLabel = rowLabels && r < rowLabels.length ? rowLabels[r] : String(r + 1);
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 20, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.xs }, children: rowLabel }), seats.map((seat, c) => ((0, jsx_runtime_1.jsx)(SeatButton, { seat: seat, status: statusOf(seat), onSelect: onSelect }, seat.id || `seat-${r}-${c}`)))] }, `row-${r}`));
            }), typeof maxSelectable === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `Selected ${selected.size} of ${maxSelectable}` })) : null] }));
}
/**
 * A single seat. Its own `usePressScale` gives the chosen seat a subtle tap
 * scale; occupied seats stay disabled (no press feedback), and all a11y —
 * label, selected/disabled state, status glyph — is preserved.
 */
function SeatButton({ seat, status, onSelect }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const [bg, fg, bd] = STATUS_SLOTS[status];
    const label = seat.label ?? seat.id;
    const disabled = status === 'occupied';
    const glyph = STATUS_GLYPH[status];
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Seat ${label}, ${status === 'selected' ? 'selected' : status}`, accessibilityState: { selected: status === 'selected', disabled }, disabled: disabled, onPress: disabled ? undefined : () => onSelect?.(seat), onPressIn: disabled ? undefined : press.onPressIn, onPressOut: disabled ? undefined : press.onPressOut, style: ({ pressed }) => ({
                width: 36,
                height: 36,
                borderRadius: tokens.radius.sm,
                borderWidth: 1,
                borderColor: colors[bd],
                backgroundColor: colors[bg],
                alignItems: 'center',
                justifyContent: 'center',
                opacity: disabled ? 0.6 : pressed ? 0.85 : 1,
            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: glyph || label }) }) }));
}
//# sourceMappingURL=SeatPicker.js.map