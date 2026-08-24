"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PianoKeysV2 = PianoKeysV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const types_1 = require("./types");
/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];
/**
 * PianoKeys, redesigned (v2): a **large keyboard with raised keys and labels**.
 * Tall white keys sit under overlaid black keys that read as physically raised
 * (drop shadow + a lit top edge), and every white key carries its note label.
 * A held key (`highlightedNotes`) tints **and** drops a filled marker plus the
 * a11y `selected` state — never color alone. Pressing fires `onKeyPress(note)`.
 * Token-only styling. Distinct at a glance from v1's flatter octave. Same props.
 */
function PianoKeysV2({ startOctave = 4, octaves = 1, highlightedNotes, variant = 'full', showLabels, disabled = false, onKeyPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
    const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
    const held = new Set(highlightedNotes ?? []);
    const labels = showLabels ?? true;
    const height = variant === 'compact' ? 132 : 184;
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
                padding: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                backgroundColor: (0, types_1.withAlpha)(colors.onSurface, 0.06),
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
                        marginHorizontal: 1,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderBottomLeftRadius: tokens.radius.md,
                        borderBottomRightRadius: tokens.radius.md,
                        backgroundColor: active
                            ? (0, types_1.withAlpha)(colors.primary, 0.24)
                            : pressed
                                ? (0, types_1.withAlpha)(colors.primary, 0.12)
                                : colors.surface,
                        ...(0, elevation_1.shadow)('sm', tokens),
                    }), children: [active ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                top: tokens.spacing.sm,
                                width: 10,
                                height: 10,
                                borderRadius: tokens.radius.full,
                                backgroundColor: colors.primary,
                            } })) : null, labels ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: k.note })) : null] }, k.note));
            }), whiteKeys.map((k, wi) => {
                const nextChroma = (k.chroma + 1) % 12;
                if (!(0, types_1.isBlackKey)(nextChroma))
                    return null;
                const note = `${types_1.NOTE_NAMES[nextChroma]}${k.octave}`;
                const active = held.has(note);
                const left = `${(wi + 1) * whiteW - whiteW * 0.32}%`;
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Key ${note}`, accessibilityState: { selected: active, disabled }, disabled: disabled || !onKeyPress, onPress: () => pressKey(note), style: ({ pressed }) => ({
                        position: 'absolute',
                        top: tokens.spacing.xs,
                        left,
                        width: `${whiteW * 0.64}%`,
                        height: '60%',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 6,
                        // Lit top edge reads as a raised bevel.
                        borderTopWidth: 2,
                        borderTopColor: (0, types_1.withAlpha)(colors.surface, 0.4),
                        borderBottomLeftRadius: tokens.radius.md,
                        borderBottomRightRadius: tokens.radius.md,
                        backgroundColor: active
                            ? colors.primary
                            : pressed
                                ? (0, types_1.withAlpha)(colors.onSurface, 0.72)
                                : colors.onSurface,
                        ...(0, elevation_1.shadow)('md', tokens),
                    }), children: active ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 8,
                            height: 8,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.onPrimary,
                        } })) : null }, note));
            })] }));
}
//# sourceMappingURL=PianoKeysV2.js.map