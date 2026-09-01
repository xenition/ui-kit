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
exports.RepresentativeCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const civic_v4_1 = require("./internal/civic-v4");
const PARTY_V4 = {
    democratic: 'Democratic',
    republican: 'Republican',
    independent: 'Independent',
    green: 'Green',
    other: 'Other',
    nonpartisan: 'Nonpartisan',
};
const TENURE_V4 = {
    inOffice: { label: 'In office', glyph: '✓' },
    former: { label: 'Former', glyph: '—' },
};
/**
 * **V4 representative card** — the web twin of the native
 * `RepresentativeCardV4`, same props as {@link RepresentativeCard} plus
 * `partyLabels` and `officeLabels`.
 *
 * ## Four changes
 *
 * 1. **Holding office stops being `success`.** Whether someone is currently in
 *    office is a factual attribute of a public official, not a good outcome —
 *    and this is a card careful enough to keep the *party* badge neutral for
 *    exactly that reason, then spent the module's approval colour on the seat.
 *    Tenure takes the neutral identity chip, with a glyph and a word doing the
 *    work.
 * 2. **The card is one readable block, not five stops.** Name, office, party,
 *    tenure, district and term were six separate leaves; the district and the
 *    term now sit in one caption line, and each control names the person it
 *    acts on, so "Call" is never a bare verb with no object.
 * 3. **Call and Email clear 44.** They were `size="sm"`, about 32px, and
 *    neither `Button` primitive sets a minimum height — a defect shared by all
 *    fifteen actions in this module.
 * 4. **Every word is a prop.** Six party names and two tenure words were
 *    hard-coded English, on a component whose whole subject is a local
 *    jurisdiction that may not be English-speaking at all.
 */
exports.RepresentativeCardV4 = React.forwardRef(function RepresentativeCardV4({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, partyLabels, officeLabels, className, ...rest }, ref) {
    if (!name)
        return null;
    const partyWord = party ? (partyLabels?.[party] ?? PARTY_V4[party] ?? PARTY_V4.other) : undefined;
    const tenureKey = inOffice == null ? undefined : inOffice ? 'inOffice' : 'former';
    const tenure = tenureKey != null ? TENURE_V4[tenureKey] : undefined;
    const tenureWord = tenureKey != null ? (officeLabels?.[tenureKey] ?? tenure?.label) : undefined;
    const showCall = onCall != null && phone != null && phone !== '';
    const showEmail = onEmail != null && email != null && email !== '';
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: civic_v4_1.CARD_V4, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: photoUrl, name: name, size: "lg", alt: "" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted-text", children: office }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-xs flex flex-wrap items-center gap-xs", children: [partyWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: civic_v4_1.IDENTITY_TONE, ...civic_v4_1.BADGE_V4, children: partyWord })) : null, tenure != null && tenureWord != null ? (
                                    // A seat held is identity, not an approval.
                                    (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: civic_v4_1.IDENTITY_TONE, ...civic_v4_1.BADGE_V4, children: `${tenure.glyph} ${tenureWord}` })) : null] })] })] }), district != null || termInfo != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-sm flex flex-col gap-xs", children: [district != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCCD" }), " ", district] })) : null, termInfo != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDDF3\uFE0F" }), " ", termInfo] })) : null] })) : null, showCall || showEmail ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('mt-md flex flex-wrap justify-end gap-sm'), children: [showCall ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", "aria-label": (0, civic_v4_1.spokenLine)(['Call', name, phone]), onClick: onCall, children: "Call" })) : null, showEmail ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", "aria-label": (0, civic_v4_1.spokenLine)(['Email', name, email]), onClick: onEmail, children: "Email" })) : null] })) : null] }));
});
//# sourceMappingURL=RepresentativeCardV4.js.map