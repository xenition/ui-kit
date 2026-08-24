"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceDot = PresenceDot;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** Maps a presence state to its semantic color slot. */
const TONE = {
    online: 'success',
    away: 'warn',
    busy: 'danger',
    offline: 'muted',
};
const DEFAULT_LABEL = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    offline: 'Offline',
};
/**
 * Small presence indicator for avatars and headers. Online pulses (reusing the
 * primitive `StatusDot` echo); the other states render a solid token-colored
 * dot. A `ring` in the surface color separates it from a busy avatar. No literal
 * colors — every color traces to a semantic token.
 */
function PresenceDot({ status = 'offline', size = 10, ring = true, label, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const tone = TONE[status];
    const a11yLabel = label ?? DEFAULT_LABEL[status];
    const decorative = a11yLabel === '';
    const ringPad = ring ? 2 : 0;
    const outer = size + ringPad * 2;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: !decorative, accessibilityRole: decorative ? undefined : 'image', accessibilityLabel: decorative ? undefined : a11yLabel, importantForAccessibility: decorative ? 'no-hide-descendants' : 'yes', style: [
            {
                width: outer,
                height: outer,
                borderRadius: outer / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ring ? colors.surface : 'transparent',
            },
            style,
        ], children: status === 'online' ? ((0, jsx_runtime_1.jsx)(primitives_1.StatusDot, { tone: "success", size: size, pulse: true })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: colors[tone],
            } })) }));
}
//# sourceMappingURL=PresenceDot.js.map