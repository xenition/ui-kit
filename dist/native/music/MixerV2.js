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
exports.MixerV2 = MixerV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * Mixer, redesigned (v2): a **console of vertical channel strips** in a
 * horizontal scroller. Each strip stacks the channel name, an output meter and
 * a floor-to-top **vertical fader**, then mute / solo pills below. The fader is
 * an `adjustable` track dragged along its height; mute / solo surface in the
 * control's a11y `selected` state and caption, never by color alone. Renders an
 * `EmptyState` when there are no channels. Composes `Card`; token-only tints.
 * Distinct at a glance from v1's stacked horizontal rows. Same props.
 */
function MixerV2({ channels, variant = 'full', title, emptyLabel = 'No channels', onVolumeChange, onToggleMute, onToggleSolo, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (channels.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF9A\uFE0F", size: "3xl", color: "muted", accessibilityLabel: "Mixer" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.md }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: title })) : null, (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm }, children: channels.map((ch) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        width: 76,
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.xs,
                        borderRadius: tokens.radius.md,
                        borderWidth: 1,
                        borderColor: colors.border,
                        backgroundColor: (0, types_1.withAlpha)(colors.onSurface, 0.03),
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: ch.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: 6, alignItems: 'stretch', height: 132 }, children: [variant === 'full' ? (0, jsx_runtime_1.jsx)(VerticalMeter, { level: ch.level, muted: ch.muted }) : null, (0, jsx_runtime_1.jsx)(VerticalFader, { name: ch.name, value: ch.volume, muted: ch.muted, onValueChange: (v) => onVolumeChange?.(ch, v) })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: Math.round((0, types_1.clamp)(ch.volume, 0, 100)) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(StripPill, { label: "M", a11y: `${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`, active: ch.muted === true, tone: colors.warn, onPress: () => onToggleMute?.(ch) }), variant === 'full' ? ((0, jsx_runtime_1.jsx)(StripPill, { label: "S", a11y: `${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`, active: ch.soloed === true, tone: colors.primary, onPress: () => onToggleSolo?.(ch) })) : null] })] }, ch.id))) })] }));
}
/** A floor-to-top fader track dragged along its height; reports [0,100]. */
function VerticalFader({ name, value, muted, onValueChange, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const heightRef = React.useRef(0);
    const safe = (0, types_1.clamp)(value, 0, 100);
    const updateRef = React.useRef(() => undefined);
    updateRef.current = (y) => {
        const h = heightRef.current;
        if (h <= 0)
            return;
        // Top of the track = max, bottom = min.
        const ratio = Math.max(0, Math.min(1, 1 - y / h));
        onValueChange?.(Math.round(ratio * 100));
    };
    const responder = React.useMemo(() => react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => updateRef.current(e.nativeEvent.locationY),
        onPanResponderMove: (e) => updateRef.current(e.nativeEvent.locationY),
    }), []);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { ...responder.panHandlers, accessibilityRole: "adjustable", accessibilityLabel: `${name} fader${muted ? ', muted' : ''}`, accessibilityValue: { min: 0, max: 100, now: Math.round(safe) }, onLayout: (e) => {
            heightRef.current = e.nativeEvent.layout.height;
        }, style: {
            width: 14,
            justifyContent: 'flex-end',
            borderRadius: tokens.radius.full,
            backgroundColor: colors.border,
            overflow: 'hidden',
            opacity: muted ? 0.5 : 1,
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                height: `${safe}%`,
                width: '100%',
                borderRadius: tokens.radius.full,
                backgroundColor: colors.primary,
            } }) }));
}
/** A slim bottom-anchored output meter; tone steps by level, muted → empty. */
function VerticalMeter({ level, muted }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const pct = muted ? 0 : (0, types_1.clamp)((level ?? 0) * 100, 0, 100);
    const tone = pct > 85 ? colors.danger : pct > 60 ? colors.warn : colors.success;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Output level ${Math.round(pct)} percent`, style: {
            width: 6,
            justifyContent: 'flex-end',
            borderRadius: tokens.radius.full,
            backgroundColor: colors.border,
            overflow: 'hidden',
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: `${pct}%`, width: '100%', backgroundColor: tone } }) }));
}
function StripPill({ label, a11y, active, tone, onPress, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { selected: active }, onPress: onPress, style: ({ pressed }) => ({
            width: 26,
            paddingVertical: 3,
            alignItems: 'center',
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: active ? tone : colors.border,
            backgroundColor: active ? (0, types_1.withAlpha)(tone, 0.2) : 'transparent',
            opacity: pressed ? 0.8 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? tone : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: label }) }));
}
//# sourceMappingURL=MixerV2.js.map