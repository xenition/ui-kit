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
exports.MailSwipeActionsV4 = MailSwipeActionsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
/**
 * The ground and the ink each tone paints with — **a guaranteed pair in every
 * row**.
 *
 * `neutral` was `muted` (a ramp step) carrying `surface` (the page colour) as
 * its ink: two slots the compiler promises nothing about together, which is
 * why the web twin ended up drawing an `on-surface` glyph beside a `surface`
 * word on the same panel. A neutral panel is a raised surface, so it takes the
 * pair that was split out for exactly that.
 */
const TONE_SLOTS = {
    neutral: { bg: 'card', fg: 'onCard' },
    primary: { bg: 'primary', fg: 'onPrimary' },
    success: { bg: 'success', fg: 'onSuccess' },
    warn: { bg: 'warn', fg: 'onWarn' },
    danger: { bg: 'danger', fg: 'onDanger' },
};
/**
 * **V4 mail swipe rail** — same props as {@link MailSwipeActions} plus
 * `destructiveIds`, `confirmLabel` and `toolbarLabel`.
 *
 * ## Five changes
 *
 * 1. **A destructive action asks first.** Delete fired on a single tap, with
 *    no confirmation, no undo, and no prop through which a caller could ask
 *    for either — on a rail that is often the only route to it. An id in
 *    `destructiveIds` arms on the first press and fires on the second, and the
 *    armed state is a **word** ("Confirm Delete"), not a colour, so it survives
 *    a colour-blind user and a screen reader alike. Arming one action disarms
 *    any other.
 * 2. **The reading order matches the painted order.** `side="trailing"` was
 *    drawn with `flexDirection: 'row-reverse'`, which reverses the paint and
 *    leaves traversal running the other way — on a rail whose last item is
 *    typically Delete. V4 reverses the *array* and lays it out in `row`, so
 *    the picture is identical and a switch-control walks it left to right.
 * 3. **The rail has a name.** An unnamed `toolbar` announces as a container
 *    with nothing in it worth saying.
 * 4. **The glyph and its label are the same colour**, and it is the panel
 *    fill's guaranteed pair. See {@link TONE_SLOTS}.
 * 5. **Press is a state layer and the panel clears 44.** `opacity: 0.85`
 *    dimmed the content, which is M3's language for *disabled*.
 */
function MailSwipeActionsV4({ actions, side = 'trailing', destructiveIds, confirmLabel = (label) => `Confirm ${label}`, toolbarLabel = 'Message actions', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [armed, setArmed] = React.useState(null);
    const safe = actions ?? [];
    const destructive = destructiveIds ?? [];
    // The paint the base achieved with `row-reverse`, reached by reordering the
    // list instead — so what a reader walks is what a user sees.
    const ordered = side === 'trailing' ? [...safe].reverse() : safe;
    if (safe.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "toolbar", accessibilityLabel: toolbarLabel, style: [{ flexDirection: 'row', alignItems: 'stretch' }, style], children: ordered.map((a) => {
            const tone = a.tone ?? 'neutral';
            const slots = TONE_SLOTS[tone];
            const ground = colors[slots.bg];
            const ink = colors[slots.fg];
            const guarded = destructive.includes(a.id);
            const isArmed = guarded && armed === a.id;
            const word = isArmed ? confirmLabel(a.label) : a.label;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: word, onPress: () => {
                    if (guarded && !isArmed) {
                        setArmed(a.id);
                        return;
                    }
                    setArmed(null);
                    a.onPress?.();
                }, style: ({ pressed }) => ({
                    // The base's 72, composed off the scale instead of typed.
                    minWidth: tokens.spacing['2xl'] + tokens.spacing.lg,
                    minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    // The panel owns its fill, so the layer is composited into it.
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : ground,
                }), children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: a.glyph, size: "lg", style: { color: ink } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numberOfLines: 1, style: { color: ink }, children: word })] }, a.id));
        }) }));
}
//# sourceMappingURL=MailSwipeActionsV4.js.map