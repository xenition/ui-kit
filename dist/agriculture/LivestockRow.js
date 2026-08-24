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
exports.LivestockRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const HEALTH_META = {
    healthy: { label: 'Healthy', text: 'text-on-surface', tone: 'success' },
    monitor: { label: 'Monitor', text: 'text-warn', tone: 'warn' },
    sick: { label: 'Sick', text: 'text-danger', tone: 'danger' },
};
/**
 * A livestock group row — species glyph, name, head count (emphasized), and an
 * optional location, closed by a health {@link Badge}. Health colors the count
 * but is always paired with a text chip so an at-risk group reads without
 * color. `count` is guarded (renders "—" when absent). A hairline divider
 * separates rows unless `last`. When `onClick` is set the row is an accessible
 * `role="button"` with keyboard activation. Token-bound throughout.
 */
exports.LivestockRow = React.forwardRef(function LivestockRow({ species, count, icon = '🐄', location, health = 'healthy', detail, last = false, onClick, className, ...rest }, ref) {
    const meta = HEALTH_META[health];
    const shownCount = typeof count === 'number' ? String(count) : '—';
    const subLine = [location, detail].filter((s) => s != null && s !== '').join(' · ');
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-livestock-row": "", className: (0, cn_1.cn)('flex items-center gap-2 py-2', !last && 'border-b border-border', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${species}, ${shownCount} head, ${meta.label}` : undefined, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "xl", color: "onSurface" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: species }), subLine !== '' ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subLine }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-lg font-bold', meta.text), children: shownCount }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] })] }));
});
//# sourceMappingURL=LivestockRow.js.map