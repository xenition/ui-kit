"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingStatusV4 = MatchmakingStatusV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const arcade_v4_1 = require("./internal/arcade-v4");
const types_1 = require("./types");
const PHASE_TITLE = {
    idle: 'Ready to queue',
    searching: 'Finding a match…',
    found: 'Match found!',
    failed: 'Matchmaking failed',
};
const PHASE_GLYPH = {
    idle: '🎯',
    searching: '🔎',
    found: '✅',
    failed: '⚠️',
};
/**
 * **V4 matchmaking status** — same props as {@link MatchmakingStatus} plus
 * `phaseLabels`.
 *
 * ## Four changes
 *
 * 1. **Accept, Retry and Cancel can be reached.** The base declared the root
 *    `Card` `accessible accessibilityRole="summary"` so the phase, the timer
 *    and the slot count would read as one sentence — and `accessible` on a
 *    React Native container collapses everything beneath it into a single
 *    element. Beneath it were the component's only three controls. A VoiceOver
 *    user in a queue heard "Match found!, 10 / 10 players" and then could not
 *    swipe to Accept; `onAccept` is wired to nothing else, so there was no
 *    gesture in the component that accepted a match. The summary now sits on
 *    the text block, which contains no controls, and each button is its own
 *    focus stop.
 * 2. **A phase change is announced.** Nothing told the user the match had been
 *    found — they had to happen to be re-reading the panel at the moment it
 *    flipped. The summary is a live region: `assertive` on `found`, because
 *    the accept window expires while the user is not looking, and `polite`
 *    everywhere else. Announcing every phase at `assertive` is how a user
 *    learns to ignore the panel.
 * 3. **The slot readout goes through `slotParts()`**, so a `needed` of 0 is an
 *    unknown lobby rather than a full one, and the panel and a `LobbyRow` read
 *    the same numbers the same way.
 * 4. **Accept and Cancel carry the emphasis they mean, on both twins.** This
 *    twin drew Accept as `tone="success"` and Cancel as `tone="danger"` where
 *    web drew both plain, so the same two buttons were green and red here and
 *    neutral there. Neither is a status: accepting is the panel's *primary*
 *    action, not an announcement that something succeeded, and leaving a queue
 *    is a retreat, not an error. Accept is `primary` alone and Cancel is an
 *    outline. The spinner disc is hidden from the reader (it repeats the
 *    headline), and the press feedback comes from `ButtonV4`'s own state layer
 *    rather than an opacity.
 */
function MatchmakingStatusV4({ phase, elapsedSeconds, found, needed, queueLabel, phaseLabels, onCancel, onAccept, onRetry, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const searching = phase === 'searching';
    const title = phaseLabels?.[phase] ?? PHASE_TITLE[phase];
    const slots = (0, arcade_v4_1.slotParts)(found ?? 0, needed ?? 0);
    const slotLine = slots.capacity > 0 ? `${slots.filled} / ${slots.capacity} players` : null;
    const elapsed = searching && elapsedSeconds != null ? (0, types_1.formatElapsed)(elapsedSeconds) : null;
    // `found` and `failed` are genuine statuses, so they may spend a status
    // colour; the ring is a boundary, judged at 3:1, not text.
    const accent = phase === 'found' ? colors.success : phase === 'failed' ? colors.danger : colors.primary;
    const disc = tokens.spacing['2xl'] + tokens.spacing.md;
    const name = (0, arcade_v4_1.spokenLine)([title, queueLabel, elapsed ? `${elapsed} elapsed` : null, slotLine]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.md,
                alignItems: 'center',
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: disc,
                    height: disc,
                    borderRadius: disc / 2,
                    borderWidth: 2,
                    borderColor: accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: searching ? ((0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { color: accent })) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: PHASE_GLYPH[phase], size: "2xl", color: "onCard" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: name, accessibilityLiveRegion: phase === 'found' ? 'assertive' : 'polite', style: { alignItems: 'center', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", align: "center", children: title }), queueLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: queueLabel })) : null, elapsed || slotLine ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            gap: tokens.spacing.md,
                            marginTop: tokens.spacing.xs / 2,
                        }, children: [elapsed ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", numeric: "tabular", children: elapsed })) : null, slotLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", numeric: "tabular", children: slotLine })) : null] })) : null] }), phase === 'found' && onAccept ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onPress: onAccept, accessibilityLabel: "Accept match", style: { alignSelf: 'stretch' }, children: "Accept" })) : null, phase === 'failed' && onRetry ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onPress: onRetry, accessibilityLabel: "Retry matchmaking", style: { alignSelf: 'stretch' }, children: "Retry" })) : null, searching && onCancel ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "md", onPress: onCancel, accessibilityLabel: "Cancel search", style: { alignSelf: 'stretch' }, children: "Cancel" })) : null] }));
}
//# sourceMappingURL=MatchmakingStatusV4.js.map