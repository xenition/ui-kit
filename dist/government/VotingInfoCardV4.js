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
exports.VotingInfoCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const civic_v4_1 = require("./internal/civic-v4");
const REG_V4 = {
    registered: { label: 'Registered', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    'not-registered': { label: 'Not registered', glyph: '!', tone: 'danger' },
    inactive: { label: 'Inactive', glyph: '✕', tone: 'neutral' },
};
/**
 * **V4 voting info** — the web twin of the native `VotingInfoCardV4`, same
 * props as {@link VotingInfoCard} plus `statusLabels` and `electionLabel`.
 *
 * ## Four changes
 *
 * 1. **The election date has a relationship to its label.** "Next election" and
 *    the date were two sibling `<span>`s with nothing tying them together, so a
 *    reader met a bare date with no idea what it was the date *of* — on the one
 *    card whose entire purpose is a deadline. The card's three facts are
 *    term/definition pairs now, which is what they always were.
 * 2. **Being registered for a mail ballot is not a brand event.** It is a
 *    factual attribute, like the party label on `RepresentativeCard`, and takes
 *    the neutral identity chip; the four registration states keep their tones,
 *    because those genuinely are statuses.
 * 3. **The words are props.** "Next election", "Polling place", the four
 *    registration labels and both action labels were hard-coded English on a
 *    civic surface that has to ship in every language the jurisdiction serves.
 * 4. **Both actions clear 44**, and the leading disc stops drawing its glyph in
 *    the `success` / `danger` **fill** on a 10% tint of that same fill — a
 *    contrast pairing nobody ever measured — taking the tone's
 *    contrast-corrected ink instead.
 */
exports.VotingInfoCardV4 = React.forwardRef(function VotingInfoCardV4({ registration, electionDate, electionName, pollingPlace, pollingAddress, mailBallot = false, onRegister, onFindPolling, statusLabels, electionLabel = 'Next election', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const reg = REG_V4[registration] ?? REG_V4['not-registered'];
    const word = statusLabels?.[registration] ?? reg.label;
    const isRegistered = registration === 'registered';
    const election = (0, tone_v4_1.metaLine)([electionName, electionDate]);
    const registerWord = isRegistered ? 'Update registration' : 'Register to vote';
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: civic_v4_1.CARD_V4, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]", style: { background: (0, civic_v4_1.tintGround)(reg.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDDF3\uFE0F", size: "xl", className: (0, civic_v4_1.tintInkClass)(reg.tone) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col items-start gap-xs", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: "Voter status" }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: reg.tone, ...civic_v4_1.BADGE_V4, children: `${reg.glyph} ${word}` })] }), mailBallot ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: civic_v4_1.IDENTITY_TONE, ...civic_v4_1.BADGE_V4, children: "\uD83D\uDCEE Mail ballot" })) : null] }), election !== '' || pollingPlace != null ? ((0, jsx_runtime_1.jsxs)("dl", { className: "mt-md flex flex-col gap-sm border-t border-border pt-md", children: [election !== '' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-xs text-muted-text", children: electionLabel }), (0, jsx_runtime_1.jsx)("dd", { className: "text-sm font-semibold text-on-surface", children: election })] })) : null, pollingPlace != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-xs text-muted-text", children: "Polling place" }), (0, jsx_runtime_1.jsxs)("dd", { className: "text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCCD" }), " ", pollingPlace, pollingAddress != null ? ((0, jsx_runtime_1.jsx)("span", { className: "block text-xs text-muted-text", children: pollingAddress })) : null] })] })) : null] })) : null, onRegister != null || onFindPolling != null ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('mt-md flex flex-wrap justify-end gap-sm'), children: [onFindPolling != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", "aria-label": (0, civic_v4_1.spokenLine)(['Find polling place', pollingPlace]), onClick: onFindPolling, children: "Find polling place" })) : null, onRegister != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", "aria-label": (0, civic_v4_1.spokenLine)([registerWord, word]), onClick: onRegister, children: registerWord })) : null] })) : null] }));
});
//# sourceMappingURL=VotingInfoCardV4.js.map