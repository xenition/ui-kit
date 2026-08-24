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
exports.SeedPhraseGrid = SeedPhraseGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A recovery-phrase grid that is **hidden by default** — the words are masked
 * with dots and the tiles are marked inaccessible to screen readers until the
 * holder explicitly reveals them (uncontrolled: internal state starts hidden;
 * controlled: pass `revealed` + `onToggleReveal`). Each tile shows its 1-based
 * index. A `warning` line reinforces the sensitivity. Token-bound; no literal
 * colors. Indexing into `words` is guarded.
 */
function SeedPhraseGrid({ words, columns = 3, revealed, onToggleReveal, revealLabel = 'Reveal', hideLabel = 'Hide', warning = 'Never share your recovery phrase.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [warning != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: warning })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: safeWords.map((word, index) => {
                    const shown = isRevealed ? (word ?? '') : '••••••';
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: !isRevealed, importantForAccessibility: isRevealed ? 'yes' : 'no-hide-descendants', accessibilityLabel: isRevealed ? `Word ${index + 1}, ${word ?? ''}` : undefined, style: {
                            width: `${100 / cols}%`,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: tokens.ramps.neutral[100],
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: index + 1 }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: shown })] }, index));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: isRevealed }, accessibilityLabel: isRevealed ? hideLabel : revealLabel, onPress: toggle, style: ({ pressed }) => ({
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    opacity: pressed ? 0.7 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: isRevealed ? '🙈' : '👁' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: isRevealed ? hideLabel : revealLabel })] })] }));
}
//# sourceMappingURL=SeedPhraseGrid.js.map