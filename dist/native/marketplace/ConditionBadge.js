"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionBadge = ConditionBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const primitives_1 = require("../primitives");
const CONDITION_TONE = {
    new: 'success',
    'like-new': 'primary',
    used: 'neutral',
    refurb: 'accent',
};
const CONDITION_LABEL = {
    new: 'New',
    'like-new': 'Like New',
    used: 'Used',
    refurb: 'Refurbished',
};
/**
 * A themed condition chip for a marketplace listing — `new` / `like-new` /
 * `used` / `refurb`. A thin, presentational wrapper over the shared `Badge`
 * that maps each grade to a semantic tone and a readable label, so condition is
 * conveyed by text (never color alone). Token-only colors via `Badge`.
 */
function ConditionBadge({ condition, variant = 'soft', size = 'md', label, style, }) {
    const tone = CONDITION_TONE[condition] ?? 'neutral';
    const text = label ?? CONDITION_LABEL[condition] ?? String(condition);
    return ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: tone, variant: variant, size: size, style: style, children: text }));
}
//# sourceMappingURL=ConditionBadge.js.map