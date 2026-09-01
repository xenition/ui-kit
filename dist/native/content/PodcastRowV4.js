"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastRowV4 = PodcastRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 podcast row** — same props as {@link PodcastRow} plus `playLabel` and
 * `pauseLabel`.
 *
 * ## Five changes
 *
 * 1. **The keyboard can play a podcast.** The row's activation used to *wrap*
 *    the play button. On the web that meant the container's `onKeyDown` fired
 *    first: Space cancelled the button's own activation and navigated instead,
 *    Enter did both, and the click path was guarded while the keyboard path
 *    was not — so there was no keyboard-only way to play an episode from a
 *    podcast row. Here the same nesting made the play control unreachable to
 *    VoiceOver as an element of its own. The row's activation now sits on a
 *    control that covers only the artwork and the text, and the play button is
 *    its **sibling**. One change, three defects.
 * 2. **No dead play button.** `onPlayToggle` is optional; without it the
 *    control is not rendered, rather than rendered permanently greyed.
 * 3. **The play control clears 44.** It was 40 square with hit slop over it.
 * 4. **Press is a state layer.** The row carried three different opacity dims
 *    — 0.9 for the row, 0.7 for the button, 0.5 for its disabled state — and
 *    the last two are inside M3's disabled band.
 * 5. **The artwork placeholder takes the shared media ground**, not the
 *    hairline token, and no longer floods a missing cover in brand accent.
 *
 * **Renders nothing without an episode title** (§4.5).
 */
function PodcastRowV4({ episode, playing = false, onPlayToggle, onPress, variant = 'standard', playLabel = 'Play', pauseLabel = 'Pause', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!episode?.title)
        return null;
    const compact = variant === 'compact';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const art = compact ? tap : tokens.spacing['2xl'] + tokens.spacing.md;
    const meta = (0, reading_v4_1.metaLine)([episode.show, episode.duration]);
    const region = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }, children: [episode.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: episode.artworkUrl }, accessibilityIgnoresInvertColors: true, style: {
                    width: art,
                    height: art,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, reading_v4_1.mediaGround)(theme),
                }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: art,
                    height: art,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, reading_v4_1.mediaGround)(theme),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDFA7", size: "lg", color: "onCard" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: compact ? 1 : 2, children: episode.title }), !compact && meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: meta })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.sm,
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: episode.title, onPress: () => onPress(episode), style: { flex: 1 }, children: ({ pressed }) => region(pressed) })) : (region(false)), onPlayToggle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${playing ? pauseLabel : playLabel} ${episode.title}`, accessibilityState: { selected: playing }, onPress: () => onPlayToggle(!playing), style: ({ pressed }) => ({
                    width: tap,
                    height: tap,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: pressed
                        ? (0, state_v4_1.pressOver)(theme, colors.primary, colors.onPrimary)
                        : colors.primary,
                }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: playing ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) })) : null] }));
}
//# sourceMappingURL=PodcastRowV4.js.map