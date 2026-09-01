"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailLabelChipV4 = MailLabelChipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const mail_v4_1 = require("./internal/mail-v4");
/**
 * How much tone the `soft` fill carries — the same 14% `BadgeV4` mixes, so a
 * mail label and a badge in one row read as one family.
 */
const SOFT_MIX = 0.14;
/**
 * Fold the three status tones to neutral, for the chip's *fills*.
 *
 * `labelInk` does this for ink and is the shared answer; the fill needs the
 * folded tone itself, and the module's internal exports one function rather
 * than the tone. Kept beside the call so the two cannot disagree.
 */
function identityTone(tone) {
    return tone === 'success' || tone === 'warn' || tone === 'danger' ? 'neutral' : tone;
}
/**
 * **V4 mail label chip** — same props as {@link MailLabelChip} plus
 * `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **A mail label is identity, not status.** `MailLabelTone` hands labels
 *    `success`, `warn` and `danger`, so a Gmail-style "Receipts" chip rendered
 *    in the error colour and was indistinguishable from a genuine failure in
 *    the same list. All three fold to neutral, through the module's shared
 *    `labelInk`; a label is told apart by its word and its glyph.
 * 2. **The remove control is a real target.** A `spacing.xs` gap around an
 *    `sm` glyph with `hitSlop={6}` is not 44, and on the web twin the `×` was
 *    a bare character with no box at all. It is `minTap` square now, and it is
 *    a **sibling** of the chip's own button rather than nested inside it —
 *    nesting made removing a label impossible without first filtering by it.
 * 3. **The fills are opaque and paired.** `withAlpha(accent, 0.16)` borrowed
 *    whatever was behind the chip, so the same label was a different colour on
 *    a card and on the page; `solid` now inks with the fill's guaranteed pair
 *    rather than falling through to `onSurface`.
 * 4. **Press is a state layer**, composited into the chip's own fill, instead
 *    of `opacity: 0.7` — which is close enough to M3's 0.38 disabled band that
 *    a pressed chip read as an unavailable one.
 */
function MailLabelChipV4({ label, tone = 'neutral', variant = 'soft', glyph, onRemove, onPress, removeLabel = (name) => `Remove label ${name}`, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!label)
        return null;
    const identity = identityTone(tone);
    const fill = (0, tone_v4_1.toneFill)(theme, identity);
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const ground = solid
        ? fill
        : outline
            ? colors.surface
            : (0, v4_depth_1.mixToken)(colors.surface, fill, SOFT_MIX);
    const ink = solid ? (0, mail_v4_1.onPair)(theme, identity) : (0, mail_v4_1.labelInk)(theme, tone);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [glyph ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "xs", style: { color: ink } }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numberOfLines: 1, style: { color: ink }, children: label })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                backgroundColor: ground,
                borderWidth: outline ? 1 : 0,
                // A border is a UI boundary judged at 3:1, not text — it keeps the
                // identity fill rather than the corrected ink.
                borderColor: outline ? fill : 'transparent',
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Label ${label}`, onPress: onPress, style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    minHeight: tap,
                    paddingHorizontal: tokens.spacing.xs,
                    marginHorizontal: -tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : 'transparent',
                }), children: content })) : (content), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: removeLabel(label), onPress: onRemove, style: ({ pressed }) => ({
                    width: tap,
                    height: tap,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Pulled back into the capsule so a 44 target does not stretch the
                    // chip sideways past the word it belongs to.
                    marginRight: -tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : 'transparent',
                }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u00D7", size: "sm", style: { color: ink } }) })) : null] }));
}
//# sourceMappingURL=MailLabelChipV4.js.map