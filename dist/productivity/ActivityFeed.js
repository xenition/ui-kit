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
exports.ActivityFeed = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * Per-action presentation: a kind glyph and the `[disc-bg, glyph-fg]` token
 * classes that tint it. Each maps to a semantic slot — no literal colors.
 */
const ACTION = {
    completed: { glyph: '✓', disc: 'bg-success/[0.14]', fg: 'text-success-text', verb: 'completed' },
    created: { glyph: '＋', disc: 'bg-primary/[0.14]', fg: 'text-primary-text', verb: 'created' },
    commented: { glyph: '💬', disc: 'bg-accent/[0.14]', fg: 'text-accent-text', verb: 'commented on' },
    assigned: { glyph: '👤', disc: 'bg-warn/[0.14]', fg: 'text-warn-text', verb: 'assigned' },
    moved: { glyph: '↔', disc: 'bg-primary/[0.14]', fg: 'text-primary-text', verb: 'moved' },
};
/** A single activity row: actor avatar + kind glyph badge + action text + time. */
function Row({ item }) {
    const kind = ACTION[item.action] ?? ACTION.created;
    return ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start gap-3 py-2", children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: item.actor.name, src: item.actor.avatarUrl }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-card text-xs font-bold', kind.disc, kind.fg), children: kind.glyph })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm leading-relaxed text-on-card", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: item.actor.name }), ' ', (0, jsx_runtime_1.jsx)("span", { className: "text-muted-text", children: kind.verb }), item.target ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [' ', (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: item.target })] })) : null] }), item.time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: item.time }) : null] })] }));
}
/**
 * ActivityFeed — **V4** "flow" task activity feed (web parity of the native
 * twin). A calm vertical list: each row an actor {@link Avatar} pinned with a
 * kind glyph badge (✓ / ＋ / 💬 / 👤 / ↔) tinted by its **semantic** token, the
 * action sentence with its **target in bold**, and a muted timestamp. Exposes a
 * `list` for screen readers. Presentational only. All colors from `--xen-*`
 * token classes — no literals.
 */
exports.ActivityFeed = React.forwardRef(function ActivityFeed({ items, title = 'Activity', className, ...rest }, ref) {
    const rows = Array.isArray(items) ? items : [];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] bg-card p-3', className), ...rest, children: [title ? (0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-bold text-on-card", children: title }) : null, (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col divide-y divide-border", children: rows.map((item) => ((0, jsx_runtime_1.jsx)(Row, { item: item }, item.id))) })] }));
});
//# sourceMappingURL=ActivityFeed.js.map