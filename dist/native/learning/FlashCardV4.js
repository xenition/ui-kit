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
exports.FlashCardV4 = FlashCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * FlashCard — **V4** "campus" design (native twin of the web V4). A tap-to-flip
 * study card on an elevated rounded surface with a soft shadow: shows the `front`
 * (prompt) and flips to the `back` (answer) on a soft-primary ground. The face
 * label pill + a "Tap to flip" hint keep the state legible without color. Works
 * controlled or uncontrolled. Token-only colors via `useXenitionTheme()`.
 */
function FlashCardV4({ front, back, frontLabel = 'Term', backLabel = 'Definition', flipped, defaultFlipped = false, onFlip, style }) {
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
    const shell = {
        minHeight: 160,
        padding: tokens.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: isFlipped ? (0, color_1.withAlpha)(colors.primary, 0.1) : colors.card,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: isFlipped }, accessibilityLabel: `Flashcard, ${label}: ${content}. Tap to flip.`, onPress: toggle, style: ({ pressed }) => [shell, { opacity: pressed ? 0.92 : 1 }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, backgroundColor: isFlipped ? (0, color_1.withAlpha)(colors.primary, 0.15) : (0, color_1.withAlpha)(colors.onSurface, 0.06) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isFlipped ? colors.primary : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }, children: label }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }, children: content }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Tap to flip" })] }));
}
//# sourceMappingURL=FlashCardV4.js.map