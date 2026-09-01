"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceToggleRowV4 = DeviceToggleRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * DeviceToggleRow — **V4** "ambient" design. The control-panel take on a list
 * row: a **leading glyph glows** in a soft primary-tinted disc when the device
 * is `on`, and the whole row takes a gentle primary wash so an active device
 * reads at a glance; `off`/`offline` stay calm on `surface`. The name + subtitle
 * sit beside a trailing on/off {@link Switch}; when `offline` the switch is
 * disabled and the subtitle is replaced by a muted "Offline" note so
 * unreachability is textual, not color-only. Rows are ≥44px tall for comfortable
 * touch. Same props/behavior as {@link DeviceToggleRowProps} (both
 * `onCheckedChange`/`onChange` spellings, `last` divider); token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
function DeviceToggleRowV4({ label, icon, subtitle, checked = false, offline = false, onCheckedChange, onChange, last = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const secondary = offline ? 'Offline' : subtitle;
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;
    const isOn = checked && !offline;
    const accent = colors.primary;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                minHeight: 44,
                borderRadius: tokens.radius.md,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                backgroundColor: isOn ? (0, color_1.withAlpha)(accent, 0.08) : colors.surface,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: colors.border,
                opacity: offline ? 0.7 : 1,
            },
            style,
        ], children: [icon != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isOn ? (0, color_1.withAlpha)(accent, 0.16) : (0, color_1.withAlpha)(colors.onSurface, 0.05),
                    borderWidth: 1,
                    borderColor: isOn ? (0, color_1.withAlpha)(accent, 0.4) : colors.border,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: isOn ? 'primary' : 'muted', size: "lg" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: label }), secondary != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: secondary })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: checked, disabled: offline, onCheckedChange: emit, accessibilityLabel: label })] }));
}
//# sourceMappingURL=DeviceToggleRowV4.js.map