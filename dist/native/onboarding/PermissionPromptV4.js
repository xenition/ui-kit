"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionPromptV4 = PermissionPromptV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const PaywallFeatureRowsV4_1 = require("./PaywallFeatureRowsV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * Fallback glyphs per permission kind. Emoji, and therefore **untinted** on
 * most platforms — which is exactly why the medallion behind them carries the
 * colour instead of the glyph doing it.
 */
const KIND_GLYPH = {
    notifications: '🔔',
    location: '📍',
    camera: '📷',
    microphone: '🎤',
    photos: '🖼️',
    contacts: '👥',
    generic: '🔒',
};
/**
 * **V4 permission prompt** — the base's props plus `settingsLabel`,
 * `onOpenSettings` and the line's `ground`/`accent`.
 *
 * The "explain, then ask" pattern (§17): say what the permission buys before
 * the OS dialog appears, so a user who declines the system prompt has already
 * been told what they are declining.
 *
 * ## Five changes
 *
 * 1. **A denied state has an exit.** See `settingsLabel`.
 * 2. **The benefit rows are the module's rows.** They were a private,
 *    near-identical copy of `PaywallFeatureRows` — same 44 circle, same tinted
 *    ground, no rail — which is how the two drifted apart. One component now.
 * 3. **The tint has no `scheme` branch.** `flowGrounds()` mixes it from
 *    resolved semantic colours.
 * 4. **The deny action reads as a choice**, underlined with its own tap
 *    target, rather than muted text under the button.
 * 5. **Full-screen gets the shared shell** — scroll, pinned footer, safe-area
 *    inset. The base's band had none of the three.
 *
 * `granted` replaces the actions with a live-region confirmation rather than
 * leaving a live "Allow" button on a screen where there is nothing left to
 * allow. The card form (`fullScreen={false}`) is unchanged in shape.
 */
function PermissionPromptV4({ kind = 'generic', icon, title, rationale, allowLabel = 'Allow', denyLabel = 'Not now', onAllow, onDeny, state = 'idle', deniedMessage = 'You can enable this later in Settings.', grantedMessage = "You're all set.", fullScreen = false, illustration, benefits = [], progress, onBack, onDismiss, settingsLabel, onOpenSettings, ground = 'plain', accent = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, ground, accent);
    const { badge } = (0, flow_v4_1.flowMetrics)(theme, 0);
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    const denied = state === 'denied';
    /** The card form's medallion, at the badge size the whole module shares. */
    const medallion = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: badge * 1.5,
            height: badge * 1.5,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: granted ? colors.success : grounds.fill,
        }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: granted ? '✓' : glyph, size: "2xl", style: { color: granted ? colors.onSuccess : grounds.onFill } }) }));
    const rows = benefits.length > 0 ? ((0, jsx_runtime_1.jsx)(PaywallFeatureRowsV4_1.PaywallFeatureRowsV4, { accent: accent, rows: benefits.map((benefit) => ({
            id: benefit.id,
            icon: benefit.icon,
            title: benefit.title,
            description: benefit.description,
        })) })) : null;
    const grantedLine = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
        }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm", color: "successText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "successText", children: grantedMessage })] }));
    const deniedNote = denied ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "info", size: "sm", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", style: { flexShrink: 1 }, children: deniedMessage })] }), settingsLabel && onOpenSettings ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowLinkV4, { label: settingsLabel, onPress: onOpenSettings, emphasis: "tertiary" })) : null] })) : null;
    const cta = ((0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: allowLabel, trailingArrow: false, loading: state === 'requesting', onPress: onAllow }));
    if (!fullScreen) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.md, alignItems: 'stretch' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: medallion }), (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: rationale }), rows, granted ? (grantedLine) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cta, (0, jsx_runtime_1.jsx)(flow_v4_1.FlowLinkV4, { label: denyLabel, onPress: onDeny, emphasis: "secondary" }), deniedNote] }))] }));
    }
    return ((0, jsx_runtime_1.jsxs)(flow_v4_1.FlowScreenV4, { grounds: grounds, center: false, style: style, header: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: progress }), footer: granted ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { children: grantedLine })) : ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { secondaryLabel: denyLabel, onSecondary: onDeny, children: cta })), children: [(0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: illustration ?? medallion, logoGlyph: glyph, grounds: grounds }), (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: rationale }), rows, deniedNote] }));
}
//# sourceMappingURL=PermissionPromptV4.js.map