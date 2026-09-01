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
exports.SlotPickerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const datetime_1 = require("./datetime");
const schedule_v4_1 = require("./schedule-v4");
/** Whole class names per column count — Tailwind cannot follow `grid-cols-${n}`. */
const COLUMN_CLASS = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
};
/**
 * **V4 slot picker** — the web twin of the native `SlotPickerV4`, same props as
 * {@link SlotPicker} plus `grouped`, `periodLabels`, `formatSpots` and
 * `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **A day of slots has structure.** See `grouped`.
 * 2. **A full slot is disabled at M3's 0.38**, the number the whole kit uses
 *    for "you cannot have this", rather than this component's own 0.5.
 * 3. **Hover and press are the shared chrome layers** over the chip's own
 *    fill, not a ramp step that is near-white on a dark page.
 * 4. **Chips clear 44 and the type steps come from the scale.**
 * 5. **The copy is the host's** — `formatSpots`, `periodLabels`,
 *    `emptyMessage`, on top of the `fullLabel` the base already had.
 *
 * An empty `slots` renders the message, never a blank grid.
 */
exports.SlotPickerV4 = React.forwardRef(function SlotPickerV4({ slots, onPick, selected, formatTime, timeZone, columns = 3, lowSpotsThreshold = 3, fullLabel = 'Full', grouped = true, periodLabels, formatSpots, emptyMessage = 'No times available.', className, ...rest }, ref) {
    const format = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, timeZone));
    const selectedStart = typeof selected === 'string' ? selected : (selected?.startsAt ?? null);
    const spots = formatSpots ?? ((n, low) => (low ? `${n} left` : `${n} open`));
    const list = slots ?? [];
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('p-md text-sm text-muted-text', className), ...rest, children: emptyMessage }));
    }
    const groups = grouped
        ? (0, schedule_v4_1.groupSlotsByPeriod)(list, timeZone)
        : [{ period: 'morning', slots: list }];
    const chip = (slot) => {
        const full = slot.spotsLeft <= 0;
        const isSelected = selectedStart === slot.startsAt;
        const low = !full && slot.spotsLeft <= lowSpotsThreshold;
        const hint = full ? fullLabel : spots(slot.spotsLeft, low);
        const timeLabel = format(slot.startsAt);
        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": isSelected, "aria-label": `${timeLabel}, ${hint}`, disabled: full, onClick: () => onPick?.(slot), "data-xen-v4-chrome": isSelected ? 'filled-primary' : 'on-surface', className: (0, cn_1.cn)('flex flex-col items-center justify-center rounded-[var(--xen-radius-md)] border px-sm py-sm', chrome_v4_1.MIN_TAP_CLASS, isSelected
                ? 'border-primary bg-primary text-on-primary'
                : 'border-border bg-card text-on-card'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold [font-variant-numeric:tabular-nums]", children: timeLabel }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', isSelected
                        ? 'text-on-primary'
                        : // A low-spots hint is genuinely a caution — it is the fact
                            // that makes a user hurry — so it keeps `warn`. A plain
                            // count does not.
                            low && !full
                                ? 'text-warn-text'
                                : 'text-muted-text'), children: hint })] }, slot.startsAt));
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: groups.map((group) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [grouped ? ((0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-semibold text-muted-text", children: periodLabels?.[group.period] ?? schedule_v4_1.PERIOD_LABEL[group.period] })) : null, (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('grid gap-sm', COLUMN_CLASS[columns]), children: group.slots.map(chip) })] }, group.period))) }));
});
//# sourceMappingURL=SlotPickerV4.js.map