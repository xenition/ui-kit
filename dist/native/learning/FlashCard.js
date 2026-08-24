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
exports.FlashCard = FlashCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A tap-to-flip study card. Shows the `front` (prompt) and flips to the `back`
 * (answer) on press. Works controlled (via `flipped` + `onFlip`) or uncontrolled
 * (via `defaultFlipped`). Announced as a button whose label reflects the visible
 * face. Token-only colors.
 */
function FlashCard({ front, back, frontLabel = 'Term', backLabel = 'Definition', flipped, defaultFlipped = false, onFlip, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [internal, setInternal] = React.useState(defaultFlipped);
    const isControlled = flipped != null;
    const isFlipped = isControlled ? flipped : internal;
    const toggle = () => {
        const next = !isFlipped;
        if (!isControlled)
            setInternal(next);
        onFlip?.(next);
    };
    const label = isFlipped ? backLabel : frontLabel;
    const content = isFlipped ? back : front;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: isFlipped }, accessibilityLabel: `Flashcard, ${label}: ${content}. Tap to flip.`, onPress: toggle, style: ({ pressed }) => [
            {
                minHeight: 160,
                padding: tokens.spacing.xl,
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: isFlipped ? colors.primary : colors.surface,
                opacity: pressed ? 0.92 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: isFlipped ? colors.onPrimary : colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: isFlipped ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '700',
                    textAlign: 'center',
                }, children: content }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isFlipped ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs }, children: "Tap to flip" })] }));
}
//# sourceMappingURL=FlashCard.js.map