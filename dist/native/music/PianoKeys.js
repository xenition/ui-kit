"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PianoKeys = PianoKeys;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];
/**
 * An on-screen keyboard — one or more octaves of piano keys, a UI shell only
 * (it makes no sound). White keys lay out in a row with the black keys
 * overlaid at the correct positions; `highlightedNotes` lights held keys via a
 * tint **and** a filled marker (never color alone) plus the a11y `selected`
 * state. Pressing a key fires `onKeyPress(note)` with a name like `'C#4'`.
 * Token-only styling.
 */
function PianoKeys({ startOctave = 4, octaves = 1, highlightedNotes, variant = 'full', showLabels, disabled = false, onKeyPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
    const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
    const held = new Set(highlightedNotes ?? []);
    const labels = showLabels ?? variant === 'full';
    const height = variant === 'compact' ? 96 : 140;
    // Flatten white keys across the requested octaves, preserving order.
    const whiteKeys = [];
    for (let o = 0; o < count; o += 1) {
        WHITE.forEach((chroma) => {
            whiteKeys.push({ note: `${types_1.NOTE_NAMES[chroma]}${base + o}`, chroma, octave: base + o });
        });
    }
    const whiteCount = Math.max(1, whiteKeys.length);
    const whiteW = 100 / whiteCount;
    const pressKey = (note) => {
        if (disabled)
            return;
        onKeyPress?.(note);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { height, flexDirection: 'row', position: 'relative', opacity: disabled ? 0.5 : 1 },
            style,
        ], children: [whiteKeys.map((k) => {
                const active = held.has(k.note);
                return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Key ${k.note}`, accessibilityState: { selected: active, disabled }, disabled: disabled || !onKeyPress, onPress: () => pressKey(k.note), style: ({ pressed }) => ({
                        flex: 1,
                        height: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingBottom: tokens.spacing.xs,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: tokens.radius.sm,
                        borderBottomRightRadius: tokens.radius.sm,
                        backgroundColor: active
                            ? (0, types_1.withAlpha)(colors.primary, 0.22)
                            : pressed
                                ? (0, types_1.withAlpha)(colors.primary, 0.12)
                                : colors.surface,
                    }), children: [active ? (
                        // Non-color "held" affordance sitting on the key.
                        (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                top: tokens.spacing.xs,
                                width: 7,
                                height: 7,
                                borderRadius: tokens.radius.full,
                                backgroundColor: colors.primary,
                            } })) : null, labels ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: k.note })) : null] }, k.note));
            }), whiteKeys.map((k, wi) => {
                // A black key follows this white key unless the next pitch is white.
                const nextChroma = (k.chroma + 1) % 12;
                if (!(0, types_1.isBlackKey)(nextChroma))
                    return null;
                const note = `${types_1.NOTE_NAMES[nextChroma]}${k.octave}`;
                const active = held.has(note);
                // Center the black key on the boundary between this white key and next.
                const left = `${(wi + 1) * whiteW - whiteW * 0.3}%`;
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Key ${note}`, accessibilityState: { selected: active, disabled }, disabled: disabled || !onKeyPress, onPress: () => pressKey(note), style: ({ pressed }) => ({
                        position: 'absolute',
                        top: 0,
                        left,
                        width: `${whiteW * 0.6}%`,
                        height: '62%',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 4,
                        borderBottomLeftRadius: tokens.radius.sm,
                        borderBottomRightRadius: tokens.radius.sm,
                        backgroundColor: active
                            ? colors.primary
                            : pressed
                                ? (0, types_1.withAlpha)(colors.onSurface, 0.75)
                                : colors.onSurface,
                    }), children: active ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 6,
                            height: 6,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.onPrimary,
                        } })) : null }, note));
            })] }));
}
//# sourceMappingURL=PianoKeys.js.map