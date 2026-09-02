"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorBadgeV4 = BehaviorBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** The glyph and the arithmetic sign each tone carries. No colour in this table. */
const TONE_MARK = {
    positive: { glyph: '👍', sign: '+' },
    negative: { glyph: '👎', sign: '−' },
    neutral: { glyph: '•', sign: '' },
};
/** The word each tone is spoken with. Overridable through `toneLabels`. */
const TONE_LABEL = {
    positive: 'Went well',
    negative: 'Needs a chat',
    neutral: 'Noted',
};
/**
 * **V4 behaviour badge** — same props as {@link BehaviorBadge} plus `note`,
 * `toneLabels`, `size` and a `style` surface.
 *
 * ## Four changes
 *
 * 1. **A child's conduct is no longer drawn in the error colour.** The base
 *    mapped `negative → danger`, so
 *    `<BehaviorBadge tone="negative" label="Interrupted" points={2} />` put a
 *    red chip with a 👎 and "(−2)" against a six-year-old's name. `danger`
 *    means *something has gone wrong with the system*; spending it on a child
 *    is both a status-colour-on-identity violation and a shaming pattern. All
 *    three tones now wear the same neutral chip, and the tone is carried by a
 *    glyph, a word and the sign on the points — which is also the only version
 *    of this that survives greyscale, colour blindness and a screen reader.
 *    `positive` is not given `success` either: colour-grading a child's
 *    behaviour at all is the pattern, not the particular hue.
 * 2. **The spoken string stops labelling the child.** It read
 *    `"negative behavior: Interrupted (−2)"`. It now reads
 *    `"Interrupted, Needs a chat, −2"` — the event, then a neutral verdict —
 *    and every word of it is a prop.
 * 3. **A `note` can explain instead of the chip judging.** A behaviour log
 *    entry with a reason attached is a conversation; one without is a verdict.
 * 4. **The chip can be positioned.** Its props interface extended nothing, so
 *    a caller could not give it a margin or align it — it is the only
 *    component in the module with no `style` surface at all. It also picks up
 *    a real 44 tap target when it is pressable, and a state layer instead of
 *    `opacity: pressed ? 0.7 : 1` — an opacity inside M3's *disabled* band.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
function BehaviorBadgeV4({ label, tone = 'neutral', points, icon, size = 'md', note, toneLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!label)
        return null;
    const mark = TONE_MARK[tone] ?? TONE_MARK.neutral;
    const glyph = icon ?? mark.glyph;
    const word = toneLabels?.[tone] ?? TONE_LABEL[tone];
    const pointsText = typeof points === 'number' && Number.isFinite(points)
        ? `${mark.sign}${Math.abs(points)}`
        : null;
    const name = (0, tone_v4_1.spokenLine)([label, word, pointsText, note]);
    const chip = ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: tone_v4_1.IDENTITY_TONE, variant: "soft", size: size, children: [glyph, label, pointsText ? `(${pointsText})` : null].filter(Boolean).join(' ') }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'flex-start', gap: tokens.spacing.xs }, children: [chip, note ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: note })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: [{ alignSelf: 'flex-start' }, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: ({ pressed }) => [
            (0, tone_v4_1.tapTargetStyle)(theme),
            {
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                paddingHorizontal: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
            },
            style,
        ], children: body }));
}
//# sourceMappingURL=BehaviorBadgeV4.js.map