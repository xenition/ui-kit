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
exports.EquipmentRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const job_v4_1 = require("./internal/job-v4");
const EQUIPMENT_V4 = {
    operational: { label: 'Operational', glyph: '✓', tone: 'success' },
    maintenance: { label: 'Maintenance', glyph: '⚙', tone: 'warn' },
    down: { label: 'Down', glyph: '✕', tone: 'danger' },
    retired: { label: 'Retired', glyph: '⏻', tone: 'neutral' },
};
/**
 * **V4 equipment row** — the web twin of the native `EquipmentRowV4`, same
 * props as {@link EquipmentRow} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The row's name carries the location and the service date.** A register
 *    is read to answer "where is it and when is it next due", and
 *    `` `${name}, ${tag}, ${status}` `` dropped both.
 * 2. **The asset disc is decorative.** It announced the bare word "Equipment"
 *    ahead of the asset's own name.
 * 3. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, rather than a `div` carrying `role="button"`, a
 *    `tabIndex` and a hand-written Enter/Space handler.
 * 4. **It joins the shared row family** and its badge takes the module's one
 *    badge shape — the web register was a wall of saturated pills where the
 *    phone showed soft tints.
 */
exports.EquipmentRowV4 = React.forwardRef(function EquipmentRowV4({ name, assetTag, status, glyph = '🚜', nextService, location, onClick, statusLabels, className, style }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const sd = EQUIPMENT_V4[status] ?? EQUIPMENT_V4.operational;
    const word = statusLabels?.[status] ?? sd.label;
    const service = nextService != null ? `Service ${nextService}` : null;
    const caption = (0, tone_v4_1.metaLine)([assetTag, location, service]);
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(caption !== ''));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-md)]'), style: { background: (0, job_v4_1.discGround)(sd.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: name }), caption !== '' ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...job_v4_1.BADGE_V4, children: `${sd.glyph} ${word}` }) })] }));
    if (onClick == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, className: (0, cn_1.cn)(rowClass, className), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, className: (0, cn_1.cn)('w-full', className), children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, job_v4_1.spokenLine)([name, assetTag, word, location, service]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)(rowClass, 'rounded-[var(--xen-radius-md)]'), children: body }) }));
});
//# sourceMappingURL=EquipmentRowV4.js.map