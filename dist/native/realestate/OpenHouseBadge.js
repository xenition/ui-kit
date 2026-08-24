"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenHouseBadge = OpenHouseBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const primitives_1 = require("../primitives");
const STATUS = {
    upcoming: { tone: 'primary', glyph: '📅', prefix: 'Open house' },
    live: { tone: 'success', glyph: '🟢', prefix: 'Open now' },
    ended: { tone: 'neutral', glyph: '✓', prefix: 'Ended' },
};
/**
 * A compact open-house indicator — a token-toned {@link Badge} whose color and
 * prefix track the `status` (upcoming / live / ended) followed by the date and
 * time window. Pure presentation: strings in, no callbacks, nothing fetches.
 * The full window is rendered as a single string so it is announced as one
 * phrase. Token-only colors (delegated to `Badge`).
 */
function OpenHouseBadge({ dateLabel, startTime, endTime, status = 'upcoming', style, }) {
    const { tone, glyph, prefix } = STATUS[status];
    const window = [startTime, endTime].filter(Boolean).join('–');
    const text = `${glyph} ${prefix} · ${dateLabel}${window ? ` ${window}` : ''}`;
    return ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: tone, style: style, children: text }));
}
//# sourceMappingURL=OpenHouseBadge.js.map