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
exports.MoodPickerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_2 = require("./internal/tone-v4");
const MOOD_META = {
    awful: { glyph: '😣', label: 'Awful', tone: 'danger' },
    bad: { glyph: '🙁', label: 'Bad', tone: 'warn' },
    okay: { glyph: '😐', label: 'Okay', tone: 'neutral' },
    good: { glyph: '🙂', label: 'Good', tone: 'primary' },
    great: { glyph: '😄', label: 'Great', tone: 'success' },
};
const MOOD_ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/**
 * **V4 mood picker** — same props as {@link MoodPicker} plus `moodLabels`,
 * `groupLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **Choosing "Okay" produced no selected state at all.** Selection was drawn
 *    as a border in the mood's own colour, and "Okay"'s colour is `muted` —
 *    which is exactly the unselected treatment. With `showLabels={false}`
 *    nothing whatsoever distinguished the chosen face from the other four, so
 *    the middle of a five-point scale was unpickable. Selection is now carried
 *    by the ground, the border and the weight, none of which depends on which
 *    mood was picked.
 * 2. **The unpicked faces were dimmed to 0.38-ish.** `opacity-50` on the
 *    alternatives is M3's *disabled* band, so four perfectly available choices
 *    looked unavailable. They are simply not selected now.
 * 3. **The radiogroup behaves like one.** No roving `tabIndex`, no arrow keys
 *    and no name on the group: a keyboard user tabbed through five separate
 *    stops into an unnamed collection. Arrow keys and Home/End move and select,
 *    one stop carries the tab, and the group has a name.
 * 4. **The faces clear 44** and press is a state layer, not `hover:opacity-70`
 *    — see change 2 for why dimming cannot mean two things at once.
 * 5. **The read-only branch stopped naming bare `<span>`s.** Role `generic`
 *    cannot be named; the five labels were dropped by the browser. It is a
 *    list now, and the chosen mood says that it is chosen in words.
 */
exports.MoodPickerV4 = React.forwardRef(function MoodPickerV4({ value, options = MOOD_ORDER, showLabels = true, onChange, moodLabels, groupLabel = 'Mood', appearance = 'classic', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const faces = React.useRef([]);
    const word = (mood) => moodLabels?.[mood] ?? MOOD_META[mood].label;
    // One tab stop for the whole group, ARIA's radiogroup pattern: the selected
    // radio takes it, or the first when nothing is selected yet.
    const selectedIndex = value ? options.indexOf(value) : -1;
    const tabIndexOf = (index) => (selectedIndex === -1 ? index === 0 : index === selectedIndex) ? 0 : -1;
    const move = (from, step) => {
        if (!onChange)
            return;
        const next = (from + step + options.length) % options.length;
        const mood = options[next];
        if (mood === undefined)
            return;
        onChange(mood);
        faces.current[next]?.focus();
    };
    const onKeyDown = (event, index) => {
        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                move(index, 1);
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                move(index, -1);
                break;
            case 'Home':
                event.preventDefault();
                move(-1, 1);
                break;
            case 'End':
                event.preventDefault();
                move(0, -1);
                break;
            default:
                break;
        }
    };
    const shell = (0, cn_1.cn)('flex justify-between gap-xs', (0, tone_v4_2.frameClass)(appearance), className);
    const face = (mood, selected) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl', 
                // Ground, border and weight — never the mood's own hue, which is
                // what made "Okay" indistinguishable from unselected.
                selected ? 'border-primary bg-selected' : 'border-border bg-card'), children: MOOD_META[mood].glyph }), showLabels ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', selected ? (0, cn_1.cn)('font-bold', tone_v4_1.TONE_INK[MOOD_META[mood].tone]) : 'text-muted-text'), children: word(mood) })) : null] }));
    if (!onChange) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: shell, ...rest, children: (0, jsx_runtime_1.jsx)("ul", { role: "group", "aria-label": groupLabel, className: "flex flex-1 justify-between gap-xs", children: options.map((mood) => {
                    const selected = value === mood;
                    return ((0, jsx_runtime_1.jsxs)("li", { className: "flex flex-col items-center gap-xs", children: [face(mood, selected), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: selected ? `${word(mood)}, selected` : word(mood) })] }, mood));
                }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "radiogroup", "aria-label": groupLabel, className: shell, ...rest, children: options.map((mood, index) => {
            const selected = value === mood;
            return ((0, jsx_runtime_1.jsx)("button", { ref: (node) => {
                    faces.current[index] = node;
                }, type: "button", role: "radio", "aria-checked": selected, "aria-label": word(mood), tabIndex: tabIndexOf(index), onClick: () => onChange(mood), onKeyDown: (event) => onKeyDown(event, index), "data-xen-v4-state": "", style: (0, tone_v4_2.appearanceStateVars)(appearance), className: (0, cn_1.cn)('flex flex-col items-center gap-xs rounded-[var(--xen-radius-md)] bg-transparent px-xs', chrome_v4_1.MIN_TAP_CLASS, tone_v4_2.FOCUS_RING_CLASS), children: face(mood, selected) }, mood));
        }) }));
});
//# sourceMappingURL=MoodPickerV4.js.map