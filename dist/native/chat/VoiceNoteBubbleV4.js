"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceNoteBubbleV4 = VoiceNoteBubbleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ChatBubbleV4_1 = require("../primitives/ChatBubbleV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const color_1 = require("../primitives/internal/color");
const thread_v4_1 = require("./internal/thread-v4");
/** A default waveform, when the caller has no samples. Geometric. */
const DEFAULT_WAVE = [0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 0.4, 0.7, 0.35, 0.6, 0.45, 0.8];
/** How solid an unplayed bar sits against a played one. */
const UNPLAYED_ALPHA = 0.45;
/**
 * **V4 voice note bubble** — same props as {@link VoiceNoteBubble} plus
 * `playLabel`, `pauseLabel` and `formatPosition`.
 *
 * ## Four changes
 *
 * 1. **It reports its position.** The base painted the waveform with
 *    `progress` and announced only "Voice message, 0:42" — so a user could see
 *    how far through they were and a screen-reader user could not. The bubble
 *    is now a `progressbar` carrying elapsed and total, and the elapsed time
 *    is drawn beside the duration.
 * 2. **The transport clears 44.** It was a glyph with `hitSlop={8}` — under
 *    the minimum, on the only control in the component.
 * 3. **Unplayed bars are a translucent wash of the *same* ink**, not
 *    `opacity: 0.4` on the element — 0.38 is the band that means disabled, and
 *    an unplayed second is not disabled.
 * 4. **The waveform is hidden from the reader.** Twelve unlabelled bars are
 *    twelve stops on a swipe-through; the bubble's own value carries the
 *    information.
 */
function VoiceNoteBubbleV4({ side = 'them', durationSec, playing = false, progress = 0, waveform, meta, playLabel = 'Play', pauseLabel = 'Pause', formatPosition, onPlayToggle, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const me = side === 'me';
    const ink = me ? colors.onPrimary : colors.onCard;
    const bars = waveform && waveform.length > 0 ? waveform : DEFAULT_WAVE;
    const clamped = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));
    const total = (0, thread_v4_1.clock)(durationSec);
    const elapsed = (0, thread_v4_1.clock)(durationSec * clamped);
    const position = (formatPosition ?? ((e, t) => `${e} of ${t}`))(elapsed, total);
    const height = tokens.spacing.lg;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    return ((0, jsx_runtime_1.jsx)(ChatBubbleV4_1.ChatBubbleV4, { side: side, meta: meta, style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: Math.round(clamped * 100) }, accessibilityLabel: `Voice message, ${position}`, style: {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                minWidth: tokens.spacing['2xl'] * 3,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: playing }, accessibilityLabel: playing ? pauseLabel : playLabel, onPress: onPlayToggle, style: {
                        width: tap,
                        height: tap,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                    }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: playing ? '⏸' : '▶', size: "lg", style: { color: ink } }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs / 2,
                        flex: 1,
                        height,
                    }, children: bars.map((h, i) => {
                        const played = i / bars.length <= clamped;
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                flex: 1,
                                height: Math.max(tokens.spacing.xs / 2, h * height),
                                borderRadius: tokens.radius.full,
                                // A wash of the same ink, not an opacity on the element:
                                // 0.38 is the band that means *disabled*, and an unplayed
                                // second is not disabled.
                                backgroundColor: played ? ink : (0, color_1.withAlpha)(ink, UNPLAYED_ALPHA),
                            } }, i));
                    }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", numeric: "tabular", style: { color: ink }, children: clamped > 0 ? `${elapsed} / ${total}` : total })] }) }));
}
//# sourceMappingURL=VoiceNoteBubbleV4.js.map