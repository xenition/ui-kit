"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestCardV4 = QuestCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
const STATE_LABEL = {
    locked: 'Locked',
    active: 'In progress',
    completed: 'Ready to claim',
    claimed: 'Claimed',
};
/**
 * A quest's lifecycle is a status, so it may hold status tones — but only
 * where the tone means what it says. `completed` was `warn`, which is the tone
 * this kit spends on "something needs your attention *and it is not good*";
 * a finished quest waiting to be collected is the actionable one, so it takes
 * the emphasis slot instead and `warn` goes back to meaning warn.
 */
const STATE_TONE = {
    locked: arcade_v4_1.IDENTITY_TONE,
    active: arcade_v4_1.IDENTITY_TONE,
    completed: 'primary',
    claimed: 'success',
};
/**
 * **V4 quest card** — same props as {@link QuestCard} plus `stateLabels` and
 * `rewardLabel`.
 *
 * ## Six changes
 *
 * 1. **The step bar cannot disagree with itself.** The base clamped the drawn
 *    fill and handed `Progress` a raw `goal`, so out-of-range input drew one
 *    fraction and announced another, and a `goal` of 0 produced an invalid
 *    range. `questParts()` reads both from one place.
 * 2. **The bar is a named `progressbar` outside the card's spoken name**, so
 *    the reader can reach the value at all — the base's meter carried no label
 *    and sat under a plain caption.
 * 3. **A locked quest is not dimmed to 0.6.** That is inside M3's disabled
 *    band, so a quest the user simply has not unlocked yet looked like a
 *    broken control, and the whole card — title, objective, reward — lost
 *    contrast with it. The padlock and the "Locked" badge carry the state, in
 *    words, at full strength.
 * 4. **The reward medal and the status badge stop being announced
 *    decorations.** The medal was a focus stop that said "Reward" and nothing
 *    else; the reward, the state and the objective are now part of the card's
 *    one name, and the glyphs are drawn.
 * 5. **A reward is identity, not a warning.** The medal was `warn` and the
 *    `In progress` badge was `primary`; every user-visible string in the card
 *    is now a prop.
 * 6. **Claim drops `tone="success"`.** The native base drew it green and the
 *    web base drew it plain — the third instance of this module's
 *    emphasis drift, beside `MatchmakingStatus`'s Accept and Cancel. Claiming
 *    is the card's *primary* action, not an announcement that something
 *    succeeded, so it is `primary` alone on both twins. The progress fill
 *    keeps `success` at completion: that is a meter reporting a state, not a
 *    control advertising one.
 */
function QuestCardV4({ quest, state, claiming = false, stateLabels, rewardLabel = 'Reward', onClaim, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const parts = (0, arcade_v4_1.questParts)(quest.progress, quest.goal);
    const derived = state ?? (parts.complete ? 'completed' : 'active');
    const locked = derived === 'locked';
    const claimed = derived === 'claimed';
    const claimable = derived === 'completed';
    const statusText = stateLabels?.[derived] ?? STATE_LABEL[derived];
    const stepLine = `${parts.value} / ${parts.goal}`;
    const name = (0, arcade_v4_1.spokenLine)([
        quest.title,
        quest.description,
        statusText,
        quest.reward ? `${rewardLabel}, ${quest.reward}` : null,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", tone: locked ? 'mutedText' : 'onCard', children: locked ? '🔒' : '⚔️' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 2, children: quest.title }), quest.description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 2, children: quest.description })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: STATE_TONE[derived], children: statusText })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: stepLine, accessibilityValue: { min: 0, max: parts.goal, now: parts.value }, style: {
                            height: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, arcade_v4_1.placeholderGround)(theme),
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: `${Math.round(parts.ratio * 100)}%`,
                                height: '100%',
                                backgroundColor: (0, arcade_v4_1.toneFill)(theme, claimable || claimed ? 'success' : 'primary'),
                            } }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", size: "xs", tone: "mutedText", numeric: "tabular", children: stepLine })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [quest.reward ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: "\uD83C\uDFC5" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", children: quest.reward })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onClaim ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: claimable ? 'primary' : 'secondary', size: "sm", loading: claiming, disabled: !claimable, onPress: () => onClaim(quest), accessibilityLabel: (0, arcade_v4_1.spokenLine)([
                            claimed ? statusText : 'Claim',
                            rewardLabel,
                            quest.title,
                        ]), style: { minHeight: tap }, children: claimed ? statusText : 'Claim' })) : null] })] }));
}
//# sourceMappingURL=QuestCardV4.js.map