"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceToggleRow = DeviceToggleRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A compact list row with a trailing on/off {@link Switch} — the building block
 * of {@link RoomGroup}. Renders a glyph, label, and optional subtitle; when
 * `offline` the switch is disabled and the subtitle is replaced by a muted
 * "Offline" note so unreachability is textual, not color-only. A hairline
 * `border` divider separates rows unless `last`. Token-bound throughout.
 */
function DeviceToggleRow({ label, icon, subtitle, checked = false, offline = false, onCheckedChange, last = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const secondary = offline ? 'Offline' : subtitle;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: colors.border,
                opacity: offline ? 0.7 : 1,
            },
            style,
        ], children: [icon != null ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: checked && !offline ? 'primary' : 'muted', size: "lg" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: label }), secondary != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: secondary })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: checked, disabled: offline, onCheckedChange: onCheckedChange, accessibilityLabel: label })] }));
}
//# sourceMappingURL=DeviceToggleRow.js.map