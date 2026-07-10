"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarGroup = AvatarGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("./Avatar");
const DIAMETER = { sm: 32, md: 40, lg: 56 };
const FONT = { sm: 'xs', md: 'sm', lg: 'lg' };
/**
 * Overlapping avatar stack with a +N overflow chip — the native mirror of the
 * web `AvatarGroup`. Each avatar carries a token-bound surface ring; overflow
 * collapses into a neutral +N chip. No literal colors.
 */
function AvatarGroup({ avatars, max = 4, size = 'md', style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const shown = avatars.slice(0, max);
    const extra = avatars.length - shown.length;
    const d = DIAMETER[size];
    const ring = { borderWidth: 2, borderColor: colors.surface, borderRadius: tokens.radius.full };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center' }, style], children: [shown.map((a, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ marginLeft: i === 0 ? 0 : -8 }, ring], children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: a.name, src: a.src, size: size }) }, i))), extra > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                    {
                        marginLeft: -8,
                        width: d,
                        height: d,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.border,
                    },
                    ring,
                ], children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale[FONT[size]], fontWeight: '500' }, children: ["+", extra] }) })) : null] }));
}
//# sourceMappingURL=AvatarGroup.js.map