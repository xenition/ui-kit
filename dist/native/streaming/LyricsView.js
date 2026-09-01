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
exports.LyricsView = LyricsView;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * LyricsView — the **V4 "spotlight"** lyric sheet (native). Deliberately calm: a
 * scrollable list on the plain surface (NOT the gradient — that's reserved for
 * the hero moments), with the `activeIndex` line emphasized in bold `primary` /
 * `onSurface` and the rest muted. When `onLineTap` is set each line becomes a
 * seek button. The active line auto-scrolls into view. Token-only colors via
 * `useXenitionTheme()` — no literals; dark-mode safe.
 */
function LyricsView({ lines, activeIndex, onLineTap, style }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const scrollRef = React.useRef(null);
    const offsetsRef = React.useRef([]);
    React.useEffect(() => {
        if (activeIndex == null)
            return;
        const y = offsetsRef.current[activeIndex];
        if (y == null)
            return;
        scrollRef.current?.scrollTo({ y: Math.max(0, y - 96), animated: true });
    }, [activeIndex]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { ref: scrollRef, style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
            },
            style,
        ], contentContainerStyle: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: lines.map((line, i) => {
            const active = i === activeIndex;
            const label = line.time != null ? `Seek to ${(0, types_1.formatTime)(line.time)}: ${line.text}` : line.text;
            const textEl = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: active ? colors.primary : colors.muted,
                    fontSize: active ? tokens.typography.scale.xl : tokens.typography.scale.lg,
                    fontWeight: active ? '800' : '500',
                }, children: line.text }));
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { onLayout: (e) => {
                    offsetsRef.current[i] = e.nativeEvent.layout.y;
                }, children: onLineTap ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected: active }, onPress: () => onLineTap(i), style: ({ pressed }) => ({
                        minHeight: 44,
                        justifyContent: 'center',
                        paddingHorizontal: tokens.spacing.sm,
                        paddingVertical: tokens.spacing.xs,
                        borderRadius: tokens.radius.md,
                        opacity: pressed ? 0.7 : 1,
                    }), children: textEl })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityState: { selected: active }, style: { paddingHorizontal: tokens.spacing.sm }, children: textEl })) }, i));
        }) }));
}
//# sourceMappingURL=LyricsView.js.map