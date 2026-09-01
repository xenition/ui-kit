"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpNext = UpNext;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const types_1 = require("./types");
/**
 * UpNext — **V4** "spotlight" design. A compact "playing next" queue preview: a
 * clean elevated card listing the next few tracks (small artwork thumb +
 * title/artist, with the duration via {@link formatTime}), each row tappable to
 * jump ahead. The header carries the label and an optional Clear affordance. The
 * surface stays clean — the V4 gradient is reserved for the immersive/artwork
 * moments. Presentational only; token-only colors via `useXenitionTheme()`
 * (no literal hex). Dark-mode safe.
 */
function UpNext({ tracks, title = 'Up next', onSelect, onClear, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const thumb = 44;
    if (tracks.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '700',
                            letterSpacing: 0.5,
                            textTransform: 'uppercase',
                        }, children: title }), onClear ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Clear up next", onPress: onClear, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Clear" }) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: tracks.map((track) => {
                    const interactive = !!onSelect;
                    const label = track.artist ? `${track.title} — ${track.artist}` : track.title;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: interactive ? 'button' : undefined, accessibilityLabel: label, disabled: !interactive, onPress: interactive ? () => onSelect(track.id) : undefined, style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                            minHeight: 44,
                            borderRadius: tokens.radius.md,
                            padding: tokens.spacing.xs,
                            backgroundColor: interactive && pressed ? (0, color_1.withAlpha)(colors.primary, 0.12) : 'transparent',
                        }), children: [track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: thumb, height: thumb, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: thumb,
                                    height: thumb,
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: colors.accent,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "sm", color: "onPrimary" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: track.artist })) : null] }), track.duration != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(track.duration) })) : null] }, track.id));
                }) })] }));
}
//# sourceMappingURL=UpNext.js.map