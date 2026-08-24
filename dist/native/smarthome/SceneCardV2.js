"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneCardV2 = SceneCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
/**
 * SceneCard — alternate design **V2**: a full-bleed tinted scene card with a big
 * background glyph. The whole surface is washed in a primary tint (via
 * `withAlpha`, never a literal), an oversized watermark glyph sits behind the
 * text, and the name + description + device count stack over it; the active
 * state raises the card, strengthens the tint/border, and shows an "Active"
 * {@link Badge} so running state is labeled, not color-only. Drop-in replacement
 * for `SceneCard` — same props. `deviceCount` is rendered defensively.
 */
function SceneCardV2({ name, icon = '✨', description, deviceCount, active = false, onActivate, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: active }, accessibilityLabel: `${name} scene${active ? ', active' : ''}`, onPress: onActivate, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    minHeight: 120,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.lg,
                    overflow: 'hidden',
                    justifyContent: 'flex-end',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, active ? 0.16 : 0.08),
                    borderWidth: 1,
                    borderColor: active ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.2),
                },
                active ? (0, elevation_1.shadow)('md', tokens) : null,
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: -12, right: -8, opacity: active ? 0.28 : 0.16 }, pointerEvents: "none", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: "primary", size: 104 }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginBottom: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flexShrink: 1,
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.xl,
                                fontFamily: tokens.typography.fontHeading,
                                fontWeight: '700',
                            }, children: name }), active ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: "Active" })) : null] }), description != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, count > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600', marginTop: 6 }, children: `${count} ${count === 1 ? 'device' : 'devices'}` })) : null] }) }));
}
//# sourceMappingURL=SceneCardV2.js.map