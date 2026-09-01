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
exports.EventFeed = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Glyph + accessible label + semantic tint per kind (color reinforces the glyph, never alone). */
const KIND_META = {
    goal: { glyph: '⚽', label: 'Goal', node: 'bg-primary/10', ink: 'text-primary' },
    'own-goal': { glyph: '🥅', label: 'Own goal', node: 'bg-warn/10', ink: 'text-warn' },
    penalty: { glyph: '🅿', label: 'Penalty', node: 'bg-primary/10', ink: 'text-primary' },
    yellow: { glyph: '🟨', label: 'Yellow card', node: 'bg-warn/10', ink: 'text-warn' },
    red: { glyph: '🟥', label: 'Red card', node: 'bg-danger/10', ink: 'text-danger' },
    sub: { glyph: '🔁', label: 'Substitution', node: 'bg-success/10', ink: 'text-success' },
    var: { glyph: '📺', label: 'VAR', node: 'bg-muted/10', ink: 'text-muted' },
};
/**
 * EventFeed — **V4** "broadcast" design. A vertical feed of match moments on an
 * elevated card: each row pairs a bold minute chip with a round glyph node
 * (goal ⚽ / card 🟨·🟥 / sub 🔁 / VAR 📺) tinted from its semantic token and the
 * event text. Goals are emphasized (heavier text); rows with a `side` align
 * home→left / away→right. Kind is always legible from glyph + shape, not color
 * alone. All colors from `--xen-*` token classes (no literals); dark-mode safe.
 */
exports.EventFeed = React.forwardRef(function EventFeed({ events, title, emptyLabel = 'No events yet', className, ...rest }, ref) {
    const shell = (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 text-on-surface shadow-sm', className);
    const header = title ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-extrabold text-on-surface", children: title })) : null;
    if (events.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [header, (0, jsx_runtime_1.jsx)("p", { className: "py-3 text-center text-sm text-muted", children: emptyLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [header, (0, jsx_runtime_1.jsx)("div", { role: "list", className: "flex flex-col gap-1.5", children: events.map((e, i) => {
                    const meta = KIND_META[e.kind] ?? KIND_META.goal;
                    const isGoal = e.kind === 'goal' || e.kind === 'own-goal' || e.kind === 'penalty';
                    const away = e.side === 'away';
                    const a11y = `${e.minute}, ${meta.label}${e.side ? `, ${e.side === 'home' ? 'home' : 'away'}` : ''}: ${e.text}`;
                    return ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", "aria-label": a11y, className: (0, cn_1.cn)('flex items-center gap-2 rounded-[var(--xen-radius-md)] px-1 py-1', away ? 'flex-row-reverse text-right' : 'flex-row text-left'), children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex min-w-[44px] flex-none justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "rounded-full border border-border bg-surface px-1.5 py-px text-xs font-extrabold text-on-surface", children: e.minute }) }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-7 w-7 flex-none items-center justify-center rounded-full text-base leading-none', meta.node, meta.ink), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', isGoal ? 'font-extrabold text-on-surface' : 'font-medium text-on-surface'), children: e.text })] }, i));
                }) })] }));
});
//# sourceMappingURL=EventFeed.js.map