"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailThreadV4 = EmailThreadV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const StarButtonV4_1 = require("./StarButtonV4");
const AttachmentChipV4_1 = require("./AttachmentChipV4");
const MailLabelChipV4_1 = require("./MailLabelChipV4");
const mail_v4_1 = require("./internal/mail-v4");
/** How many ghost messages the loading state draws. */
const SKELETON_ROWS = 3;
/**
 * **V4 email thread** — same props as {@link EmailThread} plus
 * `defaultExpandedId`, `loadingLabel` and `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **Expansion works when nobody is driving it.** The base computed
 *    `new Set(expandedIds ?? [lastId])` fresh on every render and held no
 *    state at all — while `expandedIds` is an *optional* prop and
 *    `onToggleMessage` an optional callback. Mounted the way the module's own
 *    barrel doc describes it (`<EmailThread subject messages />`), every header
 *    tap fired into a callback nobody was listening to: the newest message
 *    stayed open, every earlier one stayed a clipped one-line snippet, and
 *    `accessibilityState.expanded` never flipped. A user tapped the third
 *    reply, saw nothing, tapped again, and concluded the app was broken; a
 *    reader heard "Expand message from Priya, collapsed" every single time.
 *    `useThreadExpansion` — shared with the web twin, so both platforms fix it
 *    the same way — leaves the **controlled** path exactly as it was and gives
 *    the uncontrolled one somewhere to put its state. `onToggleMessage` still
 *    fires on both paths.
 * 2. **The timestamp and the star are outside the toggle.** They were children
 *    of the toggle `Pressable`, so tapping a message's time collapsed it — and
 *    because that Pressable is `accessible`, the star inside it was
 *    presentational: VoiceOver could not reach it at all. Toggle, timestamp
 *    and star are three siblings now, and the toggle is the sender and the
 *    snippet, which is the part that means "open this".
 * 3. **Loading is skeleton messages that announce themselves.** A centred
 *    spinner in a padded box collapsed the layout and then jumped; and the
 *    base's loading view had no role and no live region, so a reader was told
 *    nothing was happening.
 * 4. **A failed fetch has a representation.** `errorLabel` renders it, and
 *    announces — an empty thread and a broken one looked identical before.
 * 5. **The subject is the heading**, and every ink is a `*Text` slot rather
 *    than `colors.muted`, a ramp step carrying no contrast promise.
 */
function EmailThreadV4({ subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading = false, defaultExpandedId, loadingLabel = 'Loading messages', errorLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const safeMessages = messages ?? [];
    const safeLabels = labels ?? [];
    const lastId = safeMessages.length > 0 ? safeMessages[safeMessages.length - 1].id : undefined;
    // Before any early return: this holds state, and a hook that only runs when
    // the thread has loaded is a hook that runs conditionally.
    const expansion = (0, mail_v4_1.useThreadExpansion)(expandedIds, defaultExpandedId ?? lastId);
    const surface = { backgroundColor: colors.surface };
    if (errorLabel) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "alert", accessibilityLiveRegion: "assertive", style: [surface, style], children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: errorLabel }) }));
    }
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: loadingLabel, accessibilityLiveRegion: "polite", style: [
                surface,
                { padding: tokens.spacing.md, gap: tokens.spacing.lg },
                style,
            ], children: Array.from({ length: SKELETON_ROWS }, (_, i) => (
            // The shape it is about to be — an avatar, a sender and a snippet —
            // rather than a spinner that collapses the layout and then jumps.
            (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing['2xl'],
                            height: tokens.spacing['2xl'],
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, mail_v4_1.skeletonFill)(theme),
                        } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.typography.scale.base,
                                    width: '40%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, mail_v4_1.skeletonFill)(theme),
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.typography.scale.sm,
                                    width: '75%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, mail_v4_1.skeletonFill)(theme),
                                } })] })] }, i))) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { style: [surface, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.md,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "xl", weight: "bold", tone: "onSurface", children: subject }), safeLabels.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: safeLabels.map((l) => ((0, jsx_runtime_1.jsx)(MailLabelChipV4_1.MailLabelChipV4, { label: l.label, tone: l.tone ?? 'neutral' }, l.id))) })) : null] }), safeMessages.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.xl }, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: "No messages", description: "This conversation is empty." }) })) : (safeMessages.map((m) => {
                const isOpen = expansion.isOpen(m.id);
                const atts = m.attachments ?? [];
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        paddingHorizontal: tokens.spacing.md,
                        paddingVertical: tokens.spacing.md,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${isOpen ? 'Collapse' : 'Expand'} message from ${m.sender}`, accessibilityState: { expanded: isOpen }, onPress: () => {
                                        // A no-op on the controlled path — the caller owns it —
                                        // and the callback fires either way, exactly as before.
                                        expansion.toggle(m.id);
                                        onToggleMessage?.(m.id);
                                    }, style: ({ pressed }) => ({
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: tokens.spacing.sm,
                                        minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                                        paddingHorizontal: tokens.spacing.xs,
                                        marginHorizontal: -tokens.spacing.xs,
                                        borderRadius: tokens.radius.md,
                                        backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                                    }), children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "md", src: m.avatarUri, name: m.sender }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: m.sender }), !isOpen ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: m.body })) : null] })] }), m.timestamp ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: m.timestamp })) : null, (0, jsx_runtime_1.jsx)(StarButtonV4_1.StarButtonV4, { starred: m.starred ?? false, onToggle: onToggleStar ? (s) => onToggleStar(m.id, s) : undefined, size: "base" })] }), isOpen ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "onSurface", children: m.body }), atts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        gap: tokens.spacing.xs,
                                    }, children: atts.map((a) => ((0, jsx_runtime_1.jsx)(AttachmentChipV4_1.AttachmentChipV4, { name: a.name, kind: a.kind ?? 'file', size: a.size, onPress: onPressAttachment ? () => onPressAttachment(m.id, a.id) : undefined }, a.id))) })) : null] })) : null] }, m.id));
            }))] }));
}
//# sourceMappingURL=EmailThreadV4.js.map