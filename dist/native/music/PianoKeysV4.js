"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PianoKeysV4 = PianoKeysV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];
/**
 * PianoKeys — **V4** "session" design. The tactile take on an on-screen
 * keyboard: white keys read as satisfying `surface` controls on a rounded token
 * bed, black keys sit on a token-dark (`onSurface`) fill, and a held key lights
 * with a soft-primary tint **plus** a filled marker dot (never color alone) and
 * the a11y `selected` state. No gradient — performance surfaces stay clean and
 * tactile. Honors both `variant`s (`full` / `compact`), the `showLabels`,
 * `disabled`, black-vs-white layout and `onKeyPress(note)` behavior identical to
 * {@link PianoKeysProps}. Token-only colors via `useXenitionTheme()`.
 */
function PianoKeysV4({ startOctave = 4, octaves = 1, highlightedNotes, variant = 'full', showLabels, disabled = false, onKeyPress, style, }) {
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
            {
                height,
                flexDirection: 'row',
                position: 'relative',
                gap: 1,
                padding: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.border,
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: [whiteKeys.map((k) => {
                const active = held.has(k.note);
                return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Key ${k.note}`, accessibilityState: { selected: active, disabled }, disabled: disabled || !onKeyPress, onPress: () => pressKey(k.note), style: ({ pressed }) => ({
                        flex: 1,
                        height: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingBottom: tokens.spacing.sm,
                        borderWidth: 1,
                        borderColor: active ? colors.primary : colors.border,
                        borderTopLeftRadius: tokens.radius.sm,
                        borderTopRightRadius: tokens.radius.sm,
                        borderBottomLeftRadius: tokens.radius.md,
                        borderBottomRightRadius: tokens.radius.md,
                        backgroundColor: active
                            ? (0, types_1.withAlpha)(colors.primary, 0.2)
                            : pressed
                                ? (0, types_1.withAlpha)(colors.primary, 0.12)
                                : colors.surface,
                    }), children: [active ? (
                        // Non-color "held" affordance sitting on the key.
                        (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                top: tokens.spacing.sm,
                                width: 8,
                                height: 8,
                                borderRadius: tokens.radius.full,
                                backgroundColor: colors.primary,
                            } })) : null, labels ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: active ? colors.primary : colors.muted,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '700',
                            }, children: k.note })) : null] }, k.note));
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
                        top: tokens.spacing.xs,
                        left,
                        width: `${whiteW * 0.6}%`,
                        height: '60%',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 6,
                        borderWidth: 1,
                        borderColor: active ? colors.primary : colors.border,
                        borderTopLeftRadius: tokens.radius.sm,
                        borderTopRightRadius: tokens.radius.sm,
                        borderBottomLeftRadius: tokens.radius.md,
                        borderBottomRightRadius: tokens.radius.md,
                        backgroundColor: active
                            ? colors.primary
                            : pressed
                                ? (0, types_1.withAlpha)(colors.onSurface, 0.75)
                                : colors.onSurface,
                    }), children: active ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 8,
                            height: 8,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.onPrimary,
                        } })) : null }, note));
            })] }));
}
//# sourceMappingURL=PianoKeysV4.js.map