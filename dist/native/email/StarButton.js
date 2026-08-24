"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarButton = StarButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A star / flag toggle for a mail item. Filled (warn accent) when `starred`,
 * hollow + muted otherwise. Exposes a `button` role whose label announces the
 * state in words ("Starred" / "Not starred") so the toggle is never conveyed by
 * color alone. Controlled via `starred` / `onToggle`. No literal colors.
 */
function StarButton({ starred = false, onToggle, size = 'lg', disabled = false, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: starred ? 'Starred' : 'Not starred', accessibilityState: { selected: starred, disabled }, disabled: disabled, onPress: () => onToggle?.(!starred), hitSlop: 8, style: ({ pressed }) => [
            { padding: tokens.spacing.xs, opacity: disabled ? 0.5 : pressed ? 0.6 : 1 },
            style,
        ], children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: starred ? '★' : '☆', size: size, color: starred ? 'warn' : 'muted' }) }));
}
//# sourceMappingURL=StarButton.js.map