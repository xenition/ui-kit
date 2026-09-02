"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCardV4 = JobCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const types_1 = require("./types");
const SalaryRangeV4_1 = require("./SalaryRangeV4");
const SkillTagV4_1 = require("./SkillTagV4");
const ApplyButtonV4_1 = require("./ApplyButtonV4");
const tone_v4_1 = require("./internal/tone-v4");
/** Announced while the placeholders are up. */
const LOADING = 'Loading job';
/**
 * **V4 job card** — same props as {@link JobCard} plus `saveLabel`,
 * `savedLabel`, `formatRelative` and `overflowLabel`.
 *
 * ## Six changes
 *
 * 1. **The save star is reachable.** The base nested it inside the card's own
 *    `Pressable`, which is `accessible` by default and flattens everything
 *    under it — so on native the star was not a focus stop at all, and a
 *    VoiceOver user could not save a job. (Its web twin fails differently and
 *    worse: Enter on the star bubbles to the card's keydown handler, which
 *    cancels the star's own activation and opens the detail view instead, so
 *    the keyboard user saves nothing and navigates away.) The fix is
 *    structural: the card is a plain `View`, the activation wraps only the
 *    media-and-text region and carries the card's spoken name, and the star
 *    sits **beside** it with a name and a 44 target of its own.
 * 2. **Employment type stopped wearing a status colour.** `contract → warn`
 *    and `remote → success` spent the two colours that mean "caution" and
 *    "good" on a fact that is neither: a contract role is not a warning.
 *    Identity gets a neutral chip; `success`, `warn` and `danger` stay
 *    reserved for the pipeline, where they actually mean something.
 * 3. **`maxSkills={0}` no longer swallows the skills entirely.** The overflow
 *    row was drawn only when at least one chip was shown, so six skills capped
 *    at zero rendered no chips **and** no "+6" — the count disappeared with
 *    the chips it was counting. The `+N` now stands on its own, and
 *    `overflowLabel` names it.
 * 4. **The skeleton is opaque and shaped like the card.** It was drawn in
 *    `colors.border` — the hairline colour used as a fill — so a loading card
 *    read as a broken table. `skeletonFill` mixes an opaque placeholder
 *    against the card's own ground, and the block is announced politely
 *    instead of sitting there silently.
 * 5. **The card announces the job, not the title.** Location, pay, posted age
 *    and the skills are all inside the activation and are therefore flattened
 *    into it, so they belong in its name — the base announced "Title at
 *    Company, Full-time" and dropped the salary, which is the fact a job
 *    seeker is actually scanning for.
 * 6. **Press is a state layer.** `opacity: 0.9` fades the card's own content;
 *    M3 tints the container instead, and reserves fading for `disabled`.
 *
 * **Renders nothing without a job title** (§4.5).
 */
function JobCardV4({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onPress, loading = false, maxSkills = 4, saveLabel = 'Save job', savedLabel = 'Saved — tap to remove', formatRelative, overflowLabel = (count) => `+${count}`, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const surface = (0, tone_v4_1.cardSurfaceStyle)(theme);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: LOADING, accessibilityLiveRegion: "polite", style: [surface, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, { width: tap, height: tap, round: true }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, {
                                        width: '70%',
                                        height: tokens.typography.scale.base,
                                    }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, {
                                        width: '45%',
                                        height: tokens.typography.scale.sm,
                                    }) })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, { width: '55%', height: tokens.typography.scale.sm }) })] }));
    }
    if (!job?.title)
        return null;
    const skills = job.skills ?? [];
    const shown = skills.slice(0, Math.max(0, maxSkills));
    const overflow = skills.length - shown.length;
    const overflowText = overflow > 0 ? overflowLabel(overflow) : null;
    const showApply = applyState != null || onApply != null;
    const posted = (0, tone_v4_1.relativeLabel)(job.postedAt, formatRelative);
    const pay = (0, tone_v4_1.salaryText)(job.salary).text;
    const name = (0, tone_v4_1.spokenName)([
        job.title,
        job.companyName,
        job.location,
        types_1.EMPLOYMENT_LABEL[job.type],
        pay,
        posted,
        ...shown,
        overflowText,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: job.companyLogoUrl, name: job.companyName, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 2, children: job.title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: job.location ? `${job.companyName} · ${job.location}` : job.companyName })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    flexWrap: 'wrap',
                }, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", size: "sm", children: types_1.EMPLOYMENT_LABEL[job.type] }), posted ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: posted })) : null] }), job.salary ? (0, jsx_runtime_1.jsx)(SalaryRangeV4_1.SalaryRangeV4, { salary: job.salary, size: "sm" }) : null, shown.length > 0 || overflowText ? (
            // Hidden from the reader: the card's own name already lists the skills
            // and the overflow count. One fact, announced once — and the same
            // `aria-hidden` the web twin puts on this row.
            (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [shown.map((skill, i) => ((0, jsx_runtime_1.jsx)(SkillTagV4_1.SkillTagV4, { label: skill }, `${skill}-${i}`))), overflowText ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.sm,
                            borderWidth: 1,
                            borderColor: colors.border,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onCard", numeric: "tabular", children: overflowText }) })) : null] })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [surface, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-start' }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(job), style: ({ pressed }) => ({
                            flex: 1,
                            minWidth: 0,
                            gap: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            backgroundColor: pressed
                                ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                                : 'transparent',
                        }), children: body })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { flex: 1, minWidth: 0, gap: tokens.spacing.md }, children: body })), onSave ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: saved ? savedLabel : saveLabel, accessibilityState: { selected: !!saved }, onPress: () => onSave(job), style: ({ pressed }) => ({
                            minWidth: tap,
                            minHeight: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: pressed
                                ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                                : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", tone: saved ? 'primaryText' : 'mutedText', children: saved ? '★' : '☆' }) })) : null] }), showApply ? ((0, jsx_runtime_1.jsx)(ApplyButtonV4_1.ApplyButtonV4, { state: applyState, loading: applyLoading, onApply: onApply ? () => onApply(job) : undefined, onWithdraw: onWithdraw ? () => onWithdraw(job) : undefined, block: true })) : null] }));
}
//# sourceMappingURL=JobCardV4.js.map