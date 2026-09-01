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
exports.SeedPhraseGridV4 = SeedPhraseGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const market_v4_1 = require("./internal/market-v4");
/**
 * **V4 recovery-phrase grid** — same props as {@link SeedPhraseGrid} plus
 * `wordLabel` and `revealWarning`.
 *
 * ## Four changes
 *
 * 1. **`columns` works.** The base gave each tile `width: ${100 / cols}%`
 *    inside a `flexWrap` row that also carried a gap, so three tiles plus two
 *    gaps came to more than 100% and wrapped: a 12-word phrase set to 3
 *    columns rendered as **6 rows of 2**. The grid is laid out as real rows
 *    now, each tile flexing into its share, so the gap is paid out of the row
 *    rather than added to it.
 * 2. **Revealing does not read the phrase aloud, word by word.** The base
 *    exposed every tile as its own accessibility element, so revealing a seed
 *    phrase made a screen reader recite twelve recovery words in order, out
 *    loud, in whatever room the holder was standing in. The revealed grid is
 *    **one** element the user has to focus deliberately, and its name is built
 *    from `wordLabel`.
 * 3. **The reveal control is a target.** It was a text-sized pill; it now
 *    clears 44 and drops `accessibilityState={{ expanded }}`, which controlled
 *    no region and told a reader nothing true.
 * 4. **Press is a state layer**, the warning takes the readable `warnText`
 *    slot rather than the `warn` fill, and a tile's ground is `card` rather
 *    than a raw ramp index.
 */
function SeedPhraseGridV4({ words, columns = 3, revealed, onToggleReveal, revealLabel = 'Reveal', hideLabel = 'Hide', warning = 'Never share your recovery phrase.', wordLabel = (index, word) => `Word ${index + 1}, ${word}`, revealWarning, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const isControlled = revealed !== undefined;
    const [internal, setInternal] = React.useState(false);
    const isRevealed = isControlled ? Boolean(revealed) : internal;
    const cols = Math.max(1, Math.trunc(columns));
    const toggle = () => {
        const next = !isRevealed;
        if (!isControlled)
            setInternal(next);
        onToggleReveal?.(next);
    };
    const safeWords = Array.isArray(words) ? words : [];
    // Real rows. A `flexWrap` row cannot express "N per line with a gap between
    // them" — the gap is added to the 100% rather than taken out of it.
    const rows = [];
    for (let i = 0; i < safeWords.length; i += cols) {
        rows.push(safeWords.slice(i, i + cols));
    }
    const phrase = (0, market_v4_1.spokenLine)(safeWords.map((word, index) => wordLabel(index, word ?? '')));
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [warning != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "warnText", children: warning })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: isRevealed, accessibilityLabel: isRevealed ? phrase : undefined, accessibilityElementsHidden: !isRevealed, importantForAccessibility: isRevealed ? 'yes' : 'no-hide-descendants', style: { gap: tokens.spacing.xs }, children: rows.map((row, rowIndex) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [row.map((word, columnIndex) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flex: 1,
                                minWidth: 0,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingVertical: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.sm,
                                borderWidth: 1,
                                borderColor: colors.border,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: colors.card,
                            }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: rowIndex * cols + columnIndex + 1 }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, children: isRevealed ? (word ?? '') : '••••••' })] }, columnIndex))), Array.from({ length: cols - row.length }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }, `pad-${i}`)))] }, rowIndex))) }), isRevealed && revealWarning != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "dangerText", children: revealWarning })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isRevealed ? hideLabel : revealLabel, onPress: toggle, style: ({ pressed }) => ({
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    minHeight: tap,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    paddingHorizontal: tokens.spacing.md,
                    backgroundColor: pressed
                        ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface)
                        : colors.surface,
                }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: isRevealed ? '🙈' : '👁' }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: isRevealed ? hideLabel : revealLabel })] })] }));
}
//# sourceMappingURL=SeedPhraseGridV4.js.map