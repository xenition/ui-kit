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
exports.VotingInfoCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const tint_1 = require("./internal/tint");
const REG = {
    registered: { label: 'Registered', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    'not-registered': { label: 'Not registered', glyph: '!', tone: 'danger' },
    inactive: { label: 'Inactive', glyph: '✕', tone: 'neutral' },
};
/**
 * A voter-information card: registration status conveyed by **text + glyph +
 * color** (never color alone), the next election, an assigned polling place, and
 * gated Register / Find-polling actions (real `<button>`s). The action label
 * adapts to whether the voter is already registered. Token-bound throughout — no
 * literal colors. Web parity of the native `VotingInfoCard`.
 */
exports.VotingInfoCard = React.forwardRef(function VotingInfoCard({ registration, electionDate, electionName, pollingPlace, pollingAddress, mailBallot = false, onRegister, onFindPolling, className, ...rest }, ref) {
    const reg = REG[registration] ?? REG['not-registered'];
    const isRegistered = registration === 'registered';
    const election = [electionName, electionDate].filter((v) => v != null && v !== '').join(' · ');
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', tint_1.TONE_TINT[reg.tone]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDDF3\uFE0F", size: "xl", "aria-label": "Voting" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: "Voter status" }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: reg.tone, className: "mt-0.5", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: reg.glyph }), " ", reg.label] })] }), mailBallot ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: "primary", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCEE" }), " Mail ballot"] })) : null] }), election !== '' ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-0.5 border-t border-border pt-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Next election" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: election })] })) : null, pollingPlace != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-sm)] flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Polling place" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCCD" }), " ", pollingPlace] }), pollingAddress != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: pollingAddress })) : null] })) : null, onRegister != null || onFindPolling != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex justify-end gap-[var(--xen-space-sm)]", children: [onFindPolling != null ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", onClick: onFindPolling, children: "Find polling place" })) : null, onRegister != null ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onClick: onRegister, children: isRegistered ? 'Update registration' : 'Register to vote' })) : null] })) : null] }));
});
//# sourceMappingURL=VotingInfoCard.js.map