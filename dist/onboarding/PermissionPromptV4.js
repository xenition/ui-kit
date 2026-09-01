"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionPromptV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const PaywallFeatureRowsV4_1 = require("./PaywallFeatureRowsV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * Fallback glyphs per permission kind. Emoji, and therefore **untinted** on
 * most platforms — which is why the medallion behind them carries the colour
 * rather than the glyph doing it.
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
 * **V4 permission prompt** — the web twin of the native `PermissionPromptV4`:
 * the base's props plus `settingsLabel`, `onOpenSettings` and the line's
 * `ground`/`accent`.
 *
 * The "explain, then ask" pattern (§17): say what the permission buys before
 * the browser's own dialog appears, so a user who declines it has already been
 * told what they are declining.
 *
 * ## Five changes
 *
 * 1. **A denied state has an exit** — see `settingsLabel`.
 * 2. **The benefit rows are the module's rows.** They were a private,
 *    near-identical copy of `PaywallFeatureRows`, which is how the two drifted
 *    apart. One component now.
 * 3. **The tint inverts with the scheme.**
 * 4. **The deny action reads as a choice**, underlined with its own tap target.
 * 5. **Full-screen gets the shared shell** — scroll, pinned footer, inset.
 *
 * `granted` replaces the actions with a live-region confirmation rather than
 * leaving a live "Allow" button on a screen where there is nothing left to
 * allow.
 */
exports.PermissionPromptV4 = React.forwardRef(function PermissionPromptV4({ kind = 'generic', icon, title, rationale, allowLabel = 'Allow', denyLabel = 'Not now', onAllow, onDeny, state = 'idle', deniedMessage = 'You can enable this later in Settings.', grantedMessage = "You're all set.", fullScreen = false, illustration, benefits = [], progress, onBack, onDismiss, settingsLabel, onOpenSettings, ground = 'plain', accent = 'primary', className, style, ...rest }, ref) {
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    const denied = state === 'denied';
    /** The card form's medallion, at the badge size the whole module shares. */
    const medallion = ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-16 w-16 items-center justify-center rounded-full', granted
            ? 'bg-success text-on-success'
            : 'bg-[var(--flow-fill)] text-[var(--flow-on-fill)]'), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: granted ? '✓' : glyph, size: "2xl" }) }));
    const rows = benefits.length > 0 ? ((0, jsx_runtime_1.jsx)(PaywallFeatureRowsV4_1.PaywallFeatureRowsV4, { accent: accent, rows: benefits.map((benefit) => ({
            id: benefit.id,
            icon: benefit.icon,
            title: benefit.title,
            description: benefit.description,
        })) })) : null;
    const grantedLine = ((0, jsx_runtime_1.jsxs)("p", { "aria-live": "polite", className: "flex items-center justify-center gap-xs text-sm font-semibold text-success-text", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm" }), grantedMessage] }));
    const deniedNote = denied ? ((0, jsx_runtime_1.jsxs)("div", { "aria-live": "polite", className: "flex w-full flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex items-center justify-center gap-xs text-center text-sm text-muted-text", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "info", size: "sm" }), deniedMessage] }), settingsLabel && onOpenSettings ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowLinkV4, { label: settingsLabel, onClick: onOpenSettings, emphasis: "tertiary" })) : null] })) : null;
    const cta = ((0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: allowLabel, trailingArrow: false, loading: state === 'requesting', onClick: onAllow }));
    if (!fullScreen) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, style: { ...(0, flow_v4_1.flowGroundVars)(ground, accent), ...style }, className: (0, cn_1.cn)('flex flex-col items-stretch gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: medallion }), (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: rationale }), rows, granted ? (grantedLine) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cta, (0, jsx_runtime_1.jsx)(flow_v4_1.FlowLinkV4, { label: denyLabel, onClick: onDeny, emphasis: "secondary" }), deniedNote] }))] }));
    }
    return ((0, jsx_runtime_1.jsxs)(flow_v4_1.FlowScreenV4, { ref: ref, ...rest, ground: ground, accent: accent, center: false, className: className, style: style, header: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: progress }), footer: granted ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { children: grantedLine })) : ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { secondaryLabel: denyLabel, onSecondary: onDeny, children: cta })), children: [(0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: illustration ?? medallion, logoGlyph: glyph }), (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: rationale }), rows, deniedNote] }));
});
//# sourceMappingURL=PermissionPromptV4.js.map