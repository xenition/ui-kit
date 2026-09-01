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
exports.DateNavigatorV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const SegmentedV4_1 = require("../primitives/SegmentedV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const VIEW_LABEL = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
};
/**
 * **V4 date navigator** — the web twin of the native `DateNavigatorV4`, same
 * props as {@link DateNavigator} plus four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The chevrons clear 44 and carry names.** They were glyph-sized buttons
 *    with no accessible label, on the control a user hits most in a calendar.
 * 2. **The title is a real heading**, so a screen reader can jump to it.
 * 3. **The view switcher is `SegmentedV4`**, not three hand-rolled buttons, so
 *    it reports itself as one control with a selected option.
 * 4. **Hover and press are the shared chrome layers.**
 */
exports.DateNavigatorV4 = React.forwardRef(function DateNavigatorV4({ title, onPrev, onNext, onToday, view, onViewChange, views = ['month', 'week', 'day'], previousLabel, nextLabel, todayLabel = 'Today', viewLabels, className, ...rest }, ref) {
    const unit = view ?? 'month';
    const chevron = (direction) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": direction < 0
            ? (previousLabel ?? `Previous ${unit}`)
            : (nextLabel ?? `Next ${unit}`), onClick: direction < 0 ? onPrev : onNext, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('inline-flex w-11 shrink-0 items-center justify-center rounded-full text-on-surface', chrome_v4_1.MIN_TAP_CLASS), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: direction < 0 ? 'chevron-left' : 'chevron-right', size: "lg" }) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-date-navigator": view, className: (0, cn_1.cn)('flex items-center gap-sm', className), ...rest, children: [onPrev ? chevron(-1) : null, (0, jsx_runtime_1.jsx)("h2", { className: "min-w-0 flex-1 truncate font-heading text-base font-bold text-on-surface", children: title }), onNext ? chevron(1) : null, onToday ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onClick: onToday, "aria-label": todayLabel, children: todayLabel })) : null, onViewChange && views.length > 1 ? ((0, jsx_runtime_1.jsx)(SegmentedV4_1.SegmentedV4, { options: views.map((v) => ({ label: viewLabels?.[v] ?? VIEW_LABEL[v], value: v })), value: view ?? views[0], onChange: (v) => onViewChange(v) })) : null] }));
});
//# sourceMappingURL=DateNavigatorV4.js.map